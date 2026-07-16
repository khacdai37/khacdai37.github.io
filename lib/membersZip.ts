import type { RawFile } from "@/lib/familyGraph";

/**
 * Đọc một tệp `.zip` người dùng chọn từ máy → dữ liệu gia phả.
 * Chạy hoàn toàn trong trình duyệt (không lên mạng). jszip đã có sẵn trong deps.
 *
 * Cấu trúc `.zip` mong đợi (các file `.md` để phẳng ở gốc vẫn đọc được):
 *
 *     data/
 *       members/*.md    → thành viên
 *       about.md        → nội dung trang Giới thiệu ("Về dòng họ")
 */

export interface ZipContent {
  /** File `.md` của thành viên (theo basename). */
  members: RawFile[];
  /** Nội dung `about.md` nếu có trong tệp (Markdown thuần). */
  about: string | null;
}

/** Rác macOS tạo ra khi nén bằng Finder — bỏ qua kẻo thành "thành viên ma". */
function isJunk(path: string): boolean {
  const base = path.split("/").pop() ?? "";
  return path.startsWith("__MACOSX/") || base.startsWith("._");
}

/** `about.md` = file tên about.md nằm NGOÀI thư mục `members/`. */
function isAbout(path: string): boolean {
  const parts = path.split("/");
  const base = parts.pop() as string;
  return (
    base.toLowerCase() === "about.md" &&
    !parts.some((p) => p.toLowerCase() === "members")
  );
}

export async function readZipFile(file: File): Promise<ZipContent> {
  const JSZip = (await import("jszip")).default;

  let zip;
  try {
    zip = await JSZip.loadAsync(await file.arrayBuffer());
  } catch {
    throw new Error("Tệp không phải .zip hợp lệ hoặc đã hỏng.");
  }

  const entries = Object.values(zip.files).filter(
    (e) => !e.dir && /\.md$/i.test(e.name) && !isJunk(e.name),
  );

  // Gom theo basename; nếu zip có nhiều file trùng tên (khác thư mục) thì file
  // sau ghi đè file trước.
  const byName = new Map<string, RawFile>();
  let about: string | null = null;

  for (const entry of entries) {
    const content = await entry.async("string");
    if (isAbout(entry.name)) {
      about = content;
      continue;
    }
    const base = entry.name.split("/").pop() as string;
    byName.set(base, { name: base, content });
  }

  const members = [...byName.values()];
  if (members.length === 0 && about === null) {
    throw new Error("Trong tệp .zip không có file .md nào.");
  }
  return { members, about };
}

/** Chữ ký nhận dạng một tệp đã chọn (để bỏ qua khi chọn lại đúng tệp cũ). */
export function fileSignature(file: File): string {
  return `${file.name}:${file.size}:${file.lastModified}`;
}
