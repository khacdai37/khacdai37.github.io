import type { Metadata } from "next";
import AppShowcase from "@/components/portfolio/AppShowcase";
import ConsultingSection from "@/components/portfolio/ConsultingSection";
import PortfolioFooter from "@/components/portfolio/PortfolioFooter";
import PortfolioShell from "@/components/portfolio/PortfolioShell";
import Reveal from "@/components/portfolio/Reveal";
import TechToolsSection from "@/components/portfolio/TechToolsSection";
import { apps } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Apps",
  description:
    "Apps I've built — native iOS with Swift and SwiftUI, plus web apps with Next.js and TypeScript. Freelance and consulting for the Japanese and Korean markets.",
};

export default function AppsPage() {
  return (
    <PortfolioShell>
      <Reveal className="mx-6 pt-20 pb-8 md:mx-12 md:pt-16">
        <h1 className="font-serif text-4xl font-bold text-primary mb-2">
          My Apps
        </h1>
        <p className="text-secondary text-lg max-w-2xl">
          {apps.length} apps I ship and maintain myself. Each one started as
          something I wanted to exist.
        </p>
      </Reveal>

      <Reveal className="mx-6 mb-12 md:mx-12">
        <div className="flex flex-col gap-8">
          {apps.map((app) => (
            <AppShowcase key={app.slug} app={app} />
          ))}
        </div>
      </Reveal>

      <ConsultingSection />
      <TechToolsSection />
      <PortfolioFooter />
    </PortfolioShell>
  );
}
