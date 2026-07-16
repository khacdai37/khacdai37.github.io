import { MemberListProvider } from "@/context/MemberListContext";
import MembersViews from "@/components/MembersViews";
import MemberDetailModal from "@/components/modal/MemberDetailModal";
import { getFamilyData } from "@/lib/familyData";
import { resolveDefaultRootId } from "@/utils/generationHelpers";

export default function FamilyTreePage() {
  const { persons, relationships } = getFamilyData();

  // Gốc mặc định: thủy tổ (không là con ai, không phải dâu/rể, sinh sớm nhất).
  const initialRootId =
    resolveDefaultRootId(persons, relationships) ?? undefined;

  return (
    <MemberListProvider initialView="tree" initialRootId={initialRootId}>
      <MembersViews />
      <MemberDetailModal />
    </MemberListProvider>
  );
}
