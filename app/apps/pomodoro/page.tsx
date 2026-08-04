import type { Metadata } from "next";
import { localeAlternates } from "@/lib/i18n";
import { apps } from "@/lib/portfolio";
import { routes } from "@/lib/routes";
import { pomodoroCopy } from "./content";
import PomodoroLanding from "./PomodoroLanding";

const app = apps.find((a) => a.slug === "pomodoro")!;
const copy = pomodoroCopy.en;

export const metadata: Metadata = {
  title: copy.seo.title,
  description: copy.seo.description,
  alternates: localeAlternates(routes.pomodoro, "en"),
  other: { "apple-itunes-app": `app-id=${app.appStoreId}` },
};

export default function PomodoroPage() {
  return <PomodoroLanding locale="en" />;
}
