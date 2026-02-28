'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, TrendingUp, ShieldCheck } from 'lucide-react';
import { AnimatedText } from '@/components/motion/AnimatedText';

const advantages = [
    {
        key: 'speed',
        icon: Zap,
        color: 'from-amber-400 to-orange-500'
    },
    {
        key: 'roi',
        icon: TrendingUp,
        color: 'from-emerald-400 to-primary'
    },
    {
        key: 'turnkey',
        icon: ShieldCheck,
        color: 'from-blue-400 to-indigo-500'
    }
];

export function StickyScrollAdvantages() {
    const t = useTranslations('advantages');
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end end']
    });

    // Map 0 -> 1 progress to the 3 items
    const activeIndex = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 1, 2, 2]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-neutral-950 text-white">
            <div className="sticky top-0 flex h-screen items-center px-4 sm:px-8">
                <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left: Text Content (Scrolls/Fades) */}
                    <div className="relative h-[40vh] lg:h-[60vh]">
                        {advantages.map((adv, i) => {
                            // Custom opacity/y transform for each text block
                            const progressStart = i * 0.33;
                            const progressEnd = (i + 1) * 0.33;
                            const opacity = useTransform(
                                scrollYProgress,
                                [progressStart - 0.1, progressStart, progressEnd - 0.1, progressEnd],
                                [0, 1, 1, 0]
                            );
                            const y = useTransform(
                                scrollYProgress,
                                [progressStart - 0.1, progressStart, progressEnd - 0.1, progressEnd],
                                [40, 0, 0, -40]
                            );

                            return (
                                <motion.div
                                    key={adv.key}
                                    style={{ opacity, y }}
                                    className="absolute inset-0 flex flex-col justify-center pointer-events-none"
                                >
                                    <p className="text-sm font-bold tracking-widest uppercase text-primary mb-4">
                                        {String(i + 1).padStart(2, '0')} / {t(`${adv.key}Tag`)}
                                    </p>
                                    <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
                                        {t(`${adv.key}Title`)}
                                    </h2>
                                    <p className="text-lg sm:text-xl text-neutral-400 max-w-md leading-relaxed">
                                        {t(`${adv.key}Desc`)}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Right: Abstract Visualization (Sticky) */}
                    <div className="relative h-[40vh] lg:h-[80vh] w-full flex items-center justify-center">
                        {advantages.map((adv, i) => {
                            const Icon = adv.icon;
                            const progressStart = i * 0.33;
                            const progressEnd = (i + 1) * 0.33;

                            const scale = useTransform(
                                scrollYProgress,
                                [progressStart - 0.1, progressStart, progressEnd - 0.1, progressEnd],
                                [0.8, 1, 1, 0.8]
                            );
                            const opacity = useTransform(
                                scrollYProgress,
                                [progressStart - 0.1, progressStart, progressEnd - 0.1, progressEnd],
                                [0, 1, 1, 0]
                            );

                            return (
                                <motion.div
                                    key={`viz-${adv.key}`}
                                    style={{ scale, opacity }}
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                >
                                    <div className={`relative flex items-center justify-center w-[280px] h-[360px] lg:w-[400px] lg:h-[500px] rounded-3xl bg-neutral-900 border border-white/10 overflow-hidden`}>
                                        <div className={`absolute inset-0 bg-gradient-to-br ${adv.color} opacity-20`} />
                                        <div className="absolute inset-0 bg-[url('/noise.png')] mix-blend-overlay opacity-10" />

                                        {/* Glowing rotating orb behind icon */}
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                            className={`absolute w-full aspect-square bg-gradient-to-r ${adv.color} rounded-full blur-[80px] opacity-30`}
                                        />

                                        <Icon className="relative z-10 w-24 h-24 lg:w-32 lg:h-32 text-white drop-shadow-2xl" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}
