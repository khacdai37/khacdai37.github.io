/**
 * Section kèm hiệu ứng hiện dần.
 *
 * Cố ý dùng CSS animation thay vì framer-motion `whileInView`: cách kia ghi
 * `opacity: 0` thẳng vào HTML render sẵn rồi mới gỡ bằng JS, nên nếu JS/rAF
 * không chạy (bot, no-JS, tab bị throttle) thì **toàn bộ nội dung vô hình**.
 * `.portfolio-reveal` cố tình KHÔNG có animation-fill-mode: ngoài lúc chạy,
 * phần tử giữ style thường — tức là hiện.
 *
 * Là server component (không "use client") nên các section dùng nó cũng ở lại
 * phía server.
 */
export default function Reveal({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`portfolio-reveal ${className}`}>
      {children}
    </section>
  );
}
