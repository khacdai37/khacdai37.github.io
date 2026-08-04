import type { Metadata } from "next";
import Link from "next/link";
import AppLandingFooter from "@/components/app-landing/AppLandingFooter";
import AppLandingNav, {
  type LandingSection as NavSection,
} from "@/components/app-landing/AppLandingNav";
import FeatureGrid, {
  type LandingFeature,
} from "@/components/app-landing/FeatureGrid";
import LandingHero from "@/components/app-landing/LandingHero";
import LandingSection from "@/components/app-landing/LandingSection";
import StepList, { type LandingStep } from "@/components/app-landing/StepList";
import AppStoreBadge from "@/components/portfolio/AppStoreBadge";
import ScreenCarousel from "@/components/portfolio/ScreenCarousel";
import { deviceShot } from "@/lib/deviceShot";
import { apps, siteUrl } from "@/lib/portfolio";
import { routes } from "@/lib/routes";

const app = apps.find((a) => a.slug === "pomodoro")!;

export const metadata: Metadata = {
  title: app.name,
  description: app.blurb,
  alternates: { canonical: `${siteUrl}${routes.pomodoro}/` },
  other: { "apple-itunes-app": `app-id=${app.appStoreId}` },
};

const navSections: NavSection[] = [
  { id: "overview", label: "Overview" },
  { id: "how", label: "How it works" },
  { id: "features", label: "Features" },
  { id: "download", label: "Download" },
];

const steps: LandingStep[] = [
  {
    title: "Pick a length",
    body: "Choose how long the session runs. That is the whole setup — there is nothing else to decide before you begin.",
  },
  {
    title: "Start and put the phone down",
    body: "The tick carries the session. You do not have to watch the screen to know it is still running.",
  },
  {
    title: "Take the break it gives you",
    body: "Short break, then back to work. After a few rounds it hands you the long one, and the loop starts over.",
  },
];

const features: LandingFeature[] = [
  {
    emoji: "🍅",
    title: "The classic loop, kept honest",
    body: "Work, short break, long break. No gimmicks, no gamification — just the technique as it was meant to run.",
  },
  {
    emoji: "🔔",
    title: "Ticking you can feel",
    body: "An optional tick keeps the session present in the room, so you notice the timer without staring at it.",
  },
  {
    emoji: "🌙",
    title: "Stays out of the way",
    body: "Start it and put the phone down. Notifications tell you when to switch, and nothing else asks for attention.",
  },
  {
    emoji: "⚡️",
    title: "Nothing to configure",
    body: "No account, no onboarding, no dashboard to fill in. Open it and the timer is already there waiting.",
  },
  {
    emoji: "☕️",
    title: "Breaks that are actually breaks",
    body: "Short and long breaks are part of the cycle, not an afterthought you have to remember to take.",
  },
];

export default function PomodoroPage() {
  return (
    <>
      <AppLandingNav name="Pomodoro" initials="PM" sections={navSections} />

      <LandingHero
        pill="On the App Store"
        headline={
          <>
            Focus that <span className="text-tertiary">keeps ticking</span>.
          </>
        }
        lede={app.blurb}
        meta={`${app.platform} · Built with ${app.tech.join(" & ")} · ${app.year}`}
        appStoreUrl={app.appStoreUrl}
        image={
          app.images[0]
            ? {
                ...deviceShot,
                src: app.images[0],
                alt: `${app.name} — focus timer`,
              }
            : undefined
        }
      />

      <LandingSection
        id="overview"
        eyebrow="Overview"
        title="What Pomodoro is"
        lede={app.description}
      />

      <LandingSection
        id="how"
        tone="surface"
        eyebrow="How it works"
        title="Three decisions, then none."
        lede="A session takes one tap to start. Everything after that is the technique running on its own."
      >
        <StepList steps={steps} />
      </LandingSection>

      <LandingSection
        id="features"
        eyebrow="Features"
        title="Plain on purpose."
        lede="Everything here earns its place. Nothing was added because a competitor had it."
      >
        <FeatureGrid items={features} />
      </LandingSection>

      {app.images.length > 1 && (
        <LandingSection
          id="screens"
          tone="surface"
          eyebrow="Screens"
          title="A look at it running."
        >
          <div className="mx-auto max-w-sm">
            <ScreenCarousel images={app.images} alt={app.name} />
          </div>
        </LandingSection>
      )}

      <LandingSection
        id="download"
        eyebrow="Download"
        title="Get Pomodoro."
        lede="Available on the App Store for iPhone."
      >
        <div className="flex flex-wrap items-center gap-5">
          {app.appStoreUrl && (
            <AppStoreBadge url={app.appStoreUrl} height={52} />
          )}
          <Link
            href={`${routes.home}#contact`}
            className="text-sm font-semibold text-tertiary transition-colors hover:text-amber-800"
          >
            Found a bug or have an idea? Get in touch →
          </Link>
        </div>
      </LandingSection>

      <AppLandingFooter appName="Pomodoro" />
    </>
  );
}
