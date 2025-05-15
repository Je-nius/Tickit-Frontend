import HomeHeader from "components/layouts/HomeHeader";
import DetailTable from "components/ticket/DetailTable";

export default async function DetailPage() {
  return (
    <div className="w-full h-screen flex flex-col">
      <HomeHeader />
      <DetailTable />
    </div>
  );
}
