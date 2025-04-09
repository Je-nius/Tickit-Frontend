"use client";

import { useState, useEffect } from "react";
import SignIn from "./signin";
import SignUp from "./signup";
import MainLayout from "components/layouts/main-layout";

export default function Auth({ children }: { children?: React.ReactNode }) {
  const [view, setView] = useState("SIGNIN");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  if (isLoggedIn) {
    return <MainLayout>{children}</MainLayout>;
  }

  return (
    <main className="h-screen w-screen flex items-center justify-center">
      {view === "SIGNUP" ? (
        <SignUp setView={setView} />
      ) : (
        <SignIn setView={setView} />
      )}
    </main>
  );
}
