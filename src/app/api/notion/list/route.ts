import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

interface TodoListResponse {
  parent: {
    database_id: string;
  };
  properties: {
    todo: {
      rich_text: { plain_text: string }[];
    };
    id: {
      title: { plain_text: string }[];
    };
    status: {
      id: string;
      name: 'beforeStart' | 'inProgress' | 'done',
      color: 'default' | 'blue' | 'green'
    };
  };
}

export interface TodoList {
  status: {
    label: TodoListResponse['properties']['status']['name'];
    color: TodoListResponse['properties']['status']['color']
  };
  todo: string;
}

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email') || '';
  const key = process.env.NOTION_LIST_DB || '';

  if (!email) {
    return;
  }

  try {
    const response = await notion.databases.query({
      database_id: key,
      filter: {
        property: 'email',
        email: {
          contains: email,
        },
      },
    });

    const handledData: TodoList[] = response.results.length
      ? (response.results as unknown as TodoListResponse[]).map((item) => ({
        status: {
          label: item.properties.status.name,
          color: item.properties.status.color,
        },
        todo: item.properties.todo.rich_text[0].plain_text,
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
