/**
 * DM Mono (`font-mono`) bỏ trống dải U+1EA0–1EF1 — xem ghi chú font trong
 * CLAUDE.md. Nhãn tiếng Việt đặt vào đó thì ệ/ổ/ư rơi về font hệ thống theo
 * từng ký tự, ra đúng kiểu chữ cao thấp so le. Nhãn nào vượt ra ngoài ASCII
 * phải dùng font sans; kiểm tra theo nội dung chứ không theo ngôn ngữ để nhãn
 * tiếng Anh có dấu (nếu sau này có) cũng được che.
 */
const isAsciiOnly = (text: string) => !/[^\x00-\x7F]/.test(text);

/**
 * Khối section của trang landing: canh giữa, `scroll-mt` chừa chỗ cho nav dính
 * (thiếu nó thì anchor nhảy tới sẽ bị nav che mất tiêu đề).
 */
export default function LandingSection({
  id,
  eyebrow,
  title,
  lede,
  tone = "plain",
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  lede?: string;
  /** `surface` = nền trắng để tách khỏi nền `neutral` của body. */
  tone?: "plain" | "surface";
  children?: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-16 ${tone === "surface" ? "border-y border-border bg-surface" : ""}`}
    >
      <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
        {eyebrow && (
          <p
            className={`mb-2.5 text-[11px] uppercase text-tertiary ${
              isAsciiOnly(eyebrow)
                ? "font-mono font-medium tracking-[0.08em]"
                : // Sans hẹp hơn mono ở cùng cỡ chữ, nên nới tracking và tăng
                  // weight để nhãn hai thứ tiếng nhìn cùng một sức nặng.
                  "font-sans font-semibold tracking-[0.13em]"
            }`}
          >
            {eyebrow}
          </p>
        )}
        <h2 className="font-serif text-2xl font-bold leading-tight text-primary md:text-3xl">
          {title}
        </h2>
        {lede && (
          <p className="mt-3 max-w-2xl leading-relaxed text-secondary">
            {lede}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
