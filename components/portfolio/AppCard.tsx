import { ArrowRight, Globe, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AppStoreBadge from "@/components/portfolio/AppStoreBadge";
import { asset } from "@/lib/asset";
import type { App } from "@/lib/portfolio";

export default function AppCard({ app }: { app: App }) {
  const Icon = app.platform === "iOS" ? Smartphone : Globe;
  const cover = app.images[0];

  return (
    <div className="bg-surface rounded-3xl shadow-soft overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-hover">
      <div className="h-[220px] bg-neutral flex items-center justify-center p-5">
        {cover ? (
          <Image
            src={asset(cover)}
            alt={app.name}
            width={200}
            height={420}
            className="h-full w-auto object-contain drop-shadow-lg"
          />
        ) : (
          // Fallback khi chưa có screenshot.
          <div className="h-full aspect-9/19 rounded-2xl bg-gradient-to-br from-amber-100 via-surface to-rose-100 border border-border flex items-center justify-center">
            <Icon className="size-8 text-tertiary" />
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col grow">
        <div className="flex items-baseline justify-between gap-3 mb-2">
          <h3 className="font-serif font-bold text-primary text-lg">
            {app.name}
          </h3>
          <span className="text-xs text-secondary shrink-0">{app.year}</span>
        </div>

        <p className="text-secondary text-sm leading-relaxed mb-4 grow">
          {app.blurb}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full text-xs font-medium">
            {app.platform}
          </span>
          {app.tech.map((t) => (
            <span
              key={t}
              className="bg-neutral text-secondary px-2 py-0.5 rounded-full text-xs"
            >
              {t}
            </span>
          ))}
        </div>

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
    </div>
  );
}
