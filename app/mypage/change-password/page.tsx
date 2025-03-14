import MypageHeader from "components/layouts/MypageHeader";
import MypageSidebar from "components/layouts/MypageSidebar";
import ChangePW from "components/mypage/changePW";

export default async function MyPageChangePW() {
  return (
    <div className="w-full h-screen flex pt-16 lg:fixed">
      <MypageHeader />
      <MypageSidebar />

      <div className="flex-1 flex justify-center mt-14">
        <ChangePW />
      </div>
    </div>
  );
}
