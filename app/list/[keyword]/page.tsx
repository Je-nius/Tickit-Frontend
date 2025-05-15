import HomeHeader from "components/layouts/HomeHeader";
import SearchList from "components/list/SearchList";

export default async function ListPage({
  params,
  searchParams,
}: {
  params: Promise<{ keyword: string }>;

  searchParams: { type?: string };
}) {
  const keyword = (await params).keyword;
  const isGenre = (await searchParams).type === "genre";

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* <div className="fixed top-0 left-0 w-full z-50"> */}
      <HomeHeader />
      {/* </div> */}
      <div className="flex-1 flex flex-col mt-28">
        <SearchList keyword={keyword} isGenre={isGenre} />
      </div>
    </div>
  );
}
