import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import dotenv from 'dotenv';

import { createNote } from './services/notion.service';

dotenv.config();

const TELEGRAM_TOKEN: string = process.env.TELEGRAM_TOKEN
  ? process.env.TELEGRAM_TOKEN.toString()
  : '';

const bot = new Telegraf(TELEGRAM_TOKEN, {
  handlerTimeout: Infinity,
});

bot.start((ctx) => {
  ctx.reply('Welcome to the Notion Archiver Bot');
});

bot.on(message('text'), async (ctx) => {
  try {
    const text: string = ctx.message.text;

    if (!text.trim()) {
      ctx.reply('Please write some text');
    }

    const notionResponse = await createNote(text, text);
  } catch (error) {
    console.log(error);
  }
});

bot.launch();
