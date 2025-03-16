"use client";

import Link from "next/link";

export default function HomeHeader() {
  return (
    <header className="fixed border-b border-gray-300 flex justify-between items-center w-full p-4  top-0 bg-white z-50">
      <img src={"/images/tickit_logo.png"} className="w-40" />

      <div className="flex gap-5">
        <Link href="/mypage/info" className="text-lg font-bold">
          마이페이지
        </Link>
        <button className="text-lg font-bold">로그아웃</button>
      </div>
    </header>
  );
}
