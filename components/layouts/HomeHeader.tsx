"use client";

import Link from "next/link";
import SearchComponent from "../home/search-component";
import { useState } from "react";

export default function HomeHeader() {
  const [searchInput, setSearchInput] = useState("");
  return (
    <header className="fixed border-b border-gray-300 flex justify-between items-center w-full p-4  top-0 bg-white z-50">
      <img src={"/images/tickit_logo.png"} className="w-25 md:w-40" />
      <div className="flex-1 mx-4">
        <SearchComponent
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      </div>

      <div className="flex gap-5">
        <Link href="/mypage/info" className="text-sm md:text-lg font-bold">
          마이페이지
        </Link>
        <button className="text-sm md:text-lg font-bold text-red-400">
          로그아웃
        </button>
      </div>
    </header>
  );
}
