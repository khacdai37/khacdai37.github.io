import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import AboutSection from "@/components/portfolio/AboutSection";
import AppCard from "@/components/portfolio/AppCard";
import ContactSection from "@/components/portfolio/ContactSection";
import Hero from "@/components/portfolio/Hero";
import PortfolioFooter from "@/components/portfolio/PortfolioFooter";
import PortfolioShell from "@/components/portfolio/PortfolioShell";
import Reveal from "@/components/portfolio/Reveal";
import { apps, featuredApps } from "@/lib/portfolio";
import { routes } from "@/lib/routes";

export default function HomePage() {
  return (
    <PortfolioShell>
      <Hero />
      <AboutSection />

      <Reveal id="featured" className="mx-6 mb-6 md:mx-12">
        <div className="flex items-center justify-between gap-4 mb-5">
          <h2 className="font-serif text-2xl font-bold text-primary flex items-center gap-2.5">
            <Star className="size-5 text-tertiary" />
            What I&apos;ve shipped
          </h2>
          <Link
            href={routes.apps}
            className="text-tertiary hover:text-amber-800 font-medium flex items-center gap-1 transition-colors text-sm shrink-0"
          >
            See all {apps.length} apps
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredApps.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      </Reveal>

      <ContactSection />
      <PortfolioFooter />
    </PortfolioShell>
  );
}
