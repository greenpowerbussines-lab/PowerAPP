'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { locales, type Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function change(next: Locale) {
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000`;
    startTransition(() => router.refresh());
  }

  return (
    <div className="flex rounded-full bg-neutral-100 p-0.5" role="group" aria-label="Language">
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          disabled={pending}
          onClick={() => change(loc)}
          className={cn(
            'rounded-full px-3 py-1 text-[11px] font-semibold transition-all duration-300',
            locale === loc
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-400 hover:text-neutral-600'
          )}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
