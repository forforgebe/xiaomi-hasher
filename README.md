
<p align="center">
  <img src="https://img.shields.io/badge/Xiaomi-MiMo-FF6900?style=for-the-badge&logo=xiaomi&logoColor=white" alt="Xiaomi MiMo" />
</p>

<h1 align="center">🔐 Xiaomi Hasher</h1>
<p align="center"><b>Hash & Crypto Utility Toolkit — powered by Xiaomi MiMo AI</b></p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-sample-output">Sample Output</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

<p align="center">
  <a href="https://xiaomi-hasher.vercel.app">
    <img src="https://img.shields.io/badge/Live Demo-xiaomi--hasher.vercel.app-FF6900?style=flat-square&logo=vercel" alt="Live Demo" />
  </a>
  <a href="https://github.com/forforgebe/xiaomi-hasher">
    <img src="https://img.shields.io/badge/GitHub-forforgebe/xiaomi--hasher-181717?style=flat-square&logo=github" alt="GitHub" />
  </a>
</p>

---

## 📖 About

**Xiaomi Hasher** is an open-source, client-side hash and crypto utility toolkit built on the **Xiaomi MiMo Open Platform**. Generate cryptographic hashes, validate blockchain addresses, and leverage Xiaomi MiMo AI for intelligent analysis — all within a sleek Xiaomi-inspired interface.

> 🚀 **Live at:** [xiaomi-hasher.vercel.app](https://xiaomi-hasher.vercel.app)

---

## ✨ Features

| Category | Feature | Description |
|----------|---------|-------------|
| **🔐 Hash Generator** | Multi-Algorithm Hashing | SHA-256, SHA-384, SHA-512, MD5, Keccak-256, RIPEMD-160 |
| **🔐 Hash Generator** | Encoding | Base64, Base58 encoding |
| **🔐 Hash Generator** | File Hashing | Drop a file to compute its SHA-256 hash (client-side) |
| **🔐 Hash Generator** | Hash Comparison | Compare two hashes or strings |
| **Ⓐ Address Analyzer** | Chain Detection | Auto-detect BTC, ETH, TRX, SOL, XRP, DOGE, ADA, and more |
| **Ⓐ Address Analyzer** | Validation | Format validation + checksum verification |
| **Ⓐ Address Analyzer** | Quick Examples | One-click test with sample addresses |
| **🤖 MiMo AI Chat** | AI-Powered Analysis | Ask Xiaomi MiMo AI about hashes, addresses, or blockchain |
| **🤖 MiMo AI Chat** | Manual API Key | Bring your own MiMo API key |
| **🌐 International** | CN/EN Toggle | Full Chinese and English support |
| **🎨 Design** | Xiaomi UI | Clean, modern interface with Xiaomi brand identity |

### Supported Address Types

| Chain | Format | Example |
|-------|--------|---------|
| Bitcoin (Legacy) | `1...` / `3...` | `1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa` |
| Bitcoin (Bech32) | `bc1...` | `bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq` |
| Ethereum / EVM | `0x...` | `0x0a29e419d7d1ffc94df74cb7417b5abdf682b2b5` |
| TRON | `T...` | `TXYZopYRdjN2CH2F6oHuMB7MbedM7k4W5V` |
| Solana | Base58 (32-44 chars) | `7...` |
| Ripple | `r...` | `r...` |
| Dogecoin | `D...` | `D...` |
| Cardano | `addr1...` | `addr1...` |

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** (App Router) | React framework |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Styling |
| **Web Crypto API** | Client-side SHA-2 family |
| **Xiaomi MiMo API** | AI chat (requires API key) |
| **Vercel** | Deployment (free tier) |

### Architecture

```
┌──────────────────────────────────────────────────┐
│                   Browser                          │
│  ┌─────────┐  ┌──────────┐  ┌────────────────┐   │
│  │  Hash    │  │  Address  │  │  MiMo AI Chat  │   │
│  │  Gen     │  │  Analyzer │  │  (API Key)     │   │
│  └────┬─────┘  └────┬─────┘  └───────┬────────┘   │
│       │              │                │            │
│       ▼              ▼                ▼            │
│  ┌──────────┐  ┌──────────┐  ┌────────────────┐   │
│  │Web Crypto│  │ Pattern  │  │ Xiaomi MiMo    │   │
│  │  API     │  │ Matching │  │  API (remote)  │   │
│  └──────────┘  └──────────┘  └────────────────┘   │
└──────────────────────────────────────────────────┘
        100% client-side      │  Requires API key
                              ▼
                   ┌──────────────────────┐
                   │ Xiaomi MiMo Platform  │
                   │ api.xiaomimimo.com    │
                   └──────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A **Xiaomi MiMo API key** (optional, for AI features) — get one at [platform.xiaomimimo.com](https://platform.xiaomimimo.com)

### Local Development

```bash
# Clone the repo
git clone https://github.com/forforgebe/xiaomi-hasher.git
cd xiaomi-hasher

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## 🌐 Deployment

### One-Click Deploy (Vercel)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/forforgebe/xiaomi-hasher)

### Manual Deploy

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod --token YOUR_VERCEL_TOKEN
```

> **Live URL:** `https://xiaomi-hasher.vercel.app`

---

## 📋 Usage

### Hash Generator

1. Navigate to `/hash`
2. Enter text in the input area
3. Select an algorithm (SHA-256, MD5, Keccak-256, etc.)
4. Click **Hash Generator** to compute
5. Click **Copy** to copy the result
6. Use **File Hash** section to hash uploaded files
7. Use **Hash Compare** to compare two values

### Address Analyzer

1. Navigate to `/address`
2. Paste or type a crypto address
3. Click **Analyze** or press Enter
4. View detected chain, type, validity, and details
5. Use **quick example buttons** for testing

### MiMo AI Chat

1. Navigate to `/chat`
2. Enter your **Xiaomi MiMo API key** in the settings panel
3. Click **Save Key** (stored in localStorage)
4. Start chatting about crypto, hashes, or blockchain

---

## 📸 Sample Output

### Hash Generator
```
Input:  Hello, Xiaomi!
SHA-256: a1b2c3d4e5f6... (64 hex chars)
MD5:     e99a18c428cb38d5f260853678922e03
Base58:  abc123def456...
```

### Address Analysis
```
Input:  0x0a29e419d7d1ffc94df74cb7417b5abdf682b2b5
Status: ✅ Valid
Type:   Ethereum (EOA)
Chain:  Ethereum / EVM (ETH, BSC, Polygon, opBNB...)
Length: 42 chars
```

---

## 🗺 Roadmap

- [x] Multi-algorithm hash generation
- [x] Crypto address validation
- [x] Xiaomi MiMo AI chat integration
- [x] CN/EN internationalization
- [x] Xiaomi-themed UI
- [ ] More hash algorithms (SHA-3, BLAKE2, SHAKE)
- [ ] Transaction decoding
- [ ] Mnemonic / seed phrase tools
- [ ] Dark mode
- [ ] PWA support

---

## 🙏 Credits

- **Xiaomi MiMo Open Platform** — AI API provider
- **[forforgebe](https://github.com/forforgebe)** — Development & maintenance

### Built for

<p align="center">
  <b>Xiaomi MiMo Orbit 100T Creator Incentive Program</b><br>
  <i>Xiaomi MiMo 百万亿 Token 创造者激励计划</i>
</p>

---

<p align="center">
  <sub>Made with ❤️ and ☕ — Open source under MIT License</sub>
  <br>
  <a href="https://github.com/forforgebe"><code>@forforgebe</code></a>
</p>
