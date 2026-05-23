'use client'

import { useTranslation, type translations } from '@/lib/i18n'
type TKey = keyof typeof translations.en

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="border-t border-white/5 py-6 text-center text-xs text-xiaomi-muted">
      <p>{t('footer_text')}</p>
    </footer>
  )
}
