import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";

// 특정 페이지의 유형을 강제로 스태틱, 다이나믹 페이지로 설정해주는 그런 옵션
// 1.auto : 기본값, 아무것도 강제하지 않음
// 2.force-dynamic : 페이지를 강제로 다이나믹페이지로 전환하는것.
// 3.force-static : 페이지를 강제로 스태틱페이지로 전환하는것.
// 4.error : 현재 페이지를 강제로 스태틱으로 만들려하는데 , 그렇게 만들지못하는 이유가있으면 error를 쏴줌,이유로는 동적으로 데이터패칭해오는 함수가있거나. 등등
export const dynamic = "auto";

async function AllBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" } //캐싱된 데이터 쓰지않고 매번 새롭게 불러오겠다는 뜻, 얘가 기본값임.
  );
  //데이터를 불러올땐 반드시 예외처리가 있어야한다.
  if (!response.ok) {
    return <div>모든 도서불러오기에서 오류가 발생했습니다...</div>;
  }
  const allBooks: BookData[] = await response.json();
  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } }
  );
  if (!response.ok) {
    return <div>추천도서 불러오기에서 오류가 발생했습니다...</div>;
  }
  const recoBooks: BookData[] = await response.json();
  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
