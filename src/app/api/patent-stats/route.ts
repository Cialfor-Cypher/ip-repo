export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { corsPreflight, withCors } from '@/lib/cors';

export function OPTIONS(request: Request) {
  return corsPreflight(request);
}

export async function GET(request: Request) {
  try {
    const [[total]] = await db.query<any[]>(
      `SELECT COUNT(*) AS count FROM patents`
    );

    const [[published]] = await db.query<any[]>(
      `SELECT COUNT(*) AS count FROM patents WHERE status = 'published'`
    );

    const [[granted]] = await db.query<any[]>(
      `SELECT COUNT(*) AS count FROM patents WHERE status = 'granted'`
    );

    return withCors(
      request,
      NextResponse.json({
        total: total.count,
        published: published.count,
        granted: granted.count,
      })
    );
  } catch (error) {
    console.error('Patent stats API failed:', error);
    return withCors(
      request,
      NextResponse.json(
        { error: 'Failed to fetch patent stats' },
        { status: 500 }
      )
    );
  }
}
