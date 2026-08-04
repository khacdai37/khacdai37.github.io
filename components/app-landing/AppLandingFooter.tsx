import Link from "next/link";
import { profile } from "@/lib/portfolio";
import { routes } from "@/lib/routes";

/** Footer của trang landing — thay `PortfolioFooter` vì trang này không có sidebar. */
export default function AppLandingFooter({ appName }: { appName: string }) {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-secondary">
          © {new Date().getFullYear()} {profile.name} · {appName}
        </p>
        <nav className="flex flex-wrap gap-5 text-sm">
          <Link
            href={routes.apps}
            className="text-secondary transition-colors hover:text-tertiary"
          >
            More apps
          </Link>
          <Link
            href={routes.home}
            className="text-secondary transition-colors hover:text-tertiary"
          >
            Portfolio
          </Link>
          <Link
            href={`${routes.home}#contact`}
            className="text-secondary transition-colors hover:text-tertiary"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
