import { Layers, User, Zap } from "lucide-react";
import Image from "next/image";
import Reveal from "@/components/portfolio/Reveal";
import { asset } from "@/lib/asset";
import { profile } from "@/lib/portfolio";

export default function AboutSection() {
  return (
    <Reveal
      id="about"
      className="bg-surface rounded-3xl shadow-soft mx-6 mb-6 p-8 md:mx-12"
    >
      <h2 className="font-serif text-2xl font-bold text-primary flex items-center gap-2.5 mb-6">
        <User className="size-5 text-tertiary" />
        About me
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          {profile.about.map((para) => (
            <p
              key={para.slice(0, 24)}
              className="text-secondary leading-relaxed mb-5"
            >
              {para}
            </p>
          ))}

          <div className="grid gap-3 sm:grid-cols-2 mt-6">
            <div className="bg-amber-50 rounded-xl p-4">
              <p className="font-semibold text-sm text-amber-800 flex items-center gap-1.5 mb-1.5">
                <Zap className="size-3.5" />
                Philosophy
              </p>
              <p className="text-secondary text-sm">{profile.philosophy}</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4">
              <p className="font-semibold text-sm text-amber-800 flex items-center gap-1.5 mb-1.5">
                <Layers className="size-3.5" />
                Stack
              </p>
              <p className="text-secondary text-sm">{profile.stack}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center md:justify-end items-start order-first md:order-none">
          <div className="size-40 rounded-full overflow-hidden border-4 border-amber-200/50 shadow-lg shrink-0">
            <Image
              src={asset(profile.avatar)}
              alt={profile.name}
              width={320}
              height={320}
              className="size-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
