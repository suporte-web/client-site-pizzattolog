export function normalizeSitePath(url: string | null | undefined, fallback = '#') {
  const value = url?.trim() || fallback;

  if (value === '/' || /^https?:\/\//.test(value) || value.startsWith('mailto:') || value.startsWith('tel:')) {
    return value;
  }

  return value.replace(/\/(?=$|#)/g, '');
}
