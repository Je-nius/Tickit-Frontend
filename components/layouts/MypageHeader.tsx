"use client";

import LogoutButton from "components/auth/logout-button";
import Link from "next/link";

export default function MypageHeader() {
  return (
    <header className="fixed border-b border-gray-300 flex justify-between items-center w-full p-4  top-0 bg-white z-50">
      <img src={"/images/tickit-logo.png"} className="w-40" />

      <div className="flex gap-5">
        <Link href="/" className="text-lg font-bold">
          홈
        </Link>
        <LogoutButton />
      </div>
    </header>
  );
}
