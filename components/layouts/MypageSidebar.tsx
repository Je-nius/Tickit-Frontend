"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function MypageSidebar() {
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
        <Link href="/mypage/info" legacyBehavior>
          <a className={getLinkClassName("/mypage/info")}>기본정보</a>
        </Link>
        <Link href="/mypage/booking" legacyBehavior>
          <a className={getLinkClassName("/mypage/booking")}>예매확인</a>
        </Link>
        <Link href="/mypage/qna" legacyBehavior>
          <a className={getLinkClassName("/mypage/qna")}>1:1 문의하기</a>
        </Link>
        <Link href="/mypage/change-password" legacyBehavior>
          <a className={getLinkClassName("/mypage/change-password")}>
            비밀번호 변경
          </a>
        </Link>
        <Link href="/mypage/delete-account" legacyBehavior>
          <a className={getLinkClassName("/mypage/delete-account")}>회원탈퇴</a>
        </Link>
      </div>
    </aside>
  );
}
