'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { API_URL } from '@/lib/utils';

interface CaseStudy {
    id: string;
    slug: string;
    titleUz: string;
    titleRu: string;
    descUz: string | null;
    descRu: string | null;
    bodyUz: string | null;
    bodyRu: string | null;
    segment: string | null;
    powerKw: number | null;
}

export default function CaseDetailPage() {
    const params = useParams();
    const locale = useLocale();
    const [caseItem, setCaseItem] = useState<CaseStudy | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!params.slug) return;
        fetch(`${API_URL}/cases/slug/${params.slug}`)
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => setCaseItem(data))
            .catch(() => setCaseItem(null))
            .finally(() => setLoading(false));
    }, [params.slug]);

    if (loading) {
        return (
            <div className="section-padding">
                <div className="section-container flex justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
            </div>
        );
    }

    if (!caseItem) {
        return (
            <div className="section-padding">
                <div className="section-container text-center">
                    <p className="text-neutral-500">Not found</p>
                    <Link href="/cases" className="btn-primary mt-4">
                        Back
                    </Link>
                </div>
            </div>
        );
    }

    const title = locale === 'ru' ? caseItem.titleRu : caseItem.titleUz;
    const desc = locale === 'ru' ? caseItem.descRu : caseItem.descUz;
    const body = locale === 'ru' ? caseItem.bodyRu : caseItem.bodyUz;

    return (
        <div className="section-padding">
            <div className="section-container">
                <Link href="/cases" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900">
                    <ArrowLeft className="h-4 w-4" /> Back
                </Link>
                <article className="mx-auto mt-6 max-w-3xl">
                    <div className="flex gap-2">
                        {caseItem.segment && <span className="badge-neutral">{caseItem.segment}</span>}
                        {caseItem.powerKw && <span className="badge">{caseItem.powerKw} kW</span>}
                    </div>
                    <h1 className="mt-4 text-3xl font-bold text-neutral-900 sm:text-4xl">{title}</h1>
                    {desc && <p className="mt-4 text-lg text-neutral-600">{desc}</p>}
                    {body && (
                        <div className="mt-8 whitespace-pre-wrap text-neutral-700 leading-relaxed">
                            {body}
                        </div>
                    )}
                </article>
            </div>
        </div>
    );
}
