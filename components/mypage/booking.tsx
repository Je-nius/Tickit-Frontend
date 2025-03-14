"use client";

import BookingTable from "./BookingTable";

export default function Booking() {
  const bookings = [
    {
      예매일: "2025-03-12",
      예매번호: "123456789",
      공연명:
        "뮤지컬 라이온킹 뮤지컬 라이온킹 뮤지컬 라이온킹 뮤지컬 라이온킹 뮤지컬 라이온킹 뮤지컬 라이온킹뮤지컬 라이온킹",
      관람일: "2025-04-01",
      매수: 2,
      취소가능일: "2025-03-25",
      상태: "예매",
    },
    {
      예매일: "2025-03-13",
      예매번호: "987654321",
      공연명: "오페라의 유령",
      관람일: "2025-04-05",
      매수: 1,
      취소가능일: "2025-03-28",
      상태: "예매",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      <h1 className="font-bold text-2xl ml-8 ">최근 예매내역</h1>
      <div className="mt-2 w-full flex justify-center">
        <BookingTable bookings={bookings} />
      </div>
      <div className="ml-20 mt-4 w-full flex justify-center">
        <button
          className="w-30 h-8 text-md rounded-sm text-lg font-medium cursor-pointer "
          style={{ backgroundColor: "#026DFF", color: "white" }}
        >
          더보기
        </button>
      </div>
    </div>
  );
}
