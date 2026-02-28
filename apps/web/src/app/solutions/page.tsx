'use client';

import { useTranslations } from 'next-intl';
import { ParkingCircle, ShoppingBag, Truck, Building2 } from 'lucide-react';
import Link from 'next/link';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { AnimatedText } from '@/components/motion/AnimatedText';

const segments = [
    { key: 'parking', icon: ParkingCircle },
    { key: 'mall', icon: ShoppingBag },
    { key: 'fleet', icon: Truck },
    { key: 'developer', icon: Building2 }
] as const;

export default function SolutionsPage() {
    const t = useTranslations('solutions');

    return (
        <div className="section-cinematic pt-32">
            <div className="section-container">
                <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">{t('title')}</p>
                    <AnimatedText text={t('subtitle')} className="text-headline text-neutral-900 mx-auto max-w-3xl" />
                </div>

                <div className="mt-16 grid gap-8 sm:grid-cols-2">
                    {segments.map((seg, i) => {
                        const Icon = seg.icon;
                        return (
                            <RevealOnScroll key={seg.key} delay={i * 0.1} direction={i % 2 === 0 ? 'left' : 'right'}>
                                <div className="card group p-10">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 transition-transform duration-500 group-hover:scale-110">
                                        <Icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <h2 className="mt-6 text-2xl font-bold text-neutral-900">{t(seg.key)}</h2>
                                    <p className="mt-3 text-sm leading-relaxed text-neutral-500">{t(`${seg.key}Desc`)}</p>
                                    <Link href="/#lead-form" className="btn-primary mt-8">
                                        {t('title')} →
                                    </Link>
                                </div>
                            </RevealOnScroll>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
