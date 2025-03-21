interface FestivalData {
  imgSrc: string;
  title: string;
  date: string;
  location: string;
}
//게시물 리스트 추후 수정 -> map으로 동적으로 불러오기

export default function SearchTable({ festival }: { festival: FestivalData }) {
  return (
    <div className="grid grid-cols-4 items-center justify-center border-t border-gray-300 p-3 w-full">
      <div className="flex justify-center">
        <img src={festival.imgSrc} className="w-25 h-35 mx-5" />
      </div>
      <h1 className="font-bold text-xl text-center mx-5 w-full">
        {festival.title}
      </h1>
      <p className="text-md text-center mx-5 w-full">{festival.date}</p>
      <p className="text-md text-center mx-5 w-full">{festival.location}</p>
    </div>
  );
}
