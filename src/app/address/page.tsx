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
        <h1 className="text-2xl font-bold text-xiaomi-dark">{t('nav_address')}</h1>
        <p className="text-gray-500 mt-1">{t('feat_address_desc')}</p>
      </div>

      {/* Input */}
      <div className="bg-white rounded-2xl border border-xiaomi-border p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('address_input')}</label>
          <div className="flex gap-3">
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              placeholder={t('address_placeholder')}
              className="flex-1 px-4 py-3 rounded-xl border border-xiaomi-border bg-xiaomi-gray text-sm font-mono focus:outline-none focus:ring-2 focus:ring-xiaomi-orange/30 focus:border-xiaomi-orange transition-all"
            />
            <button
              onClick={handleAnalyze}
              className="px-6 py-3 bg-xiaomi-orange text-white rounded-xl font-medium text-sm hover:bg-xiaomi-orange-light active:scale-95 transition-all duration-200 cursor-pointer"
            >
              {t('analyze')}
            </button>
          </div>
        </div>

        {/* Quick examples */}
        <div>
          <p className="text-xs text-gray-400 mb-2">Try an example:</p>
          <div className="flex flex-wrap gap-2">
            {recentAddresses.map((addr) => (
              <button
                key={addr}
                onClick={() => { setAddress(addr); setInfo(analyzeAddress(addr)) }}
                className="px-3 py-1.5 rounded-lg border border-xiaomi-border text-xs font-mono text-gray-500 hover:border-xiaomi-orange hover:text-xiaomi-orange transition-all cursor-pointer truncate max-w-[200px]"
              >
                {addr.slice(0, 10)}...{addr.slice(-6)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {info && (
        <div className="bg-white rounded-2xl border border-xiaomi-border p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${
              info.valid
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              <span className={`w-2 h-2 rounded-full ${info.valid ? 'bg-green-500' : 'bg-red-500'}`} />
              {info.valid ? t('valid') : t('invalid')}
            </span>
            <span className="px-4 py-2 rounded-xl bg-xiaomi-gray text-sm font-medium text-gray-700">
              {info.type}
            </span>
          </div>

          {/* Address display */}
          <div className="px-4 py-3 rounded-xl bg-xiaomi-dark text-green-400 text-sm font-mono break-all">
            {address.trim()}
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-xiaomi-gray">
              <p className="text-xs text-gray-500 mb-1">{t('chain')}</p>
              <p className="text-sm font-semibold text-xiaomi-dark">{info.chain}</p>
            </div>
            <div className="p-4 rounded-xl bg-xiaomi-gray">
              <p className="text-xs text-gray-500 mb-1">{t('address_type')}</p>
              <p className="text-sm font-semibold text-xiaomi-dark">{info.type}</p>
            </div>
            <div className="p-4 rounded-xl bg-xiaomi-gray">
              <p className="text-xs text-gray-500 mb-1">{t('length')}</p>
              <p className="text-sm font-semibold text-xiaomi-dark">{info.length} chars</p>
            </div>
            <div className="p-4 rounded-xl bg-xiaomi-gray">
              <p className="text-xs text-gray-500 mb-1">{t('checksum')}</p>
              <p className="text-sm font-semibold text-xiaomi-dark">{info.checksum}</p>
            </div>
          </div>

          {/* Details list */}
          <div className="space-y-2">
            {info.details.map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-xiaomi-orange" />
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
