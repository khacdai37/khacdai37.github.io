import type { RawFile } from "@/lib/familyGraph";

/**
 * "Folder ảo" lưu trên trình duyệt: các file `.md` người dùng nạp từ tệp `.zip`
 * được cache vào IndexedDB để lần sau vào site không phải chọn lại (quan trọng
 * trên mobile). Ghi đè theo tên file; có thể xoá sạch để về dữ liệu nền.
 */

const DB_NAME = "familytree";
const DB_VERSION = 1;
const FILES_STORE = "files"; // key = tên file (vd "nguyen-dinh-loc.md"), value = nội dung
const META_STORE = "meta"; // key = "current" → SourceMeta | "about" → nội dung about.md

export interface SourceMeta {
  /** Tên tệp .zip đang dùng, để hiển thị. */
  sourceName: string;
  /** Chữ ký nguồn (tên+size+lastModified) để nhận biết chọn lại đúng tệp cũ. */
  sig: string;
}

const META_KEY = "current";
const ABOUT_KEY = "about";

function isAvailable(): boolean {
  return typeof indexedDB !== "undefined";
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(FILES_STORE))
        db.createObjectStore(FILES_STORE);
      if (!db.objectStoreNames.contains(META_STORE))
        db.createObjectStore(META_STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function tx<T>(
  storeName: string,
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  return openDB().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const t = db.transaction(storeName, mode);
        const req = run(t.objectStore(storeName));
        t.oncomplete = () => resolve(req.result);
        t.onerror = () => reject(t.error);
        t.onabort = () => reject(t.error);
      }),
  );
}

export async function getAllFiles(): Promise<RawFile[]> {
  if (!isAvailable()) return [];
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const t = db.transaction(FILES_STORE, "readonly");
    const store = t.objectStore(FILES_STORE);
    const keysReq = store.getAllKeys();
    const valsReq = store.getAll();
    t.oncomplete = () => {
      const keys = keysReq.result as string[];
      const vals = valsReq.result as string[];
      resolve(keys.map((name, i) => ({ name, content: vals[i] })));
    };
    t.onerror = () => reject(t.error);
  });
}

/** Ghi (đè) danh sách file theo tên. */
export async function putFiles(files: RawFile[]): Promise<void> {
  if (!isAvailable() || files.length === 0) return;
  const db = await openDB();
  await new Promise<void>((resolve, reject) => {
    const t = db.transaction(FILES_STORE, "readwrite");
    const store = t.objectStore(FILES_STORE);
    for (const f of files) store.put(f.content, f.name);
    t.oncomplete = () => resolve();
    t.onerror = () => reject(t.error);
  });
}

export async function getMeta(): Promise<SourceMeta | null> {
  if (!isAvailable()) return null;
  const value = await tx<SourceMeta | undefined>(META_STORE, "readonly", (s) =>
    s.get(META_KEY),
  );
  return value ?? null;
}

export async function setMeta(meta: SourceMeta): Promise<void> {
  if (!isAvailable()) return;
  await tx(META_STORE, "readwrite", (s) => s.put(meta, META_KEY));
}

/**
 * Nội dung `about.md` (trang Giới thiệu). Để riêng ngoài FILES_STORE vì store đó
 * chỉ chứa file thành viên và được đưa thẳng vào `buildFamilyGraph`.
 */
export async function getAbout(): Promise<string | null> {
  if (!isAvailable()) return null;
  const value = await tx<string | undefined>(META_STORE, "readonly", (s) =>
    s.get(ABOUT_KEY),
  );
  return value ?? null;
}

export async function setAbout(content: string): Promise<void> {
  if (!isAvailable()) return;
  await tx(META_STORE, "readwrite", (s) => s.put(content, ABOUT_KEY));
}

/** Xoá toàn bộ file đã nạp + meta → app quay về dữ liệu nền (bundle). */
export async function clearAll(): Promise<void> {
  if (!isAvailable()) return;
  const db = await openDB();
  await new Promise<void>((resolve, reject) => {
    const t = db.transaction([FILES_STORE, META_STORE], "readwrite");
    t.objectStore(FILES_STORE).clear();
    t.objectStore(META_STORE).clear();
    t.oncomplete = () => resolve();
    t.onerror = () => reject(t.error);
  });
}
