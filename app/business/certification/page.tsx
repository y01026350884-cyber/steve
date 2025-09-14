'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// 탭바: 기존 라우트 그대로
const tabs = [
  { title: '사업 분야', href: '/business/business_sector' },
  { title: '인증 현황', href: '/business/certification' }, // 이 파일 경로와 일치해야 활성 처리됨
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

      {/* ===== 하단 탭바 (사업 분야 / 인증 현황) ===== */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="w-full border-b">
            <ul className="mx-auto grid grid-cols-2 text-center">
              {tabs.map((tab, index) => {
                const isActive = pathname === tab.href;
                return (
                  <li
                    key={tab.href}
                    className={index === 0 ? 'border-r border-gray-300' : ''}
                  >
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
          <div className="max-w-7xl mx-auto">
            {/* 타이틀 */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                금화레이저(주)의 공식 인증 현황
              </h2>
              <p className="mt-3 text-gray-600">
                국가가 인정한 기술력과 신뢰성을 바탕으로 혁신을 선도합니다.
              </p>
            </div>

            {/* 카드 리스트 */}
            <CertGrid />
          </div>
        </section>
      </div>
    </>
  );
}

/** 인증 카드 그리드 분리 */
function CertGrid() {
  const CERTS = [
    {
      img: '/certifications/certi.png',
      title: '뿌리기업 확인서',
      items: [
        { k: '인증범위', v: '금속가공 뿌리산업' },
        { k: '유효기간', v: '2024.01.15 ~ 2027.01.14' },
        { k: '인증기관', v: '한국산업기술진흥협회(KOITA)' },
      ],
    },
    {
      img: '/certifications/벤처기업확인서.jpg',
      title: '벤처기업 인증',
      items: [
        { k: '인증범위', v: '기술혁신형 기업' },
        { k: '유효기간', v: '예: 2023.11.01 ~ 2028.10.31' }, // 실제 기간으로 수정
        { k: '인증기관', v: '중소벤처기업부' },
      ],
    },
    {
      img: '/certifications/연구개발전담부서인정서.jpg',
      title: '기업부설 연구전담부서 인증',
      items: [
        { k: '인증범위', v: '레이저 가공 기술 연구' },
        { k: '유효기간', v: '2024.01.15 ~ 2027.01.14' },
        { k: '인증기관', v: '한국산업기술진흥협회(KOITA)' },
      ],
    },
  ] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {CERTS.map((c) => (
        <article
          key={c.title}
          className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white"
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
          <div className="bg-slate-100/70 px-6 py-6">
            <h3 className="text-xl font-extrabold text-slate-900">{c.title}</h3>
            <ul className="mt-3 space-y-2 text-slate-700">
              {c.items.map((it) => (
                <li key={it.k} className="flex gap-2">
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

