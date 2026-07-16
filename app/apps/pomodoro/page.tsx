import type { Metadata } from "next";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import PortfolioFooter from "@/components/portfolio/PortfolioFooter";
import PortfolioShell from "@/components/portfolio/PortfolioShell";
import Reveal from "@/components/portfolio/Reveal";
import { apps, siteUrl } from "@/lib/portfolio";
import { routes } from "@/lib/routes";

const app = apps.find((a) => a.slug === "pomodoro")!;

export const metadata: Metadata = {
  title: app.name,
  description: app.blurb,
  alternates: { canonical: `${siteUrl}${routes.pomodoro}/` },
  other: { "apple-itunes-app": `app-id=${app.appStoreId}` },
};

const features = [
  {
    title: "The classic loop, kept honest",
    body: "Work, short break, long break. No gimmicks, no gamification — just the technique as it was meant to run.",
  },
  {
    title: "Ticking you can feel",
    body: "An optional tick keeps the session present in the room, so you notice the timer without staring at it.",
  },
  {
    title: "Stays out of the way",
    body: "Start it and put the phone down. Notifications tell you when to switch, and nothing else asks for attention.",
  },
];

export default function PomodoroPage() {
  return (
    <PortfolioShell>
      <Reveal className="mx-6 pt-20 pb-6 md:mx-12 md:pt-16 max-w-3xl">
        <Link
          href={routes.apps}
          className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-tertiary transition-colors mb-6"
        >
          <ArrowLeft className="size-4" />
          All apps
        </Link>

        <span className="inline-block bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-5">
          On the App Store
        </span>

        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary leading-tight mb-4">
          {app.name}
        </h1>
        <p className="text-lg text-secondary leading-relaxed mb-6">
          {app.blurb}
        </p>

        {app.appStoreUrl && (
          <a
            href={app.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-opacity hover:opacity-75 mb-3"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us"
              alt="Download on the App Store"
              className="h-[52px] w-auto block"
            />
          </a>
        )}

        <p className="text-sm text-secondary">
          {app.platform} · Built with {app.tech.join(", ")}
        </p>
      </Reveal>

      <Reveal className="mx-6 mb-6 md:mx-12 max-w-3xl">
        <h2 className="font-serif text-2xl font-bold text-primary mb-4">
          What it does
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-surface rounded-2xl shadow-soft p-5"
            >
              <p className="font-semibold text-primary text-sm flex items-start gap-2 mb-2">
                <Check className="size-4 text-tertiary shrink-0 mt-0.5" />
                {f.title}
              </p>
              <p className="text-secondary text-sm leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <PortfolioFooter />
    </PortfolioShell>
  );
}
