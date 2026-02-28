'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API_URL } from '@/lib/utils';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { AnimatedText } from '@/components/motion/AnimatedText';

interface CaseStudy {
    id: string;
    slug: string;
    titleUz: string;
    titleRu: string;
    descUz: string | null;
    descRu: string | null;
    segment: string | null;
    powerKw: number | null;
}

export default function CasesPage() {
    const t = useTranslations('cases');
    const locale = useLocale();
    const [cases, setCases] = useState<CaseStudy[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/cases`)
            .then((r) => (r.ok ? r.json() : []))
            .then((data) => setCases(data))
            .catch(() => setCases([]))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="section-cinematic pt-32">
            <div className="section-container">
                <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">{t('title')}</p>
                    <AnimatedText text={t('subtitle')} className="text-headline text-neutral-900 mx-auto max-w-3xl" />
                </div>

                <div className="mt-16">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        </div>
                    ) : cases.length === 0 ? (
                        <RevealOnScroll>
                            <p className="py-20 text-center text-neutral-400 text-lg">{t('noCases')}</p>
                        </RevealOnScroll>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {cases.map((c, i) => (
                                <RevealOnScroll key={c.id} delay={i * 0.08}>
                                    <Link href={`/cases/${c.slug}`} className="card group block">
                                        <div className="flex h-44 items-center justify-center rounded-2xl bg-gradient-to-br from-neutral-50 to-primary-50/50">
                                            <span className="text-4xl font-bold text-primary/20 transition-colors group-hover:text-primary/40">DC</span>
                                        </div>
                                        <h3 className="mt-5 text-lg font-bold text-neutral-900 group-hover:text-primary transition-colors">
                                            {locale === 'ru' ? c.titleRu : c.titleUz}
                                        </h3>
                                        {(locale === 'ru' ? c.descRu : c.descUz) && (
                                            <p className="mt-2 text-sm text-neutral-500 line-clamp-2">
                                                {locale === 'ru' ? c.descRu : c.descUz}
                                            </p>
                                        )}
                                        <div className="mt-4 flex gap-2">
                                            {c.segment && <span className="badge-neutral">{c.segment}</span>}
                                            {c.powerKw && <span className="badge">{c.powerKw} kW</span>}
                                        </div>
                                    </Link>
                                </RevealOnScroll>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
