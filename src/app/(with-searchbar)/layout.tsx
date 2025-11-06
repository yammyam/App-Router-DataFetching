import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* 서스펜스(미완성)라는 리액의 내장컴포넌트로 감싸면 사전렌더링과정에서 배제되고, 클라이언트측에서만 렌더링됨 */}
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
