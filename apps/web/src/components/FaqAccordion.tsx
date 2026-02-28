'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FaqItem {
    question: string;
    answer: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="space-y-3">
            {items.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                    <div key={i} className="card !p-0 overflow-hidden">
                        <button
                            type="button"
                            className="flex w-full items-center justify-between px-6 py-5 text-left text-sm font-semibold text-neutral-900 transition-colors hover:text-primary"
                            onClick={() => setOpenIndex(isOpen ? null : i)}
                            aria-expanded={isOpen}
                        >
                            <span>{item.question}</span>
                            <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronDown className="ml-3 h-4 w-4 flex-shrink-0 text-neutral-400" />
                            </motion.div>
                        </button>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-5 text-sm leading-relaxed text-neutral-500">
                                        {item.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
