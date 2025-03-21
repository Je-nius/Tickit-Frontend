"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
//헤더 안에 있는 검색창
export default function SearchComponent({
  searchInput,
  setSearchInput,
  onSearch,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };
  return (
    <div className="relative">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="공연명, 아티스트 등을 검색하세요."
        className="w-full  p-3 pl-10 border rounded-md border-gray-300 focus:outline-none focus:ring-2 "
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
    </div>
  );
}
