"use client";

import SubmitButton from "components/layouts/SubmitButton";
import { useState } from "react";

export default function ChangePW() {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="font-bold text-2xl">비밀번호 변경</h1>
      <div className="flex flex-col gap-2 p-2 rounded-lg">
        <h1 className="text-lg font-semibold">이메일</h1>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tickit@naver.com"
          className="w-full h-12 px-4 text-lg outline-none border border-gray-400 rounded-sm"
        />

        <h1 className="text-lg font-semibold">아이디</h1>
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="tickit"
          className="w-full h-12 px-4 text-lg outline-none border border-gray-400 rounded-sm"
        />
      </div>
      <div className="mt-4 w-full flex justify-center">
        <button
          className="w-50 h-10 text-md rounded-sm text-lg font-medium cursor-pointer "
          style={{ backgroundColor: "#026DFF", color: "white" }}
        >
          확인
        </button>
      </div>
      {/* <SubmitButton onClick={onSavePerformance} text="등록하기" /> */}
    </div>
  );
}
