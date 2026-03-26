import type { Metadata } from 'next';
import Script from 'next/script';
import {
  getAllVishnuNames,
  getThemeCounts,
  getVishnuSahasranamaMeta,
} from '../../../../../lib/contentLoader';
import VishnuSahasranama, { NameCard } from '../../../../../_pages/VishnuSahasranama';

export async function generateMetadata(): Promise<Metadata> {
  const meta = getVishnuSahasranamaMeta();
  const altTitles = meta?.alternate_titles ?? [];
  const top2 = altTitles.slice(0, 2).map(t => t.split(' / ')[0].trim());
  const altSuffix = top2.length > 0 ? ` (${top2.join(', ')})` : '';
  const keywords = meta?.seo_keywords ?? [];

  return {
    title: `Vishnu Sahasranama${altSuffix} — 1000 Names with Meaning | Eternal Raga`,
    description: `Explore all 1000 sacred names of Lord Vishnu — also known as ${top2.join(' and ')} — from the Anushasana Parva of the Mahabharata. Complete bilingual guide with Hindi meaning, Sanskrit text, IAST transliteration, and modern context.`,
    keywords: keywords.join(', '),
    openGraph: {
      title: `Vishnu Sahasranama${altSuffix} — 1000 Sacred Names | Eternal Raga`,
      description: `Explore all 1000 names of Lord Vishnu (${top2.join(', ')}) with full bilingual meanings, word-by-word breakdown, and modern context.`,
      type: 'website',
    },
  };
}

export default function VishnuSahasranamaPage() {
  const allNames = getAllVishnuNames();
  const themeCounts = getThemeCounts();
  const meta = getVishnuSahasranamaMeta();

  const cards: NameCard[] = allNames.map(n => ({
    number: n.number,
    name_sanskrit: n.name_sanskrit,
    name_devanagari: n.name_devanagari,
    name_iast: n.name_iast,
    meaning_en: n.meaning_en,
    theme: n.theme,
  }));

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: 'Vishnu Sahasranama',
    alternateName: meta?.alternate_titles?.map(t => t.split(' / ')[0].trim()) ?? [],
    inLanguage: ['sa', 'hi', 'en'],
    about: {
      '@type': 'Thing',
      name: 'Lord Vishnu',
    },
    description: 'The 1000 sacred names of Lord Vishnu from the Anushasana Parva of the Mahabharata, with bilingual meanings and word-by-word breakdown.',
    publisher: {
      '@type': 'Organization',
      name: 'Eternal Raga',
    },
  };

  return (
    <>
      <Script
        id="vishnu-sahasranama-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VishnuSahasranama
        cards={cards}
        themeCounts={themeCounts}
        basePath="mantras"
        alternateTitles={meta?.alternate_titles ?? []}
        regionalNames={meta?.regional_names ?? {}}
      />
    </>
  );
}
