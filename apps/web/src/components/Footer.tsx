'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function Footer() {
  const tNav = useTranslations('nav');
  const tFooter = useTranslations('footer');

  return (
    <footer className="border-t border-neutral-100 bg-neutral-50/50 pb-24 md:pb-0">
      <div className="section-container py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-lg font-bold text-neutral-900">Green<span className="text-primary"> Power</span></p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-neutral-400">
              80–240 kW DC fast charging stations for business. Turnkey installation and 24/7 service.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-4">Navigation</p>
            <nav className="space-y-2.5" aria-label="Footer">
              {(['solutions', 'products', 'cases', 'faq', 'contacts'] as const).map((key) => (
                <Link key={key} href={`/${key}`} className="block text-sm text-neutral-500 transition-colors hover:text-neutral-900">
                  {tNav(key)}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-4">Legal</p>
            <nav className="space-y-2.5">
              <Link href="/privacy" className="block text-sm text-neutral-500 transition-colors hover:text-neutral-900">
                {tFooter('privacy')}
              </Link>
              <Link href="/terms" className="block text-sm text-neutral-500 transition-colors hover:text-neutral-900">
                {tFooter('terms')}
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-200/60 pt-6">
          <p className="text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} Green Power Business Technology. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
