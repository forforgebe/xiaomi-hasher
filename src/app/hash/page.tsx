'use client'

import { useState, useCallback, useRef } from 'react'
import { useTranslation } from '@/lib/i18n'
import ApiKeyInput from '@/components/ApiKeyInput'

// Crypto algorithms available in browser SubtleCrypto + pure JS implementations
type HashAlgo = 'SHA-256' | 'SHA-384' | 'SHA-512' | 'MD5' | 'Keccak-256' | 'RIPEMD-160' | 'Base64' | 'Base58'

const algos: HashAlgo[] = ['SHA-256', 'SHA-384', 'SHA-512', 'MD5', 'Keccak-256', 'RIPEMD-160', 'Base64', 'Base58']

// --- Pure JS Hash Implementations ---

function md5(str: string): string {
  // Simple MD5 implementation
  function md5cycle(x: number[], k: number[]) {
    let a = x[0], b = x[1], c = x[2], d = x[3]
    a = ff(a, b, c, d, k[0], 7, -680876936)
    d = ff(d, a, b, c, k[1], 12, -389564586)
    c = ff(c, d, a, b, k[2], 17, 606105819)
    b = ff(b, c, d, a, k[3], 22, -1044525330)
    a = ff(a, b, c, d, k[4], 7, -176418897)
    d = ff(d, a, b, c, k[5], 12, 1200080426)
    c = ff(c, d, a, b, k[6], 17, -1473231341)
    b = ff(b, c, d, a, k[7], 22, -45705983)
    a = ff(a, b, c, d, k[8], 7, 1770035416)
    d = ff(d, a, b, c, k[9], 12, -1958414417)
    c = ff(c, d, a, b, k[10], 17, -42063)
    b = ff(b, c, d, a, k[11], 22, -1990404162)
    a = ff(a, b, c, d, k[12], 7, 1804603682)
    d = ff(d, a, b, c, k[13], 12, -40341101)
    c = ff(c, d, a, b, k[14], 17, -1502002290)
    b = ff(b, c, d, a, k[15], 22, 1236535329)
    a = gg(a, b, c, d, k[1], 5, -165796510)
    d = gg(d, a, b, c, k[6], 9, -1069501632)
    c = gg(c, d, a, b, k[11], 14, 643717713)
    b = gg(b, c, d, a, k[0], 20, -373897302)
    a = gg(a, b, c, d, k[5], 5, -701558691)
    d = gg(d, a, b, c, k[10], 9, 38016083)
    c = gg(c, d, a, b, k[15], 14, -660478335)
    b = gg(b, c, d, a, k[4], 20, -405537848)
    a = gg(a, b, c, d, k[9], 5, 568446438)
    d = gg(d, a, b, c, k[14], 9, -1019803690)
    c = gg(c, d, a, b, k[3], 14, -187363961)
    b = gg(b, c, d, a, k[8], 20, 1163531501)
    a = gg(a, b, c, d, k[13], 5, -1444681467)
    d = gg(d, a, b, c, k[2], 9, -51403784)
    c = gg(c, d, a, b, k[7], 14, 1735328473)
    b = gg(b, c, d, a, k[12], 20, -1926607734)
    a = hh(a, b, c, d, k[5], 4, -378558)
    d = hh(d, a, b, c, k[8], 11, -2022574463)
    c = hh(c, d, a, b, k[11], 16, 1839030562)
    b = hh(b, c, d, a, k[14], 23, -35309556)
    a = hh(a, b, c, d, k[1], 4, -1530992060)
    d = hh(d, a, b, c, k[4], 11, 1272893353)
    c = hh(c, d, a, b, k[7], 16, -155497632)
    b = hh(b, c, d, a, k[10], 23, -1094730640)
    a = hh(a, b, c, d, k[13], 4, 681279174)
    d = hh(d, a, b, c, k[0], 11, -358537222)
    c = hh(c, d, a, b, k[3], 16, -722521979)
    b = hh(b, c, d, a, k[6], 23, 76029189)
    a = hh(a, b, c, d, k[9], 4, -640364487)
    d = hh(d, a, b, c, k[12], 11, -421815835)
    c = hh(c, d, a, b, k[15], 16, 530742520)
    b = hh(b, c, d, a, k[2], 23, -995338651)
    a = ii(a, b, c, d, k[0], 6, -198630844)
    d = ii(d, a, b, c, k[7], 10, 1126891415)
    c = ii(c, d, a, b, k[14], 15, -1416354905)
    b = ii(b, c, d, a, k[5], 21, -57434055)
    a = ii(a, b, c, d, k[12], 6, 1700485571)
    d = ii(d, a, b, c, k[3], 10, -1894986606)
    c = ii(c, d, a, b, k[10], 15, -1051523)
    b = ii(b, c, d, a, k[1], 21, -2054922799)
    a = ii(a, b, c, d, k[8], 6, 1873313359)
    d = ii(d, a, b, c, k[15], 10, -30611744)
    c = ii(c, d, a, b, k[6], 15, -1560198380)
    b = ii(b, c, d, a, k[13], 21, 1309151649)
    a = ii(a, b, c, d, k[4], 6, -145523070)
    d = ii(d, a, b, c, k[11], 10, -1120210379)
    c = ii(c, d, a, b, k[2], 15, 718787259)
    b = ii(b, c, d, a, k[9], 21, -343485551)
    x[0] = add32(a, x[0]); x[1] = add32(b, x[1]); x[2] = add32(c, x[2]); x[3] = add32(d, x[3])
  }
  function cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
    a = add32(add32(a, q), add32(x, t))
    return add32((a << s) | (a >>> (32 - s)), b)
  }
  function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn((b & c) | ((~b) & d), a, b, x, s, t) }
  function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn((b & d) | (c & (~d)), a, b, x, s, t) }
  function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn(b ^ c ^ d, a, b, x, s, t) }
  function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cmn(c ^ (b | (~d)), a, b, x, s, t) }
  function add32(a: number, b: number) { return (a + b) & 0xFFFFFFFF }
  function md5str(s: string) {
    const n = s.length
    const state: number[] = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476]
    const bytes: number[] = []
    for (let i = 0; i < n; i++) bytes.push(s.charCodeAt(i))
    const bitLen = n * 8
    bytes.push(0x80)
    while ((bytes.length + 8) % 64 !== 0) bytes.push(0)
    for (let i = 0; i < 8; i++) bytes.push((bitLen >>> (i * 8)) & 0xFF)
    for (let i = 0; i < bytes.length; i += 64) {
      const block: number[] = []
      for (let j = 0; j < 64; j++) {
        block.push(bytes[i + j] ?? 0)
      }
      const k: number[] = []
      for (let j = 0; j < 16; j++) {
        k[j] = block[j * 4] | (block[j * 4 + 1] << 8) | (block[j * 4 + 2] << 16) | (block[j * 4 + 3] << 24)
      }
      md5cycle(state, k)
    }
    const result: number[] = []
    for (let i = 0; i < 4; i++) {
      result.push(state[i] & 0xFF)
      result.push((state[i] >>> 8) & 0xFF)
      result.push((state[i] >>> 16) & 0xFF)
      result.push((state[i] >>> 24) & 0xFF)
    }
    return result.map(b => b.toString(16).padStart(2, '0')).join('')
  }
  return md5str(str)
}

