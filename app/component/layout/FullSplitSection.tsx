// components/content/ServicesAccordion.tsx

import React from 'react';

type Props = {
  active: number;
  onToggle: (index: number) => void;
};

export default function ServicesAccordion({ active, onToggle }: Props) {
  // 각 서비스 항목 정의 (제목, 설명, 상세 내용)
  const items = [
    {
      title: '레이저 가공',
      description: '고출력 파이버 레이저 기반 정밀 절단 및 가공 기술',
      content: (
        <>
          <p className="text-gray-700 leading-relaxed mb-4">
            최신 파이버 레이저 시스템을 활용하여 철강, 스테인리스, 알루미늄 등 다양한 금속 소재를
            0.1mm~25mm 두께까지 정밀하게 절단 가공합니다.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Feature icon="ri-scissors-cut-line" label="정밀 절단" />
            <Feature icon="ri-focus-line" label="복잡 형상" />
            <Feature icon="ri-speed-line" label="고속 가공" />
            <Feature icon="ri-settings-4-line" label="무변형 가공" />
          </div>
        </>
      ),
    },
    {
      title: '제품',
      description: '다양한 산업 분야 맞춤형 정밀 가공 제품 공급',
      content: (
        <>
          <p className="text-gray-700 leading-relaxed mb-4">
            자동차, 항공우주, 방산, 전자 등 다양한 산업 분야에 필요한 고정밀 금속 부품과 제품을
            맞춤형으로 제작합니다.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <Stat label="제품 종류" value="1000+" />
            <Stat label="가공 정밀도" value="±0.1mm" />
          </div>
        </>
      ),
    },
    {
      title: '공정',
      description: '체계적 품질 관리와 정밀 측정 시스템',
      content: (
        <>
          <p className="text-gray-700 leading-relaxed mb-4">
            철저한 품질 관리 시스템과 정밀 측정 장비를 통해 고객이 요구하는 품질 기준을
            완벽하게 충족시킵니다.
          </p>
          <div className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
            <div className="flex items-center">
              <i className="ri-check-double-line text-blue-600 text-2xl mr-3"></i>
              <div>
                <h4 className="font-semibold text-gray-900">ISO 9001 품질 시스템</h4>
                <p className="text-sm text-gray-600">국제 표준 품질 관리 시스템 운영</p>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      title: '기술력',
      description: '기업부설연구소 운영을 통한 지속적 기술 개발',
      content: (
        <>
          <p className="text-gray-700 leading-relaxed mb-4">
            기업부설연구소를 통해 지속적인 R&D 투자와 신기술 개발로 업계 최고 수준의 기술 경쟁력을
            확보하고 있습니다.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Feature icon="ri-lightbulb-line" label="특허 기술" />
            <Feature icon="ri-research-line" label="R&D 투자" />
            <Feature icon="ri-team-line" label="전문 인력" />
            <Feature icon="ri-trophy-line" label="기술 인증" />
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div key={index} className="border-b border-gray-200 pb-2">
          {/* 제목 버튼 */}
          <button
            onClick={() => onToggle(index)}
            className="flex items-start space-x-6 w-full text-left"
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-colors duration-300 ${
                active === index ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <i className="ri-check-line text-white text-xs"></i>
            </div>
            <div className="flex-1">
              <h3
                className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                  active === index ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                {item.title}
              </h3>
              <p className="text-gray-700 text-lg">{item.description}</p>
            </div>
          </button>

          {/* 본문 내용 */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              active === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ✅ 아이콘이 포함된 간단한 기능 박스
function Feature({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center p-2 bg-white rounded">
      <i className={`${icon} text-blue-600 mr-2`}></i>
      <span className="text-sm text-gray-700">{label}</span>
    </div>
  );
}

// ✅ 숫자 정보 표시용 통계 컴포넌트
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-3 bg-white rounded text-center">
      <div className="text-2xl font-bold text-blue-600">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
