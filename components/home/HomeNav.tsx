"use client";

import Link from "next/link";

export default function HomeNav() {
  return (
    <header className="fixed border-b border-gray-300 flex justify-evenly items-center w-full p-2 bg-white z-50">
      <Link href="/ticket" className="text-lg font-semibold">
        콘서트
      </Link>
      <Link href="/ticket" className="text-lg font-semibold">
        뮤지컬
      </Link>
      <Link href="/ticket" className="text-lg font-semibold">
        페스티벌
      </Link>
      <Link href="/ticket" className="text-lg font-semibold">
        스포츠
      </Link>
    </header>
  );
}
