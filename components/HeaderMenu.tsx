"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart2,
  ChevronDown,
  GitMerge,
  Info,
  LayoutDashboard,
  Menu,
  Network,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { routes } from "@/lib/routes";

// Mỗi mục một icon riêng — `Network` để dành cho "Cây gia phả" cho khớp với thẻ
// tương ứng ở Bảng điều khiển (DashboardLaunchpad).
const links = [
  { href: routes.familyTree.root, label: "Bảng điều khiển", icon: LayoutDashboard },
  { href: routes.familyTree.members, label: "Cây gia phả", icon: Network },
  { href: routes.familyTree.add, label: "Tạo thành viên mới", icon: UserPlus },
  { href: routes.familyTree.kinship, label: "Tra cứu danh xưng", icon: GitMerge },
  { href: routes.familyTree.stats, label: "Thống kê", icon: BarChart2 },
  { href: routes.familyTree.about, label: "Giới thiệu", icon: Info },
];

export default function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 pl-3 pr-3 py-1.5 rounded-full hover:bg-stone-100 transition-all duration-200 border border-transparent hover:border-stone-200"
      >
        <Menu className="size-5 text-stone-600" />
        <ChevronDown
          className={`size-4 text-stone-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-56 bg-surface rounded-3xl shadow-soft border border-border py-2 z-50 overflow-hidden"
          >
            <div className="py-1">
              {links.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-stone-700 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                >
                  <Icon className="size-4" />
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
