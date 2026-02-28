'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

interface Props {
    target: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

export function AnimatedCounter({
    target,
    suffix = '',
    prefix = '',
    duration = 2,
    className = ''
}: Props) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-40px' });
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        const startTime = performance.now();
        const step = (now: number) => {
            const elapsed = (now - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [isInView, target, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}{value}{suffix}
        </span>
    );
}
