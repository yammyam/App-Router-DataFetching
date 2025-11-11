"use server";
import { revalidatePath, revalidateTag } from "next/cache";

//서버액션 명시, 이렇게 따로 파일 분리했을땐 함수 내부가 아니라 이렇게 파일 최상단으로 올려야함.
export async function createReviewAction(_: any, formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) {
    return { status: false, error: "" };
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    // 1. 인수만넣으면 해당하는 페이지만 재검증
    // 2. 특정 경로의 모든 동적 페이지를 재검증 => revalidatePath("/book/[id]","page")
    // 3. 특정 레이아웃을 가지는 모든 페이지 재검증 => revalidatePath("/(with-searchbar)","layout")
    // 4. 모든 데이터 재검증 => revalidatePath ("/","layout")
    // 5. 태그 기준, 데이터 캐시 재검증
    revalidateTag(`review-${bookId}`);
    return { status: true, error: "" };

    // revalidatePath(`/book/${bookId}`); //넥스트 서버에게 해당경로 재검증해달라는 코드.서버측에서만 사용가능 한 코드 ex)서버 컴포넌트, 서버액션
  } catch (err) {
    return {
      status: false,
      error: `리뷰저장에 실패했습니다 : ${err}`,
    };
  }
}
