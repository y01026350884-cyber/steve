// app/company/greeting/page.tsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GreetingPage() {
  const pathname = usePathname();

  const tabs = [
    { title: "레이저 절단기", href: "/machines/lasercutting" },
    { title: "절곡기", href: "/machines/bending" },
    { title: "샤링기", href: "/machines/shearing_machine" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* ===== 상단 히어로 ===== */}
      <section className="relative h-[240px] md:h-[300px] lg:h-[340px]">
        {/* 배경 이미지 */}
        <Image
          src="/greeting/hero.png"
          alt="보유설비"
          fill
          className="object-cover"
          priority
        />
        {/* 가독성용 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />

        {/* 중앙 타이틀 */}
        <div className="relative z-10 flex h-full items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">보유설비</h1>
            <p className="mt-2 text-sm md:text-base opacity-95">
              첨단 설비와 철저한 관리로 신뢰받는 가공 솔루션을 제공합니다.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 하단 탭바 ===== */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="w-full border-b" aria-label="보유설비 탭">
            {/* 모바일: 가로 스크롤 탭 */}
            <ul className="md:hidden -mx-6 px-6 flex gap-3 overflow-x-auto snap-x snap-mandatory">
              {tabs.map((tab) => (
                <li key={tab.href} className="shrink-0 snap-start">
                  <Link
                    href={tab.href}
                    aria-current={isActive(tab.href) ? "page" : undefined}
                    className={`block whitespace-nowrap px-4 py-3 text-base font-bold rounded-md border transition-colors ${
                      isActive(tab.href)
                        ? "border-blue-600 text-blue-600 bg-blue-50"
                        : "border-gray-200 text-slate-700 hover:text-blue-600 hover:border-blue-300"
                    }`}
                  >
                    {tab.title}
                  </Link>
                </li>
              ))}
            </ul>

            {/* 데스크톱: 3칸 고정 */}
            <ul className="hidden md:grid grid-cols-3 text-center">
              {tabs.map((tab, index) => (
                <li
                  key={tab.href}
                  className={index !== tabs.length - 1 ? "border-r border-gray-300" : ""}
                >
                  <Link
                    href={tab.href}
                    aria-current={isActive(tab.href) ? "page" : undefined}
                    className={`inline-flex h-12 w-full items-center justify-center text-lg font-bold whitespace-nowrap transition-colors ${
                      isActive(tab.href)
                        ? "text-blue-600"
                        : "text-slate-700 hover:text-blue-600"
                    }`}
                  >
                    {tab.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* ===== 본문 ===== */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-12">
        {/* 상단 타이틀 */}
        <h1 className="font-sans text-4xl lg:text-5xl font-extrabold tracking-tight mb-12 text-center">
          Laser Cutting Machines
        </h1>

        {/* 본문 그리드 */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* 왼쪽: 텍스트 */}
          <div>
            <h2 className="text-2xl lg:text-2xl font-montserrat font-bold leading-snug mb-8">
              고출력 파이버 레이저 설비로<br />
              복잡한 형상도 정밀하게 절단합니다.
            </h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                금화레이저는 최신 <strong>TRULASER FIBER 시리즈</strong>를 포함한
                첨단 레이저 절단 설비를 보유하여,
                철(SS), 스테인리스(SUS), 알루미늄(AL) 등 다양한 금속 소재를
                <strong> 정밀하고 안정적으로 가공</strong>합니다.
              </p>
              <p>
                <strong>0.5T ~ 30T</strong> 두께 범위까지 대응 가능한 가공 능력으로,
                산업 전반에서 요구되는 복잡한 형상과 고난이도 절단 조건에도
                <strong>변형 없는 고품질 절단</strong>을 구현합니다.
              </p>
              <p>
                다년간 축적된 공정 데이터와 고출력 파이버 레이저 기술을 통해,
                단순 절단을 넘어 <strong>정밀 형상 절단 및 조립용 부품 가공</strong>까지
                통합 솔루션을 제공합니다.
              </p>
              <p>
                금화레이저는 최신 설비와 철저한 품질 관리로
                고객의 경쟁력을 높이는 <strong>신뢰받는 파트너</strong>가 되겠습니다.
              </p>
            </div>
          </div>

          {/* 오른쪽: 영상 */}
          <div className="relative w-full h-[240px] sm:h-[320px] lg:h-[400px] rounded-xl overflow-hidden shadow bg-black">
            <video
              src="/lasercutting/TruLaser_Cell_vid.mp4"
              className="w-full h-full object-contain"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </section>

        {/* ===== 장비별 카드 섹션 ===== */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* 공통 카드 컴포넌트 스타일:
              - 이미지 영역: aspect-[4/3] + Image fill → 카드별 높이 균일
              - 설명: <br/> 제거, block span + space-y 로 줄 간격 통일 */}
          
          {/* TruLaser 1030 */}
          <div className="bg-white rounded-xl shadow p-6 text-center flex flex-col h-full">
            <div className="relative mb-4 aspect-[4/3] w-full">
              <Image
                src="/lasercutting/TruLaser_1030_fiber.png"
                alt="TruLaser 1030 fiber L94"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 400px"
                className="rounded-md object-contain"
                priority
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-blue-600 mb-2">TruLaser 1030 fiber L94</h3>
              <div className="text-gray-700 text-sm leading-relaxed space-y-1">
                <span className="block">안정적 생산성, 효율성을 갖춘 파이버 레이저 절단기.</span>
                <span className="block">철(SS) 0.5T~25T, 스테인리스(SUS) 0.5T~30T,</span>
                <span className="block">알루미늄(AL) 0.5T~15T 가공 가능.</span>
              </div>
            </div>
          </div>

          {/* TruLaser 5030 */}
          <div className="bg-white rounded-xl shadow p-6 text-center flex flex-col h-full">
            <div className="relative mb-4 aspect-[4/3] w-full">
              <Image
                src="/lasercutting/TruLaser_5030_fiber.png"
                alt="TruLaser 5030 fiber L41"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 400px"
                className="rounded-md object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-blue-600 mb-2">TruLaser 5030 fiber L41</h3>
              <div className="text-gray-700 text-sm leading-relaxed space-y-1">
                <span className="block">대형 판재 가공에 최적화된 고출력 장비.</span>
                <span className="block">고속·고정밀 절단을 통해 복잡한 형상 안정적 처리.</span>
                <span className="block">동일 가공 능력 범위 지원.</span>
              </div>
            </div>
          </div>

          {/* TruLaser CELL 5030 */}
          <div className="bg-white rounded-xl shadow p-6 text-center flex flex-col h-full">
            <div className="relative mb-4 aspect-[4/3] w-full">
              <Image
                src="/lasercutting/TruLaser_cell_5030.png"
                alt="TruLaser CELL 5030"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 400px"
                className="rounded-md object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-blue-600 mb-2">TruLaser CELL 5030</h3>
              <div className="text-gray-700 text-sm leading-relaxed space-y-1">
                <span className="block">3D 형상 및 곡면 절단이 가능한 유연한 장비.</span>
                <span className="block">자동차·산업 부품 등 복잡한 형상 절단에 활용.</span>
                <span className="block">동일 가공 능력 범위 지원.</span>
              </div>
            </div>
          </div>
        </section>
        {/* ===== 장비별 카드 섹션 끝 ===== */}
      </main>
    </>
  );
}
