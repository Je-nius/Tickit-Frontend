import MypageHeader from "components/layouts/MypageHeader";
import MypageSidebar from "components/layouts/MypageSidebar";
import Delete from "components/mypage/delete";

export default async function MyPageDelete() {
  return (
    <div className="w-full h-screen flex pt-16 lg:fixed">
      <MypageHeader />
      <MypageSidebar />

      <div className="flex-1 flex justify-center mt-14">
        <Delete />
      </div>
    </div>
  );
}
