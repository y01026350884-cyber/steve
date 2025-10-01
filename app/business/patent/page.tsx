'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// 탭바: 기존 라우트 그대로
const tabs = [
  { title: '사업 분야', href: '/business/business_sector' },
  { title: '인증 현황', href: '/business/certification' },
  { title: '특허 인증', href: "/business/patent" }, // 이 파일 경로와 일치해야 활성 처리됨
];

export default function CertificationPage() {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const pathname = usePathname();

  return (
    <>
      {/* ===== 상단 히어로 ===== */}
      <section className="relative h-[240px] md:h-[300px] lg:h-[340px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url('https://readdy.ai/api/search-image?query=Professional%20certification%20and%20quality%20assurance%20in%20manufacturing%20industry%2C%20official%20government%20certificates%20and%20awards%20displayed%20in%20modern%20office%20setting%2C%20industrial%20excellence%20recognition%20with%20Korean%20flag%20and%20manufacturing%20facility%20background%2C%20trust%20and%20reliability%20symbols&width=1200&height=400&seq=certification-hero&orientation=landscape')",
          }}
        />
        <div className="relative z-10 flex h-full items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">인증현황</h1>
            <p className="mt-2 text-sm md:text-base opacity-95">
              국가가 인정한 기술력과 신뢰성을 바탕으로 혁신을 선도합니다
            </p>
          </div>
        </div>
      </section>

      {/* ===== 하단 탭바 (항상 3개 한 줄 균등 분배) ===== */}
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

      {/* ===== 본문 (카드형 인증 목록) ===== */}
      <div className="min-h-screen bg-white">
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            {/* 타이틀 */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                (주)금화레이저 특허
              </h2>
            </div>

            {/* 카드 리스트 (항상 1개, 가운데 정렬) */}
            <CertGrid />
          </div>
        </section>
      </div>
    </>
  );
}

/** 인증 카드 그리드 (1개만 표시) */
function CertGrid() {
  const CERTS = [
    {
      img: '/certifications/certi.png',
      title: '특허 등록증',
      items: [
        { k: '인증범위', v: '금속가공 뿌리산업' },
        { k: '등록기간', v: '2025.06.04 ~ 2028.06.03' },
        { k: '인증기관', v: '한국산업기술진흥협회(KOITA)' },
      ],
    },
  ] as const;

  return (
    <div className="flex justify-center">
      {CERTS.map((c) => (
        <article
          key={c.title}
          className="w-full max-w-md rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white"
        >
          {/* 이미지 */}
          <div className="relative w-full bg-white">
            <div className="aspect-[4/3] flex items-center justify-center p-6">
              <img
                src={c.img}
                alt={c.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          {/* 하단 정보 패널 */}
          <div className="bg-slate-100/70 px-6 py-6 text-center ">
            <h3 className="text-xl font-extrabold text-slate-900">{c.title}</h3>
            <ul className="mt-3 space-y-2 text-slate-700">
              {c.items.map((it) => (
                <li key={it.k} className="flex gap-2 text=center">
                  <span className="whitespace-nowrap font-semibold text-slate-800">
                    - {it.k} :
                  </span>
                  <span className="break-words">{it.v}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
