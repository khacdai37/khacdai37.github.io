"use client";

import {
  MemberDraft,
  draftToMarkdown,
  emptyDraft,
  formatStamp,
  suggestId,
} from "@/lib/memberMarkdown";
import { Download, Info, Plus, Trash2, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { useFamilyData } from "@/context/FamilyDataProvider";

const inputCls =
  "w-full px-3 py-2 border border-stone-300 rounded-lg text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white";
const labelCls = "block text-xs font-semibold text-stone-500 mb-1";

export default function AddMembersForm() {
  const { persons } = useFamilyData();
  const existing = useMemo(
    () => persons.map((p) => ({ id: p.id, name: p.full_name })),
    [persons],
  );
  const [drafts, setDrafts] = useState<MemberDraft[]>([emptyDraft()]);
  const [errors, setErrors] = useState<string[]>([]);
  const [done, setDone] = useState<string | null>(null);

  const existingIds = useMemo(
    () => new Set(existing.map((e) => e.id)),
    [existing],
  );

  // Datalist suggestions: existing members + ids of other drafts in this batch.
  const idOptions = useMemo(() => {
    const opts = new Map<string, string>();
    existing.forEach((e) => opts.set(e.id, e.name));
    drafts.forEach((d) => {
      if (d.id.trim()) opts.set(d.id.trim(), d.name.trim() || d.id.trim());
    });
    return [...opts.entries()];
  }, [existing, drafts]);

  const update = (i: number, patch: Partial<MemberDraft>) => {
    setDrafts((prev) =>
      prev.map((d, idx) => {
        if (idx !== i) return d;
        const next = { ...d, ...patch };
        // id is auto-generated (read-only) from name + birth.
        if ("name" in patch || "birth" in patch) {
          next.id = suggestId(next.name, next.birth);
        }
        return next;
      }),
    );
    setDone(null);
  };

  const addDraft = () => {
    setDrafts((prev) => [...prev, emptyDraft()]);
    setDone(null);
  };

  const removeDraft = (i: number) => {
    setDrafts((prev) =>
      prev.length === 1 ? prev : prev.filter((_, idx) => idx !== i),
    );
  };

  const validate = (): string[] => {
    const errs: string[] = [];
    const seen = new Map<string, number>();
    drafts.forEach((d, i) => {
      const n = i + 1;
      if (!d.name.trim()) errs.push(`Thành viên ${n}: thiếu Tên.`);
      const id = d.id.trim();
      if (!id) {
        errs.push(`Thành viên ${n}: chưa sinh được id (kiểm tra Họ tên).`);
      } else {
        if (seen.has(id))
          errs.push(`Thành viên ${n}: id "${id}" trùng với thành viên ${seen.get(id)}.`);
        seen.set(id, n);
        if (existingIds.has(id))
          errs.push(
            `Thành viên ${n}: id "${id}" đã tồn tại trong gia phả — file tải về sẽ ghi đè khi bạn chép vào.`,
          );
      }
    });
    return errs;
  };

  const download = async () => {
    const errs = validate();
    // Blocking errors (missing/duplicate) vs. warnings (id already exists).
    const blocking = errs.filter((e) => !e.includes("đã tồn tại"));
    setErrors(errs);
    if (blocking.length > 0) return;

    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    drafts.forEach((d) => zip.file(`${d.id.trim()}.md`, draftToMarkdown(d)));
    const blob = await zip.generateAsync({ type: "blob" });

    const filename = `${formatStamp(new Date())}.zip`;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setDone(filename);
  };

  return (
    <div className="space-y-6">
      <datalist id="member-id-options">
        {idOptions.map(([id, name]) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </datalist>

      {drafts.map((d, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-stone-200/70 shadow-sm p-5 sm:p-6 relative"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-stone-700 flex items-center gap-2">
              <span className="size-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              Thành viên
            </h3>
            {drafts.length > 1 && (
              <button
                type="button"
                onClick={() => removeDraft(i)}
                className="text-stone-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                title="Xóa thành viên này"
              >
                <Trash2 className="size-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Họ tên *</label>
              <input
                className={inputCls}
                value={d.name}
                onChange={(e) => update(i, { name: e.target.value })}
                placeholder="Nguyễn Văn A"
              />
              <p className="mt-2.5 text-xs break-all">
                <span className="text-stone-500">Id:</span>{" "}
                {d.id ? (
                  <code className="text-stone-700">{d.id}</code>
                ) : (
                  <span className="text-stone-400">
                    tự sinh khi nhập họ tên và ngày sinh
                  </span>
                )}
              </p>
            </div>

            <div>
              <label className={labelCls}>Tên gọi khác</label>
              <input
                className={inputCls}
                value={d.other_names}
                onChange={(e) => update(i, { other_names: e.target.value })}
              />
            </div>
            <div>
              <label className={labelCls}>Giới tính</label>
              <select
                className={inputCls}
                value={d.gender}
                onChange={(e) =>
                  update(i, { gender: e.target.value as MemberDraft["gender"] })
                }
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div>
              <label className={labelCls}>Ngày sinh (năm hoặc dd/mm/yyyy)</label>
              <input
                className={inputCls}
                value={d.birth}
                onChange={(e) => update(i, { birth: e.target.value })}
                placeholder="1990 hoặc 09/10/1990"
              />
            </div>
            <div>
              <label className={labelCls}>Ngày mất (năm hoặc dd/mm/yyyy)</label>
              <input
                className={inputCls}
                value={d.death}
                onChange={(e) => update(i, { death: e.target.value })}
                placeholder="Để trống nếu còn sống"
              />
            </div>

            <div>
              <label className={labelCls}>Thứ tự sinh</label>
              <input
                className={inputCls}
                inputMode="numeric"
                value={d.birth_order}
                onChange={(e) => update(i, { birth_order: e.target.value })}
              />
            </div>

            <div>
              <label className={labelCls}>Cha (tùy chọn)</label>
              <input
                className={inputCls}
                list="member-id-options"
                value={d.fatherId}
                onChange={(e) => update(i, { fatherId: e.target.value })}
              />
            </div>
            <div>
              <label className={labelCls}>Mẹ (tùy chọn)</label>
              <input
                className={inputCls}
                list="member-id-options"
                value={d.motherId}
                onChange={(e) => update(i, { motherId: e.target.value })}
              />
            </div>

            <div>
              <label className={labelCls}>
                Vợ/Chồng (nhiều thì cách nhau dấu phẩy)
              </label>
              <input
                className={inputCls}
                list="member-id-options"
                value={d.spouses}
                onChange={(e) => update(i, { spouses: e.target.value })}
                placeholder="Id vợ, Id chồng"
              />
            </div>
            <div>
              <label className={labelCls}>Avatar (URL, tùy chọn)</label>
              <input
                className={inputCls}
                value={d.avatar}
                onChange={(e) => update(i, { avatar: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="sm:col-span-2 flex flex-wrap gap-6 pt-1">
              <label className="flex items-center gap-2 text-sm text-stone-600">
                <input
                  type="checkbox"
                  checked={d.is_in_law}
                  onChange={(e) => update(i, { is_in_law: e.target.checked })}
                />
                Dâu / rể (kết hôn vào dòng họ)
              </label>
            </div>

            <div className="sm:col-span-2">
              <label className={labelCls}>Ghi chú / tiểu sử</label>
              <textarea
                className={`${inputCls} min-h-[90px] resize-y`}
                value={d.note}
                onChange={(e) => update(i, { note: e.target.value })}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addDraft}
        className="w-full border-2 border-dashed border-stone-300 rounded-2xl py-3 text-stone-500 hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50/50 transition-colors flex items-center justify-center gap-2 font-medium"
      >
        <Plus className="size-4" /> Thêm một thành viên nữa
      </button>

      {errors.length > 0 && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-sm text-rose-700 space-y-1">
          {errors.map((e, idx) => (
            <p key={idx}>• {e}</p>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-3 sm:justify-between border-t border-stone-200 pt-5">
        <p className="text-xs text-stone-400 flex items-center gap-1.5">
          <UserPlus className="size-3.5" />
          {drafts.length} thành viên · mỗi người một file{" "}
          <code className="text-stone-500">&lt;id&gt;.md</code>
        </p>
        <button
          type="button"
          onClick={download}
          className="btn-amber w-full sm:w-auto justify-center"
        >
          <Download className="size-4" /> Tải xuống (.zip)
        </button>
      </div>

      {done && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-800 flex items-center gap-3">
          <Info className="size-5 shrink-0 text-emerald-600" />
          <p className="font-semibold">Đã tạo {done}</p>
        </div>
      )}
    </div>
  );
}
