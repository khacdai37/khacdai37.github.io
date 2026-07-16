"use client";

import { Person } from "@/types";
import { useMemberListView } from "@/context/MemberListContext";
import PersonSelector from "./PersonSelector";

export default function RootSelector({
  persons,
  currentRootId,
  generationMap,
}: {
  persons: Person[];
  currentRootId: string;
  generationMap?: Map<string, number>;
}) {
  const { setRootId } = useMemberListView();

  return (
    <PersonSelector
      persons={persons}
      selectedId={currentRootId}
      onSelect={(id) => {
        if (id) setRootId(id);
      }}
      placeholder="Chọn người..."
      label="Gốc hiển thị"
      className="w-full sm:w-72"
      generationMap={generationMap}
    />
  );
}
