"use client";

import { useState } from "react";
import { InputAdornment, IconButton, TextField } from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  AccountCircle,
  Lock,
} from "@mui/icons-material";

export default function Delete() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const deleteAccount = (e) => {
    e.preventDefault();
    const deleteData = {
      password: password,
    };

    fetch("/api/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteData),
    })
      .then((response) => {
        if (response.ok) {
          alert("회원탈퇴가 완료되었습니다.");
          window.location.href = "/";
        } else {
          alert("회원탈퇴에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="font-bold text-2xl">회원탈퇴</h1>
      <div className="flex flex-col gap-2 p-2 rounded-lg">
        <h1 className="text-lg font-semibold text-red-500">
          탈퇴 시 모든 정보들이 삭제됩니다.
        </h1>
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          placeholder="현재 비밀번호"
          variant="outlined"
          InputProps={{
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
          }}
          fullWidth
        />
      </div>
      <div className="mt-4 w-full flex justify-center">
        <button
          onClick={deleteAccount}
          className="w-50 h-10 text-md rounded-sm text-lg font-medium cursor-pointer "
          style={{ backgroundColor: "#026DFF", color: "white" }}
        >
          확인
        </button>
      </div>
    </div>
  );
}
