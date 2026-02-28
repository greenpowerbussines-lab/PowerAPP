'use client';

import { useTranslations } from 'next-intl';
import { Zap } from 'lucide-react';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { AnimatedText } from '@/components/motion/AnimatedText';

const products = [
    { kw: 80, connectors: 'CCS2 / CHAdeMO', desc: '1 gun' },
    { kw: 120, connectors: 'CCS2 / CHAdeMO', desc: '1–2 guns' },
    { kw: 160, connectors: 'CCS2 × 2', desc: '2 guns' },
    { kw: 180, connectors: 'CCS2 × 2', desc: '2 guns' },
    { kw: 240, connectors: 'CCS2 × 2 + CHAdeMO', desc: '2–3 guns' }
];

export function ProductsSection() {
    const t = useTranslations('products');

    return (
        <section className="section-cinematic bg-neutral-950 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 aspect-square rounded-full bg-teal-900/20 blur-[150px] mix-blend-screen pointer-events-none" />

            <div className="section-container relative z-10">
                <RevealOnScroll>
                    <div className="text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4">
                            {t('title')}
                        </p>
                        <AnimatedText text={t('subtitle')} className="text-headline text-gradient mx-auto max-w-3xl" />
                    </div>
                </RevealOnScroll>

                <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                    {products.map((p, i) => (
                        <RevealOnScroll key={p.kw} delay={i * 0.1}>
                            <div className="group relative rounded-3xl bg-neutral-900 border border-white/5 p-6 h-full flex flex-col items-center text-center transition-all duration-500 hover:bg-neutral-800 hover:border-white/10 overflow-hidden">
                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl glass-panel mb-8 border border-white/5 transition-transform duration-500 group-hover:scale-110">
                                    <Zap className="h-8 w-8 text-primary shadow-primary drop-shadow-[0_0_15px_rgba(13,148,136,0.8)]" />
                                </div>

                                <p className="text-5xl font-bold tracking-tighter text-white mb-2 relative z-10">{p.kw}</p>
                                <p className="text-sm font-medium text-primary mb-6 relative z-10">{t('power')}</p>

                                <div className="space-y-1 relative z-10 mt-auto w-full pt-6 border-t border-white/5">
                                    <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">{p.connectors}</p>
                                    <p className="text-xs text-neutral-500">{p.desc}</p>
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
