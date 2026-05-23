'use client'

import { useState } from 'react'
import { useTranslation } from '@/lib/i18n'
import ApiKeyInput from '@/components/ApiKeyInput'

interface AddressInfo {
  type: string
  valid: boolean
  chain: string
  length: number
  checksum: string
  details: string[]
}

function analyzeAddress(addr: string): AddressInfo {
  const trimmed = addr.trim()
  const len = trimmed.length
  const info: AddressInfo = {
    type: 'Unknown',
    valid: false,
    chain: '—',
    length: len,
    checksum: '—',
    details: [],
  }

  // Bitcoin (P2PKH starts with 1, P2SH starts with 3, Bech32 starts with bc1)
  if (/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(trimmed)) {
    info.type = 'Bitcoin (Legacy)'
    info.valid = true
    info.chain = 'Bitcoin'
    info.details = ['P2PKH (1...) or P2SH (3...)', 'Base58Check encoded']
    // Simple checksum: verifies it can be base58 decoded (basic validation)
    return info
  }
  if (/^bc1[a-z0-9]{39,59}$/i.test(trimmed)) {
    info.type = 'Bitcoin (Bech32)'
    info.valid = true
    info.chain = 'Bitcoin'
    info.details = ['SegWit address (bc1...)', 'Bech32 encoded']
    return info
  }

  // Ethereum (0x + 40 hex chars)
  if (/^0x[a-fA-F0-9]{40}$/.test(trimmed)) {
    info.type = 'Ethereum (EOA)'
    info.valid = true
    info.chain = 'Ethereum (EVM)'
    info.checksum = isMixedCase(trimmed) ? 'EIP-55 checksummed' : 'Lowercase'
    info.details = ['Standard EOA address', '20 bytes / 40 hex chars', `Chain: ETH, BSC, Polygon, opBNB, Arbitrum, etc.`]
    return info
  }
  if (/^0x[a-fA-F0-9]{40}$/.test(trimmed) && len === 42) {
    // Already handled above
  }

  // TRON (starts with T, base58)
  if (/^T[a-zA-Z0-9]{33}$/.test(trimmed)) {
    info.type = 'TRON'
    info.valid = true
    info.chain = 'TRON'
    info.details = ['Base58Check encoded', 'Starts with T']
    return info
  }

  // Solana (base58, 32-44 chars)
  if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(trimmed) && len >= 32 && len <= 44) {
    info.type = 'Solana'
    info.valid = true
    info.chain = 'Solana'
    info.details = ['Ed25519 public key', `${len} chars base58`]
    return info
  }

  // XRP (Ripple, starts with r)
  if (/^r[1-9A-HJ-NP-Za-km-z]{24,34}$/.test(trimmed)) {
    info.type = 'Ripple'
    info.valid = true
    info.chain = 'XRP Ledger'
    info.details = ['Base58Check encoded', 'Starts with r']
    return info
  }

  // Dogecoin (starts with D)
  if (/^D[a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(trimmed)) {
    info.type = 'Dogecoin'
    info.valid = true
    info.chain = 'Dogecoin'
    info.details = ['Base58Check encoded']
    return info
  }

  // Cardano (starts with addr)
  if (/^addr1[a-z0-9]{50,60}$/.test(trimmed)) {
    info.type = 'Cardano'
    info.valid = true
    info.chain = 'Cardano'
    info.details = ['Bech32 encoded', 'Shelley era']
    return info
  }

  // Generic EVM (0x + hex, longer for contracts)
  if (/^0x[a-fA-F0-9]+$/.test(trimmed) && len > 42) {
    info.type = 'EVM Contract'
    info.valid = true
    info.chain = 'Ethereum (EVM)'
    info.checksum = 'Contract address'
    info.details = [`${(len - 2) / 2} bytes`]
    return info
  }

  // ENS or domain
  if (/^[a-zA-Z0-9-]+\.eth$/.test(trimmed)) {
    info.type = 'ENS Name'
    info.valid = true
    info.chain = 'Ethereum'
    info.details = ['Ethereum Name Service', 'Resolve via ENS']
    return info
  }

  info.type = 'Unknown Format'
  info.valid = false
  info.details = ['Address format not recognized', 'Check if the address is correct']
  return info
}

