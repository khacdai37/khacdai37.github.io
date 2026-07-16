import MemberDetailContent from "@/context/MemberDetailContent";
import { getFamilyData, getPersonById } from "@/lib/familyData";
import { routes } from "@/lib/routes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Pre-render one static page per member build sẵn (bundle). `output: export` đòi
// route động phải có tối thiểu 1 path, nên khi bundle rỗng ta trả 1 id giữ chỗ
// (sẽ ra trang "không tìm thấy"). Thành viên chỉ-trong-tệp .zip xem qua modal,
// không có trang tĩnh riêng — `dynamicParams = false` để export biết tập là trọn vẹn.
export const dynamicParams = false;

export function generateStaticParams() {
  const params = getFamilyData().persons.map((p) => ({ id: p.id }));
  return params.length > 0 ? params : [{ id: "khong-co-du-lieu" }];
}

export default async function MemberDetailPage({ params }: PageProps) {
  const { id } = await params;
  const person = getPersonById(id);

  if (!person) {
    notFound();
  }

  return (
    <div className="flex-1 w-full relative flex flex-col pb-8">
      <div className="w-full relative z-20 py-4 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href={routes.familyTree.members}
            className="p-2 -ml-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-colors"
            title="Quay lại cây gia phả"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <h1 className="title">Chi Tiết Thành Viên</h1>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 relative z-10 w-full flex-1">
        <div className="bg-white/60 rounded-2xl shadow-sm border border-stone-200/60 overflow-hidden hover:shadow-md transition-shadow duration-300">
          <MemberDetailContent
            person={person}
            privateData={null}
            isAdmin={false}
          />
        </div>
      </main>
    </div>
  );
}
