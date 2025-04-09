import { useState } from "react";
import InputField from "./InputField";
import AuthButton from "./AuthButton";
import { components } from "src/types/schema";

type SignUpRequest = components["schemas"]["UserCreateRequestDto"];
type SignUpResponse = components["schemas"]["UserCreateResponseDto"];

export default function SignUp({ setView }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [usableid, setUsableID] = useState(false);

  const idValidation = () => {
    fetch("http://localhost:8080/api/verify/id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loginId: id,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          setUsableID(true);
        }
      })
      .catch((error) => {
        console.log("아이디 중복", error);
      });
  };

  const handleSignUp = (e) => {
    const signUpData: SignUpRequest = {
      loginId: id,
      password,
      username: name,
      email,
      birth,
      phoneNumber: phone,
    };
    e.preventDefault();
    fetch("http://localhost:8080/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpData),
    })
      .then(async (response) => {
        console.log("응답 상태코드:", response.status);
        if (!response.ok) {
          const errorText = await response.text();
          console.error("회원가입 실패 응답 본문:", errorText);
          throw new Error("회원가입 실패");
        }
        return response.json() as Promise<SignUpResponse>;
      })
      .then((result) => {
        console.log("회원가입 성공:", result);
      })
      .catch((error) => {
        console.error("회원가입 실패:", error);
      });
  };

  return (
    <div className="flex flex-col gap-1 ">
      <header className="w-full bg-white  fixed top-0 left-0 z-10">
        <div className="flex items-center justify-between px-10 py-5 border-b border-gray-200">
          <img
            src="/images/tickit-logo.png"
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
          onButtonClick={idValidation}
        />

        <InputField
          label="비밀번호"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          label="생년월일"
          id="birth"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
          placeholder="20000228"
          type="date"
        />

        <InputField
          label="전화번호"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="010 1234 5678"
        />

        <InputField
          label="이메일"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tickit@naver.com"
        />

        <button
          onClick={handleSignUp}
          className="w-full mt-4 h-12 text-md rounded-md text-xl cursor-pointer"
          style={{ backgroundColor: "#026DFF", color: "white" }}
        >
          가입완료
        </button>
      </div>
    </div>
  );
}
