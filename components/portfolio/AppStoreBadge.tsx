/**
 * Badge chính chủ của Apple. Ảnh lấy từ CDN marketing của Apple — cố ý dùng
 * <img> thường thay vì next/image: `images.unoptimized` nên next/image không
 * thêm gì, mà lại bắt khai width/height cứng cho một ảnh chỉ cần cao 40px.
 */
export default function AppStoreBadge({
  url,
  height = 40,
}: {
  url: string;
  height?: number;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block transition-opacity hover:opacity-75"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us"
        alt="Download on the App Store"
        style={{ height }}
        className="w-auto block"
      />
    </a>
  );
}
