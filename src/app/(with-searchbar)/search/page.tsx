import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { delay } from "@/util/delay";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>; //15버전부터 searchParams와 Params는 프로미스객체이므로 Promise<>타입 명시해줘야함
}) {
  await delay(1500);
  const { q } = await searchParams;
  //현재페이지의 쿼리스트링을 가져오는 ,페이지 컴포넌트의 자동으로 제공되는 기능
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }
  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
