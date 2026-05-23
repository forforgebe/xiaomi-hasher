'use client'

import { useTranslation, type translations } from '@/lib/i18n'
import { useTheme } from '@/lib/theme'
type TKey = keyof typeof translations.en

export default function Navbar() {
  const { lang, toggleLang, t } = useTranslation()
  const { theme, toggleTheme } = useTheme()

  const navItems: { href: string; label: TKey }[] = [
    { href: '/', label: 'nav_home' },
    { href: '/hash', label: 'nav_hash' },
    { href: '/address', label: 'nav_address' },
    { href: '/chat', label: 'nav_chat' },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-nav border-b" style={{borderColor: 'var(--nav-border)'}}>
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-xl font-bold text-xiaomi-orange">Hasher</span>
          <span className="text-xs text-muted hidden sm:inline">by Xiaomi MiMo</span>
        </a>

        <div className="flex items-center gap-1 sm:gap-3 text-sm">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-2 sm:px-3 py-2 text-muted hover:text-fg transition-colors"
            >
              {t(item.label)}
            </a>
          ))}

          <a
            href="https://github.com/forforgebe/xiaomi-hasher"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 sm:px-3 py-2 text-muted hover:text-fg transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer"
            style={{
              borderColor: 'var(--card-border)',
              color: 'var(--muted)',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--fg)'; e.currentTarget.style.borderColor = 'var(--color-xiaomi-orange)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--card-border)' }}
            title={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
          >
            {theme === 'dark' ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer"
            style={{
              borderColor: 'var(--card-border)',
              color: 'var(--muted)',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--fg)'; e.currentTarget.style.borderColor = 'var(--color-xiaomi-orange)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--card-border)' }}
          >
            {lang === 'en' ? '中文' : 'EN'}
          </button>
        </div>
      </div>
    </nav>
  )
}
