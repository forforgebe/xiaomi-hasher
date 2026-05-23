'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-xiaomi-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-xiaomi-orange flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <span className="text-lg font-bold text-xiaomi-dark group-hover:text-xiaomi-orange transition-colors">
              Xiaomi<span className="text-xiaomi-orange">Hasher</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? 'bg-xiaomi-orange/10 text-xiaomi-orange'
                    : 'text-gray-600 hover:text-xiaomi-dark hover:bg-xiaomi-gray'
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LangToggle />
            {/* Mobile menu - simple version */}
            <div className="md:hidden flex gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    pathname === item.href
                      ? 'bg-xiaomi-orange/10 text-xiaomi-orange'
                      : 'text-gray-500'
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
