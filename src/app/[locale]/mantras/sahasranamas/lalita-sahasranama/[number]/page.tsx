import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getLalitaNameByNumber,
  getLalitaNameStaticParams,
  getRelatedLalitaNamesByTheme,
} from '../../../../../../lib/contentLoader';
import VishnuNameDetail, { RelatedName } from '../../../../../../_pages/VishnuNameDetail';

interface Props {
  params: Promise<{ locale: string; number: string }>;
}

export async function generateStaticParams() {
  const locales = ['en', 'hi'];
  const nameParams = getLalitaNameStaticParams();
  return locales.flatMap(locale =>
    nameParams.map(p => ({ locale, number: p.number }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { number } = await params;
  const n = getLalitaNameByNumber(parseInt(number, 10));
  if (!n) return { title: 'Name Not Found | Eternal Raga' };

  const desc = `${n.meaning_en.slice(0, 100)}... ${n.modern_context_en.slice(0, 55)}`.trim();
  return {
    title: `${n.name_iast} (${n.name_devanagari}) — Lalita Sahasranama Name #${n.number} | Eternal Raga`,
    description: desc.slice(0, 155),
    openGraph: {
      title: `${n.name_iast} — Lalita Sahasranama #${n.number} | Eternal Raga`,
      description: n.meaning_en.slice(0, 155),
      type: 'article',
    },
  };
}

export default async function LalitaNameDetailPage({ params }: Props) {
  const { locale, number } = await params;
  const num = parseInt(number, 10);
  const n = getLalitaNameByNumber(num);
  if (!n) notFound();

  const related = getRelatedLalitaNamesByTheme(n.theme, n.number, 8);
  const relatedNames: RelatedName[] = related.map(r => ({
    number: r.number,
    name_devanagari: r.name_devanagari,
    name_iast: r.name_iast,
    theme: r.theme,
  }));

  return (
    <VishnuNameDetail
      name={n}
      relatedNames={relatedNames}
      locale={locale}
      basePath="mantras"
      sahasranamaSlug="lalita-sahasranama"
      maxNumber={1000}
    />
  );
}
