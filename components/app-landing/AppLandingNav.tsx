import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  landingChrome,
  localeLabels,
  localePath,
  locales,
  type Locale,
} from "@/lib/i18n";
import { routes } from "@/lib/routes";

export interface LandingSection {
  /** Trùng với `id` của <section> trên trang — anchor nhảy tới. */
  id: string;
  label: string;
}

/**
 * Thanh nav riêng của từng trang app, thay cho sidebar portfolio: trang landing
 * cố ý đứng độc lập để đọc như một trang sản phẩm, không như một mục con của
 * portfolio. Nút "All apps" là đường về duy nhất — logo bên trái không phải link
 * để khỏi có hai lối cùng dẫn về `/apps`.
 */
export default function AppLandingNav({
  name,
  initials,
  sections,
  locale,
  basePath,
}: {
  name: string;
  initials: string;
  sections: LandingSection[];
  locale: Locale;
  /** Đường dẫn bản mặc định (vd `/apps/inkline`) — gốc để dựng link đổi ngôn ngữ. */
  basePath: string;
}) {
  const chrome = landingChrome[locale];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="grid size-8 shrink-0 place-items-center rounded-[10px] bg-primary font-mono text-xs font-semibold text-white"
          >
            {initials}
          </span>
          <span className="font-serif text-base font-bold text-primary">
            {name}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-0.5 md:flex">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="rounded-lg px-3 py-1.5 text-sm text-secondary transition-colors hover:bg-neutral hover:text-primary"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          {/*
            Ngôn ngữ đang xem là <span> chứ không phải link tự trỏ về mình — đỡ
            một lần tải lại vô nghĩa, và `aria-current` nói rõ đang ở đâu.
          */}
          <div
            role="group"
            aria-label={chrome.switchLanguage}
            className="ml-1 flex items-center gap-0.5 rounded-lg border border-border p-0.5"
          >
            {locales.map((l) =>
              l === locale ? (
                <span
                  key={l}
                  aria-current="true"
                  className="rounded-md bg-primary px-2 py-1 font-mono text-[11px] font-semibold text-white"
                >
                  {localeLabels[l]}
                </span>
              ) : (
                <Link
                  key={l}
                  href={localePath(basePath, l)}
                  hrefLang={l}
                  className="rounded-md px-2 py-1 font-mono text-[11px] font-medium text-secondary transition-colors hover:bg-neutral hover:text-primary"
                >
                  {localeLabels[l]}
                </Link>
              ),
            )}
          </div>

          {/* Dưới `sm` chỉ còn mũi tên, nên nhãn phải nằm ở aria-label. */}
          <Link
            href={routes.apps}
            aria-label={chrome.allApps}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-secondary transition-colors hover:bg-neutral hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">{chrome.allApps}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
