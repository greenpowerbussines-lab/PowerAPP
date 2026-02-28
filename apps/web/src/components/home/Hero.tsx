'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedText } from '@/components/motion/AnimatedText';
import { FloatingElements } from '@/components/motion/FloatingElements';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const t = useTranslations('hero');
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 400]);

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center bg-neutral-950 overflow-hidden">
      {/* Background with Parallax */}
      <motion.div style={{ y: yParallax }} className="absolute inset-0 z-0">
        <FloatingElements />
      </motion.div>

      <div className="section-container relative z-10 text-center pt-24 pb-16">
        <AnimatedText
          text={t('title')}
          as="h1"
          className="mx-auto max-w-5xl text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-tighter font-bold text-gradient pb-4"
        />

        <motion.p
          className="mx-auto mt-8 max-w-2xl text-[clamp(1.125rem,2vw,1.5rem)] text-neutral-400 leading-relaxed font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/#lead-form" className="btn-primary !px-8 !py-4 !text-base shadow-[0_0_40px_-10px_rgba(13,148,136,0.6)]">
            {t('ctaQuote')}
          </Link>
          <a
            href="https://t.me/PLACEHOLDER_TELEGRAM"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost !text-neutral-300 hover:!text-white"
          >
            {t('ctaTelegram')} →
          </a>
        </motion.div>

        <motion.div
          className="mt-20 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          {(['trustWarranty', 'trustTurnkey', 'trustCertified', 'trustService'] as const).map((key) => (
            <span
              key={key}
              className="inline-flex flex-col items-center rounded-2xl glass-panel px-6 py-4 transition-slow hover:bg-white/5"
            >
              <span className="text-2xl font-bold text-gradient-primary">
                {key === 'trustWarranty' ? '3Y' : key === 'trustTurnkey' ? '100%' : key === 'trustCertified' ? 'CE' : '24/7'}
              </span>
              <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                {t(key)}
              </span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <ChevronDown className="h-8 w-8 text-neutral-600 animate-bounce-soft" />
      </motion.div>
    </section>
  );
}
