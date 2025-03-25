"use client";

import { Stepper, Step, StepLabel } from "@mui/material";

const steps = ["회차 선택", "가격 선택", "배송 결제"];
const Popup = () => {
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
};

export default Popup;
