import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import NamesOfShiva from '../../../../_pages/NamesOfShiva';

/* ── Static params for /en/ and /hi/ ── */
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'hi' }];
}

/* ── SEO Metadata ── */
export const metadata: Metadata = {
  title: 'Shiva 108 Names with Meaning | Eternal Raga · शिव के 108 नाम',
  description:
    'Explore all 108 sacred names of Lord Shiva with meaning, story, modern context, and meditation practice. Organized by 9 divine themes — from the fierce Rudra to the beloved Umapati.',
  alternates: {
    languages: {
      'en': '/en/mantras/108-names-of-shiva',
      'hi': '/hi/mantras/108-names-of-shiva',
    },
  },
  openGraph: {
    title: 'Shiva 108 Names with Meaning | Eternal Raga',
    description:
      'All 108 sacred names of Lord Shiva with meaning, story, and modern context. 9 divine themes, 108 names.',
    type: 'article',
  },
};

/* ── Schema.org JSON-LD ── */
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '108 Names of Lord Shiva with Meaning | शिव के 108 नाम',
  description:
    'The 108 sacred names of Lord Shiva, organized by nine divine themes — from the fierce Rudra to the beloved Umapati.',
  author: { '@type': 'Organization', name: 'Eternal Raga' },
  publisher: { '@type': 'Organization', name: 'Eternal Raga' },
  inLanguage: ['en', 'hi'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://eternalraga.com/en' },
    { '@type': 'ListItem', position: 2, name: 'Mantras & Stotrams', item: 'https://eternalraga.com/en/mantras' },
    { '@type': 'ListItem', position: 3, name: '108 Names of Shiva', item: 'https://eternalraga.com/en/mantras/108-names-of-shiva' },
  ],
};

export default function Page(): ReactNode {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <NamesOfShiva />
    </>
  );
}
