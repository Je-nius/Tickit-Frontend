import HomeHeader from "components/layouts/HomeHeader";
import SearchList from "components/list/SearchList";

export default async function ListPage({
  params,
}: {
  params: { keyword: string };
}) {
  const resolvedParams = await params;
  return (
    <div className="w-full h-screen flex flex-col">
      <HomeHeader />
      <SearchList params={resolvedParams} />
    </div>
  );
}
