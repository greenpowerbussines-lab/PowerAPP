'use client';

import { useTranslations } from 'next-intl';
import { Send, Search, FileText, HardDrive, Headphones } from 'lucide-react';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';

const steps = [
    { key: 'step1', icon: Send, num: 1 },
    { key: 'step2', icon: Search, num: 2 },
    { key: 'step3', icon: FileText, num: 3 },
    { key: 'step4', icon: HardDrive, num: 4 },
    { key: 'step5', icon: Headphones, num: 5 }
] as const;

export function HowItWorksSection() {
    const t = useTranslations('howItWorks');

    return (
        <section className="section-cinematic bg-white">
            <div className="section-container">
                <RevealOnScroll>
                    <div className="text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4">
                            Process
                        </p>
                        <h2 className="text-headline text-neutral-900">{t('title')}</h2>
                    </div>
                </RevealOnScroll>

                <div className="relative mt-24 max-w-4xl mx-auto">
                    {/* Vertical line - smooth gradient */}
                    <div className="absolute top-0 bottom-0 left-[31px] sm:left-[39px] w-[2px] bg-gradient-to-b from-primary via-primary/20 to-transparent" />

                    <div className="space-y-16">
                        {steps.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <RevealOnScroll key={step.key} delay={i * 0.12} direction="up">
                                    <div className="group flex items-start gap-8 sm:gap-12">
                                        <div className="relative z-10 flex h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 items-center justify-center rounded-3xl bg-white border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                                            <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary transition-colors duration-500 group-hover:text-primary-dark" />
                                            <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-950 text-[11px] font-bold text-white shadow-lg">
                                                {step.num}
                                            </span>
                                        </div>
                                        <div className="pt-2 sm:pt-4">
                                            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 transition-colors duration-300 group-hover:text-primary">
                                                {t(`${step.key}title`)}
                                            </h3>
                                            <p className="mt-3 text-[15px] leading-relaxed text-neutral-500 max-w-2xl">
                                                {t(`${step.key}desc`)}
                                            </p>
                                        </div>
                                    </div>
                                </RevealOnScroll>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
