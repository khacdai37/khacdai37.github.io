import Image from "next/image";
import { asset } from "@/lib/asset";

export interface LandingStep {
  title: string;
  body: string;
  /** Ảnh chụp màn hình minh hoạ bước này. Thiếu ⇒ bước chỉ có chữ. */
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    /** Đã lồng sẵn khung điện thoại, nền trong suốt — xem `LandingHero`. */
    framed?: boolean;
  };
}

/** Các bước "cách dùng" — `<ol>` để thứ tự nằm ở ngữ nghĩa, không chỉ ở số hiển thị. */
export default function StepList({ steps }: { steps: LandingStep[] }) {
  return (
    <ol className="grid gap-8 sm:grid-cols-3">
      {steps.map((s, i) => (
        // `flex-col` + `mt-auto` ở khối ảnh: mô tả các bước dài ngắn khác nhau,
        // để mặc định thì ảnh mỗi cột bắt đầu ở một độ cao khác nhau.
        <li key={s.title} className="flex flex-col">
          <span
            aria-hidden
            className="mb-3.5 grid size-9 place-items-center rounded-full bg-amber-50 font-mono text-sm font-semibold text-tertiary ring-1 ring-amber-200"
          >
            {i + 1}
          </span>
          <h3 className="mb-1.5 font-serif text-base font-bold text-primary">
            {s.title}
          </h3>
          <p className="text-sm leading-relaxed text-secondary">{s.body}</p>

          {s.image && (
            // Ảnh chụp iPhone dựng đứng: giới hạn bề ngang để 3 cột không bị
            // đẩy cao quá, và bo góc cho khớp bo góc màn hình thật.
            <div className="mt-auto flex justify-center pt-5">
              <Image
                src={asset(s.image.src)}
                alt={s.image.alt}
                width={s.image.width}
                height={s.image.height}
                sizes="(max-width: 640px) 60vw, 240px"
                className={`w-full ${
                  s.image.framed
                    ? // Khung máy đã ăn mất phần lề hai bên nên cho rộng hơn
                      // ảnh trần, để màn hình bên trong không bị bé quá.
                      "max-w-[215px]"
                    : "max-w-[190px] rounded-[18px] border border-border shadow-soft"
                }`}
              />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
