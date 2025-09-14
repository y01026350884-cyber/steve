'use client';

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

type Stat = { label: string; value: string };
type Item = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  stats?: Stat[];
  features?: string[];
  certification?: { title: string; desc: string };
  cta?: { label: string; href: string };
};

const accordionItems: Item[] = [
  {
    title: 'ABOUT US',
    subtitle: '최고의 정밀함으로 산업 혁신을 이끄는 기술 중심 제조企業',
    description:
      '금화레이저(주)는 20년 이상의 노하우와 최첨단 장비를 바탕으로\n철강, 알루미늄, 스테인리스 등 금속을 고출력 파이버 레이저로\n정밀 가공하는 기술 중심 제조기업입니다.',
    image:
      'https://readdy.ai/api/search-image?query=modern%20industrial%20laser%20cutting%20facility%20with%20bright%20blue%20laser%20beams%20cutting%20through%20steel%20plates%2C%20high-tech%20manufacturing%20environment%20with%20precision%20equipment%2C%20clean%20industrial%20workspace%20with%20metallic%20surfaces%20and%20professional%20lighting%2C%20futuristic%20manufacturing%20technology%20representing%20company%20overview%20and%20core%20technology&width=600&height=500&seq=company-overview-bg&orientation=landscape',
    stats: [
      { label: '년간 기술력', value: '20+' },
      { label: '협력사', value: '500+' },
      { label: '품질 만족도', value: '99.9%' },
    ],
    cta: { label: '회사소개', href: '/company' },
  },
  {
    title: 'BUSINESS',
    subtitle: '다양한 금속 소재의 레이저 정밀 가공 전문 서비스',
    description:
      '자동차, 항공우주, 방산, 전자 부품 등 다양한 고부가가치 산업 분야에서 정밀 레이저 가공 서비스를 제공하고 있습니다.',
    image:
      'https://readdy.ai/api/search-image?query=diverse%20industrial%20applications%20and%20business%20areas%20of%20laser%20cutting%20technology%2C%20various%20metal%20products%20and%20components%20for%20automotive%20aerospace%20electronics%20industries%2C%20professional%20manufacturing%20showcase%20with%20different%20materials%20and%20finished%20products%2C%20business%20expansion%20and%20market%20coverage&width=600&height=500&seq=business-areas-bg&orientation=landscape',
    features: ['자동차 부품', '산업 기계', '방산 산업', '전자 부품'],
    cta: { label: '사업분야', href: '/business' },
  },
  {
    title: 'CERTIFICATIONS',
    subtitle: '산업통상자원부 인정 뿌리기업으로서의 검증된 기술력',
    description:
      '산업통상자원부가 지정하는 "뿌리 산업" 중 금속 가공 기술 분야의 핵심 제조기업으로 공식 확인받았습니다.',
    image:
      'https://readdy.ai/api/search-image?query=professional%20certification%20and%20quality%20assurance%20in%20manufacturing%20industry%2C%20official%20government%20certificates%20and%20awards%20displayed%20with%20Korean%20flag%2C%20industrial%20excellence%20recognition%20and%20trust%20symbols%2C%20manufacturing%20facility%20with%20certification%20documents%20and%20quality%20control%20systems&width=600&height=500&seq=certification-bg&orientation=landscape',
    certification: {
      title: '뿌리기업 확인서',
      desc: '산업통상자원부 인정기업',
    },
    cta: { label: '인증 현황', href: '/business/certification' },
  },
];

