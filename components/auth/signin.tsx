import { useState } from "react";
import { InputAdornment, IconButton, TextField } from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  AccountCircle,
  Lock,
} from "@mui/icons-material";

interface SignInInterface {
  id: string;
  password: string;
}

export default function SignIn({ setView }) {
  const [id, setId] = useState<SignInInterface["id"]>("");
  const [password, setPassword] = useState<SignInInterface["password"]>("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const Loginbtn = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login_id: id,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("로그인 성공:", result);
      })
      .catch((error) => {
        console.error("로그인 실패:", error);
      });
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="pt-10 pb-6 px-10 w-full flex flex-col items-center justify-center max-w-lg bg-white">
        <img src={"/images/tickit_logo.png"} className="w-60 mb-6" />

        <TextField
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
            sx: {
              borderRadius: "8px 8px 0 0",
              "&.Mui-focused fieldset": {
                borderColor: "transparent",
              },
            },
          }}
          variant="outlined"
          className="mb-4"
        />

        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              borderRadius: "0 0 8px 8px",
              "&.Mui-focused fieldset": {
                borderColor: "transparent",
              },
            },
          }}
          fullWidth
        />

        <button
          onClick={() => {
            Loginbtn;
          }}
          className="w-full mt-4 h-12 text-md rounded-md text-xl cursor-pointer"
          style={{ backgroundColor: "#026DFF", color: "white" }}
        >
          로그인
        </button>

        <img
          src={"/images/kakao_login.png"}
          onClick={() => {
            console.log("kakao login");
          }}
          className="w-full mt-2 h-12 object-contain cursor-pointer"
        />
      </div>

      <div className=" w-full text-center max-w-lg">
        <button
          className="font-semibold outline-none cursor-pointer"
          onClick={() => setView("SIGNIN")}
          style={{ color: "#A4A1A1" }}
        >
          아이디 찾기
        </button>
        <span style={{ color: "#A4A1A1" }}> | </span>
        <button
          className="font-semibold outline-none cursor-pointer"
          onClick={() => setView("SIGNIN")}
          style={{ color: "#A4A1A1" }}
        >
          비밀번호 찾기
        </button>
        <span style={{ color: "#A4A1A1" }}> | </span>
        <button
          className="font-semibold outline-none cursor-pointer"
          onClick={() => setView("SIGNUP")}
          style={{ color: "#026DFF" }}
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
