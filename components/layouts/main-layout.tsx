// import Sidebar from "./sidebar";

import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      {children}
    </main>
  );
}
