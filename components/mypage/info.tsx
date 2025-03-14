"use client";

export default function Info() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 mt-5">
      <h1 className="font-bold text-2xl">기본정보</h1>
      <div className="flex flex-col gap-4 mt-4 border border-gray-400 p-4 rounded-lg">
        <h1 className="text-lg font-semibold text-gray-500">이름</h1>
        <p className="w-full h-8 px-4 text-xl font-semibold border-b-2 border-gray-400">
          홍길동
        </p>
        {/* 서버에서 받아오기 */}

        <h1 className="text-lg font-semibold text-gray-500">생년월일</h1>
        <p className="w-full h-8 px-4 text-xl font-semibold border-b-2 border-gray-400">
          2000.02.28
        </p>

        <h1 className="text-lg font-semibold text-gray-500">아이디</h1>
        <p className="w-full h-8 px-4 text-xl font-semibold border-b-2 border-gray-400">
          tickit
        </p>

        <h1 className="text-lg font-semibold text-gray-500">휴대폰 번호</h1>
        <p className="w-full h-8 px-4 text-xl font-semibold border-b-2 border-gray-400">
          010-1234-5678
        </p>

        <h1 className="text-lg font-semibold text-gray-500">이메일</h1>
        <p className="w-full h-8 px-4 text-xl font-semibold border-b-2 border-gray-400">
          tickit@naver.com
        </p>
      </div>
    </div>
  );
}
