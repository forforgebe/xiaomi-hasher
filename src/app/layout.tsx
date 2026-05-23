import type { Metadata } from 'next'
import './globals.css'
import ClientLayout from './ClientLayout'

export const metadata: Metadata = {
  title: 'Xiaomi Hasher — Hash & Crypto Utility Toolkit',
  description: 'Generate hashes, analyze crypto addresses, and harness Xiaomi MiMo AI. Open-source, 100% client-side.',
  keywords: ['xiaomi', 'mimo', 'hash', 'sha256', 'keccak', 'crypto', 'address validator', 'xiaomi mi ai'],
  openGraph: {
    title: 'Xiaomi Hasher — Hash & Crypto Utility Toolkit',
    description: 'Generate hashes, analyze crypto addresses, and harness Xiaomi MiMo AI.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
