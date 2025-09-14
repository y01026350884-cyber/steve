// components/content/FullSplitSection.tsx
import React from 'react';
import Link from 'next/link';

type Props = {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;
  buttonLabel?: string;
  buttonHref?: string;
  children: React.ReactNode;
};

export default function FullSplitSection({
  id,
  imageUrl,
  title,
  subtitle,
  description,
  buttonLabel,
  buttonHref,
  children,
}: Props) {
  return (
    <section id={id} className="min-h-screen bg-white">
      <div className="w-full h-full grid grid-cols-5 items-stretch">
        {/* 왼쪽 이미지 배경 영역 */}
        <div
          className="col-span-2 bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${imageUrl}')`,
          }}
        >
          <div className="p-12 flex flex-col justify-center text-white h-full">
            <p className="text-sm mb-3 font-medium tracking-wider">{subtitle}</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{title}</h2>
            <p className="text-base leading-relaxed max-w-sm mb-6">{description}</p>
            {buttonLabel && buttonHref && (
              <Link
                href={buttonHref}
                className="inline-flex items-center space-x-2 text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition-colors font-bold"
              >
                <span>{buttonLabel}</span>
                <i className="ri-arrow-right-line"></i>
              </Link>
            )}
          </div>
        </div>

        {/* 오른쪽 콘텐츠 영역 */}
        <div className="col-span-3 p-12 flex flex-col justify-center bg-white h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </section>
  );
}
