import MypageHeader from "components/layouts/MypageHeader";
import MypageSidebar from "components/layouts/MypageSidebar";
import Booking from "components/mypage/booking";

export default function MypageBooking() {
  return (
    <div className="w-full h-screen flex pt-16 ">
      <MypageHeader />
      <MypageSidebar />

      <div className="flex-1 flex justify-center mr-35 mt-5">
        <Booking />
      </div>
    </div>
  );
}
