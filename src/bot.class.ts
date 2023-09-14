import { Telegraf, session } from 'telegraf';

import { IConfigService } from './config/config.interface';
import { IBotContext } from './context/context.interface';
import { Command } from './commannds/command.class';
import { StartCommand } from './commannds/start.command';
import { SaveDataCommand } from './commannds/saveData.class';
import { Archiver } from './services/archiver.class';

export class Bot {
  bot: Telegraf<IBotContext>;
  commands: Command[] = [];
  archiver: Archiver;

  constructor(
    private readonly configService: IConfigService,
    archiver: Archiver,
  ) {
    this.bot = new Telegraf<IBotContext>(this.configService.get('TELEGRAM_TOKEN'));
    this.bot.use(session());
    this.archiver = archiver;
  }

  init() {
    this.commands = [new StartCommand(this.bot), new SaveDataCommand(this.bot, this.archiver)];
    for (const command of this.commands) {
      command.handle();
    }
    this.bot.launch();
  }
}
