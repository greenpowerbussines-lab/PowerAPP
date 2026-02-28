'use client';

import { Users, FileText, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Leads', href: '/admin/leads', icon: Users, color: 'bg-blue-50 text-blue-600' },
  { label: 'Cases', href: '/admin/cases', icon: FileText, color: 'bg-green-50 text-green-600' },
  { label: 'FAQ', href: '/admin/faq', icon: HelpCircle, color: 'bg-amber-50 text-amber-600' }
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
      <p className="mt-1 text-sm text-neutral-500">Welcome to Green Power Admin</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.href} href={s.href} className="card flex items-center gap-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="font-medium text-neutral-900">{s.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