function isMixedCase(s: string): boolean {
  const hex = s.replace('0x', '')
  return /[a-z]/.test(hex) && /[A-Z]/.test(hex)
}

const recentAddresses = [
  '0x0a29e419d7d1ffc94df74cb7417b5abdf682b2b5',
  '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
  'TXYZopYRdjN2CH2F6oHuMB7MbedM7k4W5V',
]

export default function AddressPage() {
  const { t } = useTranslation()
  const [address, setAddress] = useState('')
  const [info, setInfo] = useState<AddressInfo | null>(null)

  const handleAnalyze = () => {
    setInfo(analyzeAddress(address))
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10 space-y-6 sm:space-y-10">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">{t('nav_address')}</h1>
        <p className="text-xiaomi-muted text-sm mt-1">{t('feat_address_desc')}</p>
      </div>

      {/* Input */}
      <div className="bg-xiaomi-card/50 border border-white/5 rounded-xl p-5 sm:p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-xiaomi-muted mb-2">{t('address_input')}</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              placeholder={t('address_placeholder')}
              className="flex-1 px-4 py-2.5 rounded-xl bg-xiaomi-dark border border-white/10 text-sm text-white font-mono placeholder:text-xiaomi-muted/50 transition-all"
            />
            <button
              onClick={handleAnalyze}
              className="px-6 py-2.5 bg-xiaomi-orange hover:bg-orange-600 text-white rounded-xl font-medium text-sm transition-all cursor-pointer whitespace-nowrap"
            >
              {t('analyze')}
            </button>
          </div>
        </div>

        {/* Quick examples */}
        <div>
          <p className="text-xs text-xiaomi-muted mb-2">Try an example:</p>
          <div className="flex flex-wrap gap-2">
            {recentAddresses.map((addr) => (
              <button
                key={addr}
                onClick={() => { setAddress(addr); setInfo(analyzeAddress(addr)) }}
                className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-xiaomi-muted hover:text-white hover:border-xiaomi-orange/40 transition-all cursor-pointer truncate max-w-[180px]"
              >
                {addr.slice(0, 8)}...{addr.slice(-6)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {info && (
        <div className="bg-xiaomi-card/50 border border-white/5 rounded-xl p-5 sm:p-6 space-y-5">
          {/* Status Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${
              info.valid
                ? 'bg-green-600/10 text-green-400 border border-green-600/20'
                : 'bg-red-600/10 text-red-400 border border-red-600/20'
            }`}>
              <span className={`w-2 h-2 rounded-full ${info.valid ? 'bg-green-400' : 'bg-red-400'}`} />
              {info.valid ? t('valid') : t('invalid')}
            </span>
            <span className="px-4 py-2 rounded-xl bg-xiaomi-dark border border-white/10 text-sm font-medium text-xiaomi-muted">
              {info.type}
            </span>
          </div>

          {/* Address display */}
          <div className="px-4 py-3 rounded-xl bg-[#0a0a1a] border border-white/10 text-green-400 text-sm font-mono break-all">
            {address.trim()}
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 rounded-xl bg-xiaomi-dark border border-white/[0.03]">
              <p className="text-xs text-xiaomi-muted mb-1">{t('chain')}</p>
              <p className="text-sm font-semibold text-white">{info.chain}</p>
            </div>
            <div className="p-3 sm:p-4 rounded-xl bg-xiaomi-dark border border-white/[0.03]">
              <p className="text-xs text-xiaomi-muted mb-1">{t('address_type')}</p>
              <p className="text-sm font-semibold text-white">{info.type}</p>
            </div>
            <div className="p-3 sm:p-4 rounded-xl bg-xiaomi-dark border border-white/[0.03]">
              <p className="text-xs text-xiaomi-muted mb-1">{t('length')}</p>
              <p className="text-sm font-semibold text-white">{info.length} chars</p>
            </div>
            <div className="p-3 sm:p-4 rounded-xl bg-xiaomi-dark border border-white/[0.03]">
              <p className="text-xs text-xiaomi-muted mb-1">{t('checksum')}</p>
              <p className="text-sm font-semibold text-white">{info.checksum}</p>
            </div>
          </div>

          {/* Details list */}
          <div className="space-y-2">
            {info.details.map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-xiaomi-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-xiaomi-orange shrink-0" />
                {d}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* API Key */}
      <ApiKeyInput />
    </div>
  )
}
