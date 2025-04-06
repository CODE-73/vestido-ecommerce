/**
 * Cloudflare Image Transformation loader for Next.js
 * @param {Object} params - The parameters for the image
 * @param {string} params.src - The source URL of the image
 * @param {number} params.width - The width to resize the image to
 * @param {number} params.quality - The quality of the image (0-100)
 * @returns {string} - The Cloudflare optimized image URL
 */
export default function cloudflareLoader({ src, width, quality }) {
  // Default quality if not specified
  const imageQuality = quality || 75;
  const baseUrl =
    process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGE_TRANSFORMATION_ORIGIN || '';

  if (src.startsWith('/assets/')) {
    // Fallback for local assets
    return src;
  }

  // Fallback for direct paths without a custom domain
  // Assumes the app is hosted on Cloudflare
  return `${baseUrl}/cdn-cgi/image/width=${width},quality=${imageQuality},format=auto/${src}`;
}
