// app/components/Footer.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative z-[60] isolate bg-gray-800 text-white py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        {/* 모바일 2열, 데스크탑 5열 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 place-items-start">
          {/* 로고: 모바일 두 칸, md 이상 한 칸 */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex justify-start md:justify-center">
              <Image
                src="/logoimage_transparent.png"
                alt="KH LASER 로고"
                width={160}
                height={50}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* 회사소개 */}
          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">회사소개</h4>
            <ul className="space-y-1.5 md:space-y-2 text-gray-300 text-[13px] md:text-sm">
              <li><Link href="/company" className="hover:text-white">인사말</Link></li>
              <li><Link href="/company/organization" className="hover:text-white">조직도</Link></li>
              <li><Link href="/company/vision" className="hover:text-white">회사비전</Link></li>
            </ul>
          </div>

          {/* 사업현황 */}
          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">사업현황</h4>
            <ul className="space-y-1.5 md:space-y-2 text-gray-300 text-[13px] md:text-sm">
              <li><Link href="/business" className="hover:text-white">사업분야</Link></li>
              <li><Link href="/business/certification" className="hover:text-white">인증현황</Link></li>
              <li><Link href="/business/patent" className="hover:text-white">특허인증</Link></li>
            </ul>
          </div>

          {/* 보유설비 */}
          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">보유설비</h4>
            <ul className="space-y-1.5 md:space-y-2 text-gray-300 text-[13px] md:text-sm">
              <li><Link href="/machines" className="hover:text-white">레이저 절단기</Link></li>
              <li><Link href="/machines/bending" className="hover:text-white">절곡기</Link></li>
              <li><Link href="/machines/shearing_machine" className="hover:text-white">샤링기</Link></li>
            </ul>
          </div>

          {/* 견적문의 */}
          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">견적문의</h4>
            <ul className="space-y-1.5 md:space-y-2 text-gray-300 text-[13px] md:text-sm">
              <li><Link href="/support/list" className="hover:text-white">문의하기</Link></li>
            </ul>
          </div>
        </div>

        {/* 구분선 + 저작권 */}
        <div className="border-t border-gray-700 mt-8 pt-6 md:pt-8 text-center text-gray-400 text-xs md:text-sm">
          <p>&copy; 2025 (주) 금화레이저. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
