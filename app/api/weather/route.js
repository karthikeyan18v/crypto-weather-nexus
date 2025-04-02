import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cities = ['New York', 'London', 'Tokyo'];
    const weatherData = await Promise.all(
      cities.map(async (city) => {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
        );
        return res.json();
      })
    );
    return NextResponse.json(weatherData);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}