"use client";

import { useMemberListView } from "@/context/MemberListContext";
import { useFamilyData } from "@/context/FamilyDataProvider";
import RootSelector from "@/components/RootSelector";
import { routes } from "@/lib/routes";
import Link from "next/link";
import { Person } from "@/types";
import { useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import {
  computeGenerationMap,
  resolveDefaultRootId,
} from "@/utils/generationHelpers";

const FamilyTree = dynamic(() => import("@/components/FamilyTree"));

export default function MembersViews({
  canEdit = false,
}: {
  canEdit?: boolean;
}) {
  const { persons, relationships } = useFamilyData();
  const { rootId, setRootId } = useMemberListView();
  const searchParams = useSearchParams();
  const hasRestored = useRef(false);

  // Prepare map and roots for the tree view.
  const { personsMap, roots, defaultRootId, generationMap } = useMemo(() => {
    const pMap = new Map<string, Person>();
    persons.forEach((p) => pMap.set(p.id, p));

    // Gốc hiển thị: ưu tiên lựa chọn của người dùng, nếu không có thì lấy thủy tổ.
    const finalRootId =
      rootId && pMap.has(rootId)
        ? rootId
        : resolveDefaultRootId(persons, relationships);

    const calculatedRoots: Person[] =
      finalRootId && pMap.has(finalRootId) ? [pMap.get(finalRootId)!] : [];

    // Đời tính ĐỘNG theo gốc đang chọn (đổi gốc → đổi đời).
    const genMap = computeGenerationMap(finalRootId, persons, relationships);

    return {
      personsMap: pMap,
      roots: calculatedRoots,
      defaultRootId: finalRootId,
      generationMap: genMap,
    };
  }, [persons, relationships, rootId]);

  const activeRootId = rootId || defaultRootId;

  // Restore selection from localStorage.
  useEffect(() => {
    if (hasRestored.current) return;
    const urlRootId = searchParams.get("rootId");
    if (!urlRootId) {
      try {
        const savedRootId = localStorage.getItem("members_rootId");
        if (savedRootId && savedRootId !== rootId) {
          setRootId(savedRootId);
        }
      } catch (e) {
        console.warn("Failed to read from localStorage:", e);
      }
    }
    hasRestored.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist selection to localStorage.
  useEffect(() => {
    if (!hasRestored.current) return;
    const timeout = setTimeout(() => {
      try {
        if (activeRootId) localStorage.setItem("members_rootId", activeRootId);
      } catch (e) {
        console.warn("Failed to write to localStorage:", e);
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [activeRootId]);

  return (
    <main className="flex-1 overflow-auto bg-stone-50/50 flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 w-full flex flex-col sm:flex-row flex-wrap items-center sm:justify-between gap-4 relative z-20">
        {persons.length > 0 && activeRootId ? (
          <RootSelector
            persons={persons}
            currentRootId={activeRootId}
            generationMap={generationMap}
          />
        ) : (
          <span className="text-sm text-stone-500">
            Chưa có dữ liệu — hãy{" "}
            <Link
              href={routes.familyTree.root}
              className="font-semibold text-amber-700 hover:underline"
            >
              Thêm thành viên
            </Link>{" "}
            ở Bảng điều khiển.
          </span>
        )}
        <div
          id="tree-toolbar-portal"
          className="flex items-center gap-2 flex-wrap justify-center"
        />
      </div>

      <div className="flex-1 w-full relative z-10">
        <FamilyTree
          personsMap={personsMap}
          relationships={relationships}
          roots={roots}
          canEdit={canEdit}
        />
      </div>
    </main>
  );
}
