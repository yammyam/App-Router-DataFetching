"use client";
// 주의할 점:여기다 파일을 위치시키게 되면 같은경로에있는 layout.tsx까지만 보여주기때문에 searchBar가 안보임.
import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.log(error.message);
  }, [error]);
  return (
    <div>
      <h3>오류가 발생했습니다!</h3>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh(); // 현재 페이지에 필요한 서버컴퍼넌트들을 넥스트 서버측에 다시한번 실행해줄것을 요청함.
            reset(); //에러상태를 초기화 하고 컴퍼넌트들을 다시 렌더링
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
