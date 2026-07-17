"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

/**
 * Render Markdown thuần (nội dung `about.md` người dùng nạp từ tệp `.zip`, hoặc
 * ghi chú thành viên).
 *
 * `react-markdown` mặc định BỎ QUA raw HTML — cố ý giữ vậy: tệp `.zip` có thể do
 * người khác gửi, không nên cho phép chèn thẻ/script tuỳ ý. Style xem
 * `.markdown-body` trong `app/globals.css`.
 *
 * `remark-gfm` tự biến URL/email trần thành link (autolink); đặt `breaks` để
 * xuống dòng đơn `\n` thành `<br>` (giữ nguyên cảm giác của ô ghi chú nhiều dòng,
 * vốn trước đây dùng `whitespace-pre-wrap`).
 */
export default function MarkdownContent({
  children,
  className = "",
  breaks = false,
}: {
  children: string;
  className?: string;
  breaks?: boolean;
}) {
  return (
    <div className={`markdown-body ${className}`}>
      <ReactMarkdown
        remarkPlugins={breaks ? [remarkGfm, remarkBreaks] : [remarkGfm]}
        components={{
          // Link ra ngoài mở tab mới; mailto:/tel:/neo trong trang giữ nguyên.
          a: ({ href, children, ...props }) => {
            const external = /^https?:\/\//i.test(href ?? "");
            return (
              <a
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                {...props}
              >
                {children}
              </a>
            );
          },
          // Bảng rộng tự cuộn ngang thay vì phá vỡ layout trang.
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto">
              <table {...props}>{children}</table>
            </div>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
