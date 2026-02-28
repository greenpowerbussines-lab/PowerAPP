'use client';

import { useTranslations } from 'next-intl';
import { ParkingCircle, ShoppingBag, Truck, Building2 } from 'lucide-react';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';

const segments = [
    { key: 'parking', icon: ParkingCircle },
    { key: 'mall', icon: ShoppingBag },
    { key: 'fleet', icon: Truck },
    { key: 'developer', icon: Building2 }
] as const;

export function SolutionsSection() {
    const t = useTranslations('solutions');

    return (
        <section className="section-cinematic bg-neutral-50/50">
            <div className="section-container">
                <RevealOnScroll>
                    <div className="text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4">
                            {t('title')}
                        </p>
                        <h2 className="text-headline text-neutral-900">{t('subtitle')}</h2>
                    </div>
                </RevealOnScroll>

                <div className="mt-20 grid gap-8 sm:grid-cols-2">
                    {segments.map((seg, i) => {
                        const Icon = seg.icon;
                        const dir = i % 2 === 0 ? 'left' as const : 'right' as const;
                        return (
                            <RevealOnScroll key={seg.key} delay={i * 0.1} direction={dir}>
                                <div className="card-glass group p-10 relative overflow-hidden bg-white/40">
                                    <div className="absolute -right-10 -top-10 h-40 w-40 bg-primary/5 rounded-full blur-[40px] transition-all duration-700 group-hover:bg-primary/10 group-hover:scale-150" />

                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm border border-neutral-100 transition-transform duration-500 group-hover:-translate-y-1">
                                        <Icon className="h-8 w-8 text-primary" />
                                    </div>

                                    <h3 className="mt-8 text-2xl font-bold text-neutral-900 group-hover:text-primary transition-colors duration-300">
                                        {t(seg.key)}
                                    </h3>
                                    <p className="mt-4 text-[15px] leading-relaxed text-neutral-500">
                                        {t(`${seg.key}Desc`)}
                                    </p>
                                </div>
                            </RevealOnScroll>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
