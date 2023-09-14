import { Telegraf } from 'telegraf';
import { Command } from './command.class';
import { IBotContext } from '../context/context.interface';
import { Archiver } from '../services/archiver.class';

export class SaveDataCommand extends Command {
  archiver: Archiver;

  constructor(bot: Telegraf<IBotContext>, archiver: Archiver) {
    super(bot);

    this.archiver = archiver;
  }

  handle(): void {
    this.bot.on('text', async (ctx) => {
      try {
        const text: string = ctx.message.text;
        if (!text.trim()) {
          ctx.reply('Please write some text');
        }
        await this.archiver.createNote(text, text);
        console.log(text);
      } catch (error) {
        console.log(error);
      }
    });
  }
}
