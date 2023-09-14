import { Telegraf, session } from 'telegraf';
import { ConfigService } from './config/config.service';

import { createNote } from './services/notion.service';
import { IConfigService } from './config/config.interface';
import { IBotContext } from './context/context.interface';
import { Command } from './commannds/command.class';
import { StartCommand } from './commannds/start.command';

// const TELEGRAM_TOKEN: string = process.env.TELEGRAM_TOKEN
//   ? process.env.TELEGRAM_TOKEN.toString()
//   : '';

// const bot = new Telegraf(TELEGRAM_TOKEN, {
//   handlerTimeout: Infinity,
// });

// bot.start((ctx) => {
//   ctx.reply('Welcome to the Notion Archiver Bot');
// });

// bot.on(message('text'), async (ctx) => {
//   try {
//     const text: string = ctx.message.text;

//     if (!text.trim()) {
//       ctx.reply('Please write some text');
//     }

//     const notionResponse = await createNote(text, text);
//   } catch (error) {
//     console.log(error);
//   }
// });

// bot.launch();

class Bot {
  bot: Telegraf<IBotContext>;
  commands: Command[] = [];

  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get('TELEGRAM_TOKEN'));
    this.bot.use(session());
  }

  init() {
    this.commands = [new StartCommand(this.bot)];
    for (const command of this.commands) {
      command.handle();
    }
    this.bot.launch();
  }
}

const bot = new Bot(new ConfigService());
bot.init();