/* ───────────────────────────────
   공통: 데스크톱/모바일 분기 훅
─────────────────────────────── */
function useIsDesktop(bp = 1024) {
  const [isDesk, setDesk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width:${bp}px)`);
    const onChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setDesk(('matches' in e ? e.matches : (e as MediaQueryList).matches) ?? mq.matches);
    setDesk(mq.matches);
    mq.addEventListener ? mq.addEventListener('change', onChange as any) : mq.addListener(onChange as any);
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', onChange as any) : mq.removeListener(onChange as any);
    };
  }, [bp]);
  return isDesk;
}

/* ───────────────────────────────
   데스크톱 전용: 기존 sticky 2분할
─────────────────────────────── */
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
  const [companyAccordion, setCompanyAccordion] = useState<number>(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const activeIndexRef = useRef(0);

  const listContainerRef = useRef<HTMLDivElement | null>(null);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const detailRef = useRef<HTMLDivElement | null>(null);
  const [panelY, setPanelY] = useState(0);
  const [panelH, setPanelH] = useState(0);
  const DETAIL_OFFSET = 8;

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
          setCompanyAccordion(nextIndex);
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

  const handleClick = (index: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const start = wrapper.getBoundingClientRect().top + window.scrollY;
    const vh = window.innerHeight;
    const target = start + index * vh + 8;
    activeIndexRef.current = index;
    setCompanyAccordion(index);
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  const recalcPanelY = () => {
    const titleEl = titleRefs.current[companyAccordion];
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
  }, [companyAccordion]);

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

  const active = accordionItems[companyAccordion];

  return (
    <div ref={wrapperRef} className="relative" style={{ height: `${accordionItems.length * 100}vh` }}>
      <div className="sticky top-0 h-screen z-40">
        <div className="grid grid-cols-5 h-full">
          {/* 왼쪽 이미지 */}
          <div className="col-span-2 relative h-full bg-[#0b0b0b] overflow-hidden">
            <CrossfadeImage src={active.image} />
            <div className="relative p-12 flex flex-col justify-center text-white h-full" />
          </div>

          {/* 오른쪽 텍스트 */}
          <div className="col-span-3 p-12 flex flex-col justify-center bg-white">
            <div className="mb-16">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-2">기술과 신뢰의 이름, 금화레이저</h2>
            </div>

            <div ref={listContainerRef} className="relative">
              <div className="space-y-4">
                {accordionItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <div ref={(el) => (titleRefs.current[index] = el)} className="select-none">
                      <button onClick={() => handleClick(index)} className="block w-full text-left">
                        <h3
                          className={`text-[80px] leading-[1.1] font-extrabold tracking-tight transition-colors duration-300 ${
                            activeIndexRef.current === index ? 'text-blue-600' : 'text-gray-300'
                          }`}
                        >
                          {item.title}
                        </h3>
                      </button>
                    </div>
                    {activeIndexRef.current === index && <div style={{ height: panelH }} />}
                  </React.Fragment>
                ))}
              </div>

              <div className="absolute left-0 right-0 transition-[top] duration-200" style={{ top: panelY }}>
                <div ref={detailRef} className="pt-3 pb-6 border-b border-gray-200">
                  {active.description && (
                    <p className="text-gray-600 text-[15px] md:text-base leading-7 md:leading-8 tracking-[-0.005em] max-w-[520px] whitespace-pre-line mb-6">
                      {active.description}
                    </p>
                  )}
                  {active.cta && (
                    <a href={active.cta.href} className="inline-flex items-center font-semibold text-gray-900 group">
                      <span>{active.cta.label}</span>
                      <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </a>
                  )}
                </div>
              </div>

              <div className="pb-[280px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────
   모바일 전용: 심플 카드 리스트
─────────────────────────────── */
function MobileCards() {
  return (
    <section className="px-4 pt-6 pb-12 max-w-screen-sm mx-auto">
      <h2 className="text-2xl font-extrabold text-slate-900">기술과 신뢰의 이름, 금화레이저</h2>

      <div className="mt-6 space-y-8">
        {accordionItems.map((item, i) => (
          <article
            key={i}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_6px_30px_rgba(2,6,23,0.06)]"
          >
            <div className="relative">
              <img src={item.image} alt="" className="w-full aspect-[16/10] object-cover" />
            </div>

            <div className="p-5">
              <h3 className="text-xl font-extrabold tracking-tight text-slate-900">{item.title}</h3>
              {item.description && (
                <p className="mt-3 text-[15px] leading-7 text-slate-700 whitespace-pre-line">{item.description}</p>
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

/* ───────────────────────────────
   최종 컴포넌트: 반응형 분기
─────────────────────────────── */
export default function CompanyAccordion() {
  const isDesktop = useIsDesktop(1024); // lg 기준

  // 데스크톱이면 기존 sticky, 모바일이면 카드 리스트
  return isDesktop ? <DesktopSticky /> : <MobileCards />;
}
