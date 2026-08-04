import Image from "next/image";
import AppStoreBadge from "@/components/portfolio/AppStoreBadge";
import { asset } from "@/lib/asset";
import { defaultLocale, type Locale } from "@/lib/i18n";

/**
 * Tô màu nhấn cho phần nằm giữa hai dấu `*` — kiểu tiêu đề có một cụm đổi màu
 * của bản tham khảo. Dùng chuỗi chứ không phải ReactNode để tiêu đề nằm gọn
 * trong file bản dịch; mỗi ngôn ngữ tự chọn cụm nào đáng nhấn.
 */
function renderHeadline(text: string) {
  return text
    .split(/\*(.+?)\*/g)
    .map((part, i) =>
      i % 2 === 1 ? (
        <span key={part} className="text-tertiary">
          {part}
        </span>
      ) : (
        part
      ),
    );
}

/** Hero của trang landing: nội dung trái, ảnh app phải. */
export default function LandingHero({
  pill,
  headline,
  lede,
  meta,
  appStoreUrl,
  locale = defaultLocale,
  image,
}: {
  pill: string;
  headline: string;
  lede: string;
  meta: string;
  appStoreUrl?: string;
  /** Chỉ để lấy badge App Store đúng thứ tiếng — chữ còn lại đã dịch sẵn ở prop. */
  locale?: Locale;
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
            {renderHeadline(headline)}
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-secondary">
            {lede}
          </p>

          {appStoreUrl && (
            <div className="mt-7">
              <AppStoreBadge url={appStoreUrl} height={52} locale={locale} />
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
