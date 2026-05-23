'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslation } from '@/lib/i18n'
import ApiKeyInput from '@/components/ApiKeyInput'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const MIMO_BASE_URL = 'https://api.xiaomimimo.com/v1'

export default function ChatPage() {
  const { t } = useTranslation()
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m Xiaomi MiMo AI. Ask me about hashes, crypto addresses, blockchain, or anything else!'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')

    const key = localStorage.getItem('xiaomi-mimo-key')
    if (!key) {
      setError(t('error_no_key'))
      return
    }
    setError('')

    const newMessages: Message[] = [...messages, { role: 'user', content: userMsg }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const res = await fetch(`${MIMO_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: 'mimo-v2.5-pro',
          messages: [
            { role: 'system', content: 'You are a helpful assistant specialized in cryptography, hashing algorithms, and blockchain technology. Provide clear, accurate answers.' },
            ...newMessages.map(m => ({ role: m.role, content: m.content })),
          ],
        }),
      })

      if (!res.ok) {
        const errText = await res.text()
        throw new Error(`API ${res.status}: ${errText}`)
      }

      const data = await res.json()
      const reply = data.choices?.[0]?.message?.content || 'No response'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (e: any) {
      setError(e.message || t('error_api'))
    }
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10 space-y-6 sm:space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-xiaomi-dark">{t('chat_title')}</h1>
        <p className="text-gray-500 mt-1">{t('feat_ai_desc')}</p>
      </div>

      {/* API Key Warning */}
      <ApiKeyInput />

      {/* Chat */}
      <div className="bg-white rounded-2xl border border-xiaomi-border overflow-hidden">
        {/* Messages */}
        <div className="h-[400px] overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-xiaomi-orange text-white rounded-br-md'
                  : 'bg-xiaomi-gray text-xiaomi-dark rounded-bl-md'
              }`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl rounded-bl-md px-4 py-3 bg-xiaomi-gray text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-xiaomi-orange animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-xiaomi-orange animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-xiaomi-orange animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="ml-1">{t('thinking')}</span>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="flex justify-center">
              <div className="px-4 py-2 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
                {error}
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-xiaomi-border p-4">
          <div className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder={t('chat_placeholder')}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl border border-xiaomi-border bg-xiaomi-gray text-sm focus:outline-none focus:ring-2 focus:ring-xiaomi-orange/30 focus:border-xiaomi-orange transition-all disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-5 py-2.5 bg-xiaomi-orange text-white rounded-xl font-medium text-sm hover:bg-xiaomi-orange-light active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {t('send')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
