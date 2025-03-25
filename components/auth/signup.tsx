import { useState } from "react";
import InputField from "./InputField";
import AuthButton from "./AuthButton";

interface SignUpInterface {
  id: string;
  password: string;
  name: string;
  phone: string;
  email: string;
  birth: Date;
}

export default function SignUp({ setView }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [usableid, setUsableID] = useState(false);

  const idValidation = () => {
    fetch("http://localhost:3000/api/verify/id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login_id: id,
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
    const birthDate = new Date(birth);
    const signUpData: SignUpInterface = {
      id,
      password,
      name,
      phone,
      email,
      birth: birthDate,
    };
    e.preventDefault();
    fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login_id: signUpData.id,
        password: signUpData.password,
        username: signUpData.name,
        phone_number: signUpData.phone,
        email: signUpData.email,
        birth: signUpData.birth,
      }),
    })
      .then((response) => response.json())
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
          onClick={() => {
            handleSignUp;
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
