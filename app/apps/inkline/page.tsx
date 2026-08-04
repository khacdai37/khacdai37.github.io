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

const app = apps.find((a) => a.slug === "inkline")!;

export const metadata: Metadata = {
  title: app.name,
  description: app.blurb,
  alternates: { canonical: `${siteUrl}${routes.inkline}/` },
  other: { "apple-itunes-app": `app-id=${app.appStoreId}` },
};

const navSections: NavSection[] = [
  { id: "overview", label: "Overview" },
  { id: "how", label: "How it works" },
  { id: "features", label: "Features" },
  { id: "library", label: "Library" },
  { id: "download", label: "Download" },
];

const steps: LandingStep[] = [
  {
    title: "Pick something to listen to",
    body: "Start from the built-in lessons, or import a podcast, a lecture, or a clip you saved. Lessons sort into folders by topic.",
    image: {
      ...deviceShot,
      src: "/portfolio/inkline/library.png",
      alt: "The library, listing lesson categories with their lesson and sentence counts",
    },
  },
  {
    title: "Let it find the sentences",
    body: "Tell it what you already have — audio alone, audio with a transcript, or audio with an .srt/.vtt file — and it works out the sentences and their timings. Drag the waveform to nudge any boundary.",
    image: {
      ...deviceShot,
      src: "/portfolio/inkline/add-lesson.png",
      alt: "The add-lesson screen offering audio only, audio and transcript, or audio and subtitle file",
    },
  },
  {
    title: "Write what you hear",
    body: "Playback stops at the end of each sentence. Type it, or handwrite it with Apple Pencil — then see it graded word by word.",
    image: {
      ...deviceShot,
      src: "/portfolio/inkline/dictation.png",
      alt: "The dictation screen: waveform, a masked hint, and an empty box to write in",
    },
  },
];

const features: LandingFeature[] = [
  {
    emoji: "🎧",
    title: "Sentence by sentence",
    body: "Playback stops at the end of every sentence, and the waveform replays just the part you are unsure about. Five speeds from 0.5× to 1.5×, weighted toward the slow end — dictation needs careful listening more than fast listening.",
  },
  {
    emoji: "🎯",
    title: "Graded word by word",
    body: "Compared by sequence rather than position, so one missing word at the start does not throw off everything after it. Misspelled, missing and extra words each get their own colour.",
  },
  {
    emoji: "✳️",
    title: "A hint, not the answer",
    body: "Sentences are masked with asterisks that still reveal the word count and the length of each word — enough to keep you going without handing it over.",
  },
  {
    emoji: "✏️",
    title: "Handwrite it on iPad",
    body: "Write with Apple Pencil on ruled paper that keeps its warm tone even in dark mode. When you type, autocorrect and predictive text are switched off so the keyboard cannot do the exercise for you.",
  },
  {
    emoji: "📥",
    title: "Bring your own audio",
    body: "Import audio with subtitles (SRT/VTT), audio with a transcript, or audio alone — the app finds the sentence boundaries on device. Pack a whole folder into one file to send a study partner.",
  },
  {
    emoji: "🔒",
    title: "Private, and out of your way",
    body: "No account, no ads, no in-app purchases, no tracking. Your work and your progress stay on your device. English and Vietnamese, with dark mode.",
  },
];

export default function InklinePage() {
  return (
    <>
      <AppLandingNav name="Inkline" initials="IN" sections={navSections} />

      <LandingHero
        pill="On the App Store"
        headline={
          <>
            Write down <span className="text-tertiary">exactly</span> what you
            heard.
          </>
        }
        lede={app.blurb}
        meta={`iPhone & iPad · Built with ${app.tech.slice(1).join(" & ")} · ${app.year}`}
        appStoreUrl={app.appStoreUrl}
        image={{
          ...deviceShot,
          src: app.images[0],
          alt: `${app.name} — an answer being graded word by word as it is typed`,
        }}
      />

      <LandingSection
        id="overview"
        eyebrow="Overview"
        title="Built for one thing."
        lede={app.description}
      />

      <LandingSection
        id="how"
        tone="surface"
        eyebrow="How it works"
        title="Three steps, then just listening."
      >
        <StepList steps={steps} />
      </LandingSection>

      <LandingSection
        id="features"
        eyebrow="Features"
        title="You are training your ear, not your commas."
        lede="Punctuation and capitalisation are ignored on purpose. Apostrophes inside words are kept, so “I’d” and “don’t” are graded the way you wrote them."
      >
        <FeatureGrid items={features} />
      </LandingSection>

      <LandingSection
        id="library"
        tone="surface"
        eyebrow="Library"
        title="54 lessons, free, in the box."
        lede="More than 3,500 sentences graded from A2 to C1 — news read slowly and clearly in standard American English, plus Aesop’s fables. Download once, then study offline."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-neutral p-6">
            <h3 className="mb-1.5 font-serif text-base font-bold text-primary">
              VOA Learning English
            </h3>
            <p className="text-sm leading-relaxed text-secondary">
              Science, health, culture, education, American stories, and the
              origins of idioms — read slowly and clearly.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-neutral p-6">
            <h3 className="mb-1.5 font-serif text-base font-bold text-primary">
              LibriVox
            </h3>
            <p className="text-sm leading-relaxed text-secondary">
              Aesop’s fables, read by volunteers — short pieces with a plain
              narrative line to follow.
            </p>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-secondary">
          Both sources are public domain and used under their original licence.
        </p>
      </LandingSection>

      {app.images.length > 1 && (
        <LandingSection
          id="screens"
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
        tone="surface"
        eyebrow="Download"
        title="Get Inkline."
        lede="For learners preparing for an English certificate, anyone who needs sharper listening for work, and self-studiers who want concrete feedback instead of passive listening."
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
        <p className="mt-5 text-sm text-secondary">
          Requires iPhone or iPad running iOS 18 or later. Automatic sentence
          detection from bare audio requires iOS 26 or later.
        </p>
      </LandingSection>

      <AppLandingFooter appName="Inkline" />
    </>
  );
}
