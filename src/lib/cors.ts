import { NextResponse } from 'next/server';

const RAW_ALLOWED_ORIGINS = process.env.CORS_ORIGINS || '*';
const ALLOWED_ORIGINS = RAW_ALLOWED_ORIGINS.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

function resolveAllowedOrigin(requestOrigin: string | null): string {
  if (ALLOWED_ORIGINS.includes('*')) {
    return '*';
  }

  if (requestOrigin && ALLOWED_ORIGINS.includes(requestOrigin)) {
    return requestOrigin;
  }

  return ALLOWED_ORIGINS[0] || '*';
}

export function withCors(request: Request, response: NextResponse): NextResponse {
  const origin = request.headers.get('origin');
  const allowedOrigin = resolveAllowedOrigin(origin);

  response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
  response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Vary', 'Origin');

  return response;
}

export function corsPreflight(request: Request): NextResponse {
  return withCors(request, new NextResponse(null, { status: 204 }));
}
