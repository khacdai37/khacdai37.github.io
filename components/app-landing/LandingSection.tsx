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
          <p className="mb-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-tertiary">
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
