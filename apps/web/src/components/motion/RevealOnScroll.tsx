'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Props {
    children: React.ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    className?: string;
    once?: boolean;
}

const offsets = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 }
};

export function RevealOnScroll({
    children,
    delay = 0,
    direction = 'up',
    className,
    once = true
}: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: '-80px' });
    const offset = offsets[direction];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, ...offset }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.25, 0.4, 0.25, 1]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
