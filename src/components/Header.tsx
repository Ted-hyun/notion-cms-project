'use client';

import Link from 'next/link';
import { useUiStore } from '@/lib/store/useUiStore';
import { Menu, X } from 'lucide-react';

export function Header() {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUiStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white shadow-sm">
      <nav className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="text-xl font-bold text-slate-900">
            📝 블로그
          </Link>

          {/* 데스크톱 네비게이션 */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm text-slate-600 hover:text-slate-900 transition"
            >
              홈
            </Link>
            <Link
              href="/"
              className="text-sm text-slate-600 hover:text-slate-900 transition"
            >
              모든 글
            </Link>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 hover:bg-slate-100 rounded"
            aria-label="메뉴 토글"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* 모바일 네비게이션 */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-200">
            <Link
              href="/"
              className="block py-2 text-slate-600 hover:text-slate-900"
              onClick={closeMobileMenu}
            >
              홈
            </Link>
            <Link
              href="/"
              className="block py-2 text-slate-600 hover:text-slate-900"
              onClick={closeMobileMenu}
            >
              모든 글
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
