import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email') || '';
  const key = process.env.NOTION_USER_DB || ''

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

    return NextResponse.json(response);
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
