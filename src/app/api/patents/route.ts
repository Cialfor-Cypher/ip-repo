export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import db from '@/lib/db'; // mysql2 pool / connection
import { corsPreflight, withCors } from '@/lib/cors';

export function OPTIONS(request: Request) {
  return corsPreflight(request);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get('page') || 1);
    const limit = Number(searchParams.get('limit') || 12);
    const offset = (page - 1) * limit;

    const search = searchParams.get('search') || '';
    const statusFilters = searchParams.getAll('status');
    const categoryFilters = searchParams.getAll('category');
    const fromDate = searchParams.get('from');
    const toDate = searchParams.get('to');

    /* ----------------------------------------
       Build WHERE clause dynamically
    ----------------------------------------- */
    const whereClauses: string[] = [];
    const values: any[] = [];

    if (search) {
      whereClauses.push(
        `(title LIKE ? OR abstract LIKE ? OR inventor_1 LIKE ? OR inventor_2 LIKE ?)`
      );
      values.push(
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`
      );
    }

    if (statusFilters.length > 0) {
      whereClauses.push(
        `status IN (${statusFilters.map(() => '?').join(',')})`
      );
      values.push(...statusFilters);
    }

    if (categoryFilters.length > 0) {
      whereClauses.push(
        `category IN (${categoryFilters.map(() => '?').join(',')})`
      );
      values.push(...categoryFilters);
    }

    if (fromDate) {
      whereClauses.push(`filed_date >= ?`);
      values.push(fromDate);
    }

    if (toDate) {
      whereClauses.push(`filed_date <= ?`);
      values.push(toDate);
    }

    const whereSQL =
      whereClauses.length > 0
        ? `WHERE ${whereClauses.join(' AND ')}`
        : '';

    /* ----------------------------------------
       Main query (paginated)
    ----------------------------------------- */
    const [rows]: any = await db.query(
      `
      SELECT
        id,
        title,
        application_number,
        patent_number,
        assignee,
        category,
        filed_date,
        status,
        abstract,
        certificate_url,
        inventor_1,
        inventor_2
      FROM patents
      ${whereSQL}
      ORDER BY filed_date DESC
      LIMIT ? OFFSET ?
    `,
      [...values, limit, offset]
    );

    /* ----------------------------------------
       Count query (for pagination)
    ----------------------------------------- */
    const [countRows]: any = await db.query(
      `
      SELECT COUNT(*) as total
      FROM patents
      ${whereSQL}
    `,
      values
    );

    const total = countRows[0]?.total || 0;

    /* ----------------------------------------
       Map DB → Frontend contract
    ----------------------------------------- */
    const patents = rows.map((row: any) => ({
      id: row.id,
      title: row.title,

      // ✅ Application Number (PRIMARY)
      patentNumber: row.application_number,

      abstract: row.abstract,
      category: row.category,

      status: row.status
        ? row.status.charAt(0).toUpperCase() + row.status.slice(1)
        : 'Unknown',

      filingDate: row.filed_date,
      assignee: row.assignee,

      // ✅ Inventors
      inventors: [row.inventor_1, row.inventor_2].filter(Boolean),

      certificateUrl: row.certificate_url,
    }));

    /* ----------------------------------------
       ✅ OPTION A RESPONSE SHAPE
    ----------------------------------------- */
    return withCors(
      request,
      NextResponse.json({
        data: patents,
        total,
      })
    );
  } catch (error) {
    console.error('Error fetching patents:', error);
    return withCors(
      request,
      NextResponse.json(
        { error: 'Failed to fetch patents' },
        { status: 500 }
      )
    );
  }
}
