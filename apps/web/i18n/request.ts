import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

const locales = ['uz', 'ru'] as const;
type Locale = (typeof locales)[number];
const defaultLocale: Locale = 'uz';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value as Locale | undefined;
  const locale: Locale = cookieLocale && locales.includes(cookieLocale) ? cookieLocale : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
