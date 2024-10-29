import { NextResponse, NextRequest } from 'next/server';
import { Client } from '@notionhq/client';

interface User {
  dbId: string; // parent database_id
  createdAt: string;
  email: string;
  name: string;
  image: string;
  id: number;
}

interface UserResponse {
  parent: {
    database_id: string;
  };
  properties: {
    createdAt: {
      create_time: string;
    };
    email: {
      email: string;
    };
    name: {
      rich_text: { plain_text: string }[];
    };
    image: {
      rich_text: { plain_text: string }[];
    };
    id: {
      title: { plain_text: string }[];
    };
  };
}

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email') || '';
  const key = process.env.NOTION_USER_DB || '';

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

    const handledData: User | null = response.results.length ? (response.results as unknown as UserResponse[]).map(
      (item) => ({
        dbId: item.parent.database_id,
        createdAt: item.properties.createdAt.create_time,
        email: item.properties.email.email,
        name: item.properties.name.rich_text[0].plain_text,
        image: item.properties.image.rich_text[0]?.plain_text,
        id: +item.properties.id.title[0].plain_text,
      })
    )[0] : null;

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
    const body = await req.json();
    const response = await notion.pages.create({
      parent: { database_id: databaseName[dbType] },
      properties: {
        email: {
          email: body.email,
        },
        name: {
          rich_text: [
            {
              text: {
                content: body.name,
              },
            },
          ],
        },
        image: {
          rich_text: [
            {
              text: {
                content: body.image,
              },
            },
          ],
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
