import AddMembersForm from "@/components/AddMembersForm";

export const metadata = {
  title: "Tạo thành viên mới",
};

export default function AddMemberPage() {
  return (
    <div className="flex-1 w-full relative flex flex-col pb-12">
      <div className="w-full relative z-20 py-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="title">Tạo thành viên mới</h1>
        <p className="text-stone-500 mt-1 text-sm">
          Nhập thông tin rồi tải về file <code>.md</code> (dạng .zip). Đây là
          dữ liệu của gia phả.
        </p>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        <AddMembersForm />
      </main>
    </div>
  );
}
