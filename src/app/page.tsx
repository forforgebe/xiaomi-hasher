'use client'

import Link from 'next/link'
import { useTranslation, type translations } from '@/lib/i18n'
type TKey = keyof typeof translations.en

const features: { icon: string; href: string; key: TKey; desc_key: TKey }[] = [
  { icon: '#️⃣', href: '/hash', key: 'feat_hash', desc_key: 'feat_hash_desc' },
  { icon: 'Ⓐ', href: '/address', key: 'feat_address', desc_key: 'feat_address_desc' },
  { icon: '🤖', href: '/chat', key: 'feat_ai', desc_key: 'feat_ai_desc' },
  { icon: '🔒', href: '/hash', key: 'feat_no_server', desc_key: 'feat_no_server_desc' },
]

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-24 pb-16 text-center">
        <div className="inline-block px-3 py-1 rounded-full bg-xiaomi-orange/10 border border-xiaomi-orange/20 text-xiaomi-orange text-xs mb-6">
          ✦ Powered by Xiaomi MiMo V2.5
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
          {t('hero_title')}{' '}
          <span className="text-xiaomi-orange">{t('hero_subtitle')}</span>
        </h1>
        <p className="text-base sm:text-lg text-xiaomi-muted max-w-2xl mx-auto mb-8 px-2">
          {t('hero_desc')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/hash"
            className="inline-flex items-center gap-2 bg-xiaomi-orange hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-all glow-orange"
          >
            <span>{t('get_started')}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <a
            href="https://github.com/forforgebe/xiaomi-hasher"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-sm text-xiaomi-muted hover:text-white hover:border-xiaomi-orange/40 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            {t('view_github')}
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-12">{t('features_title')}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feat) => (
            <Link
              key={feat.key}
              href={feat.href}
              className="bg-xiaomi-card border border-white/5 rounded-xl p-5 sm:p-6 hover:border-xiaomi-orange/30 transition-all"
            >
              <div className="text-xl sm:text-2xl mb-3">{feat.icon}</div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">{t(feat.key)}</h3>
              <p className="text-xs sm:text-sm text-xiaomi-muted">{t(feat.desc_key)}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="bg-xiaomi-card border border-white/5 rounded-xl p-6 sm:p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">{t('about_title')}</h2>
          <p className="text-sm text-xiaomi-muted max-w-2xl mx-auto leading-relaxed">
            {t('about_desc')}
          </p>
          <div className="flex justify-center gap-4 pt-6">
            <a href="https://github.com/forforgebe/xiaomi-hasher" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-sm text-xiaomi-muted hover:text-white hover:border-xiaomi-orange/40 transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
