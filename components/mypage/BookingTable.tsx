"use client";

interface Booking {
  예매일: string;
  예매번호: string;
  공연명: string;
  관람일: string;
  매수: number;
  취소가능일: string;
  상태: string;
}

interface BookingTableProps {
  bookings: Booking[];
}

export default function BookingTable({ bookings }: BookingTableProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <table className="table-auto w-full min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">예매일</th>
            <th className="border border-gray-300 px-4 py-2">예매번호</th>
            <th className="border border-gray-300 px-4 py-2">공연명</th>
            <th className="border border-gray-300 px-4 py-2">관람일</th>
            <th className="border border-gray-300 px-4 py-2 min-w-18">매수</th>
            <th className="border border-gray-300 px-4 py-2 min-w-30">
              취소가능일
            </th>
            <th className="border border-gray-300 px-4 py-2 min-w-18">상태</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 px-4 py-2 min-w-32">
                {booking.예매일}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {booking.예매번호}
              </td>
              <td className="border border-gray-300 px-4 py-2 min-w-80">
                {booking.공연명}
              </td>
              <td className="border border-gray-300 px-4 py-2 min-w-32">
                {booking.관람일}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {booking.매수}
              </td>
              <td className="border border-gray-300 px-4 py-2 min-w-32">
                {booking.취소가능일}
              </td>
              <td className="border border-gray-300 px-4 py-2 min-w-32">
                {booking.상태}
                <button className="ml-2 w-10 text-red-500 bg-gray-300 rounded-sm cursor-pointer">
                  취소
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
