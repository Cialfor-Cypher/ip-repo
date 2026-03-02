const RAW_API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? '';
const API_BASE = RAW_API_BASE.replace(/\/$/, '');
const DEFAULT_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '/intellectual_property';

export function getApiUrl(path: string, params?: URLSearchParams): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const query = params?.toString() ? `?${params.toString()}` : '';

  if (API_BASE) {
    return `${API_BASE}/api${normalizedPath}${query}`;
  }

  return `${DEFAULT_BASE_PATH}/api${normalizedPath}${query}`;
}
