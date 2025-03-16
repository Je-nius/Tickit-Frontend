import Create from "components/admin/create";
import AdminSidebar from "components/layouts/AdminSidebar";
import MypageHeader from "components/layouts/MypageHeader";

export default async function MyPage() {
  return (
    <div className="w-full h-screen flex pt-16 ">
      <MypageHeader />
      <AdminSidebar />

      <div className="flex-1 flex justify-center mt-5">
        <Create />
      </div>
    </div>
  );
}
