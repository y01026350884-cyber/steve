// app/company/greeting/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function GreetingPage() {
  const pathname = usePathname();

  const tabs = [
    { title: '레이저 절단기', href: '/machines/lasercutting' },
    { title: '절곡기', href: '/machines/bending' },
    { title: '샤링기', href: '/machines/shearing_machine' },
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

      {/* ===== 하단 탭바 (모바일 최적화 + 데스크톱 1줄 3칸 고정, 색상만 변화) ===== */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="w-full border-b" aria-label="보유설비 탭">
            {/* 모바일: 가로 스크롤 탭 */}
            <ul className="md:hidden -mx-6 px-6 flex gap-3 overflow-x-auto snap-x snap-mandatory">
              {tabs.map((tab) => (
                <li key={tab.href} className="shrink-0 snap-start">
                  <Link
                    href={tab.href}
                    aria-current={isActive(tab.href) ? 'page' : undefined}
                    className={`block whitespace-nowrap px-4 py-3 text-base font-bold rounded-md border transition-colors ${
                      isActive(tab.href)
                        ? 'border-blue-600 text-blue-600 bg-blue-50'
                        : 'border-gray-200 text-slate-700 hover:text-blue-600 hover:border-blue-300'
                    }`}
                  >
                    {tab.title}
                  </Link>
                </li>
              ))}
            </ul>

            {/* 데스크톱(>= md): 3칸 고정 + 마지막 칸 제외 세로 구분선 */}
            <ul className="hidden md:grid grid-cols-3 text-center">
              {tabs.map((tab, index) => (
                <li
                  key={tab.href}
                  className={index !== tabs.length - 1 ? 'border-r border-gray-300' : ''}
                >
                  <Link
                    href={tab.href}
                    aria-current={isActive(tab.href) ? 'page' : undefined}
                    className={`inline-flex h-12 w-full items-center justify-center text-lg font-bold whitespace-nowrap transition-colors ${
                      isActive(tab.href)
                        ? 'text-blue-600'
                        : 'text-slate-700 hover:text-blue-600'
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
          Shearing Machine
        </h1>

        {/* 소개 섹션 */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* 왼쪽: 텍스트 */}
          <div>
            <h2 className="text-2xl lg:text-2xl font-montserrat font-bold leading-snug mb-8">
              야마다 샤링기 DCT-2565
              <br />
              <span className="text-blue-600 text-lg">
                '얇은 두께의 판재를 정확하게 절단 가능한 장비'
              </span>
            </h2>

            {/* 리스트: 시원하게 보이도록 크게 + 넓은 간격 */}
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <ul className="list-disc pl-6 space-y-4 text-xl">
                <li>
                  <span className="font-semibold">안정적인 절단</span> 품질을 갖춘 전단 가공 장비
                </li>
                <li>
                  철(SS), 스테인리스(SUS), 알루미늄(AL) 등 다양한 금속 판재를{' '}
                  <span className="font-semibold">정밀하게 절단</span>
                </li>
                <li>
                  얇은 판재부터 중간 두께 소재까지 <span className="font-semibold">일관된 품질</span> 구현
                </li>
                <li>
                  산업 전반의 <span className="font-semibold">직선 절단 가공</span>에 폭넓게 활용 가능
                </li>
              </ul>
            </div>
          </div>

          {/* 오른쪽: 영상 */}
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow bg-black">
            <video
              src="/shearing/0927.mp4"
              className="w-full h-full object-contain"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </section>

        {/* ===== 장비 카드 섹션 (예시 유지) ===== */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* AMADA HG 1253 */}
          <div className="bg-white rounded-xl shadow p-6 text-center flex flex-col h-full">
            <div className="w-full h-48 flex items-center justify-center mb-4">
              <Image
                src="/shearing/shearing4.jpg"
                alt="DCT-2565"
                width={400}
                height={300}
                sizes="(max-width: 768px) 100vw, 400px"
                className="mx-auto rounded-md object-cover h-full w-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">DCT-2565</h3>
            </div>
          </div>

          {/* AMADA HG 2204 */}
          <div className="bg-white rounded-xl shadow p-6 text-center flex flex-col h-full">
            <div className="w-full h-48 flex items-center justify-center mb-4">
              <Image
                src="/shearing/shearing3.jpg"
                alt="AMADA HG 2204"
                width={400}
                height={300}
                sizes="(max-width: 768px) 100vw, 400px"
                className="mx-auto rounded-md object-cover h-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">DCT-2565</h3>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
