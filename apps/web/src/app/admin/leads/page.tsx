'use client';

import { useEffect, useState } from 'react';
import { API_URL } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface Lead {
    id: string;
    name: string | null;
    company: string | null;
    phone: string;
    telegram: string | null;
    segment: string | null;
    power: number | null;
    status: string;
    createdAt: string;
}

const statusColors: Record<string, string> = {
    new: 'bg-blue-50 text-blue-700',
    in_progress: 'bg-amber-50 text-amber-700',
    won: 'bg-green-50 text-green-700',
    lost: 'bg-red-50 text-red-700'
};

export default function AdminLeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    function getToken() {
        return sessionStorage.getItem('gp_token') || '';
    }

    useEffect(() => {
        const url = filter ? `${API_URL}/leads?status=${filter}` : `${API_URL}/leads`;
        fetch(url, { headers: { Authorization: `Bearer ${getToken()}` } })
            .then((r) => (r.ok ? r.json() : []))
            .then((data) => setLeads(data))
            .catch(() => setLeads([]))
            .finally(() => setLoading(false));
    }, [filter]);

    async function updateStatus(id: string, status: string) {
        await fetch(`${API_URL}/leads/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`
            },
            body: JSON.stringify({ status })
        });
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-neutral-900">Leads</h1>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="input-field w-40"
                >
                    <option value="">All</option>
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                </select>
            </div>
            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
            ) : leads.length === 0 ? (
                <p className="mt-8 text-center text-neutral-500">No leads found</p>
            ) : (
                <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-neutral-200 text-left text-xs font-medium uppercase text-neutral-500">
                                <th className="pb-3 pr-4">Phone</th>
                                <th className="pb-3 pr-4">Name</th>
                                <th className="pb-3 pr-4">Company</th>
                                <th className="pb-3 pr-4">Segment</th>
                                <th className="pb-3 pr-4">Power</th>
                                <th className="pb-3 pr-4">Status</th>
                                <th className="pb-3">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {leads.map((lead) => (
                                <tr key={lead.id}>
                                    <td className="py-3 pr-4 font-medium">{lead.phone}</td>
                                    <td className="py-3 pr-4">{lead.name || '—'}</td>
                                    <td className="py-3 pr-4">{lead.company || '—'}</td>
                                    <td className="py-3 pr-4">{lead.segment || '—'}</td>
                                    <td className="py-3 pr-4">{lead.power ? `${lead.power} kW` : '—'}</td>
                                    <td className="py-3 pr-4">
                                        <select
                                            value={lead.status}
                                            onChange={(e) => updateStatus(lead.id, e.target.value)}
                                            className={cn('rounded-full px-2 py-0.5 text-xs font-medium', statusColors[lead.status] || 'bg-neutral-100 text-neutral-600')}
                                        >
                                            <option value="new">New</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="won">Won</option>
                                            <option value="lost">Lost</option>
                                        </select>
                                    </td>
                                    <td className="py-3 text-neutral-500">
                                        {new Date(lead.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
