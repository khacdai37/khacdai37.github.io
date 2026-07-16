import yaml from 'js-yaml';
import type { Member } from './types';

/**
 * All member markdown files, read at build time as raw strings.
 * The glob path is resolved relative to the project root by Vite.
 */
const files = import.meta.glob('/data/members/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

function parseFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
  const match = FRONTMATTER_RE.exec(raw);
  if (!match) return { data: {}, body: raw };
  const data = (yaml.load(match[1]) as Record<string, unknown>) ?? {};
  return { data, body: match[2] ?? '' };
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v)).filter(Boolean);
  if (value == null || value === '') return [];
  return [String(value)];
}

function fileNameToId(path: string): string {
  return path.split('/').pop()!.replace(/\.md$/, '');
}

/** Parse every markdown file into a Member, keyed by id. */
export function loadMembers(): Map<string, Member> {
  const map = new Map<string, Member>();

  for (const [path, raw] of Object.entries(files)) {
    const { data, body } = parseFrontmatter(raw);
    const id = (data.id ? String(data.id) : fileNameToId(path)).trim();

    const member: Member = {
      id,
      name: data.name ? String(data.name) : id,
      gender: data.gender ? String(data.gender) : undefined,
      birth: (data.birth as string | number | undefined) ?? undefined,
      death: (data.death as string | number | undefined) ?? undefined,
      photo: data.photo ? String(data.photo) : undefined,
      parents: toStringArray(data.parents),
      spouses: toStringArray(data.spouses),
      body: body.trim(),
    };

    map.set(id, member);
  }

  return map;
}

/** Extract the 4-digit year from a value like 1871, "1871", "1990-10-09". */
export function yearOf(value: string | number | undefined): string {
  if (value == null) return '';
  const s = String(value);
  const match = s.match(/\d{4}/);
  return match ? match[0] : s;
}

/** Compact life span for cards: "1871–1935", "1958–", or "" when unknown. */
export function formatLifespan(m: Member): string {
  const b = yearOf(m.birth);
  const d = yearOf(m.death);
  if (!b && !d) return '';
  return `${b}–${d}`;
}

/**
 * Full date string for the detail panel — returns null for a bare year so we
 * don't show a redundant "Sinh: 1871" next to the "1871–1935" heading.
 */
export function detailedDate(value: string | number | undefined): string | null {
  if (value == null) return null;
  const s = String(value).trim();
  return /^\d{4}$/.test(s) ? null : s;
}
