"use client";
import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review.action";
import { useActionState, useEffect } from "react";

export default function ReviewEditor({
  bookId,
}: {
  bookId: string | string[];
}) {
  // async function createReviewAction(formData: FormData) {
  //   "use server"; //서버액션 명시
  //   const content = formData.get("content")?.toString();
  //   const author = formData.get("author")?.toString();

  //   if (!content || !author) return;
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
  //       {
  //         method: "POST",
  //         body: JSON.stringify({ bookId, content, author }),
  //       }
  //     );
  //     console.log(response.status);
  //   } catch (err) {
  //     console.error(err);
  //     return;
  //   }
  // }

  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      <form className={style.form_container} action={formAction}>
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea
          disabled={isPending}
          required
          name="content"
          placeholder="리뷰를 적어주세요!"
        />
        <div className={style.submit_container}>
          <input
            disabled={isPending}
            required
            name="author"
            placeholder="작성자"
          />
          <button disabled={isPending} type="submit">
            {isPending ? "..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}
