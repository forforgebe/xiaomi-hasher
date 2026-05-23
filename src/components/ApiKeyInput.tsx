'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from '@/lib/i18n'

export default function ApiKeyInput() {
  const { t } = useTranslation()
  const [key, setKey] = useState('')
  const [saved, setSaved] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const k = localStorage.getItem('xiaomi-mimo-key')
    if (k) setKey(k)
  }, [])

  const handleSave = () => {
    localStorage.setItem('xiaomi-mimo-key', key)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleClear = () => {
    localStorage.removeItem('xiaomi-mimo-key')
    setKey('')
    setSaved(false)
  }

  return (
    <div className="bg-xiaomi-card/50 border border-white/5 rounded-xl p-5 sm:p-6 space-y-4">
      <div>
        <h3 className="text-base sm:text-lg font-semibold">{t('api_key_title')}</h3>
        <p className="text-xs sm:text-sm text-xiaomi-muted mt-1">{t('api_key_desc')}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="relative flex-1">
          <input
            type={show ? 'text' : 'password'}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder={t('api_key_placeholder')}
            className="w-full px-4 py-2.5 rounded-xl bg-xiaomi-dark border border-white/10 text-sm text-white font-mono placeholder:text-xiaomi-muted/50 transition-all"
          />
          <button
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xiaomi-muted hover:text-white transition-colors cursor-pointer"
          >
            {show ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer whitespace-nowrap ${
              saved
                ? 'bg-green-600 text-white'
                : 'bg-xiaomi-orange text-white hover:bg-orange-600'
            }`}
          >
            {saved ? t('key_saved') : t('save_key')}
          </button>
          {key && (
            <button
              onClick={handleClear}
              className="px-4 py-2.5 rounded-xl border border-white/10 text-sm text-xiaomi-muted hover:text-white hover:border-xiaomi-red/50 transition-all cursor-pointer whitespace-nowrap"
            >
              {t('clear_key')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
