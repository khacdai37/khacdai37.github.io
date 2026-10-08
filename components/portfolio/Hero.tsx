import { ArrowRight, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AppVideo from "@/components/portfolio/AppVideo";
import { asset } from "@/lib/asset";
import { deviceShot } from "@/lib/deviceShot";
import { latestApp, profile } from "@/lib/portfolio";
import { routes } from "@/lib/routes";

/**
 * Media của app mới nhất: video nếu có, không thì screenshot đầu tiên.
 * Khối trang trí chỉ còn là fallback khi app chưa có ảnh nào.
 */
function LatestAppMedia() {
  const cover = latestApp?.images[0];

  if (latestApp?.video) {
    return (
      <AppVideo
        {...latestApp.video}
        label={`${latestApp.name} — preview video`}
        poster={cover ? asset(cover) : undefined}
        controls={false}
        // Mobile: media đứng trước tên nên giữ thấp để tên không bị đẩy khỏi
        // màn hình đầu.
        className="w-auto max-h-[560px] max-lg:max-h-[340px] rounded-[2rem] border border-border bg-neutral shadow-2xl"
      />
    );
  }
  if (latestApp && cover) {
    return (
      <Image
        src={asset(cover)}
        alt={latestApp.name}
        width={deviceShot.width}
        height={deviceShot.height}
        priority
        // Mockup nền trong suốt: drop-shadow bám theo dáng máy (xem deviceShot).
        className="portfolio-float w-auto max-h-[560px] max-lg:max-h-[340px] drop-shadow-2xl"
      />
    );
  }

  return (
    <div className="portfolio-float relative w-full max-w-[280px] aspect-9/19 rounded-[2.5rem] border-8 border-primary bg-gradient-to-br from-amber-100 via-neutral to-rose-100 shadow-2xl flex flex-col items-center justify-center gap-4">
      <Smartphone className="size-12 text-tertiary" />
      <p className="font-serif text-xl font-bold text-primary">
        On the App Store
      </p>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="flex items-center px-6 py-16 md:px-12 lg:min-h-screen max-lg:pt-20">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 items-center w-full">
        <div className="portfolio-reveal max-lg:order-2">
          <p className="text-[11px] uppercase tracking-[0.12em] text-tertiary mb-3">
            {profile.eyebrow}
          </p>
          <h1 className="font-serif font-bold text-primary leading-[1.05] text-[clamp(2.8rem,4.5vw,4.5rem)] mb-2">
            Dai Khac
            <br />
            Nguyen
          </h1>
          <p className="font-serif text-lg font-semibold text-secondary mb-5">
            {profile.tagline}
          </p>
          <p className="text-secondary leading-relaxed max-w-[460px] mb-8">
            {profile.heroIntro}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href={routes.apps} className="btn-primary !py-3 !px-6">
              See what I&apos;ve built
              <ArrowRight className="size-4" />
            </Link>
            <Link href="#about" className="btn !py-3 !px-6">
              My story
            </Link>
          </div>
        </div>

        <div className="portfolio-reveal flex flex-col items-center gap-4 max-lg:order-1">
          <LatestAppMedia />
          {latestApp && (
            <Link
              href={latestApp.detailHref ?? latestApp.href ?? routes.apps}
              className="text-sm text-secondary hover:text-tertiary inline-flex items-center gap-1.5 transition-colors"
            >
              <span className="text-[11px] uppercase tracking-[0.12em] text-tertiary">
                Latest
              </span>
              {latestApp.name}
              <ArrowRight className="size-3.5" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
