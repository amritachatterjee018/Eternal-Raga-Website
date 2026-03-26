import type { Metadata } from 'next';
import Script from 'next/script';
import {
  getAllVenkateswaraNames,
  getVenkateswaraThemeCounts,
  getVenkateswaraSahasranamaMeta,
} from '../../../../../lib/contentLoader';
import VishnuSahasranama, { NameCard } from '../../../../../_pages/VishnuSahasranama';

export async function generateMetadata(): Promise<Metadata> {
  const meta = getVenkateswaraSahasranamaMeta();
  const altTitles = meta?.alternate_titles ?? [];
  const top2 = altTitles.slice(0, 2).map(t => t.split(' / ')[0].trim());
  const altSuffix = top2.length > 0 ? ` (${top2.join(', ')})` : '';
  const keywords = meta?.seo_keywords ?? [];

  return {
    title: `Venkateswara Sahasranama${altSuffix} — 1008 Names with Meaning | Eternal Raga`,
    description: `Explore all 1008 sacred names of Lord Venkateswara (Balaji) — also known as ${top2.join(' and ')} — from the Brahmanda Purana. Complete bilingual guide with Hindi meaning, Sanskrit text, IAST transliteration, and modern context.`,
    keywords: keywords.join(', '),
    openGraph: {
      title: `Venkateswara Sahasranama${altSuffix} — 1008 Sacred Names | Eternal Raga`,
      description: `Explore all 1008 names of Lord Venkateswara / Balaji (${top2.join(', ')}) with full bilingual meanings, word-by-word breakdown, and modern context.`,
      type: 'website',
    },
  };
}

export default function VenkateswaraSahasranamaPage() {
  const allNames = getAllVenkateswaraNames();
  const themeCounts = getVenkateswaraThemeCounts();
  const meta = getVenkateswaraSahasranamaMeta();
  const themeCount = Object.keys(themeCounts).length;

  const cards: NameCard[] = allNames.map(n => ({
    number: n.number,
    name_sanskrit: n.name_sanskrit,
    name_devanagari: n.name_devanagari,
    name_iast: n.name_iast,
    meaning_en: n.meaning_en,
    theme: n.theme,
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: 'Venkateswara Sahasranama',
    alternateName: meta?.alternate_titles?.map(t => t.split(' / ')[0].trim()) ?? [],
    inLanguage: ['sa', 'hi', 'en'],
    about: {
      '@type': 'Thing',
      name: 'Lord Venkateswara',
    },
    description: 'The 1008 sacred names of Lord Venkateswara (Balaji) from the Brahmanda Purana, with bilingual meanings and word-by-word breakdown.',
    publisher: {
      '@type': 'Organization',
      name: 'Eternal Raga',
    },
  };

  return (
    <>
      <Script
        id="venkateswara-sahasranama-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VishnuSahasranama
        cards={cards}
        themeCounts={themeCounts}
        basePath="mantras"
        sahasranamaSlug="venkateswara-sahasranama"
        heroConfig={{
          titleEn: 'Venkateswara Sahasranama',
          titleHi: 'वेंकटेश्वर सहस्रनाम',
          subtitleEn: 'The 1008 Sacred Names of Lord Venkateswara',
          subtitleHi: 'भगवान वेंकटेश्वर के 1008 पवित्र नाम',
          sourceText: 'From the Brahmanda Purana — the divine names of Lord Venkateswara (Balaji) of Tirupati, one of the most powerful and widely worshipped forms of Lord Vishnu.',
          nameCount: 1008,
          themeCount,
        }}
        accentColor="#5BA3CF"
        alternateTitles={meta?.alternate_titles ?? []}
        regionalNames={meta?.regional_names ?? {}}
      />
    </>
  );
}
