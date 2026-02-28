'use client';

import { useTranslations } from 'next-intl';
import { Zap } from 'lucide-react';
import Link from 'next/link';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { AnimatedText } from '@/components/motion/AnimatedText';

const products = [
    { kw: 80, connectors: 'CCS2 / CHAdeMO', desc: '1 gun' },
    { kw: 120, connectors: 'CCS2 / CHAdeMO', desc: '1–2 guns' },
    { kw: 160, connectors: 'CCS2 × 2', desc: '2 guns' },
    { kw: 180, connectors: 'CCS2 × 2', desc: '2 guns' },
    { kw: 240, connectors: 'CCS2 × 2 + CHAdeMO', desc: '2–3 guns' }
];

export default function ProductsPage() {
    const t = useTranslations('products');

    return (
        <div className="section-cinematic pt-32">
            <div className="section-container">
                <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">{t('title')}</p>
                    <AnimatedText text={t('subtitle')} className="text-headline text-neutral-900 mx-auto max-w-3xl" />
                </div>

                <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((p, i) => (
                        <RevealOnScroll key={p.kw} delay={i * 0.08}>
                            <div className="card group flex flex-col">
                                <div className="flex h-48 items-center justify-center rounded-2xl bg-gradient-to-br from-neutral-50 to-primary-50/50">
                                    <Zap className="h-20 w-20 text-primary/30 transition-all duration-500 group-hover:text-primary/60 group-hover:scale-110" />
                                </div>
                                <div className="mt-6 flex-1">
                                    <p className="text-4xl font-bold text-neutral-900">{p.kw} <span className="text-lg font-medium text-primary">kW</span></p>
                                    <p className="mt-2 text-sm text-neutral-500">{t('connector')}: {p.connectors}</p>
                                    <p className="mt-1 text-xs text-neutral-400">{p.desc}</p>
                                </div>
                                <Link href="/#lead-form" className="btn-primary mt-6 text-center">
                                    {t('cta')}
                                </Link>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </div>
    );
}
