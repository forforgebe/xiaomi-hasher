'use client'

import { TranslationProvider } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <TranslationProvider>
      <Navbar />
      <main className="pt-14 min-h-screen">{children}</main>
      <Footer />
    </TranslationProvider>
  )
}
