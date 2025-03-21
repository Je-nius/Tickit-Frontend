"use client";
export default function SearchList({
  params,
}: {
  params: { keyword: string };
}) {
  const keyword = decodeURIComponent(params.keyword);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex flex-row justify-start mt-70 2xl:mt-24">
        <h1 className="font-bold text-2xl" style={{ color: "#026DFF" }}>
          {keyword}
        </h1>
        <p className="font-bold text-xl ml-2"> 검색 결과</p>
      </div>
      <div className="flex flex-col items-center mt-8">
        <div className="grid grid-cols-4 items-center justify-center border-t border-gray-300 p-3 w-full">
          <div className="flex justify-center">
            <img src="/images/seoul.jpeg" className="w-25 h-35 mx-5" />
          </div>
          <h1 className="font-bold text-xl text-center mx-5 w-full">
            제 17회 서울재즈페스티벌 2025
          </h1>
          <p className="text-md text-center mx-5 w-full">
            2025.05.30 - 2025.06.01
          </p>
          <p className="text-md text-center mx-5 w-full">올림픽공원</p>
        </div>

        <div className="grid grid-cols-4 items-center justify-center border-t border-gray-300 p-3 w-full">
          <div className="flex justify-center">
            <img src="/images/seoul.jpeg" className="w-25 h-35 mx-5" />
          </div>
          <h1 className="font-bold text-xl text-center mx-5 w-full">
            제 17회 서울재즈페스티벌 2024
          </h1>
          <p className="text-md text-center mx-5 w-full">
            2024.05.30 - 2024.06.01
          </p>
          <p className="text-md text-center mx-5 w-full">올림픽공원</p>
        </div>

        <div className="grid grid-cols-4 items-center justify-center border-t border-gray-300 p-3 w-full">
          <div className="flex justify-center">
            <img src="/images/seoul.jpeg" className="w-25 h-35 mx-5" />
          </div>
          <h1 className="font-bold text-xl text-center mx-5 w-full">
            제 17회 서울재즈페스티벌 2023
          </h1>
          <p className="text-md text-center mx-5 w-full">
            2023.05.30 - 2023.06.01
          </p>
          <p className="text-md text-center mx-5 w-full">올림픽공원</p>
        </div>

        <div className="grid grid-cols-4 items-center justify-center border-t border-gray-300 p-3 w-full">
          <div className="flex justify-center">
            <img src="/images/glow.png" className="w-25 h-35 mx-5" />
          </div>
          <h1 className="font-bold text-xl text-center mx-5 w-full">
            글로우 페스티벌 2025
          </h1>
          <p className="text-md text-center mx-5 w-full">
            2025.05.30 - 2025.06.01
          </p>
          <p className="text-md text-center mx-5 w-full">주경기장</p>
        </div>
      </div>
    </div>
  );
}
