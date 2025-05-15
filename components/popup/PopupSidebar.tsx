"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PopupSidebar({
  stepStatus,
  setStepStatus,
}: {
  stepStatus: "queue" | "select" | "payment";
  setStepStatus: React.Dispatch<
    React.SetStateAction<"queue" | "select" | "payment">
  >;
}) {
  const [selectedData, setSelectedData] = useState<any>(null);
  const [seatCounts, setSeatCounts] = useState<{ [seatType: string]: string }>(
    {}
  );
  const [deliveryFee, setDeliveryFee] = useState<number>(0);

  useEffect(() => {
    const data = localStorage.getItem("selectedData");

    if (data) {
      setSelectedData(JSON.parse(data));
    }
    const loadCounts = () => {
      const counts = localStorage.getItem("seatCounts");
      if (counts) {
        setSeatCounts(JSON.parse(counts));
      }
    };

    const loadDeliveryFee = () => {
      const fee = localStorage.getItem("deliveryFee");
      if (fee) {
        setDeliveryFee(Number(fee));
      }
    };

    loadCounts();
    loadDeliveryFee();

    window.addEventListener("seatCountsUpdated", loadCounts);
    window.addEventListener("deliveryFeeUpdated", loadDeliveryFee);

    return () => {
      window.removeEventListener("seatCountsUpdated", loadCounts);
      window.removeEventListener("deliveryFeeUpdated", loadDeliveryFee);
    };
  }, []);

  const totalPrice =
    selectedData?.seats?.reduce((sum: number, seat: any) => {
      const count = Number(seatCounts[seat.seatType] || "0");
      return sum + seat.price * count;
    }, 0) || 0;

  const bookingFee = totalPrice > 0 ? 2000 : 0;
  const finalAmount = totalPrice + bookingFee + deliveryFee;

  return (
    <aside className="h-screen p-3 border-l border-gray-300 flex flex-col w-64 sticky ml-auto bg-[rgba(198,213,255,0.3)]">
      <img src="/images/tickit-logo.png" className="w-36 h-12 mx-8" />
      <span className="text-md font-medium text-center">
        {selectedData?.title}
      </span>
      <table className="w-full table-fixed border border-gray-300 bg-white mt-2 text-left text-sm text-gray-500">
        <tbody>
          <tr className="border-b border-gray-300">
            <td className="p-2">
              {selectedData?.date} {selectedData?.time}
            </td>
          </tr>
          <tr>
            <td className="p-2">비지정석</td>
          </tr>
        </tbody>
      </table>
      <span className="text-md p-2 mt-3">결제금액</span>
      <table className="w-full table-fixed border border-gray-300 bg-white text-left p-3">
        <tbody>
          <tr>
            <td className="p-2">티켓금액</td>
            <td className="p-2 text-right">{totalPrice.toLocaleString()}원</td>
          </tr>
          <tr>
            <td className="p-2 text-gray-500 text-sm">기본가</td>
            <td className="p-2 text-right text-gray-500 text-sm">
              {totalPrice.toLocaleString()}원
            </td>
          </tr>
          <tr>
            <td className="p-2 text-gray-500 text-sm">가격할인</td>
            <td className="p-2 text-right text-gray-500 text-sm">0원</td>
          </tr>
          <tr>
            <td className="p-2 text-gray-500 text-sm">예매수수료</td>
            <td className="p-2 text-right text-gray-500 text-sm">
              {bookingFee.toLocaleString()}원
            </td>
          </tr>
          <tr>
            <td className="p-2 text-gray-500 text-sm">배송료</td>
            <td className="p-2 text-right text-gray-500 text-sm">
              {deliveryFee.toLocaleString()}원
            </td>
          </tr>
          <tr className="border-t border-gray-300">
            <td className="p-2">총 결제금액</td>
            <td className="p-2 text-right text-blue-500">
              {finalAmount.toLocaleString()}원
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex flex-row items-center">
        <span className="p-2 text-xs text-gray-500">취소기한:</span>
        <span className="text-xs text-amber-500">2025년 5월 23일(일)</span>
      </div>
      <div className="flex flex-row  mt-4 justify-center">
        {/* <button className="bg-white w-24 h-10 cursor-pointer">이전</button> */}
        {/* <button className="bg-blue-600 text-white w-24 h-10 cursor-pointer">
          다음
        </button> */}
        <button
          className="bg-white w-24 h-10 cursor-pointer"
          onClick={() => {
            if (stepStatus === "payment") {
              setStepStatus("select");
            }
          }}
        >
          이전
        </button>

        <button
          className="bg-blue-600 text-white w-24 h-10 cursor-pointer"
          onClick={() => {
            if (stepStatus === "select") {
              setStepStatus("payment");
            }
          }}
        >
          {stepStatus === "payment" ? "결제하기" : "다음"}
        </button>
      </div>
    </aside>
  );
}
