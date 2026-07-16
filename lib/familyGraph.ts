import { load as yamlLoad } from "js-yaml";
import { Person, Relationship, Gender } from "@/types";
import {
  computeGenerationMap,
  resolveDefaultRootId,
} from "@/utils/generationHelpers";

/**
 * Pure (fs-free) data layer: turn a list of Markdown files into the
 * `{ persons, relationships }` shape the UI expects.
 *
 * Dùng chung cho cả server (build-time, `lib/familyData.ts` đọc bằng Node fs) và
 * client (runtime, nạp từ tệp `.zip` người dùng chọn). Vì vậy KHÔNG import `fs`
 * ở đây.
 */

const FIXED_TS = "1970-01-01T00:00:00.000Z";

export interface RawFile {
  /** Tên tệp, ví dụ "nguyen-dinh-loc.md" — dùng suy `id` khi frontmatter thiếu. */
  name: string;
  content: string;
}

interface Frontmatter {
  id?: string;
  name?: string;
  gender?: string;
  birth?: string | number;
  death?: string | number;
  death_lunar?: string | number;
  birth_order?: number;
  in_law?: boolean;
  deceased?: boolean;
  other_names?: string;
  avatar?: string;
  note?: string;
  parents?: string[]; // [fatherId, motherId]
  spouses?: string[];
  adopted_parents?: string[];
}

interface DateParts {
  y: number | null;
  m: number | null;
  d: number | null;
}

function toDateParts(value: string | number | undefined): DateParts {
  if (value == null || value === "") return { y: null, m: null, d: null };
  const s = String(value).trim();
  const iso = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (iso) return { y: +iso[1], m: +iso[2], d: +iso[3] };
  const dmy = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (dmy) return { y: +dmy[3], m: +dmy[2], d: +dmy[1] };
  const year = s.match(/\d{4}/);
  return { y: year ? +year[0] : null, m: null, d: null };
}

/** Lunar death like "YYYY-MM-DD" or "MM-DD" (year optional). */
function toLunarParts(value: string | number | undefined): DateParts {
  if (value == null || value === "") return { y: null, m: null, d: null };
  const s = String(value).trim();
  const full = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (full) return { y: +full[1], m: +full[2], d: +full[3] };
  const md = s.match(/^(\d{1,2})-(\d{1,2})$/);
  if (md) return { y: null, m: +md[1], d: +md[2] };
  return { y: null, m: null, d: null };
}

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v)).filter(Boolean);
  if (value == null || value === "") return [];
  return [String(value)];
}

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

function parseFile(raw: string): { data: Frontmatter; body: string } {
  const match = FRONTMATTER_RE.exec(raw);
  if (!match) return { data: {}, body: raw };
  const data = (yamlLoad(match[1]) as Frontmatter) ?? {};
  return { data, body: (match[2] ?? "").trim() };
}

function normalizeGender(g: string | undefined): Gender {
  if (g === "male" || g === "female" || g === "other") return g;
  return "other";
}

/** id suy từ frontmatter `id`, nếu thiếu thì lấy tên tệp bỏ đuôi `.md`. */
function fileId(name: string, data: Frontmatter): string {
  return (data.id ? String(data.id) : name.replace(/\.md$/i, "")).trim();
}

export function buildFamilyGraph(rawFiles: RawFile[]): {
  persons: Person[];
  relationships: Relationship[];
} {
  const persons: Person[] = [];
  const ids = new Set<string>();

  for (const file of rawFiles) {
    const { data, body } = parseFile(file.content);
    const id = fileId(file.name, data);
    if (!id || ids.has(id)) continue;
    ids.add(id);

    const birth = toDateParts(data.birth);
    const death = toDateParts(data.death);
    const lunar = toLunarParts(data.death_lunar);
    const hasDeath = death.y != null || lunar.m != null;

    persons.push({
      id,
      full_name: data.name ? String(data.name) : id,
      gender: normalizeGender(data.gender),
      birth_year: birth.y,
      birth_month: birth.m,
      birth_day: birth.d,
      death_year: death.y,
      death_month: death.m,
      death_day: death.d,
      death_lunar_year: lunar.y,
      death_lunar_month: lunar.m,
      death_lunar_day: lunar.d,
      avatar_url: data.avatar ? String(data.avatar) : null,
      note: data.note != null ? String(data.note) : body || null,
      is_deceased: data.deceased != null ? Boolean(data.deceased) : hasDeath,
      is_in_law: Boolean(data.in_law),
      birth_order: data.birth_order ?? null,
      generation: null, // đời tính động ở dưới (từ thủy tổ), không đọc từ .md
      other_names: data.other_names != null ? String(data.other_names) : null,
      created_at: FIXED_TS,
      updated_at: FIXED_TS,
    });
  }

  // Build relationship edges from parents / spouses / adopted_parents.
  const relMap = new Map<string, Relationship>();
  const addRel = (
    type: Relationship["type"],
    person_a: string,
    person_b: string,
  ) => {
    if (!ids.has(person_a) || !ids.has(person_b) || person_a === person_b)
      return;
    // Marriage is symmetric — dedupe regardless of order.
    const key =
      type === "marriage"
        ? `marriage:${[person_a, person_b].sort().join("-")}`
        : `${type}:${person_a}-${person_b}`;
    if (relMap.has(key)) return;
    relMap.set(key, {
      id: key,
      type,
      person_a,
      person_b,
      created_at: FIXED_TS,
      updated_at: FIXED_TS,
    });
  };

  for (const file of rawFiles) {
    const { data } = parseFile(file.content);
    const childId = fileId(file.name, data);
    for (const parentId of asStringArray(data.parents)) {
      addRel("biological_child", parentId, childId);
    }
    for (const parentId of asStringArray(data.adopted_parents)) {
      addRel("adopted_child", parentId, childId);
    }
    for (const spouseId of asStringArray(data.spouses)) {
      addRel("marriage", childId, spouseId);
    }
  }

  const relationships = [...relMap.values()];

  // Đời "tuyệt đối" tính từ thủy tổ (gốc mặc định) — dùng cho thống kê, danh xưng,
  // trang chi tiết đứng một mình. Trang cây sẽ tính lại theo gốc đang chọn.
  const defaultRoot = resolveDefaultRootId(persons, relationships);
  const genMap = computeGenerationMap(defaultRoot, persons, relationships);
  for (const p of persons) p.generation = genMap.get(p.id) ?? null;

  return { persons, relationships };
}
