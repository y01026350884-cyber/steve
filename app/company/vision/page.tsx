// app/company/vision/page.tsx
import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "회사 비전 | KH LASER",
};

type Value = {
  en: string;
  kr: string;
  desc: string;
};

const VALUES: Value[] = [
  { en: "CHALLENGE", kr: "도 전", desc: "창의적 생각으로 도전하는 기업" },
  { en: "ACTION",    kr: "실 천", desc: "적극적 행동으로 실천하는 기업" },
  { en: "TRUST",     kr: "신 뢰", desc: "성실과 책임으로 신뢰받는 기업" },
];

export default function VisionPage() {
  return (
    <>
      {/* ===== 상단 히어로 ===== */}   
      <section className="relative h-[240px] md:h-[300px] lg:h-[340px]">
        <Image
          src="/bluee.png"
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
                <Link
                  href="/company/organization"
                  className="inline-flex h-12 w-full items-center justify-center font-bold text-lg transition-colors duration-200 text-slate-700 hover:text-blue-600"
                >
                  조직도
                </Link>
              </li>
              <li className="border-r border-gray-300">
                {/* 현재 페이지: 회사 비전 (활성) */}
                <Link
                  href="/company/vision"
                  className="inline-flex h-12 w-full items-center justify-center font-bold text-lg text-blue-600"
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

      {/* ===== 본문 ===== */}
      <main className="bg-white">
        {/* Title */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <div className="text-center">
            <h1 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              회사 비전
            </h1>
            <p className="mt-3 text-slate-600">
              도전 · 실천 · 신뢰의 가치로 최고의 품질과 고객만족을 실현합니다
            </p>
          </div>

          {/* Value Cards */}
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {VALUES.map((v) => (
              <article
                key={v.en}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_6px_30px_rgba(2,6,23,0.06)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_14px_50px_rgba(2,6,23,0.08)]"
              >
                <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-indigo-100 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-50" />
                <div className="text-center">
                  <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
                    {v.en}
                  </p>
                  <div className="mx-auto mt-4 inline-flex rounded-lg bg-indigo-900 px-6 py-2 text-white">
                    <span className="text-2xl font-extrabold tracking-wider">
                      {v.kr}
                    </span>
                  </div>
                  <p className="mt-5 text-lg leading-relaxed text-slate-700">
                    {v.desc}
                  </p>
                </div>
                <span className="pointer-events-none absolute inset-0 rounded-2xl ring-0 transition group-hover:ring-2 group-hover:ring-indigo-300/70" />
              </article>
            ))}
          </div>

          {/* Slogan Banner */}
          <div className="mt-16 rounded-2xl bg-indigo-50/80 p-8 md:p-10 text-center shadow-sm ring-1 ring-inset ring-indigo-100">
            <p className="text-xl md:text-2xl font-semibold text-slate-800">
              <span className="mr-1 bg-gradient-to-r from-rose-500 to-red-600 bg-clip-text text-transparent font-extrabold">
                최고
              </span>
              의 품질, 고객만족 실현
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
