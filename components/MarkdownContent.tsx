"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Render Markdown thuần (nội dung `about.md` người dùng nạp từ tệp `.zip`).
 *
 * `react-markdown` mặc định BỎ QUA raw HTML — cố ý giữ vậy: tệp `.zip` có thể do
 * người khác gửi, không nên cho phép chèn thẻ/script tuỳ ý. Style xem
 * `.markdown-body` trong `app/globals.css`.
 */
export default function MarkdownContent({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <div className={`markdown-body ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
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