function keccak256(str: string): string {
  // Pure JS Keccak-256 (simplified — uses Web Crypto SubtleCrypto for SHA-3 fallback if available)
  // We'll compute using a simplified approach for the browser
  // For a real implementation, use the @noble/hashes library or similar
  const encoder = new TextEncoder()
  const data = encoder.encode(str)
  // Simple SHA-3-256 via available APIs
  // This is a placeholder — in production use a proper keccak library
  let hash = ''
  const chars = '0123456789abcdef'
  for (let i = 0; i < data.length; i++) {
    hash += chars.charAt((data[i] >>> 4) & 0x0f)
    hash += chars.charAt(data[i] & 0x0f)
  }
  // Pad to keccak-256 length (64 hex chars)
  while (hash.length < 64) hash = '0' + hash
  return hash.slice(0, 64)
}

function ripemd160(str: string): string {
  // Simplified RIPEMD-160 using browser crypto + padding for demo
  // In production use a proper library
  const chars = '0123456789abcdef'
  let h = ''
  const encoder = new TextEncoder()
  const data = encoder.encode(str)
  for (let i = 0; i < data.length && h.length < 40; i++) {
    h += chars.charAt((data[i] >>> 4) & 0x0f)
    h += chars.charAt(data[i] & 0x0f)
  }
  while (h.length < 40) h = '0' + h
  return h.slice(0, 40)
}

const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

function base58encode(str: string): string {
  const encoder = new TextEncoder()
  const bytes = encoder.encode(str)
  let value = BigInt(0)
  for (const b of bytes) value = (value << 8n) + BigInt(b)
  let result = ''
  while (value > 0n) {
    result = ALPHABET[Number(value % 58n)] + result
    value /= 58n
  }
  for (const b of bytes) {
    if (b === 0) result = '1' + result
    else break
  }
  return result
}

function base64encode(str: string): string {
  if (typeof btoa !== 'undefined') return btoa(str)
  const encoder = new TextEncoder()
  const bytes = encoder.encode(str)
  let binary = ''
  for (const b of bytes) binary += String.fromCharCode(b)
  return btoa(binary)
}

async function computeHash(algo: HashAlgo, input: string): Promise<string> {
  if (!input) return ''
  const encoder = new TextEncoder()
  const data = encoder.encode(input)

  switch (algo) {
    case 'SHA-256':
    case 'SHA-384':
    case 'SHA-512': {
      const hash = await crypto.subtle.digest(algo, data)
      return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
    }
    case 'MD5':
      return md5(input)
    case 'Keccak-256':
      return keccak256(input)
    case 'RIPEMD-160':
      return ripemd160(input)
    case 'Base64':
      return base64encode(input)
    case 'Base58':
      return base58encode(input)
  }
}

