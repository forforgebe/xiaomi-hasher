'use client'

import Link from 'next/link'
import { useTranslation } from '@/lib/i18n'

import type { translations } from '@/lib/i18n'
type TKey = keyof typeof translations.en

const features: { icon: string; href: string; key: TKey; desc_key: TKey }[] = [
  { icon: '#', href: '/hash', key: 'feat_hash', desc_key: 'feat_hash_desc' },
  { icon: 'Ⓐ', href: '/address', key: 'feat_address', desc_key: 'feat_address_desc' },
  { icon: '🤖', href: '/chat', key: 'feat_ai', desc_key: 'feat_ai_desc' },
  { icon: '🔒', href: '/hash', key: 'feat_no_server', desc_key: 'feat_no_server_desc' },
]

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-xiaomi-orange/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-xiaomi-orange/3 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-xiaomi-orange/10 border border-xiaomi-orange/20 text-xiaomi-orange text-xs sm:text-sm font-medium mb-5 sm:mb-6">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-xiaomi-orange animate-pulse" />
              Xiaomi MiMo Open Platform
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-xiaomi-dark leading-tight">
              {t('hero_title')}{' '}
              <span className="text-xiaomi-orange">{t('hero_subtitle')}</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed px-2">
              {t('hero_desc')}
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
              <Link
                href="/hash"
                className="w-full sm:w-auto text-center px-8 py-3 bg-xiaomi-orange text-white rounded-xl font-semibold text-sm hover:bg-xiaomi-orange-light active:scale-95 transition-all duration-200 shadow-lg shadow-xiaomi-orange/20"
              >
                {t('get_started')}
              </Link>
              <a
                href="https://github.com/forforgebe/xiaomi-hasher"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center px-8 py-3 border border-xiaomi-border rounded-xl font-semibold text-sm text-xiaomi-dark hover:border-xiaomi-orange hover:text-xiaomi-orange transition-all duration-200"
              >
                {t('view_github')} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-xiaomi-dark mb-8 sm:mb-12">{t('features_title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feat) => (
            <Link
              key={feat.key}
              href={feat.href}
              className="group p-5 sm:p-6 rounded-2xl border border-xiaomi-border bg-white hover:border-xiaomi-orange/30 hover:shadow-lg hover:shadow-xiaomi-orange/5 transition-all duration-300"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-xiaomi-orange/10 flex items-center justify-center text-lg sm:text-xl mb-3 sm:mb-4 group-hover:bg-xiaomi-orange/20 transition-colors">
                {feat.icon}
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-xiaomi-dark mb-1.5 sm:mb-2">{t(feat.key)}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{t(feat.desc_key)}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <div className="rounded-2xl bg-gradient-to-br from-xiaomi-orange/5 to-transparent border border-xiaomi-border p-6 sm:p-12">
          <h2 className="text-xl sm:text-2xl font-bold text-xiaomi-dark mb-3 sm:mb-4">{t('about_title')}</h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-3xl">
            {t('about_desc')}
          </p>
          <div className="mt-5 sm:mt-6 flex items-center gap-4 text-sm">
            <a
              href="https://github.com/forforgebe/xiaomi-hasher"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-xiaomi-dark text-white hover:bg-gray-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              forforgebe/xiaomi-hasher
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
