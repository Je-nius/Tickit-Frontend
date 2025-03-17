"use client";

import HomeHeader from "components/layouts/HomeHeader";
import HomeNav from "components/home/HomeNav";
import PauseOnHover from "components/home/PauseOnHover";

export default function HomeUI() {
  return (
    <div className="w-full h-screen flex flex-col">
      <HomeHeader />

      <div className="flex-1 flex flex-col pt-22">
        <div className="w-full">
          <HomeNav />
        </div>

        <div className="w-full mt-4 pt-20">
          <PauseOnHover />
        </div>
      </div>
    </div>
  );
}
