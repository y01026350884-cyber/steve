// app/company/organization/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function OrganizationPage() {
  return (
    <>
      {/* ===== 상단 히어로 ===== */}
      <section className="relative h-[240px] md:h-[300px] lg:h-[340px]">
        <Image
          src="/bluee.png"  // public/company/hero.jpg
          alt="회사소개"
          fill
          className="object-cover object-[center_70%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
        <div className="relative z-10 flex h-full items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">회사소개</h1>
            <p className="mt-2 text-sm md:text-base opacity-95">
              금화레이저는 고객과 진심을 나누고 신뢰를 쌓아갑니다.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 하단 탭바 (Business 페이지와 동일한 룩) ===== */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="w-full border-b">
            <ul className="mx-auto grid grid-cols-4 text-center">
              <li className="border-r border-gray-300">
                <Link
                  href="/company/greeting"
                  className="inline-flex h-12 w-full items-center justify-center font-bold text-lg transition-colors duration-200 text-slate-700 hover:text-blue-600"
                >
                  인사말
                </Link>
              </li>
              <li className="border-r border-gray-300">
                {/* 현재 페이지: 조직도(활성) */}
                <Link
                  href="/company/organization"
                  className="inline-flex h-12 w-full items-center justify-center font-bold text-lg text-blue-600"
                >
                  조직도
                </Link>
              </li>
              <li className="border-r border-gray-300">
                <Link
                  href="/company/vision"
                  className="inline-flex h-12 w-full items-center justify-center font-bold text-lg transition-colors duration-200 text-slate-700 hover:text-blue-600"
                >
                  회사 비전
                </Link>
              </li>
              <li>
                <Link
                  href="/company/location"
                  className="inline-flex h-12 w-full items-center justify-center font-bold text-lg transition-colors duration-200 text-slate-700 hover:text-blue-600"
                >
                  오시는 길
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* ===== 본문 (그대로) ===== */}
      <main className="max-w-6xl mx-auto px-6 py-16 text-center">
        {/* 조직도 제목 */}
        <h2 className="text-4xl font-extrabold mb-8 text-black">조직도</h2>

        {/* 상단 메시지 */}
        <p className="text-lg font-semibold text-gray-700 mb-12">
          정밀한 기술력과 효율적인 조직 운영으로 최고의 가공 품질을 실현합니다
        </p>

        {/* 조직도 이미지 */}
        <div className="flex justify-center">
          <Image
            src="/org-chart.jpg"   // public/org-chart.jpg
            alt="금화레이저 조직도"
            width={1000}
            height={800}
            className="rounded-lg shadow-md"
          />
        </div>
      </main>
    </>
  );
}
