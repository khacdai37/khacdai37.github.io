import type { Metadata } from "next";
import DashboardHeader from "@/components/DashboardHeader";
import { UserProvider } from "@/components/UserProvider";
import { FamilyDataProvider } from "@/context/FamilyDataProvider";
import { getFamilyData, getFamilyRawFiles } from "@/lib/familyData";
import config from "@/app/config";
import React from "react";

// Các trang con tự đặt title riêng; đây là mặc định cho subtree (launchpad,
// /about) thay vì rơi về title portfolio tiếng Anh ở root.
export const metadata: Metadata = {
  title: config.siteName,
  description:
    "Ứng dụng xem gia phả dòng họ — dữ liệu Markdown, nạp từ tệp .zip ngay trên trình duyệt.",
};

export default function FamilyTreeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Dữ liệu nền (bundle) làm state khởi tạo; client merge dữ liệu nạp từ tệp
  // .zip (cache IndexedDB) lên trên. Provider bọc cả subtree gia phả — kể cả
  // ./about — nên các trang portfolio ở ngoài không phải tải bundle này.
  //
  // `lang="vi"`: root layout đặt <html lang="en"> cho portfolio; nội dung dưới
  // đây là tiếng Việt.
  return (
    <FamilyDataProvider
      initialData={getFamilyData()}
      initialFiles={getFamilyRawFiles()}
    >
      <UserProvider>
        <div
          lang="vi"
          className="min-h-screen bg-neutral text-primary flex flex-col font-sans"
        >
          <DashboardHeader />
          {children}
        </div>
      </UserProvider>
    </FamilyDataProvider>
  );
}
