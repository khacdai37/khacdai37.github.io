"use client";

import Link from "next/link";
import { useRef } from "react";
import { useFamilyData } from "@/context/FamilyDataProvider";
import { routes } from "@/lib/routes";
import {
  AlertCircle,
  ArrowRight,
  BarChart2,
  FolderUp,
  GitMerge,
  Info,
  Loader2,
  Network,
  Trash2,
  UserPlus,
} from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  bgColor: string;
  borderColor: string;
  hoverColor: string;
}

// Các mục cần có dữ liệu mới hiển thị (sau khi "Thêm thành viên").
const gatedFeatures: Feature[] = [
  {
    title: "Cây gia phả",
    description: "Xem và tương tác với sơ đồ dòng họ",
    icon: <Network className="size-8 text-amber-600" />,
    href: routes.familyTree.members,
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200/60",
    hoverColor: "hover:border-amber-400 hover:shadow-amber-100",
  },
  {
    title: "Tạo thành viên mới",
    description: "Nhập thông tin, tải về file .md (.zip)",
    icon: <UserPlus className="size-8 text-emerald-600" />,
    href: routes.familyTree.add,
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200/60",
    hoverColor: "hover:border-emerald-400 hover:shadow-emerald-100",
  },
  {
    title: "Tra cứu danh xưng",
    description: "Hệ thống gọi tên họ hàng chuẩn xác",
    icon: <GitMerge className="size-8 text-blue-600" />,
    href: routes.familyTree.kinship,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200/60",
    hoverColor: "hover:border-blue-400 hover:shadow-blue-100",
  },
  {
    title: "Thống kê gia phả",
    description: "Tổng quan dữ liệu và biểu đồ phân tích",
    icon: <BarChart2 className="size-8 text-purple-600" />,
    href: routes.familyTree.stats,
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200/60",
    hoverColor: "hover:border-purple-400 hover:shadow-purple-100",
  },
];

const aboutFeature: Feature = {
  title: "Giới thiệu",
  description: "Thông tin về ứng dụng và dữ liệu gia phả",
  icon: <Info className="size-8 text-stone-600" />,
  href: routes.familyTree.about,
  bgColor: "bg-stone-50",
  borderColor: "border-stone-200/60",
  hoverColor: "hover:border-stone-400 hover:shadow-stone-100",
};

function FeatureLink({ f }: { f: Feature }) {
  return (
    <Link
      href={f.href}
      className={`group card-feature flex items-center gap-5 border ${f.borderColor} ${f.hoverColor} transition-all duration-300 hover:-translate-y-1`}
    >
      <div
        className={`shrink-0 size-16 rounded-2xl ${f.bgColor} flex items-center justify-center`}
      >
        {f.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-bold text-stone-800 group-hover:text-amber-800 transition-colors">
          {f.title}
        </h2>
        <p className="text-sm text-stone-500">{f.description}</p>
      </div>
      <ArrowRight className="size-5 text-stone-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
    </Link>
  );
}

export default function DashboardLaunchpad() {
  const { persons, status, error, sourceName, importZip, clearImported } =
    useFamilyData();
  const inputRef = useRef<HTMLInputElement>(null);
  const hasData = persons.length > 0;
  const loading = status === "loading";

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) await importZip(file);
  };

  return (
    <div className="flex-1 w-full relative flex flex-col">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <div className="mb-8">
          <h1 className="title">Bảng điều khiển</h1>
          <p className="text-stone-500 mt-1 text-sm">
            {hasData
              ? `Gia phả gồm ${persons.length} thành viên. Chọn một mục để bắt đầu.`
              : "Chưa có dữ liệu — bắt đầu bằng “Thêm thành viên” (chọn tệp .zip)."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Thêm thành viên = nạp dữ liệu từ tệp .zip (luôn hiển thị, ưu tiên) */}
          <input
            ref={inputRef}
            type="file"
            accept=".zip,application/zip"
            onChange={onPick}
            className="hidden"
          />
          <button
            onClick={() => inputRef.current?.click()}
            disabled={loading}
            className="group card-feature flex items-center gap-5 border border-emerald-300/70 hover:border-emerald-400 hover:shadow-emerald-100 transition-all duration-300 hover:-translate-y-1 text-left disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <div className="shrink-0 size-16 rounded-2xl bg-emerald-50 flex items-center justify-center">
              {loading ? (
                <Loader2 className="size-8 text-emerald-600 animate-spin" />
              ) : (
                <FolderUp className="size-8 text-emerald-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-stone-800 group-hover:text-emerald-800 transition-colors">
                Thêm thành viên
              </h2>
              <p className="text-sm text-stone-500">
                {loading
                  ? "Đang đọc dữ liệu…"
                  : "Chọn tệp .zip dữ liệu gia phả từ máy"}
              </p>
              {sourceName && !loading && (
                <p className="mt-1.5 flex items-center gap-2 text-xs text-emerald-700">
                  <span className="max-w-[10rem] truncate font-medium" title={sourceName}>
                    {sourceName}
                  </span>
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      clearImported();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.stopPropagation();
                        e.preventDefault();
                        clearImported();
                      }
                    }}
                    className="inline-flex items-center gap-1 text-emerald-700/80 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="size-3.5" />
                    Xoá
                  </span>
                </p>
              )}
              {status === "error" && error && (
                <p className="mt-1.5 flex items-start gap-1.5 text-xs text-red-600">
                  <AlertCircle className="size-4 shrink-0 mt-px" />
                  {error}
                </p>
              )}
            </div>
          </button>

          {/* Các mục còn lại: chỉ hiển thị khi đã có dữ liệu */}
          {hasData &&
            gatedFeatures.map((f) => <FeatureLink key={f.href} f={f} />)}

          <FeatureLink f={aboutFeature} />
        </div>
      </main>
    </div>
  );
}
