"use client";

import Link from "next/link";

export default function MypageHeader() {
  return (
    <header className="fixed border-b border-gray-300 flex justify-between items-center w-full p-4  top-0 bg-white z-50">
      <img src={"/images/tickit_logo.png"} className="w-40" />

      <div className="flex gap-5">
        <Link href="/" className="text-lg font-bold">
          홈
        </Link>
        <button className="text-lg font-bold">로그아웃</button>
      </div>
    </header>
  );
}
