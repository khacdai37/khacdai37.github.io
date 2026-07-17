import { Solar } from "lunar-javascript";
import type { Gender } from "@/types";

/**
 * Client-side helpers to turn "add member" form drafts into `.md` files.
 * The output frontmatter matches the keys parsed in lib/familyData.ts so the
 * generated files round-trip through the build.
 */

export interface MemberDraft {
  id: string;
  name: string;
  other_names: string;
  gender: Gender;
  birth: string;
  death: string;
  is_in_law: boolean;
  birth_order: string;
  avatar: string;
  note: string;
  fatherId: string;
  motherId: string;
  spouses: string; // comma-separated ids
}

export function emptyDraft(): MemberDraft {
  return {
    id: "",
    name: "",
    other_names: "",
    gender: "male",
    birth: "",
    death: "",
    is_in_law: false,
    birth_order: "",
    avatar: "",
    note: "",
    fatherId: "",
    motherId: "",
    spouses: "",
  };
}

/** Vietnamese-aware slug: bỏ dấu, kebab-case. */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Digits appended to an id from a birth value: ddmmyyyy, or yyyy, or "". */
function birthSuffix(birth: string): string {
  const s = birth.trim();
  const iso = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (iso) {
    const [, y, m, d] = iso;
    return `${d.padStart(2, "0")}${m.padStart(2, "0")}${y}`;
  }
  const dmy = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (dmy) {
    const [, d, m, y] = dmy;
    return `${d.padStart(2, "0")}${m.padStart(2, "0")}${y}`;
  }
  const year = s.match(/\d{4}/);
  return year ? year[0] : "";
}

/** Gợi ý id từ tên + ngày sinh, ví dụ "nguyen-van-a-09101990". */
export function suggestId(name: string, birth: string): string {
  const base = slugify(name);
  const suffix = birthSuffix(birth);
  if (!base) return "";
  return suffix ? `${base}-${suffix}` : base;
}

/** Ngày giỗ âm lịch từ ngày mất dương đầy đủ (dd/mm/yyyy hoặc yyyy-mm-dd) → "YYYY-M-D" | null. */
export function computeLunarDeath(death: string): string | null {
  const s = death.trim();
  const dmy = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  const iso = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  let y: number, m: number, d: number;
  if (dmy) {
    [, d, m, y] = dmy.map(Number) as [number, number, number, number];
  } else if (iso) {
    [, y, m, d] = iso.map(Number) as [number, number, number, number];
  } else {
    return null;
  }
  try {
    const lunar = Solar.fromYmd(y, m, d).getLunar();
    return `${lunar.getYear()}-${Math.abs(lunar.getMonth())}-${lunar.getDay()}`;
  } catch {
    return null;
  }
}

/** yyyyMMddHHmmss */
export function formatStamp(date: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return (
    `${date.getFullYear()}${p(date.getMonth() + 1)}${p(date.getDate())}` +
    `${p(date.getHours())}${p(date.getMinutes())}${p(date.getSeconds())}`
  );
}

const q = (s: string) => JSON.stringify(s);
const arr = (a: string[]) => `[${a.map(q).join(", ")}]`;

/** Serialize a draft into `.md` text (frontmatter + note body). */
export function draftToMarkdown(d: MemberDraft): string {
  const lines: string[] = [];
  lines.push(`id: ${q(d.id.trim())}`);
  lines.push(`name: ${q(d.name.trim())}`);
  lines.push(`gender: ${q(d.gender)}`);

  if (d.other_names.trim()) lines.push(`other_names: ${q(d.other_names.trim())}`);
  // Always quote dates so YAML doesn't coerce them into a Date. Form nhập theo
  // dd/mm/yyyy; buildFamilyGraph.toDateParts đọc được cả dd/mm/yyyy lẫn yyyy-mm-dd.
  if (d.birth.trim()) lines.push(`birth: ${q(d.birth.trim())}`);
  if (d.death.trim()) lines.push(`death: ${q(d.death.trim())}`);

  const lunar = computeLunarDeath(d.death);
  if (lunar) lines.push(`death_lunar: ${q(lunar)}`);

  // is_deceased is derived at load time from the presence of a death date, so
  // we don't write it here. `generation` is a computed value (later version).
  if (d.is_in_law) lines.push(`in_law: true`);
  if (d.birth_order.trim()) lines.push(`birth_order: ${Number(d.birth_order)}`);
  if (d.avatar.trim()) lines.push(`avatar: ${q(d.avatar.trim())}`);

  const parents = [d.fatherId, d.motherId].map((s) => s.trim()).filter(Boolean);
  if (parents.length) lines.push(`parents: ${arr(parents)}`);

  const spouses = d.spouses
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (spouses.length) lines.push(`spouses: ${arr(spouses)}`);

  const body = d.note.trim();
  return `---\n${lines.join("\n")}\n---\n${body ? `\n${body}\n` : ""}`;
}
