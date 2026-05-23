import { useTranslation } from '@/lib/i18n'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="border-t border-xiaomi-border bg-white mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{t('footer_text')}</span>
            <span className="text-gray-300">·</span>
            <a
              href="https://github.com/forforgebe"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-xiaomi-orange transition-colors"
            >
              GitHub
            </a>
            <span className="text-gray-300">·</span>
            <a
              href="https://platform.xiaomimimo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-xiaomi-orange transition-colors"
            >
              MiMo Platform
            </a>
          </div>
          <div className="text-xs text-gray-400">
            © {new Date().getFullYear()} — Open Source
          </div>
        </div>
      </div>
    </footer>
  )
}
