import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { Metadata } from "next";
import { describe } from "node:test";

async function SearchResult({ q }: { q: string }) {
  await delay(1500);
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

// export const metadata : Metadata ={
//   title:"한입북스 : 검색어",
//   description:"~~",
//   openGraph:{}
// }

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  // 현재 페이지의 메타 데이터를 동적으로 생성하는 역할을 함.
  const { q } = await searchParams;

  return {
    title: `${q}: 한입북스 검색`,
    description: `${q}의 검색결과입니다`,
    openGraph: {
      title: `${q}: 한입북스 검색`,
      description: `${q}의 검색결과입니다`,
      images: ["/thumbnail.png"],
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>; //15버전부터 searchParams와 Params는 프로미스객체이므로 Promise<>타입 명시해줘야함
}) {
  const { q } = await searchParams;
  return (
    <Suspense key={q || ""} fallback={<BookListSkeleton count={3} />}>
      <SearchResult q={q || ""} />
    </Suspense>
  );
}
