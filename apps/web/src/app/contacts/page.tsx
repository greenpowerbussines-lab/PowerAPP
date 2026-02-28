'use client';

import { useTranslations } from 'next-intl';
import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react';
import { LeadForm } from '@/components/LeadForm';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { AnimatedText } from '@/components/motion/AnimatedText';

export default function ContactsPage() {
    const t = useTranslations('contactsPage');

    return (
        <div className="section-cinematic pt-32">
            <div className="section-container">
                <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">{t('title')}</p>
                    <AnimatedText text={t('subtitle')} className="text-headline text-neutral-900 mx-auto max-w-3xl" />
                </div>

                <div className="mt-16 grid gap-10 lg:grid-cols-2">
                    <div className="space-y-5">
                        {[
                            { icon: Phone, title: t('callUs'), value: 'PLACEHOLDER_PHONE', href: 'tel:PLACEHOLDER_PHONE' },
                            { icon: MessageCircle, title: t('writeUs'), value: '@PLACEHOLDER_TELEGRAM', href: 'https://t.me/PLACEHOLDER_TELEGRAM' },
                            { icon: MapPin, title: t('visitUs'), value: 'PLACEHOLDER_ADDRESS', href: null },
                            { icon: Clock, title: t('workingHours'), value: '09:00–18:00, Mon–Fri', href: null }
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <RevealOnScroll key={i} delay={i * 0.1}>
                                    <div className="card flex items-center gap-5 p-6">
                                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100">
                                            <Icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">{item.title}</p>
                                            {item.href ? (
                                                <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="mt-0.5 text-sm font-medium text-neutral-900 hover:text-primary transition-colors">
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <p className="mt-0.5 text-sm text-neutral-700">{item.value}</p>
                                            )}
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            );
                        })}
                    </div>
                    <div>
                        <LeadForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
