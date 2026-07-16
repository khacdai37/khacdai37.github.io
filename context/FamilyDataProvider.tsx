"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Person, Relationship } from "@/types";
import { buildFamilyGraph, type RawFile } from "@/lib/familyGraph";
import { readZipFile, fileSignature } from "@/lib/membersZip";
import {
  getAllFiles,
  putFiles,
  getMeta,
  setMeta,
  getAbout,
  setAbout,
  clearAll,
} from "@/lib/memberStore";

type Status = "idle" | "loading" | "ready" | "error";

interface FamilyDataState {
  persons: Person[];
  relationships: Relationship[];
  /** Nội dung Markdown của `about.md` trong tệp .zip (null = chưa nạp). */
  about: string | null;
  /**
   * Id các thành viên **build sẵn** từ `data/members/` — đúng tập mà
   * `generateStaticParams()` sinh trang tĩnh, nên chỉ những id này mới deep-link
   * `/apps/family-tree/members/<id>` được. Thành viên chỉ-trong-tệp `.zip` không có trang
   * riêng (xem qua modal); trỏ link tới họ sẽ lỗi `output: export` ở dev và 404
   * trên GitHub Pages.
   */
  staticPageIds: Set<string>;
  /** Trạng thái nạp tệp gần nhất. */
  status: Status;
  error: string | null;
  /** Tên tệp .zip đang dùng (null = đang dùng dữ liệu nền). */
  sourceName: string | null;
  importZip: (file: File) => Promise<void>;
  clearImported: () => Promise<void>;
}

const FamilyDataContext = createContext<FamilyDataState | undefined>(undefined);

/** Gộp file theo tên; `over` ghi đè `base`. */
function mergeByName(base: RawFile[], over: RawFile[]): RawFile[] {
  const m = new Map(base.map((f) => [f.name, f]));
  for (const f of over) m.set(f.name, f);
  return [...m.values()];
}

export function FamilyDataProvider({
  children,
  initialData,
  initialFiles,
}: {
  children: React.ReactNode;
  initialData: { persons: Person[]; relationships: Relationship[] };
  initialFiles: RawFile[];
}) {
  const [persons, setPersons] = useState<Person[]>(initialData.persons);
  const [relationships, setRelationships] = useState<Relationship[]>(
    initialData.relationships,
  );
  const [about, setAboutState] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [sourceName, setSourceName] = useState<string | null>(null);

  const baseFiles = useRef(initialFiles);
  // Tập id build sẵn — theo bundle, KHÔNG đổi khi nạp .zip.
  const staticPageIds = useMemo(
    () => new Set(initialData.persons.map((p) => p.id)),
    [initialData],
  );
  const applyGraph = useCallback((files: RawFile[]) => {
    const graph = buildFamilyGraph(files);
    setPersons(graph.persons);
    setRelationships(graph.relationships);
  }, []);

  // Khôi phục dữ liệu đã cache (IndexedDB) khi vào lại site.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [cached, meta, cachedAbout] = await Promise.all([
          getAllFiles(),
          getMeta(),
          getAbout(),
        ]);
        if (cancelled) return;
        if (cachedAbout !== null) setAboutState(cachedAbout);
        if (cached.length === 0 && cachedAbout === null) return;
        if (cached.length > 0) {
          applyGraph(mergeByName(baseFiles.current, cached));
        }
        setSourceName(meta?.sourceName ?? null);
        setStatus("ready");
      } catch {
        /* cache lỗi → cứ dùng dữ liệu nền */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [applyGraph]);

  const importZip = useCallback(
    async (file: File) => {
      setStatus("loading");
      setError(null);
      try {
        const sig = fileSignature(file);
        const [existingMeta, existing] = await Promise.all([
          getMeta(),
          getAllFiles(),
        ]);

        // Chọn lại đúng tệp cũ và đã có cache → không nạp trùng.
        if (existingMeta?.sig === sig && existing.length > 0) {
          setSourceName(existingMeta.sourceName);
          setStatus("ready");
          return;
        }

        const incoming = await readZipFile(file);
        await putFiles(incoming.members);
        await setMeta({ sourceName: file.name, sig });

        // Không có about.md trong tệp mới → giữ nội dung cũ (cùng quy ước
        // "ghi đè theo tên" như file thành viên).
        if (incoming.about !== null) {
          await setAbout(incoming.about);
          setAboutState(incoming.about);
        }

        const cached = await getAllFiles();
        applyGraph(mergeByName(baseFiles.current, cached));
        setSourceName(file.name);
        setStatus("ready");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Không đọc được tệp.");
        setStatus("error");
      }
    },
    [applyGraph],
  );

  const clearImported = useCallback(async () => {
    let dbError = false;
    try {
      await clearAll();
    } catch {
      // Xoá cache hỏng → dữ liệu vẫn còn trong IndexedDB, tải lại trang sẽ thấy
      // lại. Vẫn phải báo cho người dùng biết thay vì im lặng.
      dbError = true;
    }

    // Luôn đưa UI về dữ liệu nền, kể cả khi xoá cache lỗi: nếu để `await` ở trên
    // ném ra thì các setState này bị bỏ qua và nút "Xoá" trông như không ăn.
    setPersons(initialData.persons);
    setRelationships(initialData.relationships);
    setAboutState(null);
    setSourceName(null);

    if (dbError) {
      setError("Đã bỏ dữ liệu khỏi màn hình, nhưng không xoá được bản lưu trong trình duyệt — tải lại trang có thể thấy lại dữ liệu cũ.");
      setStatus("error");
    } else {
      setError(null);
      setStatus("idle");
    }
  }, [initialData]);

  const value = useMemo<FamilyDataState>(
    () => ({
      persons,
      relationships,
      about,
      staticPageIds,
      status,
      error,
      sourceName,
      importZip,
      clearImported,
    }),
    [
      persons,
      relationships,
      about,
      staticPageIds,
      status,
      error,
      sourceName,
      importZip,
      clearImported,
    ],
  );

  return (
    <FamilyDataContext.Provider value={value}>
      {children}
    </FamilyDataContext.Provider>
  );
}

export function useFamilyData(): FamilyDataState {
  const ctx = useContext(FamilyDataContext);
  if (!ctx) {
    throw new Error("useFamilyData phải dùng bên trong <FamilyDataProvider>");
  }
  return ctx;
}
