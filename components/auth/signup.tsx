import { Button } from "node_modules/@material-tailwind/react";
import { useState } from "react";

export default function SignUp({ setView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <div className="pt-10 pb-6 px-10 w-full flex flex-col items-center justify-center max-w-lg border border-gray-400 bg-white gap-2">
        <img src={"/images/tickit_logo.png"} className="w-60 mb-6" />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="w-full rounded-sm"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="w-full rounded-sm"
        />
        <button
          onClick={() => {
            console.log("signup");
          }}
          className="w-full text-md py-1"
          style={{ backgroundColor: "#026DFF", color: "white" }}
        >
          가입하기
        </button>
      </div>

      <div className="py-4 w-full text-center max-w-lg border border-gray-400 bg-white">
        이미 계정이 있으신가요?{" "}
        <button
          className="text-md font-bold underline text-blue-600"
          onClick={() => setView("SIGNUP")}
        >
          로그인하기
        </button>
      </div>
    </div>
  );
}
