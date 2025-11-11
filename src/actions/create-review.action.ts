"use server";
import { revalidatePath } from "next/cache";

//서버액션 명시, 이렇게 따로 파일 분리했을땐 함수 내부가 아니라 이렇게 파일 최상단으로 올려야함.
export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) return;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      }
    );
    console.log(response.status);
    revalidatePath(`/book/${bookId}`); //넥스트 서버에게 해당경로 재검증해달라는 코드.서버측에서만 사용가능 한 코드 ex)서버 컴포넌트, 서버액션
  } catch (err) {
    console.error(err);
    return;
  }
}
