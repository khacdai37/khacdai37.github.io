"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Info, ShieldAlert, Users } from "lucide-react";
import Link from "next/link";
import MarkdownContent from "@/components/MarkdownContent";
import { useFamilyData } from "@/context/FamilyDataProvider";
import { routes } from "@/lib/routes";

export default function AboutPage() {
  // Nội dung "Về dòng họ" đến từ `about.md` trong tệp .zip đã nạp (nếu có).
  const { about } = useFamilyData();

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9] selection:bg-amber-200 selection:text-amber-900 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none"></div>

      <Link
        href={routes.familyTree.root}
        className="btn absolute top-6 left-6 z-20"
      >
        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
        Quay lại
      </Link>

      <div className="flex-1 flex flex-col justify-center items-center px-4 py-20 relative z-10 w-full mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="max-w-3xl w-full"
        >
          {about && (
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-stone-200 mb-8 mt-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-100/50 text-amber-700 rounded-2xl">
                  <Users className="size-6" />
                </div>
                <h1 className="title">Về dòng họ</h1>
              </div>
              <MarkdownContent>{about}</MarkdownContent>
            </div>
          )}

          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-stone-200 mb-8 mt-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-amber-100/50 text-amber-700 rounded-2xl">
                <Info className="size-6" />
              </div>
              <h1 className="title">Giới thiệu</h1>
            </div>

            <div className="max-w-none">
              <p className="text-stone-600 leading-relaxed text-[15px] mb-8">
                Đây là ứng dụng xem <strong className="text-stone-800">gia
                phả dòng họ</strong>. Mỗi thành viên được lưu trong một file
                Markdown (<code className="bg-stone-100 px-1 py-0.5 rounded text-[13px]">.md</code>);
                ứng dụng đọc dữ liệu và dựng sơ đồ cây, tra cứu danh xưng và
                thống kê. Mục tiêu là gìn giữ và truyền lại thông tin cội nguồn
                một cách trực quan và bền vững.
              </p>

              <div className="mt-8 mb-4 border-t border-stone-100 pt-8 flex items-center gap-3">
                <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
                  <ShieldAlert className="size-5" />
                </div>
                <h2 className="text-xl font-bold text-stone-900">
                  Dữ liệu & Quyền riêng tư
                </h2>
              </div>

              <div className="bg-stone-50 border border-stone-200/60 rounded-2xl p-6 text-[14.5px] leading-relaxed">
                <ul className="space-y-4 text-stone-600 list-disc pl-5">
                  <li>
                    <strong className="text-stone-800">
                      Toàn bộ dữ liệu nằm trong các file Markdown
                    </strong>{" "}
                    của chính bạn, đi kèm mã nguồn. Không có cơ sở dữ liệu, không
                    cần đăng nhập.
                  </li>
                  <li>
                    <strong className="text-stone-800">
                      Không thu thập dữ liệu:
                    </strong>{" "}
                    không analytics, không tracking, không telemetry.
                  </li>
                  <li>
                    <strong className="text-stone-800">Chỉ đọc:</strong> ứng dụng
                    hiển thị thông tin; muốn cập nhật, bạn sửa trực tiếp các file{" "}
                    <code className="bg-white border border-stone-200 px-1 py-0.5 rounded text-[13px] text-amber-700">
                      .md
                    </code>{" "}
                    rồi build lại.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
