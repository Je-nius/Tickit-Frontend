"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { components } from "src/types/schema";

type PerformanceSearchResponseDto =
  components["schemas"]["PerformanceSearchResponseDto"];

export default function SearchList({
  keyword,
  isGenre = false,
}: {
  keyword: string;
  isGenre?: boolean;
}) {
  const [results, setResults] = useState<PerformanceSearchResponseDto[]>([]);

  const decodedKeyword = decodeURIComponent(keyword);
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        isGenre
          ? `http://localhost:8080/api/contents/search/genre`
          : `http://localhost:8080/api/contents/search`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            isGenre ? { genre: decodedKeyword } : { keyword: decodedKeyword }
          ),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setResults(data);
      }
    };
    fetchData();
  }, [keyword, isGenre, decodedKeyword]);

  const sortedResults = [...results].sort((a, b) => {
    if (sortOption === "title") {
      return a.title.localeCompare(b.title); // 가나다순
    }
    if (sortOption === "soon") {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime(); // 공연임박순
    }
    return 0; // 기본은 원본순
  });

  return (
    <div className="px-50 mt-72">
      <div className="flex flex-row justify-between">
        <div className="mb-4 flex">
          <h1 className="font-semibold text-2xl text-blue-600">
            {decodedKeyword}
          </h1>
          <h1 className="font-semibold text-2xl ml-2">검색 결과</h1>
        </div>
        <div className="mb-4">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="default">기본순</option>
            <option value="title">가나다순</option>
            <option value="soon">공연임박순</option>
          </select>
        </div>
      </div>

      {sortedResults.length === 0 ? (
        <p className="text-xl">검색 결과가 없습니다.</p>
      ) : (
        sortedResults.map((item, idx) => (
          <Link
            key={idx}
            href={`http://localhost:3000/ticket/${item.performanceId}`}
            className="block border-t border-gray-300 w-full"
          >
            <div className="grid grid-cols-4 items-center justify-center p-3 w-full hover:bg-gray-100 cursor-pointer transition">
              <div className="flex justify-center">
                <img
                  src={`http://localhost:8080/performance_poster/${
                    item.posterUrl.split("/performance_poster")[1]
                  }`}
                  alt="poster"
                  className="w-25 h-35 mx-5"
                />
              </div>
              <h1 className="font-bold text-xl text-center w-full">
                {item.title}
              </h1>
              <p className="text-md text-center w-full">
                {item.startDate} - {item.endDate}
              </p>
              <p className="text-md text-center w-full">{item.location}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
