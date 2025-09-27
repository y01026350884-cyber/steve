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

      {/* ===== 하단 탭바 (항상 균등 분배, 한 줄 유지) ===== */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="w-full border-b">
            <ul className="flex w-full text-center divide-x divide-gray-300">
              {tabs.map((tab) => {
                const isActive = pathname === tab.href;
                return (
                  <li key={tab.href} className="flex-1">
                    <Link
                      href={tab.href}
                      className={`inline-flex h-12 w-full items-center justify-center font-bold text-lg whitespace-nowrap transition-colors duration-200 ${
                        isActive
                          ? "text-blue-600"
                          : "text-slate-700 hover:text-blue-600"
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

          {/* 오른쪽: 영상 or 이미지 */}
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow bg-black">
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
      </main>
    </>
  );
}
