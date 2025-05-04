"use client";

export default function LogoutButton() {
  return (
    <button
      onClick={async () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        window.location.href = "/";
      }}
      className="text-sm md:text-lg font-bold text-red-400 cursor-pointer"
    >
      로그아웃
    </button>
  );
}
