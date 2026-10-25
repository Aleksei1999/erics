import type { Metadata, Viewport } from 'next';
import { Figtree, Fraunces } from 'next/font/google';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { site } from '@/site.config';
import './globals.css';

// шрифты темы: меняются вместе с tokens.css, имена переменных --ff-display и --ff-body не трогать
// Fraunces с осями SOFT/WONK: мягкий «сдобный» серифный display; Figtree — тёплый гротеск для текста
const display = Fraunces({
  subsets: ['latin'],
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--ff-display',
  display: 'swap',
});

const body = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--ff-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s — ${site.name}` },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [{ url: site.ogImage, width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#fff7e6',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={site.lang} className={`${display.variable} ${body.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
