export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getDashboardData } from '@/lib/dashboard-data';
import { corsPreflight, withCors } from '@/lib/cors';

export function OPTIONS(request: Request) {
  return corsPreflight(request);
}

export async function GET(request: Request) {
  try {
    const data = await getDashboardData();
    return withCors(request, NextResponse.json(data));
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return withCors(
      request,
      NextResponse.json(
        { error: 'Failed to fetch dashboard data' },
        { status: 500 }
      )
    );
  }
}
