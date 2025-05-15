"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { components } from "src/types/schema";

type PerformanceDetailResponseDto =
  components["schemas"]["PerformanceDetailResponseDto"];
type ScheduleWithSeatsDto = components["schemas"]["ScheduleWithSeatsDto"];

export default function DetailTable() {
  const [data, setData] = useState<PerformanceDetailResponseDto | null>(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [poster, setPoster] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [runningTime, setRunningTime] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showTimes, setShowTimes] = useState([]);

  const performanceDetail = data;

  const params = useParams();
  const performanceId = params.performanceId;

  const HandleTicketing = () => {
    const selectedData = {
      date: selectedDate,
      time: selectedTime,
      title: title,
      seats: selectedSeats.map((seat) => ({
        seatType: seat.seatType,
        price: seat.price,
      })),
    };
    localStorage.setItem("selectedData", JSON.stringify(selectedData));

    const popup = window.open(
      "http://localhost:3000/popup",
      "_blank",
      "width=1000,height=600"
    );

    if (popup) {
      popup.focus();
    }
  };

  useEffect(() => {
    // console.log(performanceId);
    console.log("selectedDate:", selectedDate);
    console.log("selectedTime:", selectedTime);
    const fetchDetail = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(`/api/contents/detail`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ performanceId }),
        });

        if (response.ok) {
          const jsonData: PerformanceDetailResponseDto = await response.json();
          setData(jsonData);
          console.log("상세 데이터:", jsonData);
          setTitle(jsonData.title);
          setLocation(jsonData.location);
          setStartDate(jsonData.startDate);
          setEndDate(jsonData.endDate);
          setPoster(jsonData.posterUrl);
          setArtist(jsonData.artists);
          setGenre(jsonData.genre);
          setRunningTime(jsonData.runningTime);
        } else {
          console.error("요청 실패: ", response.status);
        }
      } catch (error) {
        console.error("에러: ", error);
      }
    };

    if (performanceId) {
      // console.log("performanceId:", performanceId);
      fetchDetail();
    }
  }, [performanceId, selectedDate, selectedTime]);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null); // 날짜 바꾸면 시간 초기화
    // console.log("selectedDate:", selectedDate);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    // console.log("selectedTime:", selectedTime);
  };

  const dateList = performanceDetail?.scheduleWithSeatsDtos?.map((dto) => {
    const date = new Date(dto.schedule.performanceDate);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  });

  // timeList 생성 부분에서 startTime을 변환
  const timeList = performanceDetail?.scheduleWithSeatsDtos
    .filter((dto) => {
      const date = new Date(dto.schedule.performanceDate);
      const formatted = date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      });
      return formatted === selectedDate;
    })
    .map((dto) => {
      const startTime = dto.schedule.startTime as string;
      if (typeof startTime === "string") {
        const [hour, minute] = startTime.split(":");
        return `${hour}시 ${minute}분`; // HH:MM 형식으로 변환
      }
      return "";
    })
    .filter((time) => time !== ""); // 빈 문자열 제거

  // 선택한 날짜 + 시간에 따른 좌석 데이터
  const selectedSeats =
    performanceDetail?.scheduleWithSeatsDtos.find((dto) => {
      const date = new Date(dto.schedule.performanceDate);
      const formattedDate = date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      });
      const startTime = String(dto.schedule.startTime);
      const [hour, minute] = startTime.split(":");
      const formattedTime = `${hour}시 ${minute}분`;
      return formattedDate === selectedDate && formattedTime === selectedTime;
    })?.seats || [];

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center ">
      <div className="flex flex-row justify-center mt-24 2xl:mt-10 w-full max-w-4xl bg-white p-6 rounded-md shadow-md">
        {/* <img src={poster || "/images/peak.jpeg"} /> */}
        <img
          src={`http://localhost:8080/performance_poster/${
            poster.split("/performance_poster")[1]
          }`}
          alt="poster"
          className="w-46 h-65"
        />
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
                <p className="text-md">{location}</p>
                <p className="text-md w-60">
                  {startDate} - {endDate}
                </p>
                <p className="text-md">{runningTime}분</p>
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
                <p className="text-md font-semibold">{genre}</p>
                <p className="text-md font-semibold">{artist}</p>
                <p className="text-md font-semibold"></p>
                <p className="text-md font-semibold"></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="ticketing_process_box"
        className="w-full max-w-4xl p-3 bg-white rounded-md shadow-md border border-gray-300"
      >
        <div className="wrap_ticketing_process w-full p-5 flex space-x-8">
          <div className="box_ticketing_process flex-1">
            <dl className="date_choice">
              <dt className="tit_process tit_date_choice text-lg font-bold mb-4">
                날짜 선택
              </dt>

              <dd className="cont_process">
                <div className="box_type_list" id="box_list_date">
                  <ul className="list_type space-y-2" id="list_date">
                    {(dateList ?? []).map((date, index) => (
                      <li
                        key={index}
                        className={`p-2 rounded-lg hover:bg-gray-100 ${
                          selectedDate === date
                            ? "bg-blue-500 text-white"
                            : "bg-white"
                        }`}
                        onClick={() => handleDateClick(date)}
                      >
                        {date}
                      </li>
                    ))}
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
                  {(timeList ?? []).map((time, index) => (
                    <li
                      key={index}
                      className={`p-2 rounded-lg hover:bg-gray-100 ${
                        selectedTime === time
                          ? "bg-blue-500 text-white"
                          : "bg-white"
                      }`}
                      onClick={() => handleTimeClick(time)}
                    >
                      {time}
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
          </div>

          <div className="box_ticketing_process flex-1">
            <dl className="seat_choice">
              <dd className="cont_process">
                <div className="box_type_list">
                  <p className="mb-2 font-semibold">선택한 회차별 좌석 현황</p>
                  <ul className="list_seat space-y-2">
                    {selectedSeats.map((seat, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                      >
                        <span className="text-md">{seat.seatType}</span>
                        <span className="text-md text-gray-500">
                          {seat.remainingSeats}석
                        </span>
                        <strong className="text-md text-red-500">
                          {seat.price.toLocaleString()}원
                        </strong>
                      </li>
                    ))}
                  </ul>
                </div>
              </dd>
            </dl>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <button
            className="px-24 h-10 text-md rounded-sm text-lg font-medium cursor-pointer mr-5 ml-auto"
            style={{ backgroundColor: "#026DFF", color: "white" }}
            onClick={HandleTicketing}
          >
            예매하기
          </button>
        </div>
      </div>
    </div>
  );
}
