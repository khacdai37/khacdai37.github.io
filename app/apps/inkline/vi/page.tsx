import type { Metadata } from "next";
import { localeAlternates } from "@/lib/i18n";
import { apps } from "@/lib/portfolio";
import { routes } from "@/lib/routes";
import { inklineCopy } from "../content";
import InklineLanding from "../InklineLanding";

const app = apps.find((a) => a.slug === "inkline")!;
const copy = inklineCopy.vi;

export const metadata: Metadata = {
  title: copy.seo.title,
  description: copy.seo.description,
  alternates: localeAlternates(routes.inkline, "vi"),
  other: { "apple-itunes-app": `app-id=${app.appStoreId}` },
};

export default function InklinePageVi() {
  return <InklineLanding locale="vi" />;
}
