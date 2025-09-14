'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

type Item = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features?: string[];
  cta?: { label: string; href: string };
};

/* ▼ 콘텐츠 */
const accordionItems: Item[] = [
  {
    title: 'TECHNOLOGY',
    subtitle: '다양한 금속',
    description: `고출력 파이버레이저 절단 기술을 기반으로 고난도 금속 가공 문제를 해결하는 기술 중심 기업입니다.`,
    image: '/certifications/Services/Services_1.jpg',
    cta: { label: '기술력', href: '/technology/technology' },
  },
  {
    title: 'PRODUCTS',
    subtitle: '고객 맞춤 설계',
    description: `정밀 레이저 가공 기술로 고객 요구에 최적화된 맞춤형 솔루션을 제공합니다.`,
    image: '/certifications/Services/Services_2.jpg',
    cta: { label: '제품', href: '/technology/product' },
  },
  {
    title: 'PROCESS',
    subtitle: '스마트 자동화',
    description: `체계적이고 정밀한 생산 프로세스를 통해 고객이 신뢰할 수 있는 최고 품질의 제품을 제공합니다.`,
    image: '/certifications/Services/Services_3.jpg',
    cta: { label: '공정', href: '/technology/process' },
  },
];

/* ───────── 공통: 데스크톱/모바일 분기 훅 ───────── */
function useIsDesktop(bp = 1024) {
  const [isDesk, setDesk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width:${bp}px)`);
    const onChange = (e: MediaQueryListEvent) => setDesk(e.matches);
    setDesk(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [bp]);
  return isDesk;
}

/* ───────── 데스크톱 전용: 기존 스티키 2분할 ───────── */
function CrossfadeImage({ src }: { src: string }) {
  const DURATION = 400;
  const HALF = DURATION / 2;

  const [baseSrc, setBaseSrc] = useState(src);
  const [overlaySrc, setOverlaySrc] = useState(src);
  const [showOverlay, setShowOverlay] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'baseOut' | 'overlayIn'>('idle');
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (src === baseSrc) return;
    setPhase('baseOut');
    setShowOverlay(false);
    const t1 = window.setTimeout(() => {
      setOverlaySrc(src);
      setShowOverlay(true);
      setPhase('overlayIn');
    }, HALF);
    const t2 = window.setTimeout(() => {
      setBaseSrc(src);
      setShowOverlay(false);
      setPhase('idle');
    }, DURATION);
    timers.current.forEach(clearTimeout);
    timers.current = [t1, t2];
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [src, baseSrc]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={baseSrc}
        alt=""
        className={[
          'absolute inset-0 w-full h-full object-cover pointer-events-none',
          'transition-[opacity,filter] ease-out',
          phase === 'baseOut' ? `duration-[${HALF}ms] opacity-0 blur-sm` : 'duration-150 opacity-100 blur-0',
        ].join(' ')}
        style={{ willChange: 'opacity, filter' }}
      />
      {showOverlay && (
        <img
          src={overlaySrc}
          alt=""
          className={[
            'absolute inset-0 w-full h-full object-cover pointer-events-none',
            'transition-[opacity,filter] ease-out',
            phase === 'overlayIn' ? `duration-[${HALF}ms] opacity-100 blur-0` : 'duration-150 opacity-0 blur-sm',
          ].join(' ')}
          style={{ willChange: 'opacity, filter' }}
        />
      )}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
    </div>
  );
}

function DesktopSticky() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const activeIndexRef = useRef(0);

  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const detailRef = useRef<HTMLDivElement | null>(null);
  const [panelY, setPanelY] = useState(0);
  const [panelH, setPanelH] = useState(0);
  const DETAIL_OFFSET = 12;

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        const start = wrapper.getBoundingClientRect().top + window.scrollY;
        const vh = window.innerHeight;
        const totalHeight = accordionItems.length * vh;
        const totalScrollable = totalHeight - vh;
        const y = window.scrollY;
        const local = Math.min(Math.max(y - start, 0), totalScrollable);

        const TOP_SNAP_PX = 40;
        let nextIndex: number;
        if (local <= TOP_SNAP_PX) nextIndex = 0;
        else {
          const raw = local / vh;
          nextIndex = Math.round(raw);
          nextIndex = Math.max(0, Math.min(accordionItems.length - 1, nextIndex));
        }
        if (nextIndex !== activeIndexRef.current) {
          activeIndexRef.current = nextIndex;
          setActiveIndex(nextIndex);
        }
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const recalcPanelY = () => {
    const titleEl = titleRefs.current[activeIndex];
    if (!titleEl) return;
    const y = titleEl.offsetTop + titleEl.offsetHeight + DETAIL_OFFSET;
    const h = detailRef.current?.offsetHeight ?? 0;
    requestAnimationFrame(() => {
      setPanelY(y);
      setPanelH(h);
    });
  };

  useLayoutEffect(() => {
    recalcPanelY();
  }, [activeIndex]);

  useEffect(() => {
    recalcPanelY();
    const onResize = () => recalcPanelY();
    window.addEventListener('resize', onResize);
    const t = setTimeout(recalcPanelY, 0);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(t);
    };
  }, []);

  const active = accordionItems[activeIndex];

  const handleClick = (index: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const start = wrapper.getBoundingClientRect().top + window.scrollY;
    const vh = window.innerHeight;
    const target = start + index * vh + 8;
    activeIndexRef.current = index;
    setActiveIndex(index);
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <div ref={wrapperRef} className="relative" style={{ height: `${accordionItems.length * 100}vh` }}>
      <div className="sticky top-0 h-screen z-40">
        <div className="grid grid-cols-5 h-full">
          {/* 왼쪽: 배경 이미지 */}
          <div className="col-span-2 relative h-full bg-[#0b0b0b] overflow-hidden">
            <CrossfadeImage src={active.image} />
          </div>

          {/* 오른쪽: 제목 리스트 + 디테일 */}
          <div className="col-span-3 p-12 flex flex-col justify-center bg-white">
            <div className="mb-16">
              <h2 className="text-4xl font-extrabold text-slate-900">서비스 소개</h2>
            </div>

            <div className="relative">
              <div className="space-y-4">
                {accordionItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <div
                      ref={(el) => {
                        titleRefs.current[index] = el;
                      }}
                      className="select-none"
                    >
                      <button onClick={() => handleClick(index)} className="block w-full text-left">
                        <h3
                          className={`text-[80px] leading-[1.1] font-extrabold tracking-tight transition-colors duration-300 ${
                            activeIndex === index ? 'text-blue-600' : 'text-gray-300'
                          }`}
                        >
                          {item.title}
                        </h3>
                      </button>
                    </div>
                    {activeIndex === index && <div style={{ height: panelH }} />}
                  </React.Fragment>
                ))}
              </div>

              <div className="absolute left-0 right-0 transition-[top] duration-200" style={{ top: panelY }}>
                <div ref={detailRef} className="pt-3 pb-6 border-b border-gray-200">
                  {active.description && (
                    <p className="text-slate-600 text-[15px] md:text-base leading-7 md:leading-8 whitespace-pre-line mb-6 max-w-[520px]">
                      {active.description}
                    </p>
                  )}
                  {active.cta && (
                    <a href={active.cta.href} className="inline-flex items-center font-semibold text-slate-900 group">
                      <span>{active.cta.label}</span>
                      <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="pb-[240px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── 모바일 전용: 카드 리스트 ───────── */
function MobileCards() {
  return (
    <section className="px-4 pt-6 pb-12 max-w-screen-sm mx-auto">
      <h2 className="text-2xl font-extrabold text-slate-900">서비스 소개</h2>

      <div className="mt-6 space-y-8">
        {accordionItems.map((item, i) => (
          <article
            key={i}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_6px_30px_rgba(2,6,23,0.06)]"
          >
            <img src={item.image} alt="" className="w-full aspect-[16/10] object-cover" />

            <div className="p-5">
              <h3 className="text-xl font-extrabold tracking-tight text-slate-900">{item.title}</h3>
              {item.subtitle && <p className="mt-1 text-sm text-slate-500">{item.subtitle}</p>}

              {item.description && (
                <p className="mt-3 text-[15px] leading-7 text-slate-700 whitespace-pre-line">{item.description}</p>
              )}

              {item.features && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.features.map((f, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              )}

              {item.cta && (
                <a
                  href={item.cta.href}
                  className="inline-flex items-center gap-1 mt-4 font-semibold text-blue-600 hover:text-blue-700"
                >
                  {item.cta.label}
                  <span aria-hidden>→</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ───────── 최종: 반응형 분기 렌더 ───────── */
export default function ServicesAccordion() {
  const isDesktop = useIsDesktop(1024); // lg 기준
  return isDesktop ? <DesktopSticky /> : <MobileCards />;
}
