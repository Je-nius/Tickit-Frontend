"use client";

import { useState } from "react";
import SignIn from "./signin";
import SignUp from "./signup";

export default function Auth() {
  const [view, setView] = useState("SIGNIN");
  return (
    <main className="h-screen w-screen flex items-center justify-center ">
      {view === "SIGNUP" ? (
        <SignUp setView={setView} />
      ) : (
        <SignIn setView={setView} />
      )}
    </main>
  );
}