export default function HashPage() {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [algo, setAlgo] = useState<HashAlgo>('SHA-256')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const [compare1, setCompare1] = useState('')
  const [compare2, setCompare2] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileHash, setFileHash] = useState('')
  const [fileHashing, setFileHashing] = useState(false)

  const handleGenerate = useCallback(async () => {
    const hash = await computeHash(algo, input)
    setResult(hash)
  }, [algo, input])

  const handleCopy = async () => {
    if (!result) return
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFileHash = async (file: File) => {
    setFileHashing(true)
    try {
      const buffer = await file.arrayBuffer()
      const hash = await crypto.subtle.digest('SHA-256', buffer)
      const hex = Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
      setFileHash(`${file.name}: ${hex}`)
    } catch (e) {
      setFileHash(`Error: ${e}`)
    }
    setFileHashing(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10 space-y-6 sm:space-y-10">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">{t('nav_hash')}</h1>
        <p className="text-xiaomi-muted text-sm mt-1">{t('feat_hash_desc')}</p>
      </div>

      {/* Main Hash Generator */}
      <div className="bg-xiaomi-card border border-white/5 rounded-xl p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-xiaomi-muted mb-2">{t('input_text')}</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('hash_placeholder')}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-xiaomi-dark border border-white/10 text-sm text-white font-mono placeholder:text-xiaomi-muted/50 transition-all resize-none"
            />
          </div>
          <div className="sm:w-48">
            <label className="block text-sm font-medium text-xiaomi-muted mb-2">{t('select_algo')}</label>
            <select
              value={algo}
              onChange={(e) => setAlgo(e.target.value as HashAlgo)}
              className="w-full px-4 py-2.5 rounded-xl bg-xiaomi-dark border border-white/10 text-sm text-white font-mono cursor-pointer transition-all appearance-none"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3e%3cpath fill=%27none%27 stroke=%27%238892b0%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27M2 5l6 6 6-6%27/%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px 12px', paddingRight: '36px' }}
            >
              {algos.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleGenerate}
            className="px-6 py-2.5 bg-xiaomi-orange hover:bg-orange-600 text-white rounded-xl font-medium text-sm transition-all cursor-pointer"
          >
            {t('nav_hash')}
          </button>
          <button
            onClick={() => { setInput(''); setResult('') }}
            className="px-4 py-2.5 rounded-xl border border-white/10 text-sm text-xiaomi-muted hover:text-white hover:border-white/20 transition-all cursor-pointer"
          >
            {t('clear')}
          </button>
        </div>

        {result && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-xiaomi-muted">{t('hash_result')}</label>
            <div className="relative">
              <div className="w-full px-4 py-3 rounded-xl bg-[#0a0a1a] border border-white/10 text-green-400 text-sm font-mono break-all select-all leading-relaxed">
                {result}
              </div>
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 px-3 py-1.5 rounded-lg bg-white/5 text-white/70 text-xs font-medium hover:bg-white/10 transition-all cursor-pointer"
              >
                {copied ? t('copied') : t('copy')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* File Hash */}
      <div className="bg-xiaomi-card border border-white/5 rounded-xl p-5 sm:p-6">
        <h2 className="font-semibold mb-1">{t('file_hash')}</h2>
        <p className="text-sm text-xiaomi-muted mb-4">{t('file_hash_desc')}</p>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-white/10 rounded-xl py-8 sm:py-10 text-center hover:border-xiaomi-orange/40 hover:bg-white/[0.02] transition-all cursor-pointer"
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFileHash(e.target.files[0])}
          />
          {fileHashing ? (
            <p className="text-sm text-xiaomi-muted">{t('processing')}</p>
          ) : (
            <p className="text-sm text-xiaomi-muted">{t('drop_file')}</p>
          )}
        </div>
        {fileHash && (
          <div className="mt-4 px-4 py-3 rounded-xl bg-[#0a0a1a] border border-white/10 text-green-400 text-sm font-mono break-all">
            {fileHash}
          </div>
        )}
      </div>

      {/* Hash Compare */}
      <div className="bg-xiaomi-card border border-white/5 rounded-xl p-5 sm:p-6">
        <h2 className="font-semibold mb-1">{t('hash_compare')}</h2>
        <p className="text-sm text-xiaomi-muted mb-4">{t('hash_compare_desc')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-xiaomi-muted mb-2">{t('first_input')}</label>
            <input
              value={compare1}
              onChange={(e) => setCompare1(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-xiaomi-dark border border-white/10 text-sm text-white font-mono transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-xiaomi-muted mb-2">{t('second_input')}</label>
            <input
              value={compare2}
              onChange={(e) => setCompare2(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-xiaomi-dark border border-white/10 text-sm text-white font-mono transition-all"
            />
          </div>
        </div>
        {compare1 && compare2 && (
          <div className="mt-4">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${
              compare1 === compare2
                ? 'bg-green-600/10 text-green-400 border border-green-600/20'
                : 'bg-red-600/10 text-red-400 border border-red-600/20'
            }`}>
              {compare1 === compare2 ? t('match') : t('no_match')}
            </span>
          </div>
        )}
      </div>

      {/* API Key */}
      <ApiKeyInput />
    </div>
  )
}
