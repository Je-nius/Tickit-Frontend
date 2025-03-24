"use client";

import { useEffect, useState } from "react";

export default function DetailTable() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [poster, setPoster] = useState("");

  // 사진, 제목, 장소, 공연기간, 공연시간, 가격 서버에서 받아오기
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/ticket/detail");
      const data = await response.json();
      setTitle(data.title);
      setLocation(data.location);
      setStartDate(data.startDate);
      setEndDate(data.endDate);
      setPoster(data.poster);
    }

    fetchData();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center ">
      <div className="flex flex-row justify-center mt-30 w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <img src={poster || "/images/peak.jpeg"} className="w-46 h-65" />
        <div className="flex flex-col gap-2 justify-center">
          <div>
            <h1 className="font-bold text-3xl text-center w-full">
              {title || "제 17회 서울재즈페스티벌 2025"}
            </h1>
          </div>
          <div className="flex flex-row gap-2 mt-5">
            <div className="grid grid-cols-2 mt-5 ">
              <div className="text-center space-y-3">
                <p className="text-md font-semibold">장소</p>
                <p className="text-md font-semibold">공연기간</p>
                <p className="text-md font-semibold">관람시간</p>
              </div>

              <div className="text-left space-y-3">
                <p className="text-md">{location || "샤롯데시어터"}</p>
                <p className="text-md w-60">
                  {startDate
                    ? `${startDate} - ${endDate}`
                    : "2025.05.30 - 2025.06.01"}
                </p>
                <p className="text-md">150분</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-5">
              <div className="text-right space-y-1">
                <p className="text-md">장르</p>
                <p className="text-md">아티스트</p>
                <p className="text-md"></p>
                <p className="text-md"></p>
              </div>

              <div className="text-left space-y-1">
                <p className="text-md font-semibold">페스티벌</p>
                <p className="text-md font-semibold">
                  윤도현 밴드, 하이라이트, 데이식스, nct127
                </p>
                <p className="text-md font-semibold"></p>
                <p className="text-md font-semibold"></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="ticketing_process_box"
        className="w-full max-w-4xl p-3 bg-white rounded-lg shadow-md border border-gray-300"
      >
        <div className="wrap_ticketing_process w-full p-5 flex space-x-8">
          <div className="box_ticketing_process flex-1">
            <dl className="date_choice">
              <dt className="tit_process tit_date_choice text-lg font-bold mb-4">
                날짜 선택
              </dt>
              <dd className="sorting flex space-x-4 mb-4">
                <button className="type_calendar bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  캘린더 보기
                </button>
                <button className="type_list bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                  리스트 보기
                </button>
              </dd>
              <dd className="cont_process">
                <div className="box_type_list" id="box_list_date">
                  <ul className="list_type space-y-2" id="list_date">
                    <li className="p-2 bg-white rounded-lg hover:bg-gray-100">
                      2025년 05월 24일 토요일
                    </li>
                    <li className="p-2 bg-white rounded-lg hover:bg-gray-100">
                      2025년 05월 25일 일요일
                    </li>
                  </ul>
                </div>
                <div className="box_type_calendar hidden" id="box_calendar">
                  <div className="box_date flex items-center justify-between my-4">
                    <button className="btn_calendar_prev text-gray-600 hover:text-gray-800">
                      이전
                    </button>
                    <p className="tit_date text-xl font-bold">
                      <span id="year_month">2025.5</span>
                    </p>
                    <button className="btn_calendar_next text-gray-600 hover:text-gray-800">
                      다음
                    </button>
                  </div>
                  <table className="calendar w-full border-collapse bg-white">
                    {/* 캘린더 테이블 구성 필요 */}
                  </table>
                </div>
              </dd>
            </dl>
          </div>

          <div className="box_ticketing_process flex-1">
            <dl className="time_choice">
              <dt className="tit_process tit_time_choice text-lg font-bold mb-4">
                <span>시간 선택</span>
              </dt>
              <dd className="cont_process">
                <ul className="list_time space-y-2">
                  <li className="p-2 bg-white rounded-lg hover:bg-gray-100">
                    18시 00분
                  </li>
                </ul>
              </dd>
            </dl>
          </div>

          <div className="box_ticketing_process flex-1">
            <dl className="seat_choice">
              <dt className="tit_process tit_seat_choice text-lg font-bold mb-4">
                <span>좌석 선택</span>
              </dt>
              <dd className="cont_process">
                <div className="box_type_list">
                  <p className="mb-2 font-semibold">선택한 회차별 좌석 현황</p>
                  <ul className="list_seat space-y-2">
                    <li className="flex justify-between items-center p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                      <span className="text-md">VIP</span>
                      <strong className="text-md text-red-500">
                        220,000원
                      </strong>
                    </li>
                    <li className="flex justify-between items-center p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                      <span className="text-md">R석</span>
                      <strong className="text-md text-red-500">
                        154,000원
                      </strong>
                    </li>
                    <li className="flex justify-between items-center p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                      <span className="text-md">S석</span>
                      <strong className="text-md text-red-500">
                        143,000원
                      </strong>
                    </li>
                  </ul>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
