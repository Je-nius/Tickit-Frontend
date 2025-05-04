import { useState } from "react";
import { InputAdornment, IconButton, TextField } from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  AccountCircle,
  Lock,
} from "@mui/icons-material";
import { components } from "src/types/schema";
import { jwtDecode } from "jwt-decode";
type SignInRequest = components["schemas"]["LoginRequestDto"];
type SignInResponse = components["schemas"]["TokenResponse"];

export default function SignIn({ setView }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const Loginbtn = (e) => {
    const signInData: SignInRequest = {
      loginId: id,
      password,
    };
    e.preventDefault();
    fetch("api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("로그인 실패");
        }
        return response.json();
      })

      .then((result) => {
        console.log("로그인 성공:", result);
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);
        const decoded = jwtDecode<{ sub: string; Auth: string; exp: number }>(
          result.accessToken
        );

        if (decoded.Auth === "ROLE_ADMIN") {
          window.location.href = "/admin/create-performance";
        } else {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.error("로그인 실패:", error.message || error);
        alert("아이디 또는 비밀번호를 다시 확인해주세요.");
      });
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="pt-10 pb-6 px-10 w-full flex flex-col items-center justify-center max-w-lg bg-white">
        <img src={"/images/tickit-logo.png"} className="w-60 mb-6" />

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
          onClick={Loginbtn}
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
