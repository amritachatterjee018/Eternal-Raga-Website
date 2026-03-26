import { Metadata } from 'next';
import Link from 'next/link';
import { Lock, ChevronRight } from 'lucide-react';
import { getAllSahasranamaAltMeta, SahasranamaAltMeta } from '../../../../lib/contentLoader';
import { SAHASRANAMA_IMAGE_META } from '../../../../lib/sahasranamaImageMeta';
import DeityHeroImage from '../../../../components/DeityHeroImage';

export const metadata: Metadata = {
  title: 'Sahasranama — 1000 Sacred Names | Eternal Raga',
  description:
    'Explore the divine Sahasranamas — a thousand sacred names of the Hindu deities, complete with meanings, context, and bilingual breakdown.',
};

const SAHASRANAMAS = [
  {
    id: 'vishnu-sahasranama',
    altMeta_id: 'sahasranama_vishnu',
    imageMeta_id: 'sahasranama_vishnu',
    title_en: 'Vishnu Sahasranama',
    title_hi: 'विष्णु सहस्रनाम',
    verses: 1000,
    variant: 'From Mahabharata · Anushasana Parva',
    status: 'active' as const,
    slug: '/mantras/sahasranamas/vishnu-sahasranama',
    deity_color: '#7B8EC2',
  },
  {
    id: 'lalita-sahasranama',
    altMeta_id: 'sahasranama_lalita',
    imageMeta_id: 'sahasranama_lalita',
    title_en: 'Lalita Sahasranama',
    title_hi: 'ललिता सहस्रनाम',
    verses: 1000,
    variant: 'From Brahmanda Purana · Lalitopakhyana',
    status: 'active' as const,
    slug: '/mantras/sahasranamas/lalita-sahasranama',
    deity_color: '#E06060',
  },
  {
    id: 'venkateswara-sahasranama',
    altMeta_id: 'sahasranama_venkateswara',
    imageMeta_id: 'sahasranama_venkateswara',
    title_en: 'Venkateswara Sahasranama',
    title_hi: 'वेंकटेश्वर सहस्रनाम',
    verses: 1008,
    variant: 'From Brahmanda Purana',
    status: 'active' as const,
    slug: '/mantras/sahasranamas/venkateswara-sahasranama',
    deity_color: '#5BA3CF',
  },
  {
    id: 'shiva-sahasranama',
    altMeta_id: 'sahasranama_shiva',
    imageMeta_id: 'sahasranama_shiva',
    title_en: 'Shiva Sahasranama',
    title_hi: 'शिव सहस्रनाम',
    verses: 1000,
    variant: 'From Anushasana Parva',
    status: 'coming_soon' as const,
    deity_color: '#7B8EC2',
  },
  {
    id: 'ganesha-sahasranama',
    altMeta_id: 'sahasranama_ganesha',
    imageMeta_id: 'sahasranama_ganesha',
    title_en: 'Ganesha Sahasranama',
    title_hi: 'गणेश सहस्रनाम',
    verses: 1000,
    variant: 'From Ganesha Purana',
    status: 'coming_soon' as const,
    deity_color: '#E8A317',
  },
];

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function SahasranamaIndexPage({ params }: Props) {
  const { locale } = await params;

  // Load all alternate-title metadata on the server
  const allAltMeta = getAllSahasranamaAltMeta();
  const altMetaMap: Record<string, SahasranamaAltMeta> = {};
  for (const m of allAltMeta) {
    altMetaMap[m.id] = m;
  }

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white theme-bg">
      {/* Hero */}
      <div className="pt-16 pb-12 px-6 text-center bg-[#F3E4FF]/40 theme-hero">
        <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginBottom: 28, flexWrap: 'wrap' }}>
          <Link href={`/${locale}`} className="text-[#493582]/70 dark:text-[rgba(255,255,255,0.4)] text-[13px] no-underline">Home</Link>
          <ChevronRight size={12} className="text-[#493582]/40 dark:text-[rgba(255,255,255,0.25)]" />
          <Link href={`/${locale}/mantras`} className="text-[#493582]/70 dark:text-[rgba(255,255,255,0.4)] text-[13px] no-underline">Mantras &amp; Stotrams</Link>
          <ChevronRight size={12} className="text-[#493582]/40 dark:text-[rgba(255,255,255,0.25)]" />
          <span className="text-[#1B0A3C] dark:text-[#C8962E] text-[13px] font-semibold">Sahasranamas</span>
        </nav>

        <div className="text-[48px] text-[#2D1654] dark:text-[#C8962E] leading-none mb-[14px]">ॐ</div>
        <h1 className="font-serif text-[clamp(26px,5vw,44px)] font-bold mb-2 text-[#1B0A3C] dark:text-white">
          Sahasranama
        </h1>
        <p className="font-['Noto_Sans_Devanagari',Georgia,serif] text-[clamp(18px,3vw,26px)] font-semibold mb-4 text-[#493582] dark:text-[#D4A843]">
          सहस्रनाम
        </p>
        <p className="text-[#493582]/80 dark:text-[rgba(255,255,255,0.55)] text-[15px] max-w-[560px] mx-auto leading-relaxed">
          A thousand sacred names of the divine — complete with bilingual meanings, word-by-word breakdown, modern context, and devotional guidance.
        </p>
      </div>

      {/* Card grid */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 16px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {SAHASRANAMAS.map(s => {
            const isActive = s.status === 'active';
            const altMeta = altMetaMap[s.altMeta_id];
            const alternateTitles = altMeta?.alternate_titles ?? [];
            const imgMeta = SAHASRANAMA_IMAGE_META[s.imageMeta_id];

            const cardContent = (
              <div style={{ opacity: isActive ? 1 : 0.55, position: 'relative' }}>
                {/* ── Image hero card ── */}
                <DeityHeroImage
                  src={imgMeta?.src}
                  altEn={imgMeta?.altEn}
                  altHi={imgMeta?.altHi}
                  placeholderColor={imgMeta?.placeholderColor ?? s.deity_color}
                  devanagariName={imgMeta?.devanagariName ?? s.title_hi.split(' ')[0]}
                  height={200}
                  style={{ borderRadius: 16, marginBottom: alternateTitles.length > 0 ? 0 : 0 }}
                >
                  {/* Dark gradient overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(27,10,60,0.65) 55%, rgba(27,10,60,0.96) 100%)',
                    borderRadius: 16,
                  }} />

                  {/* Lock badge (coming soon) */}
                  {!isActive && (
                    <div style={{
                      position: 'absolute', top: 12, right: 12,
                      background: 'rgba(27,10,60,0.7)',
                      border: '1px solid rgba(200,150,46,0.3)',
                      borderRadius: 20, padding: '4px 10px',
                      display: 'flex', alignItems: 'center', gap: 4,
                    }}>
                      <Lock size={11} color="rgba(200,150,46,0.7)" />
                      <span style={{ fontSize: 10, color: 'rgba(200,150,46,0.7)', fontWeight: 600 }}>Coming Soon</span>
                    </div>
                  )}

                  {/* Bottom text overlay */}
                  <div style={{
                    padding: '0 16px 14px',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    position: 'relative',
                  }}>
                    <div>
                      <p style={{
                        fontFamily: "'Noto Sans Devanagari', Georgia, serif",
                        fontSize: 15, fontWeight: 600,
                        color: '#D4A843', margin: 0, lineHeight: 1.3,
                      }}>
                        {s.title_hi}
                      </p>
                      <p style={{
                        fontSize: 18, fontWeight: 700,
                        color: '#FFFFFF', margin: '2px 0 4px',
                        textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                      }}>
                        {s.title_en}
                      </p>
                      <p style={{ fontSize: 11, color: 'rgba(212,196,168,0.75)', margin: 0 }}>
                        {s.verses.toLocaleString()} Names
                        {' · '}
                        <span style={{ fontFamily: "'Noto Sans Devanagari', Georgia, serif" }}>
                          {s.verses.toLocaleString()} नाम
                        </span>
                      </p>
                    </div>
                    {/* Deity accent dot */}
                    <div style={{
                      width: 10, height: 10,
                      borderRadius: '50%',
                      background: s.deity_color,
                      boxShadow: `0 0 8px ${s.deity_color}88`,
                      flexShrink: 0,
                      marginBottom: 4,
                    }} />
                  </div>
                </DeityHeroImage>

                {/* ── Alternate names pills (below the image card) ── */}
                {alternateTitles.length > 0 && (
                  <div style={{
                    padding: '10px 4px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    flexWrap: 'nowrap',
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}>
                    <p style={{
                      fontSize: 9, color: 'rgba(150,130,100,0.6)',
                      fontWeight: 700, letterSpacing: '0.06em',
                      textTransform: 'uppercase', flexShrink: 0, margin: 0,
                    }}>
                      Also
                    </p>
                    {alternateTitles.map((title, i) => {
                      const englishPart = title.split(' / ')[0].trim();
                      return (
                        <span key={i} style={{
                          flexShrink: 0,
                          background: 'rgba(60,35,100,0.08)',
                          border: '1px solid rgba(73,53,130,0.15)',
                          borderRadius: 12, padding: '3px 9px',
                          fontSize: 11, color: '#493582',
                          whiteSpace: 'nowrap',
                        }} className="dark:bg-[rgba(255,255,255,0.05)] dark:border-[rgba(200,150,46,0.2)] dark:text-[#B8A88A]">
                          {englishPart}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            );

            return isActive && s.slug ? (
              <Link key={s.id} href={`/${locale}${s.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                {cardContent}
              </Link>
            ) : (
              <div key={s.id}>{cardContent}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
