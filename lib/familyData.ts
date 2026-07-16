import fs from "fs";
import path from "path";
import { Person, Relationship } from "@/types";
import { buildFamilyGraph, type RawFile } from "@/lib/familyGraph";

/**
 * Build-time data layer.
 *
 * Mỗi thành viên là một file Markdown trong `data/members/*.md`. Ở đây đọc bằng
 * Node `fs` rồi giao cho `buildFamilyGraph` (thuần, không fs) parse thành
 * `{ persons, relationships }`. Cùng hàm đó được tái dùng ở client khi người dùng
 * nạp dữ liệu từ tệp `.zip` (xem `context/FamilyDataProvider.tsx`).
 */

const MEMBERS_DIR = path.join(process.cwd(), "data", "members");

let cache: { persons: Person[]; relationships: Relationship[] } | null = null;
let rawCache: RawFile[] | null = null;

/** Nội dung thô các file `.md` bundle — dùng làm dữ liệu nền cho client merge. */
export function getFamilyRawFiles(): RawFile[] {
  if (rawCache) return rawCache;
  rawCache = fs.existsSync(MEMBERS_DIR)
    ? fs
        .readdirSync(MEMBERS_DIR)
        .filter((f) => f.endsWith(".md"))
        .map((name) => ({
          name,
          content: fs.readFileSync(path.join(MEMBERS_DIR, name), "utf8"),
        }))
    : [];
  return rawCache;
}

export function getFamilyData(): {
  persons: Person[];
  relationships: Relationship[];
} {
  if (cache) return cache;
  cache = buildFamilyGraph(getFamilyRawFiles());
  return cache;
}

export function getMemberIds(): string[] {
  return getFamilyData().persons.map((p) => p.id);
}

export function getPersonById(id: string): Person | undefined {
  return getFamilyData().persons.find((p) => p.id === id);
}
