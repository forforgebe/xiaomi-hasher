'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

export type Lang = 'en' | 'zh'

export const translations = {
  en: {
    nav_home: 'Home',
    nav_hash: 'Hash Generator',
    nav_address: 'Address Analyzer',
    nav_chat: 'MiMo AI',
    hero_title: 'Xiaomi MiMo',
    hero_subtitle: 'Hash & Crypto Utility Toolkit',
    hero_desc: 'Generate hashes, analyze crypto addresses, and harness the power of Xiaomi MiMo AI — all in one elegant toolkit.',
    get_started: 'Get Started',
    view_github: 'View on GitHub',
    input_text: 'Input Text',
    hash_result: 'Hash Result',
    hash_placeholder: 'Enter text to hash...',
    select_algo: 'Select Algorithm',
    copy: 'Copy',
    copied: 'Copied!',
    clear: 'Clear',
    address_input: 'Enter Address',
    address_placeholder: 'Enter crypto address (BTC, ETH, etc.)...',
    analyze: 'Analyze',
    address_type: 'Address Type',
    valid: 'Valid',
    invalid: 'Invalid',
    chain: 'Chain',
    length: 'Length',
    checksum: 'Checksum',
    api_key_title: 'Xiaomi MiMo API Key',
    api_key_desc: 'Enter your Xiaomi MiMo API key to enable AI features.',
    api_key_placeholder: 'sk-...',
    save_key: 'Save Key',
    clear_key: 'Clear Key',
    key_saved: 'API key saved!',
    key_cleared: 'API key cleared.',
    chat_title: 'MiMo AI Chat',
    chat_placeholder: 'Ask about hashes, crypto, or anything...',
    send: 'Send',
    thinking: 'Thinking...',
    error_no_key: 'Please set your MiMo API key first.',
    error_api: 'API error. Check your key and try again.',
    footer_text: 'Built with Xiaomi MiMo API',
    lang_switch: '中文',
    features_title: 'Features',
    feat_hash: 'Multi-Algorithm Hash',
    feat_hash_desc: 'SHA-256, Keccak-256, MD5, SHA-512, RIPEMD-160 and more',
    feat_address: 'Address Validation',
    feat_address_desc: 'Validate BTC, ETH, TRX, and other crypto addresses',
    feat_ai: 'AI-Powered Analysis',
    feat_ai_desc: 'Analyze hashes and addresses with Xiaomi MiMo AI',
    feat_no_server: '100% Client-Side',
    feat_no_server_desc: 'No backend — everything runs in your browser',
    about_title: 'About',
    about_desc: 'xiaomi-hasher is an open-source hash and crypto utility toolkit powered by the Xiaomi MiMo AI API. All hash operations run client-side — your data never leaves your browser.',
    hash_compare: 'Hash Compare',
    hash_compare_desc: 'Compare two hashes or strings',
    first_input: 'First Input',
    second_input: 'Second Input',
    match: 'Match ✅',
    no_match: 'No Match ❌',
    file_hash: 'File Hash',
    file_hash_desc: 'Drop or select a file to compute its hash',
    drop_file: 'Drop a file here or click to browse',
    processing: 'Processing...',
  },
  zh: {
    nav_home: '首页',
    nav_hash: '哈希生成',
    nav_address: '地址分析',
    nav_chat: 'MiMo AI',
    hero_title: '小米 MiMo',
    hero_subtitle: '哈希与加密工具包',
    hero_desc: '生成哈希值、分析加密地址，利用小米 MiMo AI 的强大能力 — 一应俱全的优雅工具包。',
    get_started: '开始使用',
    view_github: '查看 GitHub',
    input_text: '输入文本',
    hash_result: '哈希结果',
    hash_placeholder: '输入要哈希的文本...',
    select_algo: '选择算法',
    copy: '复制',
    copied: '已复制!',
    clear: '清空',
    address_input: '输入地址',
    address_placeholder: '输入加密地址 (BTC, ETH 等)...',
    analyze: '分析',
    address_type: '地址类型',
    valid: '有效',
    invalid: '无效',
    chain: '链',
    length: '长度',
    checksum: '校验和',
    api_key_title: '小米 MiMo API 密钥',
    api_key_desc: '输入您的小米 MiMo API 密钥以启用 AI 功能。',
    api_key_placeholder: 'sk-...',
    save_key: '保存密钥',
    clear_key: '清除密钥',
    key_saved: 'API 密钥已保存!',
    key_cleared: 'API 密钥已清除。',
    chat_title: 'MiMo AI 聊天',
    chat_placeholder: '询问哈希、加密或任何问题...',
    send: '发送',
    thinking: '思考中...',
    error_no_key: '请先设置 MiMo API 密钥。',
    error_api: 'API 错误。请检查您的密钥后重试。',
    footer_text: '基于小米 MiMo API 构建',
    lang_switch: 'English',
    features_title: '功能',
    feat_hash: '多算法哈希',
    feat_hash_desc: 'SHA-256、Keccak-256、MD5、SHA-512、RIPEMD-160 等',
    feat_address: '地址验证',
    feat_address_desc: '验证 BTC、ETH、TRX 及其他加密地址',
    feat_ai: 'AI 分析',
    feat_ai_desc: '使用小米 MiMo AI 分析哈希和地址',
    feat_no_server: '纯客户端',
    feat_no_server_desc: '无需后端 — 一切在浏览器中运行',
    about_title: '关于',
    about_desc: 'xiaomi-hasher 是一个基于小米 MiMo AI API 的开源哈希和加密工具包。所有哈希操作均在客户端运行 — 您的数据不会离开浏览器。',
    hash_compare: '哈希比较',
    hash_compare_desc: '比较两个哈希值或字符串',
    first_input: '第一个输入',
    second_input: '第二个输入',
    match: '匹配 ✅',
    no_match: '不匹配 ❌',
    file_hash: '文件哈希',
    file_hash_desc: '拖放或选择文件以计算其哈希值',
    drop_file: '将文件拖放到此处或点击浏览',
    processing: '处理中...',
  }
}

type TranslationContextType = {
  lang: Lang
  t: (key: keyof typeof translations.en) => string
  toggleLang: () => void
}

const TranslationContext = createContext<TranslationContextType>({
  lang: 'en',
  t: (k) => translations.en[k],
  toggleLang: () => {},
})

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const saved = localStorage.getItem('xiaomi-lang') as Lang | null
    if (saved === 'en' || saved === 'zh') setLang(saved)
  }, [])

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const next = prev === 'en' ? 'zh' : 'en'
      localStorage.setItem('xiaomi-lang', next)
      return next
    })
  }, [])

  const t = useCallback((key: keyof typeof translations.en) => {
    return translations[lang][key] || translations.en[key] || key
  }, [lang])

  return (
    <TranslationContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  return useContext(TranslationContext)
}
