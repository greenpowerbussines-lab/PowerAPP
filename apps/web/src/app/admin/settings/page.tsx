'use client';

import { useEffect, useState } from 'react';
import { API_URL } from '@/lib/utils';

interface SiteSettings {
    key: string;
    phone: string | null;
    telegram: string | null;
    addressUz: string | null;
    addressRu: string | null;
    workingHoursUz: string | null;
    workingHoursRu: string | null;
    seoTitleUz: string | null;
    seoTitleRu: string | null;
    heroTitleUz: string | null;
    heroTitleRu: string | null;
}

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    function getToken() {
        return sessionStorage.getItem('gp_token') || '';
    }

    useEffect(() => {
        fetch(`${API_URL}/settings/admin`, { headers: { Authorization: `Bearer ${getToken()}` } })
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => setSettings(data))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        if (!settings) return;
        setSaving(true);
        setSaved(false);
        const { key, ...data } = settings;
        await fetch(`${API_URL}/settings/${key}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`
            },
            body: JSON.stringify(data)
        });
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    }

    function update(field: keyof SiteSettings, value: string) {
        if (!settings) return;
        setSettings({ ...settings, [field]: value });
    }

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
        );
    }

    if (!settings) {
        return <p className="py-12 text-center text-neutral-500">Settings not found. Run prisma db seed first.</p>;
    }

    const fields: { label: string; field: keyof SiteSettings }[] = [
        { label: 'Phone', field: 'phone' },
        { label: 'Telegram', field: 'telegram' },
        { label: 'Address (UZ)', field: 'addressUz' },
        { label: 'Address (RU)', field: 'addressRu' },
        { label: 'Working Hours (UZ)', field: 'workingHoursUz' },
        { label: 'Working Hours (RU)', field: 'workingHoursRu' },
        { label: 'SEO Title (UZ)', field: 'seoTitleUz' },
        { label: 'SEO Title (RU)', field: 'seoTitleRu' },
        { label: 'Hero Title (UZ)', field: 'heroTitleUz' },
        { label: 'Hero Title (RU)', field: 'heroTitleRu' }
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-neutral-900">Settings</h1>
            <form onSubmit={handleSave} className="mt-6 space-y-4">
                {fields.map(({ label, field }) => (
                    <div key={field}>
                        <label className="block text-sm font-medium text-neutral-700">{label}</label>
                        <input
                            type="text"
                            value={settings[field] || ''}
                            onChange={(e) => update(field, e.target.value)}
                            className="input-field mt-1"
                        />
                    </div>
                ))}
                <div className="flex items-center gap-3">
                    <button type="submit" disabled={saving} className="btn-primary">
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                    {saved && <span className="text-sm text-green-600">Saved!</span>}
                </div>
            </form>
        </div>
    );
}
