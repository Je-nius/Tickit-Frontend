"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="h-screen p-6 border-r border-gray-300 flex flex-col justify-between w-fit">
      <div className="flex flex-col gap-5">
        <Link href="/information"></Link>
        <Link href="/check/ticket"></Link>
        <Link href="/qna"></Link>
        <Link href="/changepw"></Link>
        <Link href="/delete"></Link>
      </div>
    </aside>
  );
}
