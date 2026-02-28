'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { API_URL } from '@/lib/utils';
import { LayoutDashboard, Users, FileText, HelpCircle, Settings, LogOut } from 'lucide-react';

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/leads', label: 'Leads', icon: Users },
    { href: '/admin/cases', label: 'Cases', icon: FileText },
    { href: '/admin/faq', label: 'FAQ', icon: HelpCircle },
    { href: '/admin/settings', label: 'Settings', icon: Settings }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const stored = sessionStorage.getItem('gp_token');
        if (stored) setToken(stored);
    }, []);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            if (!res.ok) throw new Error('Invalid credentials');
            const data = await res.json();
            sessionStorage.setItem('gp_token', data.accessToken);
            setToken(data.accessToken);
        } catch {
            setError('Invalid credentials');
        } finally {
            setLoading(false);
        }
    }

    function handleLogout() {
        sessionStorage.removeItem('gp_token');
        setToken(null);
    }

    if (!token) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="card w-full max-w-sm">
                    <h1 className="text-xl font-bold text-neutral-900">Admin Login</h1>
                    <form onSubmit={handleLogin} className="mt-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field mt-1"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field mt-1"
                                required
                            />
                        </div>
                        {error && <p className="text-sm text-red-600">{error}</p>}
                        <button type="submit" disabled={loading} className="btn-primary w-full">
                            {loading ? '...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="section-container py-6">
            <div className="flex flex-col gap-6 lg:flex-row">
                <aside className="w-full flex-shrink-0 lg:w-56">
                    <nav className="space-y-1 rounded-2xl border border-neutral-200 bg-white p-3">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            );
                        })}
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </nav>
                </aside>
                <main className="min-w-0 flex-1">{children}</main>
            </div>
        </div>
    );
}
