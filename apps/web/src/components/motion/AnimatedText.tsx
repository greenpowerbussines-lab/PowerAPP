'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Props {
    text: string;
    className?: string;
    delay?: number;
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function AnimatedText({ text, className = '', delay = 0, as: Tag = 'h2' }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    const words = text.split(' ');

    return (
        <Tag ref={ref as any} className={className} aria-label={text}>
            {words.map((word, i) => (
                <motion.span
                    key={`${word}-${i}`}
                    className="inline-block mr-[0.25em]"
                    initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
                    animate={
                        isInView
                            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                            : { opacity: 0, y: 30, filter: 'blur(4px)' }
                    }
                    transition={{
                        duration: 0.6,
                        delay: delay + i * 0.06,
                        ease: [0.25, 0.4, 0.25, 1]
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </Tag>
    );
}
