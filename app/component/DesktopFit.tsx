// app/component/DesktopFit.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * 데스크톱 디자인 폭(기본 1536px)을 기준으로
 * 모바일에서 화면폭에 맞춰 자동 축소해 주는 컴포넌트.
 */
export default function DesktopFit({ designWidth = 1536 }: { designWidth?: number }) {
  const pathname = usePathname();

  useEffect(() => {
    // viewport 메타 보장
    const ensureViewportMeta = (): HTMLMetaElement => {
      let el = document.querySelector('meta[name="viewport"]') as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", "viewport");
        document.head.appendChild(el);
      }
      return el;
    };

    const apply = () => {
      const meta = ensureViewportMeta();
      const ww = window.innerWidth;
      // 작은 화면은 축소, 큰 화면은 1배
      const scale = Math.min(ww / designWidth, 1);

      meta.setAttribute(
        "content",
        [
          `width=${designWidth}`,
          `initial-scale=${scale}`,
          `maximum-scale=${scale}`,
          `user-scalable=no`,
          `viewport-fit=cover`,
        ].join(", ")
      );

      // 필요 시 CSS에서 참조
      document.documentElement.style.setProperty("--desktop-fit-scale", String(scale));
      // iOS에서 간헐적으로 남는 1px 틈 방지
      document.body.style.overflowX = "hidden";
      document.body.style.backgroundColor = "#ffffff"; // 배경 띠 방지
    };

    apply();

    window.addEventListener("resize", apply);
    window.addEventListener("orientationchange", apply);

    // ✅ 라우트 바뀔 때도 다시 계산
    // (Next App Router에서는 pathname 변경으로 트리거)
    return () => {
      window.removeEventListener("resize", apply);
      window.removeEventListener("orientationchange", apply);
    };
  }, [pathname, designWidth]);

  return null;
}
