import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      `https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_NEWSDATA_API_KEY}&q=cryptocurrency&language=en`
    );
    const data = await response.json();
    return NextResponse.json(data.results.slice(0, 5));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}