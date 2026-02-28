'use client';

import { useTranslations } from 'next-intl';
import { AnimatedCounter } from '@/components/motion/AnimatedCounter';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';

const stats = [
    { value: 240, suffix: ' kW', key: 'maxPower' },
    { value: 500, suffix: '+', key: 'stations' },
    { value: 24, suffix: '/7', key: 'support' },
    { value: 3, suffix: '', key: 'warranty' }
] as const;

const labels: Record<string, { uz: string; ru: string }> = {
    maxPower: { uz: 'Maksimal quvvat', ru: 'Макс. мощность' },
    stations: { uz: "O'rnatilgan stansiyalar", ru: 'Установлено станций' },
    support: { uz: "Qo'llab-quvvatlash", ru: 'Поддержка' },
    warranty: { uz: "Yil kafolat", ru: 'Года гарантия' }
};

export function StatsSection() {
    return (
        <section className="section-dark section-padding">
            <div className="section-container">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, i) => (
                        <RevealOnScroll key={stat.key} delay={i * 0.1}>
                            <div className="text-center">
                                <p className="text-5xl font-bold text-white sm:text-6xl">
                                    <AnimatedCounter
                                        target={stat.value}
                                        suffix={stat.suffix}
                                        duration={2}
                                    />
                                </p>
                                <p className="mt-2 text-sm text-neutral-500">
                                    {labels[stat.key].ru}
                                </p>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
