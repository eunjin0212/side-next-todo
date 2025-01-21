import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

interface TodoList {
  checked: boolean;
  text: string;
  createTime: string;
}

interface TodoListResponse {
  parent: {
    database_id: string;
  };
  properties: {
    createdAt: {
      create_time: string;
    };
    text: {
      rich_text: { plain_text: string }[];
    };
    id: {
      title: { plain_text: string }[];
    };
    checked: {
      check: boolean;
    };
  };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const dbName = searchParams.get('parentId') || '';

  try {
    const response = await notion.databases.query({
      database_id: dbName,
    });

    const handledData: TodoList[] | null = response.results.length
      ? (response.results as unknown as TodoListResponse[]).map((item) => ({
        checked: item.properties.checked.check,
        text: item.properties.text.rich_text[0].plain_text,
        createTime: item.properties.createdAt.create_time,
      }))
      : [];

    return NextResponse.json(handledData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to query database' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const dbName = searchParams.get('dbName');

  const databaseName = {
    user: process.env.NOTION_USER_DB || '',
    list: process.env.NOTION_LIST_DB || '',
  } as Record<string, string>;

  const dbType = dbName || 'user';

  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseName[dbType] },
      properties: {},
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to query database' },
      { status: 500 }
    );
  }
}
