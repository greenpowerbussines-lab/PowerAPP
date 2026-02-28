'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function FloatingElements() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start']
    });

    const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.3, 0]);

    return (
        <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <motion.div
                style={{ y: y1, opacity }}
                className="absolute -top-[10%] -left-[10%] w-[50%] max-w-[600px] aspect-square rounded-full bg-primary/10 blur-[120px] mix-blend-screen"
            />
            <motion.div
                style={{ y: y2, opacity }}
                className="absolute top-[40%] -right-[15%] w-[60%] max-w-[800px] aspect-square rounded-full bg-primary/5 blur-[150px] mix-blend-screen"
            />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
        </div>
    );
}
