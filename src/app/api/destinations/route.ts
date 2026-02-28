// src/app/api/destinations/route.ts
import { NextResponse } from 'next/server';

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET() {
  try {
    const res = await fetch(`${BASE_URL}/destinations`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch destinations');
    }
    
    const destinations = await res.json();
    return NextResponse.json(destinations);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch destinations' },
      { status: 500 }
    );
  }
}

