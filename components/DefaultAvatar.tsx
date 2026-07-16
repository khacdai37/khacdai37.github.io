import { asset } from "@/lib/asset";
import Image from "next/image";

/** Đổi khi thay bộ avatar → URL đổi theo, trình duyệt không dùng bản cache cũ. */
export const AVATAR_VERSION = "v3";

export default function DefaultAvatar({
  gender,
  size = 64,
}: {
  gender?: string;
  size?: number;
}) {
  // Avatar v3 là "triện" tự phủ nền kem nên không cần class nền phía sau.
  if (gender === "male") {
    return (
      <Image
        unoptimized
        src={asset(`/avatar/${AVATAR_VERSION}/male.svg`)}
        alt="Nam"
        className="w-full h-full object-cover"
        width={size}
        height={size}
      />
    );
  }

  return (
    <Image
      unoptimized
      src={asset(`/avatar/${AVATAR_VERSION}/female.svg`)}
      alt="Nữ"
      className="w-full h-full object-cover"
      width={size}
      height={size}
    />
  );
}
