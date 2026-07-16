// Static export gotcha: next/image does not prefix `basePath` onto local image
// `src`s, so on GitHub Pages (served under /FamilyTree) they 404. Prefix them
// ourselves. Absolute URLs and data: URIs are left untouched.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(src?: string | null): string {
  if (!src) return "";
  if (/^(https?:)?\/\//i.test(src) || src.startsWith("data:")) return src;
  const path = src.startsWith("/") ? src : `/${src}`;
  return `${BASE_PATH}${path}`;
}
