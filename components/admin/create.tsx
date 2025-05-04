"use client";

import { useState } from "react";
import InputField from "./AdminInput";
import ImageUpload from "./ImageUpload";
import SubmitButton from "components/layouts/SubmitButton";
import { components } from "src/types/schema";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export default function Create() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState<Genre>("CONCERT");
  const [location, setLocation] = useState("");
  const [runningTime, setRunningTime] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("/images/default-img.png");
  const [seatZones, setSeatZones] = useState<UISeatZone[]>([
    { zoneName: "", seatCount: 0, zoneType: "STANDARD" },
  ]);
  const GENRE_OPTIONS = ["CONCERT", "MUSICAL", "FESTIVAL", "SPORTS"] as const;
  const [typePrices, setTypePrices] = useState<{
    VIP: number;
    STANDARD: number;
  }>({ VIP: 0, STANDARD: 0 });
  const [schedules, setSchedules] = useState<PerformanceScheduleDto[]>([
    { performanceDate: "", startTime: { hour: 0, minute: 0 } },
  ]);

  type PerformanceScheduleDto = components["schemas"]["PerformanceScheduleDto"];
  type PerformanceCreateRequest =
    components["schemas"]["PerformanceCreateRequestDto"];
  type SeatConfig = components["schemas"]["SeatCreateDto"];
  type Genre = (typeof GENRE_OPTIONS)[number];
  type UISeatZone = {
    zoneName: string;
    seatCount: number;
    zoneType: "VIP" | "STANDARD";
  };

  const generateSeatConfig = () => {
    const seatConfig: SeatConfig = {
      zoneSeatNumber: {},
      zoneType: {},
      typePrice: {
        VIP: typePrices.VIP,
        STANDARD: typePrices.STANDARD,
      },
    };

    seatZones.forEach((zone) => {
      const { zoneName, seatCount, zoneType } = zone;
      seatConfig.zoneSeatNumber![zoneName] = seatCount;
      seatConfig.zoneType![zoneName] = zoneType as "VIP" | "STANDARD";
    });

    return seatConfig;
  };

  const formattedSchedules = schedules.map((s) => ({
    performanceDate: s.performanceDate,
    startTime: `${String(s.startTime.hour).padStart(2, "0")}:${String(
      s.startTime.minute
    ).padStart(2, "0")}`,
  }));

  const onSavePerformance = () => {
    let calculatedStartDate = "";
    let calculatedEndDate = "";
    if (schedules.length > 0) {
      const dates = schedules
        .map((s) => s.performanceDate)
        .filter((d) => d)
        .sort();

      if (dates.length > 0) {
        calculatedStartDate = dates[0];
        calculatedEndDate = dates[dates.length - 1];
      }
    }
    const seatConfig = generateSeatConfig();
    const formData = new FormData();
    const datas: PerformanceCreateRequest = {
      title,
      artists: artist,
      startDate: calculatedStartDate,
      endDate: calculatedEndDate,
      genre,
      location,
      runningTime: Number(runningTime),
      schedules: formattedSchedules as any,
      seatConfig,
    };

    //console.log("보내는 데이터:", file);
    console.log("보내는 데이터:", datas);

    formData.append(
      "createRequestDto",
      new Blob([JSON.stringify(datas)], {
        type: "application/json",
      })
    );
    if (file) formData.append("poster", file);
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("로그인이 필요합니다!");
      return;
    }

    fetch("/api/contents/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          alert("공연 등록이 완료되었습니다!");
          setTitle("");
          setArtist("");
          setGenre("CONCERT");
          setLocation("");
          setRunningTime("");
          setFile(null);
          setPreview("/images/default-img.png");
          setSeatZones([{ zoneName: "", seatCount: 0, zoneType: "STANDARD" }]);
          setTypePrices({ VIP: 0, STANDARD: 0 });
          setSchedules([
            { performanceDate: "", startTime: { hour: 0, minute: 0 } },
          ]);
        } else {
          alert("공연 등록에 실패했습니다.");
        }
      })
      .catch((err) => {
        console.log(err + "공연 등록 오류");
      });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h1 className="font-bold text-3xl mb-6">공연 등록하기</h1>
      <div className="flex gap-6">
        <ImageUpload
          preview={preview}
          setPreview={setPreview}
          setFile={setFile}
        />

        <div className="w-2/3 flex flex-col gap-4">
          <InputField
            label="공연명"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="하이라이트-하이마트로 가요."
          />
          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <InputField
                label="아티스트"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="하이라이트"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-lg font-semibold mb-1">장르</label>
              <select
                className="h-12 px-4 text-lg outline-none border border-gray-300 rounded-md"
                value={genre}
                onChange={(e) => setGenre(e.target.value as Genre)}
              >
                {GENRE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <InputField
                label="관람 시간"
                value={runningTime}
                onChange={(e) => setRunningTime(e.target.value)}
                placeholder="150(분)"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <InputField
                label="공연장"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="체조경기장"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-lg font-semibold">공연 일정</label>
            {schedules.map((schedule, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex flex-col w-1/2">
                  <label className="text-sm font-medium mb-1">날짜</label>
                  <input
                    type="date"
                    value={schedule.performanceDate || ""}
                    onChange={(e) => {
                      const newSchedules = [...schedules];
                      newSchedules[index].performanceDate = e.target.value;
                      setSchedules(newSchedules);
                    }}
                    className="h-12 px-4 text-lg outline-none border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="text-sm font-medium mb-1">시간</label>
                  <input
                    type="time"
                    value={`${
                      schedule.startTime?.hour?.toString().padStart(2, "0") ||
                      "00"
                    }:${
                      schedule.startTime?.minute?.toString().padStart(2, "0") ||
                      "00"
                    }`}
                    onChange={(e) => {
                      const [hour, minute] = e.target.value
                        .split(":")
                        .map(Number);
                      const newSchedules = [...schedules];
                      newSchedules[index].startTime = { hour, minute };
                      setSchedules(newSchedules);
                    }}
                    className="h-12 px-4 text-lg outline-none border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newSchedules = schedules.filter(
                      (_, i) => i !== index
                    );
                    setSchedules(newSchedules);
                  }}
                  className="text-red-500 w-8 mt-6"
                >
                  <RemoveCircleOutlineIcon />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setSchedules([
                  ...schedules,
                  { performanceDate: "", startTime: { hour: 0, minute: 0 } },
                ])
              }
              className="text-blue-600 mt-2"
            >
              + 일정 추가
            </button>
          </div>

          <div className="flex gap-4">
            {/* <div className="flex flex-col w-1/2">
              <InputField
                label="이용 가능한 좌석 수"
                value={availableSeats}
                onChange={(e) => setAvailableSeats(e.target.value)}
                placeholder="20000(석)"
              />
            </div> */}
          </div>
          {seatZones.map((zone, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <div className="w-1/3">
                <InputField
                  label="구역명"
                  value={zone.zoneName}
                  onChange={(e) => {
                    const newZones = [...seatZones];
                    newZones[index].zoneName = e.target.value;
                    setSeatZones(newZones);
                  }}
                  placeholder="A"
                />
              </div>
              <div className="w-1/3">
                <InputField
                  label="좌석 수"
                  value={zone.seatCount.toString()}
                  onChange={(e) => {
                    const newZones = [...seatZones];
                    newZones[index].seatCount = Number(e.target.value);
                    setSeatZones(newZones);
                  }}
                  type="number"
                  placeholder="200"
                />
              </div>
              <div className="w-1/3 flex flex-col">
                <label className="text-lg font-semibold mb-1">구역 타입</label>
                <select
                  className="h-12 px-4 text-lg outline-none border border-gray-300 rounded-md"
                  value={zone.zoneType}
                  onChange={(e) => {
                    const newZones = [...seatZones];
                    newZones[index].zoneType = e.target.value as
                      | "VIP"
                      | "STANDARD";
                    setSeatZones(newZones);
                  }}
                >
                  <option value="VIP">VIP</option>
                  <option value="STANDARD">STANDARD</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newZones = seatZones.filter((_, i) => i !== index);
                  setSeatZones(newZones);
                }}
                className="mt-6 text-red-500 w-10"
              >
                <RemoveCircleOutlineIcon />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setSeatZones([
                ...seatZones,
                { zoneName: "", seatCount: 0, zoneType: "STANDARD" },
              ])
            }
            className="text-blue-600 mt-2"
          >
            + 구역 추가
          </button>
          <div className="flex gap-4 mt-4">
            <div className="flex flex-col w-1/2">
              <InputField
                label="VIP 가격"
                value={typePrices.VIP.toString()}
                onChange={(e) =>
                  setTypePrices({ ...typePrices, VIP: Number(e.target.value) })
                }
                placeholder="150000"
                type="number"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <InputField
                label="STANDARD 가격"
                value={typePrices.STANDARD.toString()}
                onChange={(e) =>
                  setTypePrices({
                    ...typePrices,
                    STANDARD: Number(e.target.value),
                  })
                }
                placeholder="80000"
                type="number"
              />
            </div>
          </div>
        </div>
      </div>

      <SubmitButton onClick={onSavePerformance} text="등록하기" />
    </div>
  );
}
