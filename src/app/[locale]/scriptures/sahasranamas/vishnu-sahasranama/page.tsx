import { Metadata } from 'next';
import {
  getAllVishnuNames,
  getThemeCounts,
} from '../../../../../lib/contentLoader';
import VishnuSahasranama, { NameCard } from '../../../../../_pages/VishnuSahasranama';

export const metadata: Metadata = {
  title: 'Vishnu Sahasranama — 1000 Sacred Names | Eternal Raga',
  description:
    'Explore all 1000 names of Lord Vishnu from the Anushasana Parva of the Mahabharata. Complete bilingual guide with meaning, Sanskrit, IAST, word-by-word breakdown, and modern context.',
  openGraph: {
    title: 'Vishnu Sahasranama — 1000 Sacred Names | Eternal Raga',
    description: 'Explore all 1000 names of Lord Vishnu with full bilingual meanings, word-by-word breakdown, and modern context.',
    type: 'website',
  },
};

export default function VishnuSahasranamaPage() {
  // Server-side: read full JSON, map to slim DTOs for the client
  const allNames = getAllVishnuNames();
  const themeCounts = getThemeCounts();

  const cards: NameCard[] = allNames.map(n => ({
    number: n.number,
    name_sanskrit: n.name_sanskrit,
    name_devanagari: n.name_devanagari,
    name_iast: n.name_iast,
    meaning_en: n.meaning_en,
    theme: n.theme,
  }));

  return <VishnuSahasranama cards={cards} themeCounts={themeCounts} />;
}
