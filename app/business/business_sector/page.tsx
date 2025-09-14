'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BusinessTabs from '../../component/BusinessTabs';

type Card = {
  key: string;
  title: string;
  image: string;
  items: string[];
};

const CARDS: Card[] = [
  { key: 'machinery', title: '산업기계', image: "url('/industry.png'), linear-gradient(135deg,#eef2ff,#eff6ff)", items: ['조선분야', '원자력분야', '정밀기계분야'] },
  { key: 'plant',     title: '플랜트',   image: "url('/plant.png')", items: ['건설분야', '기계·설비분야', '공정/설계지원'] },
  { key: 'medical',   title: '의학',     image: "url('/medical.png'), linear-gradient(135deg,#eef2ff,#eff6ff)", items: ['인테리어분야', '정밀기기분야', '실험·연구장비'] },
  { key: 'auto',      title: '자동차',   image: "url('/car.png'), linear-gradient(135deg,#eef2ff,#eff6ff)", items: ['중장비분야', '태양열에너지', '모터/전장'] },
];

/** 카드 그리드 */
function BusinessCategoryTiles() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {CARDS.map((c) => {
          const isLogo = c.image.includes('/logoimage.png');
          return (
            <article
              key={c.key}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-[0_8px_30px_rgba(2,6,23,0.06)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div
                className="relative w-full h-40 sm:h-44 lg:h-48 rounded-t-2xl"
                style={{
                  backgroundImage: c.image,
                  backgroundRepeat: 'no-repeat, no-repeat',
                  backgroundPosition: 'center, center',
                  backgroundSize: `${isLogo ? 'contain' : 'cover'}, cover`,
                }}
                aria-label={`${c.title} 이미지`}
              >
                <div className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow">
                  {c.title}
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 to-black/5" />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900">{c.title}</h3>
                <ul className="mt-3 space-y-2 text-slate-700">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-blue-600" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-0 transition group-hover:ring-2 group-hover:ring-blue-500/40 group-hover:ring-offset-2 group-hover:ring-offset-white" />
            </article>
          );
        })}
      </div>
    </section>
  );
}

/** 페이지 본체 (Hero + 탭 + 카드) — 반드시 default export */
export default function BusinessSectorPage() {
  // ✅ greeting/page.tsx와 동일한 탭바 구성으로 “일치성” 확보
  const tabs = [
    { title: '사업 분야', href: "/business/business_sector" },
    { title: '인증 현황', href: "/business/certification" },
  ];
  const pathname = usePathname();

  return (
    <>
      {/* 상단 히어로 */}
      <section className="relative h-[240px] md:h-[300px] lg:h-[340px]">
        <Image src="/laserr.png" alt="사업분야" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
        <div className="relative z-10 flex h-full items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">사업분야</h1>
            <p className="mt-2 text-sm md:text-base opacity-95">레이저 정밀 가공 전문 — 산업 전반을 지원합니다.</p>
          </div>
        </div>
      </section>

      {/* 하단 탭바 */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">{/* ← px-30 → px-8 */}
          <nav className="w-full border-b">
            <ul className="mx-auto grid grid-cols-2 text-center">
              {tabs.map((tab, index) => {
                const isActive = pathname === tab.href;
                return (
                  <li key={tab.href} className={index === 0 ? 'border-r border-gray-300' : ''}>
                    <Link
                      href={tab.href}
                      className={`inline-flex h-12 w-full items-center justify-center font-bold text-lg transition-colors duration-200 ${
                        isActive ? 'text-blue-600' : 'text-slate-700 hover:text-blue-600'
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

      {/* 카드 섹션 */}
      <BusinessCategoryTiles />
    </>
  );
}
