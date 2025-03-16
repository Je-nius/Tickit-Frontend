"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminSidebar() {
  const pathname = usePathname();

  const getLinkClassName = (href: string) => {
    const isActive = pathname === href;
    return `${
      isActive ? "bg-[#D9D9D9] text-[#026DFF]" : ""
    } text-xl font-bold p-3 rounded-md`;
  };

  return (
    <aside className="h-screen p-5 border-r border-gray-300 flex flex-col justify-between w-64 sticky mt-5">
      <div className="flex flex-col gap-5">
        <Link href="/admin/create-performance" legacyBehavior>
          <a className={getLinkClassName("/admin/create-performance")}>
            공연 등록
          </a>
        </Link>
        <Link href="/admin/delete-performance" legacyBehavior>
          <a className={getLinkClassName("/admin/delete-performance")}>
            공연 수정/삭제
          </a>
        </Link>
        <Link href="/admin/qna" legacyBehavior>
          <a className={getLinkClassName("/admin/qna")}>1:1 문의 게시판</a>
        </Link>
      </div>
    </aside>
  );
}
