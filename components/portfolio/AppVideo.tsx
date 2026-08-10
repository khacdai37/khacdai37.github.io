"use client";

import { useEffect, useRef } from "react";

/**
 * Video giới thiệu app, thay chỗ carousel ảnh trên thẻ ở `/apps`.
 *
 * Chỉ chạy khi thẻ đang nằm trong khung nhìn: `/apps` có nhiều thẻ, để mọi
 * video cùng chạy nền thì tốn băng thông cho thứ người dùng không nhìn. Cộng
 * với `preload="metadata"`, trang không kéo về megabyte nào cho tới khi thẻ
 * thật sự được cuộn tới.
 *
 * `muted` là điều kiện bắt buộc để trình duyệt cho phép tự chạy; `playsInline`
 * để iOS không bung sang trình phát toàn màn hình.
 */
export default function AppVideo({
  src,
  width,
  height,
  label,
}: {
  src: string;
  width: number;
  height: number;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Người dùng đã báo hạn chế chuyển động thì đừng tự chạy — vẫn còn nút play
    // trên thanh điều khiển. Cùng tinh thần với khối prefers-reduced-motion
    // trong globals.css.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // play() có thể bị từ chối (chế độ tiết kiệm pin, chính sách trình duyệt…).
    // Nuốt lỗi: người dùng vẫn bấm play thủ công được.
    const play = () => void el.play().catch(() => {});

    // Observer lo cả hai chiều, kể cả lần chạy đầu: nó luôn phát một callback
    // khởi tạo cho mỗi phần tử được theo dõi, nên video đang hiện sẵn lúc tải
    // trang cũng tự chạy mà không cần gọi play() riêng.
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? play() : el.pause()),
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      width={width}
      height={height}
      aria-label={label}
      muted
      loop
      playsInline
      preload="metadata"
      // `controls` không phải để trang trí: WCAG 2.2.2 đòi phải có cách dừng
      // thứ tự chạy quá 5 giây. Nó cũng là lối để người xem bật tiếng.
      controls
      controlsList="nodownload"
      // `bg-neutral` chứ không phải đen: nền trong video là màu kem, để đen thì
      // khung nháy một nhịp tối trước khi khung hình đầu tiên hiện ra.
      className="mx-auto max-h-[460px] w-auto rounded-2xl border border-border bg-neutral"
    />
  );
}
