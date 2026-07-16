import { Briefcase, Check } from "lucide-react";
import Reveal from "@/components/portfolio/Reveal";
import { consulting } from "@/lib/portfolio";
import { routes } from "@/lib/routes";
import Link from "next/link";

export default function ConsultingSection() {
  return (
    <Reveal
      id="consulting"
      className="bg-surface rounded-3xl shadow-soft mx-6 mb-6 p-8 md:mx-12"
    >
      <div className="flex items-center justify-between gap-4 mb-2 flex-wrap">
        <h2 className="font-serif text-2xl font-bold text-primary flex items-center gap-2.5">
          <Briefcase className="size-5 text-tertiary" />
          {consulting.title}
        </h2>
        {consulting.available && (
          <span className="text-sm text-green-600 flex items-center gap-1.5">
            <span className="status-dot" />
            Available for new projects
          </span>
        )}
      </div>

      <p className="text-secondary mb-8 max-w-3xl leading-relaxed">
        {consulting.intro}
      </p>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        {consulting.markets.map(({ name, body }) => (
          <div key={name} className="bg-neutral rounded-2xl p-5">
            <h3 className="font-serif font-semibold text-primary mb-2">
              {name}
            </h3>
            <p className="text-secondary text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="font-serif font-semibold text-primary mb-4">
          What I take on
        </h3>
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {consulting.offers.map((offer) => (
            <li
              key={offer}
              className="flex items-start gap-2 text-secondary text-sm"
            >
              <Check className="size-4 text-tertiary shrink-0 mt-0.5" />
              {offer}
            </li>
          ))}
        </ul>

        <Link
          href={`${routes.home}#contact`}
          className="btn-primary !py-3 !px-6 mt-6"
        >
          Start a conversation
        </Link>
      </div>
    </Reveal>
  );
}
