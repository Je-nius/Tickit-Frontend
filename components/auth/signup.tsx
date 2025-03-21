import { useState } from "react";
import InputField from "./InputField";
import AuthButton from "./AuthButton";

export default function SignUp({ setView }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRePassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleEmailVerification = () => {
    console.log("이메일 인증하기");
  };
  const handleIDsearch = () => {
    console.log("중복 아이디 조회");
  };

  return (
    <div className="flex flex-col gap-1 ">
      <header className="w-full bg-white  fixed top-0 left-0 z-10">
        <div className="flex items-center justify-between px-10 py-5 border-b border-gray-200">
          <img
            src="/images/tickit_logo.png"
            alt="Logo"
            className="w-40  cursor-pointer"
            onClick={() => setView("SIGNIN")}
          />
          <span>정보입력</span>
        </div>
      </header>
      <div className="pt-23 px-10 w-full flex flex-col items-center justify-center max-w-lg bg-white">
        <AuthButton
          label="아이디"
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="6 ~ 12자 영문, 숫자"
          buttonText="중복조회"
          onButtonClick={handleIDsearch}
        />

        <InputField
          label="비밀번호"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="6 ~ 12자 영문, 숫자"
        />

        <InputField
          label="비밀번호 확인"
          id="password"
          value={re_password}
          onChange={(e) => setRePassword(e.target.value)}
          placeholder="6 ~ 12자 영문, 숫자"
        />

        <InputField
          label="이름"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="홍길동"
        />

        <InputField
          label="전화번호"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="010 1234 5678"
        />

        <AuthButton
          label="이메일"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tickit@naver.com"
          buttonText="인증하기"
          onButtonClick={handleEmailVerification}
        />

        <InputField
          label="인증번호"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="123456"
        />

        <button
          onClick={() => {
            console.log("signin");
          }}
          className="w-full mt-4 h-12 text-md rounded-md text-xl cursor-pointer"
          style={{ backgroundColor: "#026DFF", color: "white" }}
        >
          가입완료
        </button>
      </div>
    </div>
  );
}
