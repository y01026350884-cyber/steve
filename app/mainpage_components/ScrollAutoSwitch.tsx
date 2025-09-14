'use client';

import React, { useEffect, useRef } from 'react';

interface AutoScrollSwitchProps {
  sectionCount: number; // 전체 섹션 개수
  activeIndex: number; // 현재 활성화된 섹션 인덱스
  setActiveIndex: (index: number) => void; // 인덱스 변경 함수
  children: React.ReactNode[]; // 섹션 요소들
}

/**
 * 전체 풀스크린 섹션이 여러 개일 때,
 * 스크롤 위치를 감지하여 자동으로 섹션을 전환하는 래퍼 컴포넌트
 */
const AutoScrollSwitch: React.FC<AutoScrollSwitchProps> = ({
  sectionCount,
  activeIndex,
  setActiveIndex,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = Array.from(container.children) as HTMLElement[];

    // IntersectionObserver 설정
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.findIndex((el) => el === entry.target);
            if (index !== -1 && index !== activeIndex) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.6, // 60% 이상 보이면 해당 섹션으로 간주
      }
    );

    // 각 섹션에 observer 연결
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      // 클린업 시 observer 제거
      observerRef.current?.disconnect();
    };
  }, [activeIndex, setActiveIndex]);

  return (
    <div ref={containerRef} className="w-full">
      {children.map((child, index) => (
        <div key={index} className="min-h-screen w-full">
          {child}
        </div>
      ))}
    </div>
  );
};

export default AutoScrollSwitch;
