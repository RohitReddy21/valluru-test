const publicAssetPattern = /\.(avif|gif|jpe?g|mp4|ogg|png|svg|webm|webp)$/i;
const cloudStoragePattern = /^https?:\/\/(cdn\.)?(supabase|cloudinary|amazonaws|cdn)/i;
const blockedMediaFilenames = new Set([
  'pic1.jpeg',
  'sasidhar-valluru.jpg',
  'sasi1.jpeg',
  'whatsapp image 2026-06-15 at 2.54.38 pm.jpeg',
]);

function getMediaFilename(value) {
  const normalized = String(value || '').trim().replace(/\\/g, '/');
  if (!normalized) return '';

  try {
    const pathname = new URL(normalized, 'https://example.com').pathname;
    return decodeURIComponent(pathname).split('/').pop().toLowerCase();
  } catch {
    return normalized.split('?')[0].split('#')[0].split('/').pop().toLowerCase();
  }
}

export function normalizeMediaUrl(value) {
  const url = String(value || '').trim();
  if (!url) return '';
  if (blockedMediaFilenames.has(getMediaFilename(url))) return '';

  // Allow data URLs, blobs, and cloud storage URLs
  if (/^(data:|blob:)/i.test(url)) {
    return url;
  }

  // Allow cloud storage URLs (no modification needed)
  if (cloudStoragePattern.test(url) || /^https?:\/\//.test(url)) {
    return url;
  }

  // Handle local paths
  const normalized = url.replace(/\\/g, '/');
  const withoutFakePath = normalized.replace(/^.*fakepath\//i, '');
  const withoutPublic = withoutFakePath.replace(/^\/?public\//i, '');

  if (withoutPublic.startsWith('/')) {
    return withoutPublic;
  }

  if (withoutPublic.startsWith('./')) {
    return `/${withoutPublic.slice(2)}`;
  }

  if (withoutPublic.startsWith('../')) {
    return '';
  }

  if (publicAssetPattern.test(withoutPublic)) {
    return `/${withoutPublic}`;
  }

  return withoutPublic;
}

export function isCloudStorageUrl(url) {
  return cloudStoragePattern.test(url);
}

export function getImageExtension(url) {
  try {
    const pathname = new URL(url, 'https://example.com').pathname;
    const ext = pathname.split('.').pop().toLowerCase();
    return /^(avif|gif|jpe?g|png|webp)$/.test(ext) ? ext : 'jpg';
  } catch {
    return 'jpg';
  }
}
