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
    <div className="bg-white rounded-2xl border border-xiaomi-border p-6 space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-xiaomi-dark">{t('api_key_title')}</h3>
        <p className="text-sm text-gray-500 mt-1">{t('api_key_desc')}</p>
      </div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type={show ? 'text' : 'password'}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder={t('api_key_placeholder')}
            className="w-full px-4 py-2.5 rounded-xl border border-xiaomi-border bg-xiaomi-gray text-sm font-mono focus:outline-none focus:ring-2 focus:ring-xiaomi-orange/30 focus:border-xiaomi-orange transition-all"
          />
          <button
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
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
        <button
          onClick={handleSave}
          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
            saved
              ? 'bg-green-500 text-white'
              : 'bg-xiaomi-orange text-white hover:bg-xiaomi-orange-light active:scale-95'
          }`}
        >
          {saved ? t('key_saved') : t('save_key')}
        </button>
        {key && (
          <button
            onClick={handleClear}
            className="px-4 py-2.5 rounded-xl border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition-all duration-200 cursor-pointer"
          >
            {t('clear_key')}
          </button>
        )}
      </div>
    </div>
  )
}
