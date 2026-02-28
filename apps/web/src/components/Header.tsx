'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/', key: 'home' },
  { href: '/solutions', key: 'solutions' },
  { href: '/products', key: 'products' },
  { href: '/cases', key: 'cases' },
  { href: '/faq', key: 'faq' },
  { href: '/contacts', key: 'contacts' }
] as const;

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 100 && y > lastY.current);
      setScrolled(y > 20);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-white/70 backdrop-blur-2xl backdrop-saturate-150 border-b border-neutral-200/50 shadow-sm shadow-neutral-900/5'
          : 'bg-transparent'
      )}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="section-container flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight text-neutral-900">
          Green<span className="text-primary"> Power</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                'rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-300',
                pathname === item.href
                  ? 'text-primary bg-primary/8'
                  : 'text-neutral-500 hover:text-neutral-900'
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link href="/#lead-form" className="btn-primary hidden !py-2 !px-5 !text-xs lg:inline-flex">
            {t('getQuote')}
          </Link>
          <button
            type="button"
            className="rounded-full p-2 text-neutral-600 hover:bg-neutral-100 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close' : 'Menu'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-neutral-200/50 bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="section-container space-y-1 py-4">
              {nav.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'block rounded-2xl px-4 py-2.5 text-sm font-medium',
                      pathname === item.href ? 'text-primary bg-primary/5' : 'text-neutral-700'
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {t(item.key)}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <Link href="/#lead-form" className="btn-primary mt-3 block text-center" onClick={() => setOpen(false)}>
                  {t('getQuote')}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
