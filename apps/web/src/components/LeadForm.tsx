'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL } from '@/lib/utils';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';

const schema = z.object({
  name: z.string().max(200).optional(),
  company: z.string().max(200).optional(),
  phone: z.string().min(1).max(30),
  telegram: z.string().max(100).optional(),
  segment: z.string().max(50).optional(),
  power: z.coerce.number().int().min(80).max(240).optional().nullable(),
  flowPerDay: z.coerce.number().int().min(0).max(10000).optional().nullable(),
  network: z.string().max(100).optional(),
  honeypot: z.string().optional()
});

type FormData = z.infer<typeof schema>;

export function LeadForm() {
  const t = useTranslations('leadForm');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { honeypot: '' }
  });

  async function onSubmit(data: FormData) {
    if (data.honeypot) return;
    setStatus('idle');
    try {
      const res = await fetch(`${API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name || undefined,
          company: data.company || undefined,
          phone: data.phone,
          telegram: data.telegram || undefined,
          segment: data.segment || undefined,
          power: data.power ?? undefined,
          flowPerDay: data.flowPerDay ?? undefined,
          network: data.network || undefined,
          honeypot: data.honeypot
        })
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      reset({ honeypot: '' } as any);
    } catch {
      setStatus('error');
    }
  }

  return (
    <RevealOnScroll>
      <div id="lead-form" className="card-glass p-8 sm:p-10">
        <h2 className="text-2xl font-bold text-neutral-900">{t('title')}</h2>
        <p className="mt-1 text-sm text-neutral-500">Fill in the form and we'll get back to you</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div className="absolute -left-[9999px]" aria-hidden>
            <label>Hidden<input type="text" tabIndex={-1} autoComplete="off" {...register('honeypot')} /></label>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">{t('object')}</label>
            <input type="text" {...register('segment')} className="input-field" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">{t('flowPerDay')}</label>
              <input type="number" {...register('flowPerDay')} className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">{t('power')}</label>
              <select {...register('power')} className="input-field">
                <option value="">—</option>
                {[80, 120, 160, 180, 240].map((kw) => (
                  <option key={kw} value={kw}>{kw} kW</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">{t('network')}</label>
            <input type="text" {...register('network')} className="input-field" />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
              {t('phone')} <span className="text-red-500">*</span>
            </label>
            <input type="tel" required {...register('phone')} className="input-field" />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">{t('telegram')}</label>
              <input type="text" {...register('telegram')} className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">{t('company')}</label>
              <input type="text" {...register('company')} className="input-field" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">{t('name')}</label>
            <input type="text" {...register('name')} className="input-field" />
          </div>

          <AnimatePresence mode="wait">
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 rounded-2xl bg-green-50 px-5 py-3.5 text-sm text-green-800"
              >
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                {t('success')}
              </motion.div>
            )}
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl bg-red-50 px-5 py-3.5 text-sm text-red-800"
              >
                {t('error')}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full group"
          >
            {isSubmitting ? '...' : (
              <>
                {t('submit')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>
      </div>
    </RevealOnScroll>
  );
}
