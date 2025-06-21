import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  let messages;
  try {
    messages = (await import(`../../messages/${params.locale}.json`)).default;
  } catch {
    messages = {};
  }
  return {
    title: messages.title || "Portfolio",
    description: messages.description || "Portfolio"
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}