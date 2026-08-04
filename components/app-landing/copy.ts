import type { LandingSection as NavSection } from "./AppLandingNav";
import type { LandingFeature } from "./FeatureGrid";

/**
 * Toàn bộ chữ của một trang landing app, tách khỏi bố cục để dịch được.
 *
 * Cố ý **không** chứa đường dẫn ảnh: ảnh giống nhau ở mọi ngôn ngữ, để trong
 * đây thì mỗi lần đổi ảnh phải sửa ở từng bản dịch và rất dễ sót. Trang lắp
 * `imageAlt` (có dịch) với `src` (khai một lần) lại với nhau.
 */
export interface AppLandingCopy {
  seo: { title: string; description: string };
  navSections: NavSection[];
  hero: {
    pill: string;
    /** `*...*` bọc phần chữ được tô màu nhấn. Xem `LandingHero`. */
    headline: string;
    lede: string;
    meta: string;
    imageAlt: string;
  };
  overview: { eyebrow: string; title: string; body: string };
  how: {
    eyebrow: string;
    title: string;
    lede?: string;
    steps: { title: string; body: string; imageAlt?: string }[];
  };
  features: {
    eyebrow: string;
    title: string;
    lede?: string;
    items: LandingFeature[];
  };
  screens: { eyebrow: string; title: string };
  download: {
    eyebrow: string;
    title: string;
    lede: string;
    contactCta: string;
    note?: string;
  };
}
