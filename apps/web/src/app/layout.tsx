import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CtaBar } from '@/components/CtaBar';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Green Power — DC Fast Charging for Business',
  description: '80–240 kW DC fast charging stations for parking, malls, fleets, and developers.',
  openGraph: {
    title: 'Green Power — DC Fast Charging for Business',
    description: '80–240 kW DC fast charging stations for parking, malls, fleets, and developers.',
    type: 'website'
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white text-neutral-900 font-sans overflow-x-hidden">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header />
          <main>{children}</main>
          <Footer />
          <CtaBar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
