'use client';

import { useEffect, useState } from 'react';
import { API_URL } from '@/lib/utils';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface CaseStudy {
    id: string;
    slug: string;
    titleUz: string;
    titleRu: string;
    published: boolean;
    createdAt: string;
}

export default function AdminCasesPage() {
    const [cases, setCases] = useState<CaseStudy[]>([]);
    const [loading, setLoading] = useState(true);

    function getToken() {
        return sessionStorage.getItem('gp_token') || '';
    }

    function loadCases() {
        fetch(`${API_URL}/cases/admin`, { headers: { Authorization: `Bearer ${getToken()}` } })
            .then((r) => (r.ok ? r.json() : []))
            .then((data) => setCases(data))
            .catch(() => setCases([]))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        loadCases();
    }, []);

    async function handleDelete(id: string) {
        if (!confirm('Delete this case?')) return;
        await fetch(`${API_URL}/cases/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${getToken()}` }
        });
        loadCases();
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-neutral-900">Cases</h1>
            </div>
            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
            ) : cases.length === 0 ? (
                <p className="mt-8 text-center text-neutral-500">No cases yet</p>
            ) : (
                <div className="mt-6 space-y-3">
                    {cases.map((c) => (
                        <div key={c.id} className="card flex items-center justify-between">
                            <div>
                                <p className="font-medium text-neutral-900">{c.titleRu}</p>
                                <p className="text-xs text-neutral-500">{c.slug} · {new Date(c.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${c.published ? 'bg-green-50 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}>
                                    {c.published ? 'Published' : 'Draft'}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(c.id)}
                                    className="rounded-lg p-1.5 text-neutral-400 hover:bg-red-50 hover:text-red-600"
                                    aria-label="Delete case"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
