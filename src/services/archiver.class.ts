import { Client } from '@notionhq/client';

type NotionClient = Client;

export class Archiver {
  private notionDatabase: string;
  private notion: NotionClient;

  constructor(databaseId: string, notionClient: NotionClient) {
    this.notionDatabase = databaseId;
    this.notion = notionClient;
  }

  public createNote = async (title: string, text: string) => {
    const response = await this.notion.pages.create({
      parent: { database_id: this.notionDatabase },
      properties: {
        Title: {
          title: [
            {
              type: 'text',
              text: {
                content: title,
              },
            },
          ],
        },
        Text: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: text,
              },
            },
          ],
        },
        Date: {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    });

    await this.notion.blocks.children.append({
      block_id: response.id,
      children: [
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: text,
                },
              },
            ],
          },
        },
      ],
    });

    return response;
  };
}
