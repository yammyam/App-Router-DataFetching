import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";
import { ReactNode } from "react";

export const metadata = {
  icons: {
    icon: "/favicon.ico",
  },
};

async function Footer() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <div>모든 도서불러오기에서 오류가 발생했습니다...</div>;
  }
  const book: BookData[] = await response.json();
  const bookCount = book.length;
  return (
    <footer>
      <div>제작 윈터루드</div>
      <div>{bookCount}개의 도서가 등록되어있습니다</div>
    </footer>
  );
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
        {modal}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
