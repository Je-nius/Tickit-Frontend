import MypageHeader from "components/layouts/MypageHeader";
import MypageSidebar from "components/layouts/MypageSidebar";
import Qna from "components/mypage/qna";

export default async function MyPageQnA() {
  return (
    <div className="w-full h-screen flex pt-16 lg:fixed">
      <MypageHeader />
      <MypageSidebar />

      <div className="flex-1 flex justify-center mt-14">
        <Qna />
      </div>
    </div>
  );
}
