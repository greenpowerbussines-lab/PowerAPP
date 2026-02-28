'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { FaqAccordion } from '@/components/FaqAccordion';
import { API_URL } from '@/lib/utils';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { AnimatedText } from '@/components/motion/AnimatedText';

interface FaqItem {
    id: string;
    questionUz: string;
    questionRu: string;
    answerUz: string;
    answerRu: string;
}

export default function FaqPage() {
    const t = useTranslations('faqPage');
    const locale = useLocale();
    const [faqs, setFaqs] = useState<FaqItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/faqs`)
            .then((r) => (r.ok ? r.json() : []))
            .then((data) => setFaqs(data))
            .catch(() => setFaqs([]))
            .finally(() => setLoading(false));
    }, []);

    const items = faqs.map((f) => ({
        question: locale === 'ru' ? f.questionRu : f.questionUz,
        answer: locale === 'ru' ? f.answerRu : f.answerUz
    }));

    return (
        <div className="section-cinematic pt-32">
            <div className="section-container">
                <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">{t('title')}</p>
                    <AnimatedText text={t('subtitle')} className="text-headline text-neutral-900 mx-auto max-w-3xl" />
                </div>

                <div className="mx-auto mt-16 max-w-3xl">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        </div>
                    ) : items.length === 0 ? (
                        <RevealOnScroll>
                            <p className="py-20 text-center text-neutral-400 text-lg">—</p>
                        </RevealOnScroll>
                    ) : (
                        <RevealOnScroll>
                            <FaqAccordion items={items} />
                        </RevealOnScroll>
                    )}
                </div>
            </div>
        </div>
    );
}
