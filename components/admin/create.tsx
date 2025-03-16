"use client";

import { useState } from "react";
import InputField from "./AdminInput";
import ImageUpload from "./ImageUpload";
import SubmitButton from "components/layouts/SubmitButton";

export default function Create() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [genre, setGenre] = useState("");
  const [location, setLocation] = useState("");
  const [runningTime, setRunningTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("/images/default-img.png");

  const onSavePerformance = () => {
    const formData = new FormData();
    const datas = {
      title: title,
      artist: artist,
      startDate: startDate,
      endDate: endDate,
      genre: genre,
      location: location,
      runningTime: runningTime,
      startTime: startTime,
      availableSeats: availableSeats,
    };
    formData.append(
      "PostDto",
      new Blob([JSON.stringify(datas)], {
        type: "application/json",
      })
    );
    if (file) formData.append("files", file);

    fetch("http://localhost:8080/api/contents/create", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        console.log("공연 등록 성공" + res);
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
              <InputField
                label="장르"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="K-POP"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <InputField
                label="시작 날짜"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <InputField
                label="종료 날짜"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                type="date"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <InputField
                label="시작 시간"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                type="time"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <InputField
                label="관람 시간"
                value={runningTime}
                onChange={(e) => setRunningTime(e.target.value)}
                placeholder="150(분)"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <InputField
                label="공연장"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="체조경기장"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <InputField
                label="이용 가능한 좌석 수"
                value={availableSeats}
                onChange={(e) => setAvailableSeats(e.target.value)}
                placeholder="20000(석)"
              />
            </div>
          </div>
        </div>
      </div>

      <SubmitButton onClick={onSavePerformance} text="등록하기" />
    </div>
  );
}
