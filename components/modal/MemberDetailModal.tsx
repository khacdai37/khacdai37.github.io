"use client";

import MemberDetailContent from "@/context/MemberDetailContent";
import { Person } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useMemberListView } from "@/context/MemberListContext";
import { useFamilyData } from "@/context/FamilyDataProvider";
import { routes } from "@/lib/routes";
import {
  computeGenerationMap,
  resolveDefaultRootId,
} from "@/utils/generationHelpers";

export default function MemberDetailModal() {
  const { persons, relationships, staticPageIds } = useFamilyData();
  const { memberModalId: memberId, setMemberModalId, rootId } =
    useMemberListView();
  const [isOpen, setIsOpen] = useState(false);

  const personsMap = useMemo(() => {
    const m = new Map<string, Person>();
    persons.forEach((p) => m.set(p.id, p));
    return m;
  }, [persons]);

  // Đời hiển thị trong modal tính theo gốc đang chọn của cây (giống dropdown).
  const generationMap = useMemo(() => {
    const effectiveRoot =
      rootId && personsMap.has(rootId)
        ? rootId
        : resolveDefaultRootId(persons, relationships);
    return computeGenerationMap(effectiveRoot, persons, relationships);
  }, [persons, relationships, rootId, personsMap]);

  const person = memberId ? personsMap.get(memberId) ?? null : null;

  const closeModal = () => setMemberModalId(null);

  useEffect(() => {
    setIsOpen(Boolean(memberId));
  }, [memberId]);

  // Prevent background scrolling when modal is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 bg-stone-900/40 backdrop-blur-sm"
        >
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={closeModal}
          />

          <motion.div
            layout
            initial={{ scale: 0.96, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            layoutDependency={false}
            className="relative bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-stone-200"
          >
            <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 flex items-center gap-2">
              {/* Chỉ thành viên build sẵn mới có trang tĩnh riêng. Người
                  chỉ-trong-tệp .zip xem ngay trong modal này — link tới họ sẽ
                  lỗi ở dev và 404 trên GitHub Pages (`output: export`). */}
              {person && staticPageIds.has(person.id) && (
                <Link
                  href={routes.familyTree.member(person.id)}
                  className="btn-amber text-sm"
                >
                  <ExternalLink className="size-4" />
                  <span className="hidden sm:inline">Xem trang</span>
                </Link>
              )}
              <button
                onClick={closeModal}
                className="size-10 flex items-center justify-center bg-stone-100/80 text-stone-600 rounded-full hover:bg-stone-200 hover:text-stone-900 shadow-sm border border-stone-200/50 transition-colors"
                aria-label="Đóng"
              >
                <X className="size-5" />
              </button>
            </div>

            {person ? (
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <MemberDetailContent
                  person={person}
                  privateData={null}
                  isAdmin={false}
                  canEdit={false}
                  generation={generationMap.get(person.id) ?? null}
                />
              </div>
            ) : (
              <div className="flex-1 min-h-[300px] flex items-center justify-center p-8 text-center text-stone-500">
                Không tìm thấy thông tin thành viên.
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
