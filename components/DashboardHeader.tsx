import config from "@/app/config";
import HeaderMenu from "@/components/HeaderMenu";
import { routes } from "@/lib/routes";
import Link from "next/link";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-xl border-b border-border shadow-soft transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href={routes.familyTree.root}
            className="group flex items-center gap-2"
          >
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-800 group-hover:text-amber-700 transition-colors">
              {config.siteName}
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <HeaderMenu />
        </div>
      </div>
    </header>
  );
}
