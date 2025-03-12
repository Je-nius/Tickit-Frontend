"use client";

// import { Button } from "node_modules/@material-tailwind/react";
// import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function LogoutButton() {
  return (
    <button
      onClick={async () => {
        //supabase.auth.signOut();
      }}
      color="red"
    >
      로그아웃
    </button>
  );
}
