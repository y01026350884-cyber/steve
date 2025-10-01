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
          src="/greeting/hero.png"   // public/company/hero.jpg
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

      {/* ===== 하단 탭바 (모바일 스크롤 + 데스크톱 3칸 고정, 색상만 변화) ===== */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">{/* ← 통일 패딩 */}
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

            {/* 데스크톱(>= md): 3칸 고정 + 마지막 칸 제외 세로 구분선 */}
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

      {/* ===== 아래부터는 기존 코드 그대로 ===== */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-12">

        {/* 상단 타이틀 */}
        <h1 className="font-sans text-4xl lg:text-5xl font-extrabold tracking-tight mb-12 text-center">
          Press Brake
        </h1>
        {/* 본문 그리드 */}
        {/* <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"> */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* 왼쪽: 텍스트 */}
          <div>
            <h2 className="text-2xl lg:text-2xl font-montserrat font-bold leading-snug mb-8">
              최신 절곡 설비로<br />
              다양한 금속을 정밀하게 성형합니다.
            </h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                금화레이저는 <strong>AMADA HG 1253</strong>, <strong>AMADA HG 2204</strong> 등 
                첨단 절곡 설비를 보유하여, 
                철(SS), 스테인리스(SUS), 알루미늄(AL) 등 다양한 금속 소재를 
                <strong> 고정밀·고품질로 성형</strong>합니다.
              </p>
              <p>
                <strong>대형 판재부터 박판까지</strong> 폭넓은 가공 범위를 지원하며, 
                복잡한 형상과 고난이도 절곡 조건에도{" "} 
                <strong>균일한 각도와 높은 정밀도</strong>를 구현합니다.
              </p>
              <p>
                최신 하이브리드 드라이브 및 자동화 제어 기술을 통해, 
                생산 효율성을 높이고 <strong>안정적이고 반복 가능한 성형 품질</strong>을 제공합니다.
              </p>
              <p>
                금화레이저는 끊임없는 기술 개발과 품질 관리로
                고객에게 <strong>신뢰받는 절곡 솔루션 파트너</strong>가 되겠습니다.
              </p>
            </div>
          </div>

          {/* 오른쪽: 영상 or 이미지 */}
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow bg-black">
            <video
              src="/cnc/Amada_hg_2204.mp4"
              className="w-full h-full object-contain"
              autoPlay
              loop
              muted
              playsInline
            />
            {/* 이미지 사용 시 (대체용) */}
            {/* 
            <Image
              src="/images/laser-cutting.jpg"
              alt="Laser Cutting Machine"
              fill
              className="object-contain"
              priority
            /> 
            */}
          </div>
        </section>
        {/* ===== 장비별 카드 섹션 ===== */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* AMADA HG 1253 */}
          <div className="bg-white rounded-xl shadow p-6 text-center flex flex-col h-full">
            <div className="w-full h-48 flex items-center justify-center mb-4">
              <Image
                src="/cnc/Amada_hg1253.png"   // ✅ public 폴더 경로 (파일명 확인 필요)
                alt="AMADA HG 1253"
                width={400}
                height={300}
                sizes="(max-width: 768px) 100vw, 400px"
                className="mx-auto rounded-md object-contain h-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-blue-600 mb-2">AMADA HG 1253</h3>
              <p className="text-gray-500 text-sm mb-3">100T · 2.5M 절곡 가능</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                검증된 신뢰성과 높은 출력 성능을 갖춘 절곡기.<br />
                복잡한 형상과 두꺼운 소재도 안정적으로 성형 가능하며,<br />
                다양한 금속 소재에 폭넓은 가공 범위 지원.
              </p>
            </div>
          </div>

          {/* AMADA HG 2204 */}
          <div className="bg-white rounded-xl shadow p-6 text-center flex flex-col h-full">
            {/* ⬇️ 래퍼 높이는 옆 카드와 동일(h-48) + overflow-hidden 추가 */}
            <div className="w-full h-48 flex items-center justify-center mb-4 overflow-hidden">
              <Image
                src="/cnc/Amada_hg_2204.jpg"   // ✅ public 폴더 경로 (파일명 확인 필요)
                alt="AMADA HG 2204"
                width={400}
                height={300}
                sizes="(max-width: 768px) 100vw, 400px"
                /* ⬇️ 이미지에만 확대 적용하여 정렬 불변 */
                className="mx-auto rounded-md object-contain h-full scale-110"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-blue-600 mb-2">AMADA HG 2204</h3>
              <p className="text-gray-500 text-sm mb-3">220T · 4M 절곡 가능</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                최신 하이브리드 드라이브 기술을 적용한 고성능 절곡기.<br />
                대형 판재부터 박판까지 정밀한 절곡이 가능하며,<br />
                균일한 각도 제어로 고품질 성형을 구현.
              </p>
            </div>
          </div>
        </section>
        {/* ===== 장비별 카드 섹션 끝 ===== */}
      </main>
    </> 
  );
}
