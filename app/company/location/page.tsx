'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    kakao: any;
  }
}

const ADDRESS = '경북 성주군 선남면 신부길 81-44';
const PLACE_NAME = '금화레이저';

// ▼ 필요 시 수정하세요
const TEL = '054-933-3737';
const FAX = '054-933-3733';
const BUS_GUIDE = '성주터미널 → 선남면 신부리 하차';
const CAR_GUIDE = '중부내륙고속도로 성주IC에서 차량 15분';

export default function LocationPage() {
  const pathname = usePathname();

  const tabs = [
    { title: '인사말', href: '/company/greeting' },
    { title: '조직도', href: '/company/organization' },
    { title: '회사비전', href: '/company/vision' },
    { title: '오시는 길', href: '/company/location' },
  ];

  useEffect(() => {
    const APP_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY ?? '';

    const initMap = () => {
      const { kakao } = window;
      const container = document.getElementById('kakao-map');
      if (!container) return;

      const fallback = new kakao.maps.LatLng(35.8402, 128.2895);

      const map = new kakao.maps.Map(container, {
        center: fallback,
        level: 4,
      });

      const zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(ADDRESS, (result: any[], status: string) => {
        let coords = fallback;

        if (status === kakao.maps.services.Status.OK && result?.[0]) {
          coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          map.setCenter(coords);
        }

        const marker = new kakao.maps.Marker({ map, position: coords });

        const iwContent = `
          <div style="padding:8px 10px;font-size:13px;line-height:1.4;">
            <strong>${PLACE_NAME}</strong><br/>
            ${ADDRESS}
          </div>
        `;
        const infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removable: true,
        });
        infowindow.open(map, marker);
      });
    };

    if (!APP_KEY) {
      console.error('[KakaoMap] NEXT_PUBLIC_KAKAO_MAP_KEY 가 비어있습니다.');
      return;
    }

    if (window.kakao?.maps) {
      window.kakao.maps.load(initMap);
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-kakao="map-sdk"]'
    );

    const onLoad = () => {
      try {
        window.kakao.maps.load(initMap);
      } catch (e) {
        console.error('[KakaoMap] kakao.maps.load 실패', e);
      }
    };

    if (existing) {
      if (window.kakao?.maps) onLoad();
      else existing.addEventListener('load', onLoad, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&autoload=false&libraries=services`;
    script.async = true;
    script.defer = true;
    script.setAttribute('data-kakao', 'map-sdk');
    script.onload = onLoad;
    script.onerror = (e) => {
      console.error('[KakaoMap] SDK 로드 에러', e, 'src=', script.src);
    };
    document.head.appendChild(script);
  }, []);

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

      {/* ===== 탭바 ===== */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="w-full border-b">
            <ul className="mx-auto grid grid-cols-4 text-center">
              {tabs.map((tab, index) => {
                const isActive = pathname === tab.href;
                return (
                  <li
                    key={tab.href}
                    className={index !== tabs.length - 1 ? 'border-r border-gray-300' : ''}
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

      {/* ===== 본문 ===== */}
      <main className="bg-white">
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <h2 className="text-center text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            오시는 길
          </h2>

          {/* 지도 */}
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 shadow-sm">
            <div id="kakao-map" className="h-[420px] w-full" />
          </div>

          {/* ===== 주소 / TEL / FAX ===== */}
          <div className="mt-10 border-t border-slate-200 pt-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              {/* 주소 */}
              <div className="flex items-start gap-3">
                {/* 위치 아이콘 */}
                <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-red-600"
                  >
                    <path d="M12 2C8.686 2 6 4.686 6 8c0 4.418 6 12 6 12s6-7.582 6-12c0-3.314-2.686-6-6-6Zm0 8.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
                  </svg>
                </span>
                <p className="text-lg font-medium text-slate-900">
                  {ADDRESS}
                </p>
              </div>

              {/* TEL / FAX */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* TEL */}
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-slate-900"
                    >
                      <path d="M6.62 10.79a15.464 15.464 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.11.37 2.3.57 3.58.57a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C10.07 22 2 13.93 2 3a1 1 0 0 1 1-1h3.49a1 1 0 0 1 1 1c0 1.28.2 2.47.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2Z" />
                    </svg>
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">TEL</div>
                    <div className="text-slate-700">{TEL}</div>
                  </div>
                </div>

                {/* FAX */}
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-slate-900"
                    >
                      <path d="M16 3H8v4H6a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h2v-4h8v4h2a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3h-2V3Zm-6 4V5h4v2h-4Z" />
                    </svg>
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">FAX</div>
                    <div className="text-slate-700">{FAX}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== 교통편 ===== */}
          <div className="mt-10 border-t border-slate-200 pt-8">
            <h3 className="mb-6 text-lg font-extrabold tracking-tight text-red-600">
              교통편
            </h3>

            <div className="grid gap-8 sm:grid-cols-2">
              {/* 버스 */}
              <div className="flex items-center gap-5">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                  {/* 버스 아이콘 */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-8 w-8 text-slate-900"
                  >
                    <path d="M17 1H7C4.79 1 3 2.79 3 5v9c0 1.66 1.34 3 3 3v2a1 1 0 1 0 2 0v-2h8v2a1 1 0 1 0 2 0v-2c1.66 0 3-1.34 3-3V5c0-2.21-1.79-4-4-4ZM7 3h10c1.1 0 2 .9 2 2v2H5V5c0-1.1.9-2 2-2Zm-2 9V9h14v3H5Zm2 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm10 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                  </svg>
                </span>
                <div>
                  <div className="text-base font-semibold text-slate-900">버스</div>
                  <p className="mt-1 text-slate-700">{BUS_GUIDE}</p>
                </div>
              </div>

              {/* 자가용 */}
              <div className="flex items-center gap-5">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                  {/* 차/도로 아이콘 */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-8 w-8 text-slate-900"
                  >
                    <path d="M5 11h14l-1.4-4.2A3 3 0 0 0 14.72 5H9.28a3 3 0 0 0-2.88 1.8L5 11Zm14 2H5a2 2 0 0 0-2 2v4a1 1 0 1 0 2 0v-1h14v1a1 1 0 1 0 2 0v-4a2 2 0 0 0-2-2ZM7 17a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm10 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                  </svg>
                </span>
                <div>
                  <div className="text-base font-semibold text-slate-900">자가용</div>
                  <p className="mt-1 text-slate-700">{CAR_GUIDE}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
