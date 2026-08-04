import Image from "next/image";
import AppStoreBadge from "@/components/portfolio/AppStoreBadge";
import { asset } from "@/lib/asset";

/**
 * Hero của trang landing: nội dung trái, ảnh app phải.
 *
 * `headline` nhận ReactNode chứ không phải string để trang gọi tự bọc
 * <span className="text-tertiary"> quanh từ muốn nhấn — đúng kiểu tiêu đề có
 * một từ đổi màu của bản tham khảo.
 */
export default function LandingHero({
  pill,
  headline,
  lede,
  meta,
  appStoreUrl,
  image,
}: {
  pill: string;
  headline: React.ReactNode;
  lede: string;
  meta: string;
  appStoreUrl?: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    /**
     * Ảnh đã lồng sẵn khung điện thoại, nền trong suốt. Khi đó KHÔNG bo góc và
     * viền — cả hai vẽ theo hộp ảnh nên sẽ thành hình chữ nhật quanh vùng trong
     * suốt. `drop-shadow` thì bám theo alpha nên vẫn ôm đúng dáng máy.
     */
    framed?: boolean;
  };
}) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-700">
            <span className="status-dot" />
            {pill}
          </span>

          <h1 className="font-serif text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-primary md:text-5xl">
            {headline}
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-secondary">
            {lede}
          </p>

          {appStoreUrl && (
            <div className="mt-7">
              <AppStoreBadge url={appStoreUrl} height={52} />
            </div>
          )}

          <p className="mt-4 text-sm text-secondary">{meta}</p>
        </div>

        {image && (
          <div className="flex justify-center md:justify-end">
            <Image
              src={asset(image.src)}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority
              className={`portfolio-float max-h-[560px] w-auto ${
                image.framed
                  ? "drop-shadow-xl"
                  : // Viền mảnh để ảnh chụp trần không chảy vào nền surface —
                    // nền trong app cũng là màu kem nhạt.
                    "rounded-3xl border border-border drop-shadow-2xl"
              }`}
            />
          </div>
        )}
      </div>
    </section>
  );
}
