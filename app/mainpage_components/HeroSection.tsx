'use client';

import React from 'react';

export default function HeroSection() {
  return (
    <section id="hero" className="relative h-[calc(100svh-96px)] overflow-hidden">
      {/* 배경 영상 */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/lasercutting/TruLaser_Cell_vid.mp4"    // ✅ 여기에 영상 파일 경로 넣으세요
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 어두운 반투명 오버레이 */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* 가운데 텍스트 박스 */}
      <div className="relative h-full flex items-center justify-center text-center text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            정밀한 기술력으로
          </h2>
          <p className="text-xl md:text-2xl opacity-90">
            고객의 내일을 설계합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
