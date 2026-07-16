import { Person, Relationship } from "@/types";

/**
 * Đời (generation) là dữ liệu ĐỘNG, tính theo gốc hiển thị — không lưu trong .md.
 *
 * Quy ước: gốc = đời 1; con (ruột hoặc nuôi) = đời cha/mẹ + 1; vợ/chồng cùng đời
 * với người kết hôn. Người không nối được tới gốc sẽ không có trong map.
 */
export function computeGenerationMap(
  rootId: string | null | undefined,
  persons: Person[],
  relationships: Relationship[],
): Map<string, number> {
  const gen = new Map<string, number>();
  if (!rootId) return gen;

  const ids = new Set(persons.map((p) => p.id));
  if (!ids.has(rootId)) return gen;

  const childrenOf = new Map<string, string[]>();
  const spousesOf = new Map<string, string[]>();
  const push = (m: Map<string, string[]>, k: string, v: string) => {
    const list = m.get(k);
    if (list) list.push(v);
    else m.set(k, [v]);
  };
  for (const r of relationships) {
    if (r.type === "biological_child" || r.type === "adopted_child") {
      push(childrenOf, r.person_a, r.person_b);
    } else if (r.type === "marriage") {
      push(spousesOf, r.person_a, r.person_b);
      push(spousesOf, r.person_b, r.person_a);
    }
  }

  // BFS: vợ/chồng cùng đời (không tăng), con tăng 1 đời. first-write-wins.
  gen.set(rootId, 1);
  const queue: string[] = [rootId];
  while (queue.length) {
    const id = queue.shift()!;
    const level = gen.get(id)!;
    for (const sp of spousesOf.get(id) ?? []) {
      if (!gen.has(sp)) {
        gen.set(sp, level);
        queue.push(sp);
      }
    }
    for (const ch of childrenOf.get(id) ?? []) {
      if (!gen.has(ch)) {
        gen.set(ch, level + 1);
        queue.push(ch);
      }
    }
  }
  return gen;
}

/**
 * Chọn gốc mặc định của cả cây: người không là con ai, không phải dâu/rể,
 * sinh sớm nhất (thủy tổ). Có fallback để không bao giờ trả về rỗng khi có dữ liệu.
 */
export function resolveDefaultRootId(
  persons: Person[],
  relationships: Relationship[],
): string | null {
  if (persons.length === 0) return null;

  const childIds = new Set(
    relationships
      .filter(
        (r) => r.type === "biological_child" || r.type === "adopted_child",
      )
      .map((r) => r.person_b),
  );

  const byBirth = (a: Person, b: Person) =>
    (a.birth_year ?? Infinity) - (b.birth_year ?? Infinity);

  const roots = persons.filter((p) => !childIds.has(p.id));
  const patriarchs = roots.filter((p) => !p.is_in_law);
  if (patriarchs.length > 0) return [...patriarchs].sort(byBirth)[0].id;
  if (roots.length > 0) return [...roots].sort(byBirth)[0].id;
  return persons[0].id;
}
