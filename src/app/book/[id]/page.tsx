import { notFound } from "next/navigation";
import style from "./page.module.css";
import { ReviewData } from "@/types";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";

// export const dynamicParams = false;
//아래 generateStaticParams 로 설정한 정적 페이지들빼고 다이나믹한페이지를 하면 안되겠구나로 구별하여 book/4번같은것을 notFound처리함

export function generateStaticParams() {
  //빌드타임에 미리생성하고자 서버측에 풀라우트 캐시로써 미리만들 book/1,2,3 페이지 미리만들기
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
  // *주의할 점 : id 우측이 문자열일 것. 아래 직접패칭하는 코드가 없더라도 1,2,3번은 강제로 패칭되다는 점
}

async function BookDetail({ bookId }: { bookId: string | string[] }) {
  //아래는 직접 데이터를 패칭해오는 모습
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
    //페이지컴포넌트의 자동으로 프롭스로 전달되는 url 파라미터의 값이다. 이름은 id
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다....</div>;
  }
  const book = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ bookId }: { bookId: string | string[] }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    { next: { tags: [`review-${bookId}`] } }
  );
  if (!response.ok)
    throw new Error(`리뷰정보 불러오기 실패 : ${response.statusText}`);

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const { id } = await params;
  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
}

// const { id } = await params;
// //아래는 직접 데이터를 패칭해오는 모습
// const response = await fetch(
//   `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
//   //페이지컴포넌트의 자동으로 프롭스로 전달되는 url 파라미터의 값이다. 이름은 id
// );

// if (!response.ok) {
//   if (response.status === 404) {
//     notFound();
//   }
//   return <div>오류가 발생했습니다....</div>;
// }
// const book = await response.json();

// const { title, subTitle, description, author, publisher, coverImgUrl } = book;

// return (
//   <div className={style.container}>
//     <div
//       className={style.cover_img_container}
//       style={{ backgroundImage: `url('${coverImgUrl}')` }}
//     >
//       <img src={coverImgUrl} />
//     </div>
//     <div className={style.title}>{title}</div>
//     <div className={style.subTitle}>{subTitle}</div>
//     <div className={style.author}>
//       {author} | {publisher}
//     </div>
//     <div className={style.description}>{description}</div>
//   </div>
// );
