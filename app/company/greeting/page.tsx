// app/company/greeting/page.tsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ← 활성 탭 표시를 위해 추가

export default function GreetingPage() {
  const pathname = usePathname();

  // 회사소개 탭들
  const tabs = [
    { title: "인사말", href: "/company/greeting" },
    { title: "조직도", href: "/company/organization" },
    { title: "회사비전", href: "/company/vision" },
    { title: "오시는 길", href: "/company/location" },
  ];

  return (
    <>
      {/* ===== 상단 히어로 ===== */}
      <section className="relative h-[240px] md:h-[300px] lg:h-[340px]">
        {/* 배경 이미지 */}
        <Image
          src="/bluee.png" // public/company/hero.jpg
          alt="회사소개"
          fill
          className="object-cover object-[center_70%]"
          priority
        />
        {/* 가독성용 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />

        {/* 중앙 타이틀 */}
        <div className="relative z-10 flex h-full items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">회사소개</h1>
            <p className="mt-2 text-sm md:text-base opacity-95">
              금화레이저는 고객과 진심을 나누고 신뢰를 쌓아갑니다.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 하단 탭바 — Business 페이지와 동일한 룩 ===== */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="w-full border-b">
            {/* Business 페이지와 동일 스타일: font-bold text-lg / h-12 / hover 색상 */}
            <ul className="mx-auto grid grid-cols-4 text-center">
              {tabs.map((tab, index) => {
                const isActive = pathname === tab.href;
                return (
                  <li
                    key={tab.href}
                    className={index !== tabs.length - 1 ? "border-r border-gray-300" : ""}
                  >
                    <Link
                      href={tab.href}
                      className={`inline-flex h-12 w-full items-center justify-center font-bold text-lg transition-colors duration-200 ${
                        isActive ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
                      }`}
                    >
                      {tab.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* ===== 아래부터는 기존 코드 그대로 ===== */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
        {/* 상단 타이틀 */}
        <h1 className="font-montserrat text-4xl lg:text-5xl font-extrabold tracking-tight mb-10">
          CEO&apos;s GREETING
        </h1>

        {/* 본문 그리드 */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* 왼쪽: 텍스트 */}
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold leading-snug mb-8">
              정밀한 가공, 첨단 기술력으로
              <br />
              고객에게 신뢰를 드리는
              <br />
              금화레이저에 오신 것을 환영합니다.
            </h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>금화레이저 홈페이지를 방문해주신 여러분, 반갑습니다.</p>

              <p>
                (주)금화레이저는 2023년 설립되어 <strong>신뢰성과 정밀성</strong>에 대한
                광범위한 실적으로 다른 회사와 차별화된 <strong>레이저 임가공 전문업체</strong>
                입니다.
              </p>

              <p>
                저희는 초소형 부품에서 초대형 부품까지 반도체, 2차전지, 기계, 건설,
                자동차, 선박 등 다양한 산업 전반에 걸쳐 사용되는 범용 제품부터 신소재 산업에
                적용되는 <strong>고부가가치 제품 가공</strong>까지 폭넓게 대응하고 있습니다.
              </p>

              <p>
                또한 금속 레이저 임가공업의 선두에 서서 약 20여 년의 업력을 바탕으로 모든
                제품을 완벽하게 처리하며, <strong>고객 만족을 최우선</strong>으로 하는 최고의
                기업으로 성장을 목표로 하고 있습니다.
              </p>

              <p>
                앞으로도 모든 고객에게 최상의 제품과 서비스로 최고의 만족을 드리기 위해
                꾸준히 노력해 나아가겠습니다.
              </p>

              <div className="mt-8">
                <p className="font-semibold">(주)금화레이저 대표이사</p>
                <p className="text-gray-800">이 문 수</p>
              </div>
            </div>
          </div>

          {/* 오른쪽: 이미지 */}
          <div className="relative w-full h-[260px] sm:h-[360px] lg:h-[520px] rounded-xl overflow-hidden shadow">
            <Image
              src="/greeting/hero.png"
              alt="CEO Greeting"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>
      </main>
    </>
  );
}
