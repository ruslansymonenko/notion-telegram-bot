// import { Client } from '@notionhq/client';
// import dotenv from 'dotenv';

// dotenv.config();

// const NOTION_SECRET: string = process.env.NOTION_SECRET ? process.env.NOTION_SECRET.toString() : '';
// const NOTION_DB_ID: string = process.env.NOTION_DB_ID ? process.env.NOTION_DB_ID.toString() : '';

// const notion = new Client({
//   auth: NOTION_SECRET,
// });

// export const createNote = async (title: string, text: string) => {
//   const response = await notion.pages.create({
//     parent: { database_id: NOTION_DB_ID },
//     properties: {
//       Title: {
//         title: [
//           {
//             type: 'text',
//             text: {
//               content: title,
//             },
//           },
//         ],
//       },
//       Text: {
//         rich_text: [
//           {
//             type: 'text',
//             text: {
//               content: text,
//             },
//           },
//         ],
//       },
//       Date: {
//         date: {
//           start: new Date().toISOString(),
//         },
//       },
//     },
//   });

//   await notion.blocks.children.append({
//     block_id: response.id,
//     children: [
//       {
//         object: 'block',
//         type: 'paragraph',
//         paragraph: {
//           rich_text: [
//             {
//               type: 'text',
//               text: {
//                 content: text,
//               },
//             },
//           ],
//         },
//       },
//     ],
//   });

//   return response;
// };
