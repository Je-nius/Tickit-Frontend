"use client";

import {
  Stepper,
  Step,
  StepLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import PopupSidebar from "./PopupSidebar";
import { title } from "process";

const steps = ["회차 선택", "가격 선택", "배송 결제"];
const Popup = () => {
  const [stepStatus, setStepStatus] = useState<"queue" | "select" | "payment">(
    "queue"
  );
  const [selectedData, setSelectedData] = useState<any>(null);
  const [seatCounts, setSeatCounts] = useState<{ [seatType: string]: string }>(
    {}
  );
  const [deliveryMethod, setDeliveryMethod] = useState<string>("Direct");

  const handleSelectChange = (seatType: string, value: string) => {
    const updated = {
      ...seatCounts,
      [seatType]: value,
    };
    setSeatCounts(updated);

    localStorage.setItem("seatCounts", JSON.stringify(updated));
    window.dispatchEvent(new Event("seatCountsUpdated"));
  };

  const handleDeliveryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const method = event.target.value;
    setDeliveryMethod(method);

    const deliveryFee = method === "Shipping" ? 3000 : 0; // 배송 방법에 따라 배송료 설정
    localStorage.setItem("deliveryFee", deliveryFee.toString());
    window.dispatchEvent(new Event("deliveryFeeUpdated")); // 배송료가 업데이트 되었음을 사이드바에 알림
  };

  const phoneNumber = "01012345678"; //서버에서 전화번호 받기
  const splitNumber = [
    phoneNumber.slice(0, 3),
    phoneNumber.slice(3, 7),
    phoneNumber.slice(7),
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setStepStatus("select");
    }, 5000); // 예시용 5초

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const data = localStorage.getItem("selectedData");

    if (data) {
      setSelectedData(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.removeItem("selectedData");
      localStorage.removeItem("seatCounts");
      localStorage.removeItem("deliveryFee");
    };

    window.addEventListener("beforeunload", clearLocalStorage);

    return () => {
      window.removeEventListener("beforeunload", clearLocalStorage);
    };
  }, []);

  if (stepStatus === "queue") {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center ">
        <h1 className="font-bold text-2xl">{selectedData?.title}</h1>
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
              {/* <tbody>
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
              </tbody> */}
              <tbody>
                {selectedData.seats.map((seat, index) => (
                  <>
                    <tr
                      className="border-b border-gray-200 "
                      key={`type-${index}`}
                    >
                      <td
                        colSpan={3}
                        className="w-full p-2 font-semibold bg-[rgba(198,213,255,0.3)]"
                      >
                        {seat.seatType}
                      </td>
                    </tr>
                    <tr key={`price-${index}`}>
                      <td className="p-2 w-1/6">기본가</td>
                      <td className="p-2 text-right w-4/6 font-semibold">
                        {seat.price.toLocaleString()}원
                      </td>
                      <td className="p-2 w-1/6">
                        <select
                          value={seatCounts[seat.seatType] || ""}
                          onChange={(e) =>
                            handleSelectChange(seat.seatType, e.target.value)
                          }
                          className="border border-gray-300 rounded-md p-1 outline-none w-full max-w-[80px]"
                        >
                          <option value="">0매</option>
                          <option value="1">1매</option>
                          <option value="2">2매</option>
                          <option value="3">3매</option>
                        </select>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-64">
          <PopupSidebar stepStatus={stepStatus} setStepStatus={setStepStatus} />
        </div>
      </div>
    );
  }
  if (stepStatus === "payment") {
    return (
      <div className="flex flex-row w-full justify-center">
        <div className="flex flex-col w-[calc(100%-256px)]">
          <div className="flex justify-center items-center border-b border-gray-300 py-4">
            <span className="bg-blue-600 text-white rounded-2xl px-3 py-1 font-semibold">
              STEP 2
            </span>
            <span className="ml-2 font-bold text-2xl">배송/결제</span>
          </div>
          <div className="py-3 px-6">
            <span className="font-bold text-lg">수령방법을 선택하세요</span>
            <div className="px-2">
              <RadioGroup
                row
                value={deliveryMethod}
                onChange={handleDeliveryChange}
              >
                <FormControlLabel
                  value="Direct"
                  control={<Radio />}
                  label="현장수령"
                />
                <FormControlLabel
                  value="Shipping"
                  control={<Radio />}
                  label="배송(3,000원)"
                />
              </RadioGroup>
              <div className="bg-gray-100 p-4 mt-2">
                <span>주문자정보</span>
                <div className="flex flex-row space-x-4 p-2">
                  <div className="space-x-2 text-sm">
                    <span>이름</span>
                    <span>김지유</span>
                  </div>
                  <div className="space-x-2 text-sm">
                    <span>연락처</span>
                    {splitNumber.map((num, idx) => (
                      <span
                        key={idx}
                        className="bg-white text-gray-500 px-2 py-0.4 border border-gray-300"
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                  <div className="space-x-2 text-sm">
                    <span>이메일</span>
                    <span className="bg-white text-gray-500 px-2 border border-gray-300">
                      tickit@naver.com
                    </span>
                  </div>
                </div>
                <span className="text-xs">
                  입력하신 정보는 공연장에서 예매확인을 위해 사용될 수 있습니다.
                </span>
              </div>
            </div>
          </div>
          <div className="px-6 py-1">
            <span className="font-bold text-lg">결제수단을 선택하세요</span>
            <div className="flex flex-col px-2">
              <RadioGroup row>
                <FormControlLabel
                  value="credit"
                  control={<Radio />}
                  label="신용카드"
                />
                <FormControlLabel
                  value="Bank"
                  control={<Radio />}
                  label="무통장입금"
                />
                <FormControlLabel
                  value="kakaopay"
                  control={<Radio />}
                  label="카카오페이"
                />
              </RadioGroup>
            </div>
          </div>
        </div>
        <div className="w-64">
          <PopupSidebar stepStatus={stepStatus} setStepStatus={setStepStatus} />
        </div>
      </div>
    );
  }
};

export default Popup;
