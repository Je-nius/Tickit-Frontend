"use client";

import {
  Stepper,
  Step,
  StepLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import PopupSidebar from "./PopupSidebar";

const steps = ["회차 선택", "가격 선택", "배송 결제"];
const Popup = () => {
  const [vipSeat, setVipSeat] = useState("");
  const [rSeat, setRSeat] = useState("");
  const [sSeat, setSSeat] = useState("");
  const [aSeat, setASeat] = useState("");
  const [stepStatus, setStepStatus] = useState<"queue" | "select" | "payment">(
    "queue"
  );
  //팝업 스텝으로 변경

  const handleVIPChange = (e) => {
    setVipSeat(e.target.value);
  };
  const handleRChange = (e) => {
    setRSeat(e.target.value);
  };
  const handleSChange = (e) => {
    setSSeat(e.target.value);
  };
  const handleAChange = (e) => {
    setASeat(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setStepStatus("select");
    }, 5000); // 예시용 5초

    return () => clearTimeout(timer);
  }, []);

  if (stepStatus === "queue") {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center ">
        <h1 className="font-bold text-2xl">
          뮤지컬 〈알라딘〉 한국 초연 (ALADDIN The Musical)
        </h1>
        <div className="flex flex-row space-x-3 mt-10">
          <p className="font-semibold text-xl text-white bg-red-500 rounded-2xl min-w-16 text-center">
            지연
          </p>
          <p className="font-semibold text-xl">가격 선택 진입 중</p>
        </div>

        <p className="font-bold text-4xl text-blue-600 mt-10">
          내 대기 순서 123456번째
        </p>
        <p className="font-medium text-2xl mt-4">
          뒤에 57명 / 123분 40초 소요 예상
        </p>
        <div className="mt-10">
          <Stepper activeStep={1} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        <div className="mt-10">
          <p className="text-gray-400">
            ∙ 현재 접속량이 많아 대기 중입니다. 잠시만 기다려 주시면 다음 단계로
            안전하게 자동 접속합니다.
          </p>
          <p>∙ 새로 고침하시면 순번이 뒤로 밀리니 주의해주세요.</p>
        </div>
      </div>
    );
  }
  if (stepStatus === "select") {
    return (
      <div className="flex flex-row w-full">
        <div className="flex flex-col w-[calc(100%-256px)]">
          {" "}
          <div className="flex justify-center items-center border-b border-gray-300 py-4">
            <span className="bg-blue-600 text-white rounded-2xl px-3 py-1 font-semibold">
              STEP 1
            </span>
            <span className="ml-2 font-bold text-2xl">가격 선택</span>
          </div>
          <div className="p-7">
            <span className="block mb-2 text-lg font-semibold">
              티켓가격을 선택하세요
            </span>

            <table className="w-full table-auto bg-white">
              <tbody>
                <tr className="border-b border-gray-200 ">
                  <td
                    colSpan={3}
                    className="w-full p-2 font-semibold bg-[rgba(198,213,255,0.3)]"
                  >
                    VIP
                  </td>
                </tr>
                <tr>
                  <td className="p-2 w-1/6">기본가</td>
                  <td className="p-2 text-right w-4/6 font-semibold">
                    190,000원
                  </td>
                  <td className="p-2 w-1/6">
                    <select
                      value={vipSeat}
                      onChange={handleVIPChange}
                      className="border border-gray-300 rounded-md p-1 outline-none w-full max-w-[80px] "
                    >
                      <option value="">0매</option>
                      <option value="1">1매</option>
                      <option value="2">2매</option>
                      <option value="3">3매</option>
                    </select>
                  </td>
                </tr>

                <tr className="border-b border-gray-200">
                  <td
                    colSpan={3}
                    className="w-full p-2 font-semibold bg-[rgba(198,213,255,0.3)]"
                  >
                    R
                  </td>
                </tr>
                <tr>
                  <td className="p-2">기본가</td>
                  <td className="p-2 text-right font-semibold">160,000원</td>
                  <td className="p-2">
                    <select
                      value={rSeat}
                      onChange={handleRChange}
                      className="border border-gray-300 rounded-md p-1 outline-none w-20"
                    >
                      <option value="">0매</option>
                      <option value="1">1매</option>
                      <option value="2">2매</option>
                      <option value="3">3매</option>
                    </select>
                  </td>
                </tr>

                <tr className="border-b border-gray-200">
                  <td
                    colSpan={3}
                    className="w-full p-2 font-semibold bg-[rgba(198,213,255,0.3)]"
                  >
                    S
                  </td>
                </tr>
                <tr>
                  <td className="p-2">기본가</td>
                  <td className="p-2 text-right font-semibold">130,000원</td>
                  <td className="p-2">
                    <select
                      value={sSeat}
                      onChange={handleSChange}
                      className="border border-gray-300 rounded-md p-1 outline-none w-20"
                    >
                      <option value="">0매</option>
                      <option value="1">1매</option>
                      <option value="2">2매</option>
                      <option value="3">3매</option>
                    </select>
                  </td>
                </tr>

                <tr className="border-b border-gray-200">
                  <td
                    colSpan={3}
                    className="w-full p-2 font-semibold bg-[rgba(198,213,255,0.3)]"
                  >
                    A
                  </td>
                </tr>
                <tr>
                  <td className="p-2">기본가</td>
                  <td className="p-2 text-right font-semibold">90,000원</td>
                  <td className="p-2">
                    <select
                      value={aSeat}
                      onChange={handleAChange}
                      className="border border-gray-300 rounded-md p-1 outline-none w-20"
                    >
                      <option value="">0매</option>
                      <option value="1">1매</option>
                      <option value="2">2매</option>
                      <option value="3">3매</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-64">
          <PopupSidebar />
        </div>
      </div>
    );
  }
};

export default Popup;
