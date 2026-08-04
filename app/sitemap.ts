import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/portfolio";
import { routes } from "@/lib/routes";

// `output: export` bắt buộc route này phải tĩnh; thiếu dòng dưới thì
// sitemap.xml trả 500.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    routes.home,
    routes.apps,
    routes.youtube,
    routes.inkline,
    routes.pomodoro,
    routes.familyTree.root,
    routes.familyTree.about,
  ];

  return paths.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}/`,
    lastModified: new Date(),
  }));
}
