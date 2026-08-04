import Link from "next/link";
import AppLandingFooter from "@/components/app-landing/AppLandingFooter";
import AppLandingNav from "@/components/app-landing/AppLandingNav";
import FeatureGrid from "@/components/app-landing/FeatureGrid";
import LandingHero from "@/components/app-landing/LandingHero";
import LandingSection from "@/components/app-landing/LandingSection";
import StepList, { type LandingStep } from "@/components/app-landing/StepList";
import AppStoreBadge from "@/components/portfolio/AppStoreBadge";
import ScreenCarousel from "@/components/portfolio/ScreenCarousel";
import { deviceShot } from "@/lib/deviceShot";
import { defaultLocale, type Locale } from "@/lib/i18n";
import { apps } from "@/lib/portfolio";
import { routes } from "@/lib/routes";
import { inklineCopy } from "./content";

const app = apps.find((a) => a.slug === "inkline")!;

/** Ảnh của ba bước, khai một lần — chữ đi kèm nằm trong `content.ts`. */
const stepImages = [
  "/portfolio/inkline/library.png",
  "/portfolio/inkline/add-lesson.png",
  "/portfolio/inkline/dictation.png",
];

/**
 * Thân trang Inkline, dùng chung cho mọi ngôn ngữ. Mỗi ngôn ngữ là một `page.tsx`
 * riêng (`/apps/inkline`, `/apps/inkline/vi`) chỉ khai `metadata` rồi gọi vào đây.
 */
export default function InklineLanding({ locale }: { locale: Locale }) {
  const copy = inklineCopy[locale];

  const steps: LandingStep[] = copy.how.steps.map((s, i) => ({
    title: s.title,
    body: s.body,
    image: {
      ...deviceShot,
      src: stepImages[i],
      alt: s.imageAlt ?? "",
    },
  }));

  return (
    // `lang` trên thẻ bọc: <html lang> chỉ root layout đặt được, và nó là "en"
    // cho portfolio. Xem app/layout.tsx và app/apps/family-tree/layout.tsx.
    <div lang={locale === defaultLocale ? undefined : locale}>
      <AppLandingNav
        name="Inkline"
        initials="IN"
        sections={copy.navSections}
        locale={locale}
        basePath={routes.inkline}
      />

      <LandingHero
        pill={copy.hero.pill}
        headline={copy.hero.headline}
        lede={copy.hero.lede}
        meta={copy.hero.meta}
        appStoreUrl={app.appStoreUrl}
        locale={locale}
        image={{
          ...deviceShot,
          src: app.images[0],
          alt: copy.hero.imageAlt,
        }}
      />

      <LandingSection
        id="overview"
        eyebrow={copy.overview.eyebrow}
        title={copy.overview.title}
        lede={copy.overview.body}
      />

      <LandingSection
        id="how"
        tone="surface"
        eyebrow={copy.how.eyebrow}
        title={copy.how.title}
        lede={copy.how.lede}
      >
        <StepList steps={steps} />
      </LandingSection>

      <LandingSection
        id="features"
        eyebrow={copy.features.eyebrow}
        title={copy.features.title}
        lede={copy.features.lede}
      >
        <FeatureGrid items={copy.features.items} />
      </LandingSection>

      <LandingSection
        id="library"
        tone="surface"
        eyebrow={copy.library.eyebrow}
        title={copy.library.title}
        lede={copy.library.lede}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {copy.library.sources.map((s) => (
            <div
              key={s.name}
              className="rounded-2xl border border-border bg-neutral p-6"
            >
              <h3 className="mb-1.5 font-serif text-base font-bold text-primary">
                {s.name}
              </h3>
              <p className="text-sm leading-relaxed text-secondary">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-secondary">
          {copy.library.note}
        </p>
      </LandingSection>

      {app.images.length > 1 && (
        <LandingSection
          id="screens"
          eyebrow={copy.screens.eyebrow}
          title={copy.screens.title}
        >
          <div className="mx-auto max-w-sm">
            <ScreenCarousel images={app.images} alt={app.name} />
          </div>
        </LandingSection>
      )}

      <LandingSection
        id="download"
        tone="surface"
        eyebrow={copy.download.eyebrow}
        title={copy.download.title}
        lede={copy.download.lede}
      >
        <div className="flex flex-wrap items-center gap-5">
          {app.appStoreUrl && (
            <AppStoreBadge url={app.appStoreUrl} height={52} locale={locale} />
          )}
          <Link
            href={`${routes.home}#contact`}
            className="text-sm font-semibold text-tertiary transition-colors hover:text-amber-800"
          >
            {copy.download.contactCta}
          </Link>
        </div>
        {copy.download.note && (
          <p className="mt-5 text-sm text-secondary">{copy.download.note}</p>
        )}
      </LandingSection>

      <AppLandingFooter appName="Inkline" locale={locale} />
    </div>
  );
}
