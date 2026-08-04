import type { MetadataRoute } from "next";
import { localePath, locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/portfolio";
import { routes } from "@/lib/routes";

// `output: export` bắt buộc route này phải tĩnh; thiếu dòng dưới thì
// sitemap.xml trả 500.
export const dynamic = "force-static";

/** Trang landing app — có bản dịch, nên liệt kê mọi ngôn ngữ. */
const localizedPaths = [routes.inkline, routes.pomodoro].flatMap((base) =>
  locales.map((l) => localePath(base, l)),
);

/** Phần còn lại của site chỉ có tiếng Anh (app gia phả tự nó là tiếng Việt). */
const singleLanguagePaths = [
  routes.home,
  routes.apps,
  routes.youtube,
  routes.familyTree.root,
  routes.familyTree.about,
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...singleLanguagePaths, ...localizedPaths].map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}/`,
    lastModified: new Date(),
  }));
}
