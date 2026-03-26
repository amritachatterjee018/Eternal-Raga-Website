import type { Metadata } from 'next';
import Script from 'next/script';
import {
  getAllLalitaNames,
  getLalitaThemeCounts,
  getLalitaSahasranamaMeta,
} from '../../../../../lib/contentLoader';
import VishnuSahasranama, { NameCard } from '../../../../../_pages/VishnuSahasranama';

export async function generateMetadata(): Promise<Metadata> {
  const meta = getLalitaSahasranamaMeta();
  const altTitles = meta?.alternate_titles ?? [];
  const top2 = altTitles.slice(0, 2).map(t => t.split(' / ')[0].trim());
  const altSuffix = top2.length > 0 ? ` (${top2.join(', ')})` : '';
  const keywords = meta?.seo_keywords ?? [];

  return {
    title: `Lalita Sahasranama${altSuffix} — 1000 Names with Meaning | Eternal Raga`,
    description: `Explore all 1000 sacred names of Goddess Lalita Devi — also known as ${top2.join(' and ')} — from the Brahmanda Purana, Lalitopakhyana. Complete bilingual guide with Hindi meaning, Sanskrit text, IAST transliteration, and modern context.`,
    keywords: keywords.join(', '),
    openGraph: {
      title: `Lalita Sahasranama${altSuffix} — 1000 Sacred Names | Eternal Raga`,
      description: `Explore all 1000 names of Goddess Lalita Devi (${top2.join(', ')}) with full bilingual meanings, word-by-word breakdown, and modern context.`,
      type: 'website',
    },
  };
}

export default function LalitaSahasranamaPage() {
  const allNames = getAllLalitaNames();
  const themeCounts = getLalitaThemeCounts();
  const meta = getLalitaSahasranamaMeta();
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
    name: 'Lalita Sahasranama',
    alternateName: meta?.alternate_titles?.map(t => t.split(' / ')[0].trim()) ?? [],
    inLanguage: ['sa', 'hi', 'en'],
    about: {
      '@type': 'Thing',
      name: 'Goddess Lalita Devi',
    },
    description: 'The 1000 sacred names of Goddess Lalita from the Brahmanda Purana, Lalitopakhyana, with bilingual meanings and word-by-word breakdown.',
    publisher: {
      '@type': 'Organization',
      name: 'Eternal Raga',
    },
  };

  return (
    <>
      <Script
        id="lalita-sahasranama-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VishnuSahasranama
        cards={cards}
        themeCounts={themeCounts}
        basePath="mantras"
        sahasranamaSlug="lalita-sahasranama"
        heroConfig={{
          titleEn: 'Lalita Sahasranama',
          titleHi: 'ललिता सहस्रनाम',
          subtitleEn: 'The 1000 Sacred Names of Goddess Lalita Devi',
          subtitleHi: 'देवी ललिता के 1000 पवित्र नाम',
          sourceText: 'From the Brahmanda Purana, Lalitopakhyana — a sacred hymn in praise of Goddess Lalita Tripura Sundari, the Supreme Shakti worshipped in the Sri Vidya tradition.',
          nameCount: 1000,
          themeCount,
        }}
        accentColor="#E06060"
        alternateTitles={meta?.alternate_titles ?? []}
        regionalNames={meta?.regional_names ?? {}}
      />
    </>
  );
}
