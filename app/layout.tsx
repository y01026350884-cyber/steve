// app/layout.tsx
import Header from "./component/Header";
import Footer from "./component/Footer";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pacifico",
});
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "금화레이저",
  description: "정밀 레이저 가공 전문 기업, 금화레이저입니다.",
};

// ✅ 표준 뷰포트 (강제 스케일 제거)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={[
          geistSans.variable,
          geistMono.variable,
          pacifico.variable,
          "min-h-screen supports-[min-height:100svh]:min-h-[100svh]",
          "flex flex-col",
          "antialiased",
          "bg-white text-slate-900",
          "w-full overflow-x-hidden",     // ✅ 가로 스크롤/잘림 방지
          "scroll-smooth touch-pan-y",
        ].join(" ")}
      >
        {/* ❌ DesktopFit 삭제 */}
        <Header />
        <main id="page" className="flex-grow w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
