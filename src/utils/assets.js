/**
 * TVA Sacred Timeline - Asset Path Resolver
 * 
 * Ensures public static assets resolve reliably across:
 * 1. Local Vite dev server (with or without base path)
 * 2. GitHub Pages subpath deployments (/Loki-X-TVA-multiverse/)
 * 3. Custom domain root deployments (/)
 */
export function getAssetUrl(path) {
  if (!path) return '';

  // Already a full or protocol-relative URL, or data/blob URI
  if (/^(?:https?:)?\/\/|^data:|^blob:/i.test(path)) {
    return path;
  }

  // Remove leading slash for safe concatenation with BASE_URL
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;

  return `${normalizedBase}${cleanPath}`;
}

export default getAssetUrl;
