'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import LangToggle from './LangToggle'
import { useTranslation, type translations } from '@/lib/i18n'
type TKey = keyof typeof translations.en

const navItems: { href: string; key: TKey }[] = [
  { href: '/', key: 'nav_home' },
  { href: '/hash', key: 'nav_hash' },
  { href: '/address', key: 'nav_address' },
  { href: '/chat', key: 'nav_chat' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-xiaomi-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-xiaomi-orange flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <span className="text-base sm:text-lg font-bold text-xiaomi-dark group-hover:text-xiaomi-orange transition-colors whitespace-nowrap">
              Xiaomi<span className="text-xiaomi-orange">Hasher</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? 'bg-xiaomi-orange/10 text-xiaomi-orange'
                    : 'text-gray-600 hover:text-xiaomi-dark hover:bg-xiaomi-gray'
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>

          {/* Right side: LangToggle + Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <LangToggle />
            {/* Hamburger button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-xiaomi-gray transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-xiaomi-border bg-white/95 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  pathname === item.href
                    ? 'bg-xiaomi-orange/10 text-xiaomi-orange'
                    : 'text-gray-600 hover:bg-xiaomi-gray'
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
