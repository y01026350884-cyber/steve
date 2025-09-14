'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/company/greeting', label: '인사말' },
  { href: '/company/organization', label: '조직도' },
  { href: '/company/vision', label: '회사 비전' },
  { href: '/company/location', label: '오시는 길' },
];

function cx(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function CompanyTabs() {
  const pathname = usePathname();

  return (
    <nav className="w-full border-b">
      {/* 한 줄(4칸)로 고정 */}
      <ul className="mx-auto grid w-full grid-cols-4 text-center">
        {tabs.map((t) => {
          const active = pathname === t.href;
          return (
            <li key={t.href}>
              <Link
                href={t.href}
                className={cx(
                  'inline-flex h-12 w-full items-center justify-center whitespace-nowrap border-b-2 transition-colors',
                  active
                    ? 'border-blue-600 text-blue-600 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                )}
              >
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
