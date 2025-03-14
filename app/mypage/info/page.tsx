import MypageHeader from "components/layouts/MypageHeader";
import MypageSidebar from "components/layouts/MypageSidebar";
import Info from "components/mypage/info";

export default function MyPageInfo() {
  return (
    <div className="w-full h-screen flex pt-16 lg:fixed">
      <MypageHeader />
      <MypageSidebar />

      <div className="flex-1 flex justify-center items-center pt-8">
        <Info />
      </div>
    </div>
  );
}
