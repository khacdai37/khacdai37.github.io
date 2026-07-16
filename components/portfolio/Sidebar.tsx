"use client";

import { Github, Linkedin, Youtube } from "@/components/portfolio/BrandIcons";
import Link from "next/link";
import { profile } from "@/lib/portfolio";
import { routes } from "@/lib/routes";

const navLinks = [
  { href: routes.home, label: "Home" },
  { href: routes.apps, label: "Apps" },
  { href: routes.youtube, label: "YouTube" },
  { href: `${routes.home}#contact`, label: "Contact" },
];

const socials = [
  { href: profile.social.github, label: "GitHub", icon: Github },
  { href: profile.social.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: profile.social.youtube, label: "YouTube", icon: Youtube },
];

export default function Sidebar({
  open,
  onNavigate,
}: {
  open: boolean;
  onNavigate: () => void;
}) {
  return (
    <aside
      className={`portfolio-sidebar bg-surface border-r border-border ${open ? "open" : ""}`}
      aria-label="Site navigation"
    >
      <div className="flex flex-col min-h-full p-8">
        <div className="mb-8 max-md:pl-10">
          <Link
            href={routes.home}
            onClick={onNavigate}
            className="block font-serif text-lg font-bold text-primary hover:text-tertiary transition-colors leading-tight"
          >
            {profile.name}
          </Link>
          <p className="mt-1 text-[0.68rem] uppercase tracking-[0.1em] text-secondary">
            {profile.role}
          </p>
        </div>

        <hr className="border-border mb-6" />

        <nav className="flex flex-col gap-0.5 flex-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              onClick={onNavigate}
              className="px-3 py-2 rounded-lg text-sm font-medium text-secondary hover:text-primary hover:bg-neutral transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="pt-6 mt-auto border-t border-border flex items-center gap-5">
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-secondary hover:text-tertiary transition-colors"
            >
              <Icon className="size-[18px]" />
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
