import expres, { Application } from 'express';
import { ConfigService } from './config/config.service';
import { Client } from '@notionhq/client';

import { Bot } from './bot.class';
import { Archiver } from './services/archiver.class';

class Server {
  private app: Application;
  private port: number;

  constructor(port: number) {
    this.app = expres();
    this.port = port;

    this.app.use(expres.json());
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}. . .`);
    });
  }
}

const config = new ConfigService();
const port = parseInt(config.get('PORT')) || 8000;

const server = new Server(port);
const notion = new Client({
  auth: config.get('NOTION_SECRET'),
});
const archiver = new Archiver(config.get('NOTION_DB_ID'), notion);
const bot = new Bot(config, archiver);

server.start();
bot.init();
