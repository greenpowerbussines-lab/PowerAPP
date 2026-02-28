'use client';

import { useEffect, useState } from 'react';
import { API_URL } from '@/lib/utils';
import { Trash2 } from 'lucide-react';

interface FaqItem {
    id: string;
    questionUz: string;
    questionRu: string;
    answerUz: string;
    answerRu: string;
    order: number;
    published: boolean;
}

export default function AdminFaqPage() {
    const [faqs, setFaqs] = useState<FaqItem[]>([]);
    const [loading, setLoading] = useState(true);

    function getToken() {
        return sessionStorage.getItem('gp_token') || '';
    }

    function loadFaqs() {
        fetch(`${API_URL}/faqs/admin`, { headers: { Authorization: `Bearer ${getToken()}` } })
            .then((r) => (r.ok ? r.json() : []))
            .then((data) => setFaqs(data))
            .catch(() => setFaqs([]))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        loadFaqs();
    }, []);

    async function handleDelete(id: string) {
        if (!confirm('Delete this FAQ?')) return;
        await fetch(`${API_URL}/faqs/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${getToken()}` }
        });
        loadFaqs();
    }

    async function togglePublish(id: string, published: boolean) {
        await fetch(`${API_URL}/faqs/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`
            },
            body: JSON.stringify({ published: !published })
        });
        setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, published: !published } : f)));
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-neutral-900">FAQ</h1>
            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
            ) : faqs.length === 0 ? (
                <p className="mt-8 text-center text-neutral-500">No FAQs yet</p>
            ) : (
                <div className="mt-6 space-y-3">
                    {faqs.map((f) => (
                        <div key={f.id} className="card">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <p className="font-medium text-neutral-900">{f.questionRu}</p>
                                    <p className="mt-1 text-sm text-neutral-500">{f.answerRu}</p>
                                </div>
                                <div className="ml-4 flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => togglePublish(f.id, f.published)}
                                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${f.published ? 'bg-green-50 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}
                                    >
                                        {f.published ? 'Published' : 'Draft'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(f.id)}
                                        className="rounded-lg p-1.5 text-neutral-400 hover:bg-red-50 hover:text-red-600"
                                        aria-label="Delete FAQ"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
