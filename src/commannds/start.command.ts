import { Markup, Telegraf } from 'telegraf';
import { Command } from './command.class';
import { IBotContext } from '../context/context.interface';

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.start((ctx) => {
      console.log(ctx.session);
      ctx.reply('Hello', Markup.inlineKeyboard([Markup.button.callback('Start', 'start work')]));
    });

    this.bot.action('start work', (ctx) => {
      ctx.reply('lets start our work');
    });
  }
}
