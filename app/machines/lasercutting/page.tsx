// app/company/greeting/page.tsx
'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GreetingPage() {
  const pathname = usePathname();

  const tabs = [
    { title: "레이저 절단기", href: "/machines/lasercutting" },
    { title: "절곡기", href: "/machines/bending" },
  ];

  return (
    <>
      {/* ===== 상단 히어로 ===== */}
      <section className="relative h-[240px] md:h-[300px] lg:h-[340px]">
        {/* 배경 이미지 */}
        <Image
          src="/greeting/hero.png"   // public/company/hero.jpg
          alt="보유설비"
          fill
          className="object-cover"
          priority
        />
        {/* 가독성용 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />

        {/* 중앙 타이틀 */}
        <div className="relative z-10 flex h-full items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">보유설비</h1>
            <p className="mt-2 text-sm md:text-base opacity-95">
              첨단 설비와 철저한 관리로 신뢰받는 가공 솔루션을 제공합니다.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 하단 탭바 (2개, 중앙 정렬 + 세로 구분선 + 블루 강조) ===== */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-30">
          <nav className="w-full border-b">
            <ul className="mx-auto grid grid-cols-2 text-center">
              {tabs.map((tab, index) => {
                const isActive = pathname === tab.href;
                return (
                  <li
                    key={tab.href}
                    className={`${index === 0 ? "border-r border-gray-300" : ""}`}
                  >
                    <Link
                      href={tab.href}
                      className={`inline-flex h-12 w-full items-center justify-center font-bold text-lg transition-colors duration-200 ${
                        isActive
                          ? "text-blue-600"   // ✅ 현재 선택된 항목: 블루 + 볼드
                          : "text-slate-700 hover:text-blue-600" // ✅ hover 시 확실히 블루로
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

      {/* ===== 아래부터는 기존 코드 그대로 ===== */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-12">

        {/* 상단 타이틀 */}
        <h1 className="font-sans text-4xl lg:text-5xl font-extrabold tracking-tight mb-12 text-center">
          Laser Cutting Machines
        </h1>

        {/* 본문 그리드 */}
        {/* <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"> */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* 왼쪽: 텍스트 */}
          <div>
            <h2 className="text-2xl lg:text-2xl font-montserrat font-bold leading-snug mb-8">
              고출력 파이버 레이저 설비로<br />
              복잡한 형상도 정밀하게 절단합니다.
            </h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                금화레이저는 최신 <strong>TRULASER FIBER 시리즈</strong>를 포함한 
                첨단 레이저 절단 설비를 보유하여, 
                철(SS), 스테인리스(SUS), 알루미늄(AL) 등 다양한 금속 소재를 
                <strong> 정밀하고 안정적으로 가공</strong>합니다.
              </p>
              <p>
                <strong>0.5T ~ 30T</strong> 두께 범위까지 대응 가능한 가공 능력으로, 
                산업 전반에서 요구되는 복잡한 형상과 고난이도 절단 조건에도 
                <strong>변형 없는 고품질 절단</strong>을 구현합니다.
              </p>
              <p>
                다년간 축적된 공정 데이터와 고출력 파이버 레이저 기술을 통해, 
                단순 절단을 넘어 <strong>정밀 형상 절단 및 조립용 부품 가공</strong>까지 
                통합 솔루션을 제공합니다.
              </p>
              <p>
                금화레이저는 최신 설비와 철저한 품질 관리로
                고객의 경쟁력을 높이는 <strong>신뢰받는 파트너</strong>가 되겠습니다.
              </p>
            </div>
          </div>

          {/* 오른쪽: 영상 or 이미지 */}
          <div className="relative w-full h-[240px] sm:h-[320px] lg:h-[400px] rounded-xl overflow-hidden shadow bg-black">
            {/* 영상 사용 시 */}
            <video
              src="/lasercutting/TruLaser_Cell_vid.mp4"
              className="w-full h-full object-contain"
              autoPlay
              loop
              muted
              playsInline
            />
            {/* 이미지 사용 시 (대체용) */}
            {/* 
            <Image
              src="/images/laser-cutting.jpg"
              alt="Laser Cutting Machine"
              fill
              className="object-contain"
              priority
            /> 
            */}
          </div>
        </section>
        {/* ===== 장비별 카드 섹션 ===== */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* TruLaser 1030 */}
          <div className="bg-white rounded-xl shadow p-6 text-center flex flex-col h-full">
            <div className="w-full h-48 flex items-center justify-center mb-4">
              <Image
                src="/lasercutting/TruLaser_1030_fiber.png"   // ✅ public 폴더 경로
                alt="TruLaser 1030 fiber L94"
                width={400}
                height={300}
                sizes="(max-width: 768px) 100vw, 400px"
                className="mx-auto rounded-md object-contain h-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-blue-600 mb-2">TruLaser 1030 fiber L94</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                안정적인 생산성과 효율성을 갖춘 파이버 레이저 절단기.<br />
                철(SS) 0.5T~25T, 스테인리스(SUS) 0.5T~30T,<br />
                알루미늄(AL) 0.5T~15T 가공 가능.
              </p>
            </div>
          </div>

          {/* TruLaser 5030 */}
          <div className="bg-white rounded-xl shadow p-6 text-center flex flex-col h-full">
            <div className="w-full h-48 flex items-center justify-center mb-4">
              <Image
                src="/lasercutting/TruLaser_5030_fiber.png"
                alt="TruLaser 5030 fiber L41"
                width={400}
                height={300}
                sizes="(max-width: 768px) 100vw, 400px"
                className="mx-auto rounded-md object-contain h-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-blue-600 mb-2">TruLaser 5030 fiber L41</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                대형 판재 가공에 최적화된 고출력 장비.<br />
                고속·고정밀 절단을 통해 복잡한 형상도 안정적으로 처리.<br />
                동일 가공 능력 범위 지원.
              </p>
            </div>
          </div>

          {/* TruLaser CELL 5030 */}
          <div className="bg-white rounded-xl shadow p-6 text-center flex flex-col h-full">
            <div className="w-full h-48 flex items-center justify-center mb-4">
              <Image
                src="/lasercutting/TruLaser_cell_5030.png"
                alt="TruLaser CELL 5030"
                width={400} 
                height={300}
                sizes="(max-width: 768px) 100vw, 400px"
                className="mx-auto rounded-md object-contain h-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-blue-600 mb-2">TruLaser CELL 5030</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                3D 형상 및 곡면 절단이 가능한 유연한 장비.<br />
                자동차·산업 부품 등 복잡한 형상 절단에 활용.<br />
                동일 가공 능력 범위 지원.
              </p>
            </div>
          </div>
        </section>
        {/* ===== 장비별 카드 섹션 끝 ===== */}
      </main>
    </>
  );
}



// // app/company/greeting/page.tsx
// 'use client';
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function GreetingPage() {
//   const pathname = usePathname();

//   const tabs = [
//     { title: "레이저 절단기", href: "/machines/lasercutting" },
//     { title: "절곡기", href: "/machines/bending" },
//   ];

//   return (
//     <>
//       {/* ===== 상단 히어로 ===== */}
//       <section className="relative h-[240px] md:h-[300px] lg:h-[340px]">
//         {/* 배경 이미지 */}
//         <Image
//           src="/greeting/hero.png"   // public/company/hero.jpg
//           alt="보유설비"
//           fill
//           className="object-cover"
//           priority
//         />
//         {/* 가독성용 오버레이 */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />

//         {/* 중앙 타이틀 */}
//         <div className="relative z-10 flex h-full items-center justify-center text-center text-white px-4">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">보유설비</h1>
//             <p className="mt-2 text-sm md:text-base opacity-95">
//               첨단 설비와 철저한 관리로 신뢰받는 가공 솔루션을 제공합니다.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ===== 하단 탭바 (2개, 중앙 정렬 + 세로 구분선 + 블루 강조) ===== */}
//       <div className="bg-white">
//         <div className="max-w-7xl mx-auto px-6 lg:px-30">
//           <nav className="w-full border-b">
//             <ul className="mx-auto grid grid-cols-2 text-center">
//               {tabs.map((tab, index) => {
//                 const isActive = pathname === tab.href;
//                 return (
//                   <li
//                     key={tab.href}
//                     className={`${index === 0 ? "border-r border-gray-300" : ""}`}
//                   >
//                     <Link
//                       href={tab.href}
//                       className={`inline-flex h-12 w-full items-center justify-center font-bold text-lg transition-colors duration-200 ${
//                         isActive
//                           ? "text-blue-600"   // ✅ 현재 선택된 항목: 블루 + 볼드
//                           : "text-slate-700 hover:text-blue-600" // ✅ hover 시 확실히 블루로
//                       }`}
//                     >
//                       {tab.title}
//                     </Link>
//                   </li>
//                 );
//               })}
//             </ul>
//           </nav>
//         </div>
//       </div>

//       {/* ===== 아래부터는 기존 코드 그대로 ===== */}
//       <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-12">

//         {/* 상단 타이틀 */}
//         <h1 className="font-sans text-4xl lg:text-5xl font-extrabold tracking-tight mb-10 text-center">
//           Laser Cutting Machines
//         </h1>

//         {/* 본문 그리드 */}
//         <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
//           {/* 왼쪽: 텍스트 */}
//           <div>
//             <h2 className="text-2xl lg:text-2xl font-montserrat font-bold leading-snug mb-8">
//               고출력 파이버 레이저 설비로<br />
//               복잡한 형상도 정밀하게 절단합니다.
//             </h2>

//             <div className="space-y-6 text-gray-700 leading-relaxed">
//               <p>
//                 금화레이저는 최신 <strong>TRULASER FIBER 시리즈</strong>를 포함한 
//                 첨단 레이저 절단 설비를 보유하여, 
//                 철(SS), 스테인리스(SUS), 알루미늄(AL) 등 다양한 금속 소재를 
//                 <strong> 정밀하고 안정적으로 가공</strong>합니다.
//               </p>
//               <p>
//                 <strong>0.5T ~ 30T</strong> 두께 범위까지 대응 가능한 가공 능력으로, 
//                 산업 전반에서 요구되는 복잡한 형상과 고난이도 절단 조건에도 
//                 <strong>변형 없는 고품질 절단</strong>을 구현합니다.
//               </p>
//               <p>
//                 다년간 축적된 공정 데이터와 고출력 파이버 레이저 기술을 통해, 
//                 단순 절단을 넘어 <strong>정밀 형상 절단 및 조립용 부품 가공</strong>까지 
//                 통합 솔루션을 제공합니다.
//               </p>
//               <p>
//                 금화레이저는 최신 설비와 철저한 품질 관리로
//                 고객의 경쟁력을 높이는 <strong>신뢰받는 파트너</strong>가 되겠습니다.
//               </p>
//             </div>
//           </div>

//           {/* 오른쪽: 영상 or 이미지 */}
//           <div className="relative w-full h-[240px] sm:h-[320px] lg:h-[400px] rounded-xl overflow-hidden shadow bg-black">
//             {/* 영상 사용 시 */}
//             <video
//               src="/lasercutting/TruLaser_Cell_vid.mp4"
//               className="w-full h-full object-contain"
//               autoPlay
//               loop
//               muted
//               playsInline
//             />
//             {/* 이미지 사용 시 (대체용) */}
//             {/* 
//             <Image
//               src="/images/laser-cutting.jpg"
//               alt="Laser Cutting Machine"
//               fill
//               className="object-contain"
//               priority
//             /> 
//             */}
//           </div>
//         </section>
//       </main>
//     </>
//   );
// }
