import { ArrowRight, Check, Globe, Smartphone } from "lucide-react";
import Link from "next/link";
import AppStoreBadge from "@/components/portfolio/AppStoreBadge";
import ScreenCarousel from "@/components/portfolio/ScreenCarousel";
import type { App } from "@/lib/portfolio";

/** Thẻ app cỡ lớn cho /apps: thông tin bên trái, carousel bên phải. */
export default function AppShowcase({ app }: { app: App }) {
  const Icon = app.platform === "iOS" ? Smartphone : Globe;
  const hasShots = app.images.length > 0;

  return (
    <div
      id={app.slug}
      className="bg-surface rounded-3xl shadow-soft overflow-hidden transition-shadow duration-300 hover:shadow-soft-hover"
    >
      <div className="grid md:grid-cols-2">
        <div className="p-8">
          <span className="inline-block font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-tertiary bg-amber-50 px-2.5 py-1 rounded-md mb-2.5">
            {app.category}
          </span>

          <div className="flex items-start justify-between gap-3 mb-1">
            <h2 className="font-serif text-2xl font-bold text-primary">
              {app.name}
            </h2>
            <span className="bg-primary text-white px-3 py-1 rounded-lg shrink-0 text-sm font-semibold font-mono">
              {app.year}
            </span>
          </div>

          {app.live && (
            <p className="text-sm text-green-600 mb-4 flex items-center gap-1.5">
              <span className="status-dot" />
              {app.platform === "iOS" ? "Live on App Store" : "Live on the web"}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            {app.tech.map((t) => (
              <span
                key={t}
                className="bg-neutral text-secondary px-3 py-1 rounded-full text-sm"
              >
                {t}
              </span>
            ))}
          </div>

          <p className="text-secondary mb-4 leading-relaxed text-sm">
            {app.description}
          </p>

          <ul className="mb-5 flex flex-col gap-2">
            {app.highlights.map((h) => (
              <li
                key={h}
                className="flex gap-2.5 text-sm leading-relaxed text-secondary"
              >
                <Check className="size-4 shrink-0 translate-y-0.5 text-tertiary" />
                {h}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 flex-wrap">
            {app.appStoreUrl && <AppStoreBadge url={app.appStoreUrl} />}
            {app.detailHref && (
              <Link
                href={app.detailHref}
                className="text-sm font-semibold text-tertiary hover:text-amber-800 inline-flex items-center gap-1 transition-colors"
              >
                Learn more
                <ArrowRight className="size-4" />
              </Link>
            )}
            {app.href && (
              <Link
                href={app.href}
                className="text-sm font-semibold text-tertiary hover:text-amber-800 inline-flex items-center gap-1 transition-colors"
              >
                Open the app
                <ArrowRight className="size-4" />
              </Link>
            )}
          </div>
        </div>

        <div className="p-6 flex flex-col justify-center bg-neutral/60">
          {hasShots ? (
            <ScreenCarousel images={app.images} alt={app.name} />
          ) : (
            // Chưa có screenshot — khối thay thế, không để ô trống.
            <div className="flex flex-col items-center justify-center gap-3 py-12 rounded-2xl bg-gradient-to-br from-amber-100 via-surface to-rose-100 border border-border">
              <Icon className="size-10 text-tertiary" />
              <p className="text-xs text-secondary">Screenshots coming soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
