import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/portfolio";

// `output: export` bắt buộc route này phải tĩnh; thiếu dòng dưới thì
// robots.txt trả 500.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
