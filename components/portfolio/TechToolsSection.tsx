import { Code2 } from "lucide-react";
import Reveal from "@/components/portfolio/Reveal";
import { techGroups, techIntro } from "@/lib/portfolio";

export default function TechToolsSection() {
  return (
    <Reveal
      id="tech"
      className="bg-surface rounded-3xl shadow-soft mx-6 mb-6 p-8 md:mx-12"
    >
      <h2 className="font-serif text-2xl font-bold text-primary flex items-center gap-2.5 mb-2">
        <Code2 className="size-5 text-tertiary" />
        Tech &amp; Tools
      </h2>
      <p className="text-secondary mb-8 max-w-3xl leading-relaxed">
        {techIntro}
      </p>

      {techGroups.map(({ group, items }) => (
        <div key={group} className="mb-8 last:mb-0">
          <h3 className="font-serif text-lg font-semibold text-primary mb-4">
            {group}
          </h3>
          <div className="flex flex-wrap gap-3">
            {items.map(({ name, color }) => (
              <span
                key={name}
                className={`skill-pill px-4 py-2 rounded-full text-sm font-medium ${color}`}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </Reveal>
  );
}
