'use client';

import React, { useEffect, useState } from 'react';

// ✅ 1. 타입 정의
interface Slide {
  image: string;
  title: string;
  subtitle: string;
}

interface HeroSectionProps {
  slides: Slide[];
}

// ✅ 2. 컴포넌트 정의
export default function HeroSection({ slides }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ 3초마다 자동 슬라이드 전환
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section id="hero" className="relative h-[calc(100svh-96px)] overflow-hidden">
      {slides.map((slide: Slide, index: number) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* 어두운 반투명 오버레이 */}
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>

            {/* 가운데 텍스트 박스 */}
            <div className="relative h-full flex items-center justify-center text-center text-white">
              <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-5xl md:text-6xl font-bold mb-6">{slide.title}</h2>
                <p className="text-xl md:text-2xl opacity-90">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}