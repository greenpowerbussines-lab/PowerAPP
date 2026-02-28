'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Phone, MessageCircle, Calculator } from 'lucide-react';

export function CtaBar() {
  const t = useTranslations('cta');

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden">
      <div className="flex items-center gap-1.5 rounded-full bg-neutral-900/90 backdrop-blur-xl p-1.5 shadow-2xl shadow-neutral-900/30">
        <a
          href="tel:PLACEHOLDER_PHONE"
          className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-white"
        >
          <Phone className="h-3.5 w-3.5" />
          {t('call')}
        </a>
        <a
          href="https://t.me/PLACEHOLDER_TELEGRAM"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-semibold text-white/80 hover:text-white"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          {t('telegram')}
        </a>
        <Link
          href="/#lead-form"
          className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-semibold text-white/80 hover:text-white"
        >
          <Calculator className="h-3.5 w-3.5" />
          {t('getQuote')}
        </Link>
      </div>
    </div>
  );
}
