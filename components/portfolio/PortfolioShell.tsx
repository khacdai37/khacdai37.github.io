"use client";

import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import Sidebar from "@/components/portfolio/Sidebar";

export default function PortfolioShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  // Khoá cuộn nền khi sidebar mobile đang mở.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="md:hidden fixed top-4 left-4 z-[200] bg-surface border border-border rounded-lg p-1.5 shadow-sm"
      >
        <Menu className="size-5 text-primary" />
      </button>

      {/* Overlay chỉ tồn tại khi mở — không chặn click lúc đóng. */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="md:hidden fixed inset-0 bg-black/25 z-[90]"
          role="presentation"
        />
      )}

      <Sidebar open={open} onNavigate={() => setOpen(false)} />

      <div className="portfolio-main">{children}</div>
    </>
  );
}
