import db from './db';

export interface GetPatentsParams {
  page: number;
  limit: number;
  search?: string;
  status?: string[];
  category?: string[];
  from?: string | null;
  to?: string | null;
}

export interface PatentRow {
  id: number;
  title: string;
  patent_number: string | null;
  assignee: string | null;
  category: string | null;
  status: string;
  abstract: string | null;
  filed_date: Date | null;
  grant_date: Date | null;
  created_at: Date;
}

export async function getPatents({
  page,
  limit,
  search = '',
  status = [],
  category = [],
  from,
  to,
}: GetPatentsParams): Promise<{ rows: PatentRow[]; total: number }> {
  const offset = (page - 1) * limit;

  const where: string[] = [];
  const values: any[] = [];

  // Search (always applied)
  where.push(`title LIKE ?`);
  values.push(`%${search}%`);

  // Status filter
  if (status.length > 0) {
    where.push(`status IN (${status.map(() => '?').join(',')})`);
    values.push(...status);
  }

  // Category filter
  if (category.length > 0) {
    where.push(`category IN (${category.map(() => '?').join(',')})`);
    values.push(...category);
  }

  // Date range filter (filed_date)
  if (from) {
    where.push(`filed_date >= ?`);
    values.push(from);
  }

  if (to) {
    where.push(`filed_date <= ?`);
    values.push(to);
  }

  const whereSQL = where.length ? `WHERE ${where.join(' AND ')}` : '';

  // Main query
  const [rows] = await db.query<PatentRow[]>(
    `
    SELECT
      id,
      title,
      patent_number,
      assignee,
      category,
      status,
      abstract,
      filed_date,
      grant_date,
      created_at
    FROM patents
    ${whereSQL}
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
    `,
    [...values, limit, offset]
  );

  // Count query (no pagination)
  const [[{ total }]] = await db.query<any[]>(
    `
    SELECT COUNT(*) AS total
    FROM patents
    ${whereSQL}
    `,
    values
  );

  return { rows, total };
}
