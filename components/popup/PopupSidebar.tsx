"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function PopupSidebar() {
  return (
    <aside className="h-screen p-3 border-l border-gray-300 flex flex-col w-64 sticky ml-auto bg-[rgba(198,213,255,0.3)]">
      <img src="/images/tickit-logo.png" className="w-36 h-12 mx-8" />
      <span className="text-md font-medium text-center">
        뮤지컬 〈알라딘〉 한국 초연 (ALADDIN The Musical)
      </span>
      <table className="w-full table-fixed border border-gray-300 bg-white mt-2 text-left text-sm text-gray-500">
        <tbody>
          <tr className="border-b border-gray-300">
            <td className="p-2">2025.03.29(토) 16:00</td>
          </tr>
          <tr>
            <td className="p-2">비지정석(1석)</td>
          </tr>
        </tbody>
      </table>
      <span className="text-md p-2 mt-3">결제금액</span>
      <table className="w-full table-fixed border border-gray-300 bg-white text-left p-3">
        <tbody>
          <tr>
            <td className="p-2">티켓금액</td>
            <td className="p-2 text-right">190,000원</td>
          </tr>
          <tr>
            <td className="p-2 text-gray-500 text-sm">기본가</td>
            <td className="p-2 text-right text-gray-500 text-sm">190,000원</td>
          </tr>
          <tr>
            <td className="p-2 text-gray-500 text-sm">가격할인</td>
            <td className="p-2 text-right text-gray-500 text-sm">0원</td>
          </tr>
          <tr>
            <td className="p-2 text-gray-500 text-sm">예매수수료</td>
            <td className="p-2 text-right text-gray-500 text-sm">2,000원</td>
          </tr>
          <tr>
            <td className="p-2 text-gray-500 text-sm">배송료</td>
            <td className="p-2 text-right text-gray-500 text-sm">0원</td>
          </tr>
          <tr className="border-t border-gray-300">
            <td className="p-2">총 결제금액</td>
            <td className="p-2 text-right text-blue-500">192,000원</td>
          </tr>
        </tbody>
      </table>
      <div className="flex flex-row items-center">
        <span className="p-2 text-xs text-gray-500">취소기한:</span>
        <span className="text-xs text-amber-500">2025년 3월 23일(일)</span>
      </div>
      <div className="flex flex-row  mt-4 justify-center">
        <button className="bg-white w-24 h-10 cursor-pointer">이전</button>
        <button className="bg-blue-600 text-white w-24 h-10 cursor-pointer">
          다음
        </button>
      </div>
    </aside>
  );
}
