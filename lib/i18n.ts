import { siteUrl } from "@/lib/portfolio";

/**
 * Đa ngôn ngữ CHỈ áp cho các trang landing app (`/apps/<slug>`), theo đúng số
 * ngôn ngữ bản thân app hỗ trợ. Portfolio ở `/` và `/apps` vẫn thuần tiếng Anh.
 *
 * `output: "export"` không có server nên không thể redirect theo
 * `Accept-Language`; mỗi ngôn ngữ phải là một trang tĩnh có URL riêng, người
 * dùng tự đổi bằng nút trên nav.
 */
export const locales = ["en", "vi"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Một giá trị có đủ bản dịch cho mọi ngôn ngữ. */
export type Localized<T> = Record<Locale, T>;

/** Nhãn hiển thị trên nút chuyển ngôn ngữ. */
export const localeLabels: Localized<string> = { en: "EN", vi: "VI" };

/**
 * URL của một trang landing ở ngôn ngữ cho trước.
 *
 * `en` là mặc định nên **giữ nguyên** đường dẫn gốc (`/apps/inkline`) — đổi nó
 * sẽ làm chết mọi link đã chia sẻ và mọi thứ Google đã index.
 */
export function localePath(basePath: string, locale: Locale): string {
  return locale === defaultLocale ? basePath : `${basePath}/${locale}`;
}

/**
 * `alternates` cho metadata: canonical của chính trang, cộng `hreflang` trỏ
 * chéo sang các bản dịch. Thiếu phần này thì hai bản dễ bị coi là trùng lặp.
 */
export function localeAlternates(basePath: string, locale: Locale) {
  const url = (l: Locale) => `${siteUrl}${localePath(basePath, l)}/`;
  return {
    canonical: url(locale),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, url(l)])),
      "x-default": url(defaultLocale),
    },
  };
}

/** Chữ trong khung trang landing (nav + footer) — phần không thuộc app nào. */
export const landingChrome: Localized<{
  allApps: string;
  moreApps: string;
  portfolio: string;
  contact: string;
  switchLanguage: string;
}> = {
  en: {
    allApps: "All apps",
    moreApps: "More apps",
    portfolio: "Portfolio",
    contact: "Contact",
    switchLanguage: "Change language",
  },
  vi: {
    allApps: "Tất cả app",
    moreApps: "App khác",
    portfolio: "Portfolio",
    contact: "Liên hệ",
    switchLanguage: "Đổi ngôn ngữ",
  },
};
