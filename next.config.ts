import type { NextConfig } from "next";

// Static export for GitHub Pages. The repo is a user site
// (khacdai37.github.io), so the site is served from the root — no basePath.
// `lib/asset.ts` still prefixes NEXT_PUBLIC_BASE_PATH (empty here), so it is a
// no-op unless a basePath is reintroduced.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
