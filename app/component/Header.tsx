// app/components/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const menuItems = [
  {
    title: '회사소개',
    href: '/company',
    dropdown: [
      { title: '인사말', href: '/company/greeting' },
      { title: '조직도', href: '/company/organization' },
      { title: '회사비전', href: '/company/vision' },
      { title: '오시는길', href: '/company/location' },
    ],
  },
  {
    title: '사업현황',
    href: '/business',
    dropdown: [
      { title: '사업분야', href: '/business/business_sector' },
      { title: '인증현황', href: '/business/certification' },
    ],
  },
  {
    title: '보유설비',
    href: '/machines',
    dropdown: [
      { title: '레이저 절단기', href: '/machines/lasercutting' },
      { title: '절곡기', href: '/machines/bending' },
      { title: '샤링기', href: '/machines/shearing_machine' },
    ],
  },
  {
    title: '견적문의',
    href: '/support',
    dropdown: [{ title: '문의하기', href: '/support/list' }],
  },
] as const;

export default function Header() {
  const [open, setOpen] = useState(false); // 데스크톱 드롭다운
  const [mobileOpen, setMobileOpen] = useState(false); // 모바일 슬라이드 메뉴
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  // ── refs
  const navRef = useRef<HTMLElement | null>(null);
  const btnRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [shifts, setShifts] = useState<number[]>(Array(menuItems.length).fill(0));

  // 공용 ref 세터(콜백이 값을 반환하지 않도록 블록 본문만)
  const setArrayRef = <T extends HTMLElement>(
    arrRef: React.MutableRefObject<(T | null)[]>,
    idx: number,
  ) => (el: T | null) => {
    arrRef.current[idx] = el;
  };

  const measure = () => {
    const inner = innerRef.current;
    if (!inner) return;

    const innerLeft = inner.getBoundingClientRect().left;

    const btnCenters: number[] = btnRefs.current.map((btn) => {
      if (!btn) return 0;
      const r = btn.getBoundingClientRect();
      return r.left + r.width / 2 - innerLeft;
    });

    const colCenters: number[] = colRefs.current.map((col) => {
      if (!col) return 0;
      return col.offsetLeft + col.offsetWidth / 2;
    });

    const count = Math.min(btnCenters.length, colCenters.length);
    const next: number[] = Array(count)
      .fill(0)
      .map((_, i) => btnCenters[i] - colCenters[i]);

    setShifts((prev) => {
      const out = [...prev];
      for (let i = 0; i < count; i++) out[i] = next[i] || 0;
      return out;
    });
  };

  // 데스크톱 드롭다운 위치 재측정
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(measure);
    const onResize = () => requestAnimationFrame(measure);
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', onResize);
    };
  }, [open, hoveredIndex]);

  // 모바일 메뉴가 열릴 때 배경 스크롤 잠금
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // 화면이 md 이상으로 커지면 모바일 메뉴 닫기
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileOpen(false);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <header className="bg-white shadow-sm relative z-50">
      <div
        className="px-6 py-4 relative"
        onMouseLeave={() => {
          setOpen(false);
          setHoveredIndex(null);
        }}
      >
        <div className="flex items-center justify-between px-6">
          {/* 로고 */}
          <div className="flex items-center h-16 overflow-hidden">
            <Link href="/" className="flex items-center h-full">
              <Image
                src="/logoimage.png"
                alt="금화레이저 로고" 
                width={200}
                height={80}
                priority
                className="origin-left"
                style={{ width: 'auto', height: 'auto' }}
              />
            </Link>
          </div>

          {/* 상단 메뉴 (데스크톱) */}
          <nav ref={navRef} className="hidden md:flex items-center gap-8 mr-9">
            {menuItems.map((item, idx) => {
              const firstHref = item.dropdown?.[0]?.href || item.href;
              return (
                <Link
                  key={item.title}
                  ref={setArrayRef<HTMLAnchorElement>(btnRefs, idx)}
                  href={firstHref}
                  className={`px-3 py-2 text-xl font-bold transition-colors ${
                    isActive(item.href)
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onMouseEnter={() => {
                    setOpen(true);
                    setHoveredIndex(idx);
                    requestAnimationFrame(measure);
                  }}
                  onFocus={() => {
                    setOpen(true);
                    setHoveredIndex(idx);
                    requestAnimationFrame(measure);
                  }}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* 모바일 햄버거 버튼 */}
          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200"
            aria-label="메뉴 열기"
            onClick={() => setMobileOpen(true)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* 데스크톱 드롭다운 (md 이상에서만 노출) */}
        {open && (
          <div className="absolute left-0 right-0 top-full w-full hidden md:block" onMouseEnter={() => setOpen(true)}>
            <div className="border-t border-slate-200 bg-white shadow-[0_10px_40px_rgba(2,6,23,0.08)]">
              <div ref={innerRef} className="px-6 py-6">
                <div className="flex gap-8 md:gap-16">
                  {menuItems.map((group, gIdx) => (
                    <div
                      key={group.title}
                      ref={setArrayRef<HTMLDivElement>(colRefs, gIdx)}
                      style={{
                        transform: `translateX(${shifts[gIdx] || 0}px)`,
                        transition: 'transform 120ms ease-out',
                      }}
                    >
                      <ul className="space-y-1">
                        {group.dropdown?.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              className={`block rounded-md px-2 py-1 text-sm transition-colors whitespace-pre-line ${
                                isActive(sub.href)
                                  ? 'text-blue-600 font-semibold'
                                  : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                              }`}
                              onClick={() => setOpen(false)}
                            >
                              {sub.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 모바일 슬라이드 메뉴 */}
        {mobileOpen && (
          <div className="fixed inset-0 z-[60] md:hidden">
            {/* Dim */}
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
            {/* Panel */}
            <div className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-xl p-6 overflow-y-auto">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">메뉴</span>
                <button aria-label="메뉴 닫기" className="p-2 -m-2" onClick={() => setMobileOpen(false)}>
                  <svg width="22" height="22" viewBox="0 0 24 24">
                    <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <nav className="mt-4 space-y-6">
                {menuItems.map((group) => (
                  <div key={group.title}>
                    <div className="text-xs font-semibold text-slate-500">{group.title}</div>
                    <ul className="mt-2 space-y-1">
                      {(group.dropdown || [{ title: group.title, href: group.href }]).map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            className={`block rounded-md px-3 py-2 transition-colors ${
                              isActive(sub.href)
                                ? 'bg-blue-50 text-blue-700 font-semibold'
                                : 'text-slate-800 hover:bg-slate-50'
                            }`}
                            onClick={() => setMobileOpen(false)}
                          >
                            {sub.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
