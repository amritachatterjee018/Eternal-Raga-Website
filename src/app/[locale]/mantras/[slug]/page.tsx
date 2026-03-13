import { notFound }           from 'next/navigation';
import type { Metadata }        from 'next';
import MantraPage               from '../../../../_pages/MantraPage';
import {
  getMantraStaticParams,
  getMantraBySlug,
  getMantrasByDeity,
  type MantraItem,
}                               from '../../../../lib/contentLoader';


/* ─── Tell Next.js to pre-render every mantra at build time ──────── */
export async function generateStaticParams() {
  const params = getMantraStaticParams();
  // Generate for all locales  
  const locales = ['en', 'hi'];
  return locales.flatMap(locale =>
    params.map(p => ({ locale, slug: p.slug }))
  );
}

/* ─── SEO metadata ───────────────────────────────────────────────── */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string; locale: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const mantra = getMantraBySlug(slug);
  if (!mantra) return { title: 'Mantra Not Found | Eternal Raga' };

  const typeLabel = mantra.type
    ? mantra.type.charAt(0).toUpperCase() + mantra.type.slice(1)
    : 'Mantra';
  const deity = mantra.deity
    ? `${mantra.deity.charAt(0).toUpperCase() + mantra.deity.slice(1)} `
    : '';

  return {
    title: `${mantra.title_en} | ${deity}${typeLabel} with Meaning | Eternal Raga`,
    description: mantra.description_en
      ?? `${mantra.title_en} (${mantra.title_hi}) — complete text with Sanskrit, transliteration, Hindi and English meaning.`,
    openGraph: {
      title: `${mantra.title_en} — ${mantra.title_hi}`,
      description: mantra.description_en ?? '',
      type: 'article',
    },
  };
}

/* ─── Page component ─────────────────────────────────────────────── */
export default async function MantraSlugPage(
  { params }: { params: Promise<{ slug: string; locale: string }> }
) {
  const { slug, locale } = await params;
  const mantra = getMantraBySlug(slug);
  if (!mantra) notFound();

  /* Related: same deity, same type, exclude self — max 6 */
  const sameDiety = getMantrasByDeity(mantra?.deity ?? '');
  const related   = sameDiety
    .filter(m => m.id !== mantra.id)
    .sort((a, b) => {
      // Same type first
      const aScore = a.type === mantra.type ? 0 : 1;
      const bScore = b.type === mantra.type ? 0 : 1;
      return aScore - bScore;
    })
    .slice(0, 6)
    .map(m => ({ id: m.id, title_en: m.title_en, title_hi: m.title_hi, type: m.type }));

  /* JSON-LD structured data */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: mantra.title_en,
    alternateName: mantra.title_hi,
    author: mantra.author ?? 'Traditional',
    description: mantra.description_en ?? '',
    inLanguage: ['sa', 'hi', 'en'],
    about: {
      '@type': 'Thing',
      name: mantra.deity ? mantra.deity.charAt(0).toUpperCase() + mantra.deity.slice(1) : 'Hindu Deity',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MantraPage
        mantra={mantra}
        relatedMantras={related}
        locale={locale}
      />
    </>
  );
}