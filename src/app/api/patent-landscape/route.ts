export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { corsPreflight, withCors } from '@/lib/cors';

const CATEGORY_LABELS: Record<string, string> = {
  CS: 'Cyber Security',
  AI: 'Artificial Intelligence',
  ML: 'Machine Learning',
  DLT: 'Blockchain',
  Blockchain: 'Blockchain',
  NS: 'Network Security',
  DF: 'Digital Forensics',
  Cryptography: 'Encryption',
  Steganography: 'Stego',
  'Cloud Security': 'Cloud Security',
  enterprise: 'Enterprise',
  software: 'Software',
  internet: 'Internet',
  virtual: 'Virtual Env',
};

export function OPTIONS(request: Request) {
  return corsPreflight(request);
}

export async function GET(request: Request) {
  try {
    const [rows]: any[] = await db.query(`
      SELECT category, COUNT(*) AS count
      FROM patents
      WHERE category IS NOT NULL
      GROUP BY category
      ORDER BY count DESC
    `);

    const data = rows.map(r => {
      const normalized =
        r.category === 'DLT' ? 'Blockchain' : r.category;

      return {
        category: normalized,              // ✅ stable key
        label: CATEGORY_LABELS[normalized] ?? normalized,
        count: Number(r.count),
      };
    });

    return withCors(request, NextResponse.json(data));
  } catch (err) {
    console.error('Patent landscape API failed:', err);
    return withCors(request, NextResponse.json([], { status: 200 }));
  }
}
