import type { Metadata } from "next";
import {
  BookOpen,
  Database,
  Gauge,
  Layers,
  PlaySquare,
  Rocket,
  Smartphone,
  Video,
} from "lucide-react";
import Image from "next/image";
import PortfolioFooter from "@/components/portfolio/PortfolioFooter";
import PortfolioShell from "@/components/portfolio/PortfolioShell";
import Reveal from "@/components/portfolio/Reveal";
import { Youtube } from "@/components/portfolio/BrandIcons";
import { asset } from "@/lib/asset";
import { profile, siteUrl, youtube } from "@/lib/portfolio";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "YouTube",
  description: youtube.intro,
  alternates: { canonical: `${siteUrl}${routes.youtube}/` },
};

// Map tên icon trong lib/portfolio.ts -> component. Giữ data layer không phụ
// thuộc lucide.
const icons = {
  smartphone: Smartphone,
  layers: Layers,
  video: Video,
  database: Database,
  gauge: Gauge,
  rocket: Rocket,
} as const;

export default function YouTubePage() {
  const hasVideos = youtube.videos.length > 0;

  return (
    <PortfolioShell>
      {/* Intro */}
      <Reveal className="bg-surface rounded-3xl shadow-soft mx-6 mt-20 mb-6 p-8 md:mx-12 md:mt-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="size-28 rounded-full overflow-hidden border-4 border-red-500/25 shadow-lg shrink-0">
            <Image
              src={asset(profile.avatar)}
              alt={profile.name}
              width={224}
              height={224}
              className="size-full object-cover"
            />
          </div>

          <div className="text-center md:text-left grow">
            <h1 className="font-serif text-4xl font-bold text-primary mb-2">
              {youtube.handle}
            </h1>
            <p className="text-secondary text-lg mb-6 leading-relaxed">
              {youtube.intro}
            </p>
            <a
              href={youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-soft-hover"
            >
              <Youtube className="size-5" />
              Subscribe on YouTube
            </a>
          </div>
        </div>
      </Reveal>

      {/* What You'll Learn */}
      <Reveal
        id="topics"
        className="bg-surface rounded-3xl shadow-soft mx-6 mb-6 p-8 md:mx-12"
      >
        <h2 className="font-serif text-2xl font-bold text-primary flex items-center gap-2.5 mb-2">
          <BookOpen className="size-5 text-tertiary" />
          What You&apos;ll Learn
        </h2>
        <p className="text-secondary mb-8 max-w-3xl">{youtube.learnIntro}</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {youtube.topics.map(({ title, body, icon }) => {
            const Icon = icons[icon as keyof typeof icons] ?? Smartphone;
            return (
              <div key={title} className="bg-neutral rounded-2xl p-5">
                <h3 className="font-serif font-semibold text-primary mb-2 flex items-center gap-2">
                  <Icon className="size-4 text-tertiary" />
                  {title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed">{body}</p>
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* Videos */}
      <Reveal id="videos" className="mx-6 mb-6 md:mx-12">
        <h2 className="font-serif text-2xl font-bold text-primary flex items-center gap-2.5 mb-5">
          <PlaySquare className="size-5 text-tertiary" />
          Videos
        </h2>

        {hasVideos ? (
          <div className="grid gap-5 md:grid-cols-3">
            {youtube.videos.map((v) => (
              <a
                key={v.url}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-surface rounded-2xl shadow-soft p-5 transition-all hover:-translate-y-1 hover:shadow-soft-hover"
              >
                <p className="font-semibold text-primary text-sm leading-snug">
                  {v.title}
                </p>
              </a>
            ))}
          </div>
        ) : (
          // Chưa có link video — chủ ý nói thẳng thay vì để thẻ giả.
          <div className="bg-surface rounded-3xl shadow-soft p-10 text-center">
            <div className="size-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Youtube className="size-6 text-red-600" />
            </div>
            <p className="font-serif font-semibold text-primary mb-1">
              Videos coming soon
            </p>
            <p className="text-secondary text-sm mb-6 max-w-md mx-auto">
              The channel is just getting started. Subscribe and the first
              videos will show up in your feed.
            </p>
            <a
              href={youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn !py-3 !px-6"
            >
              Visit the channel
            </a>
          </div>
        )}
      </Reveal>

      <PortfolioFooter />
    </PortfolioShell>
  );
}
