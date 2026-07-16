"use client";

import { Mail } from "lucide-react";
import { Github, Linkedin, Youtube } from "@/components/portfolio/BrandIcons";
import { useState } from "react";
import Reveal from "@/components/portfolio/Reveal";
import { contactSubjects, profile } from "@/lib/portfolio";

// Ghép email lúc CLICK, không phải lúc render. Component này là client component
// nhưng vẫn được SSR lúc `next build`, nên nếu đặt `mailto:${buildEmail()}` vào
// href thì địa chỉ đầy đủ nằm sẵn trong HTML tĩnh và bot nhặt được ngay — tức
// obfuscation vô nghĩa. Giữ nguyên kiểu button + onClick này.
function buildEmail() {
  return `${profile.social.emailUser}@${profile.social.emailDomain}`;
}

const socials = [
  { href: profile.social.github, label: "github.com/khacdai37", icon: Github },
  {
    href: profile.social.linkedin,
    label: "linkedin.com/in/khacdai37",
    icon: Linkedin,
  },
  { href: profile.social.youtube, label: "@khacdai37it", icon: Youtube },
];

export default function ContactSection() {
  const [subject, setSubject] = useState<string>(contactSubjects[0]);
  const [copyLabel, setCopyLabel] = useState("Copy email");

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildEmail());
      setCopyLabel("Copied!");
      setTimeout(() => setCopyLabel("Copy email"), 1500);
    } catch {
      setCopyLabel(buildEmail());
    }
  };

  return (
    <Reveal
      id="contact"
      className="bg-surface rounded-3xl shadow-soft mx-6 mb-6 p-8 md:mx-12"
    >
      <h2 className="font-serif text-2xl font-bold text-primary flex items-center gap-2.5 mb-2">
        <Mail className="size-5 text-tertiary" />
        Get in touch
      </h2>
      <p className="text-secondary mb-6">
        Open to iOS roles, freelance projects, and app collaborations.
      </p>

      <div className="flex flex-col items-start gap-4">
        <div className="flex items-center flex-wrap gap-3">
          <Mail className="size-4 text-tertiary shrink-0" />
          <button
            type="button"
            onClick={() => {
              window.location.href = `mailto:${buildEmail()}?subject=${encodeURIComponent(subject)}`;
            }}
            className="text-tertiary hover:text-amber-800 underline text-sm font-medium"
          >
            Email me
          </button>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            aria-label="Pick a subject"
            className="border border-border rounded-lg px-3 py-1.5 text-sm text-secondary bg-surface focus:outline-none focus:border-tertiary transition-colors"
          >
            {contactSubjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={onCopy}
            className="text-secondary hover:text-primary text-sm underline transition-colors"
          >
            {copyLabel}
          </button>
          <noscript>
            <span className="text-secondary text-sm">
              {profile.social.emailUser} [at] gmail [dot] com
            </span>
          </noscript>
        </div>

        {socials.map(({ href, label, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-secondary hover:text-tertiary transition-colors text-sm"
          >
            <Icon className="size-4" />
            {label}
          </a>
        ))}
      </div>
    </Reveal>
  );
}
