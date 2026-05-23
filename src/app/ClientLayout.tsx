'use client'

import { TranslationProvider } from '@/lib/i18n'
import { ThemeProvider } from '@/lib/theme'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <TranslationProvider>
      <ThemeProvider>
        <Navbar />
        <main className="pt-14 min-h-screen">{children}</main>
        <Footer />
      </ThemeProvider>
    </TranslationProvider>
  )
}
