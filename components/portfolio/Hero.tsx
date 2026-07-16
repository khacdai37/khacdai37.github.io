import { ArrowRight, Smartphone } from "lucide-react";
import Link from "next/link";
import { profile } from "@/lib/portfolio";
import { routes } from "@/lib/routes";

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
            {profile.summary}
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

        {/* Chưa có ảnh mockup — dùng khối trang trí thay thế. Thay bằng
            screenshot thật khi có (public/portfolio/…). */}
        <div className="portfolio-reveal flex justify-center max-lg:order-1">
          <div className="portfolio-float relative w-full max-w-[280px] aspect-9/19 rounded-[2.5rem] border-8 border-primary bg-gradient-to-br from-amber-100 via-neutral to-rose-100 shadow-2xl flex flex-col items-center justify-center gap-4">
            <Smartphone className="size-12 text-tertiary" />
            <p className="font-serif text-xl font-bold text-primary">
              On the App Store
            </p>
            <p className="text-xs text-secondary px-8 text-center">
              10+ years · 2M+ downloads · 4.8/5
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
