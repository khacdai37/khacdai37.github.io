import Link from "next/link";
import { landingChrome, type Locale } from "@/lib/i18n";
import { profile } from "@/lib/portfolio";
import { routes } from "@/lib/routes";

/** Footer của trang landing — thay `PortfolioFooter` vì trang này không có sidebar. */
export default function AppLandingFooter({
  appName,
  locale,
}: {
  appName: string;
  locale: Locale;
}) {
  const chrome = landingChrome[locale];

  // Portfolio chỉ có tiếng Anh, nên ba link dưới đây luôn dẫn sang trang tiếng
  // Anh — dịch nhãn là để câu chữ trong footer không lẫn hai thứ tiếng.
  const links = [
    { href: routes.apps, label: chrome.moreApps },
    { href: routes.home, label: chrome.portfolio },
    { href: `${routes.home}#contact`, label: chrome.contact },
  ];

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-secondary">
          © {new Date().getFullYear()} {profile.name} · {appName}
        </p>
        <nav className="flex flex-wrap gap-5 text-sm">
          {links.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="text-secondary transition-colors hover:text-tertiary"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
