import Link from "next/link";
import AppLandingFooter from "@/components/app-landing/AppLandingFooter";
import AppLandingNav from "@/components/app-landing/AppLandingNav";
import FeatureGrid from "@/components/app-landing/FeatureGrid";
import LandingHero from "@/components/app-landing/LandingHero";
import LandingSection from "@/components/app-landing/LandingSection";
import StepList from "@/components/app-landing/StepList";
import AppStoreBadge from "@/components/portfolio/AppStoreBadge";
import ScreenCarousel from "@/components/portfolio/ScreenCarousel";
import { deviceShot } from "@/lib/deviceShot";
import { defaultLocale, type Locale } from "@/lib/i18n";
import { apps } from "@/lib/portfolio";
import { routes } from "@/lib/routes";
import { pomodoroCopy } from "./content";

const app = apps.find((a) => a.slug === "pomodoro")!;

/** Thân trang Pomodoro, dùng chung cho mọi ngôn ngữ — xem `InklineLanding`. */
export default function PomodoroLanding({ locale }: { locale: Locale }) {
  const copy = pomodoroCopy[locale];

  return (
    <div lang={locale === defaultLocale ? undefined : locale}>
      <AppLandingNav
        name="Pomodoro"
        initials="PM"
        sections={copy.navSections}
        locale={locale}
        basePath={routes.pomodoro}
      />

      <LandingHero
        pill={copy.hero.pill}
        headline={copy.hero.headline}
        lede={copy.hero.lede}
        meta={copy.hero.meta}
        appStoreUrl={app.appStoreUrl}
        locale={locale}
        image={
          app.images[0]
            ? {
                ...deviceShot,
                src: app.images[0],
                alt: copy.hero.imageAlt,
              }
            : undefined
        }
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
        <StepList steps={copy.how.steps} />
      </LandingSection>

      <LandingSection
        id="features"
        eyebrow={copy.features.eyebrow}
        title={copy.features.title}
        lede={copy.features.lede}
      >
        <FeatureGrid items={copy.features.items} />
      </LandingSection>

      {app.images.length > 1 && (
        <LandingSection
          id="screens"
          tone="surface"
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
      </LandingSection>

      <AppLandingFooter appName="Pomodoro" locale={locale} />
    </div>
  );
}
