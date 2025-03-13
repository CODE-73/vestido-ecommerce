const PUBLIC_BUCKET_URL = process.env['NEXT_PUBLIC_R2_PUBLIC_BUCKET_URL'] ?? '';

/**
 * Prefixes public bucket URL to complete the key
 * @param key R2 File key
 * @returns string
 */
export function getPublicURL(key: string) {
  return `${PUBLIC_BUCKET_URL}/${key}`;
}
