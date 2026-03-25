import { Metadata } from 'next';
import Link from 'next/link';
import { Lock, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sahasranama — 1000 Sacred Names | Eternal Raga',
  description:
    'Explore the divine Sahasranamas — a thousand sacred names of the Hindu deities, complete with meanings, context, and bilingual breakdown.',
};

const SAHASRANAMAS = [
  {
    id: 'vishnu-sahasranama',
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
    title_en: 'Lalita Sahasranama',
    title_hi: 'ललिता सहस्रनाम',
    verses: 1000,
    variant: 'From Brahmanda Purana',
    status: 'coming_soon' as const,
    deity_color: '#E06060',
  },
  {
    id: 'shiva-sahasranama',
    title_en: 'Shiva Sahasranama',
    title_hi: 'शिव सहस्रनाम',
    verses: 1000,
    variant: 'From Anushasana Parva',
    status: 'coming_soon' as const,
    deity_color: '#5BA3CF',
  },
  {
    id: 'ganesha-sahasranama',
    title_en: 'Ganesha Sahasranama',
    title_hi: 'गणेश सहस्रनाम',
    verses: 1000,
    variant: 'From Ganesha Purana',
    status: 'coming_soon' as const,
    deity_color: '#FF7043',
  },
];

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function SahasranamaIndexPage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white theme-bg">
      {/* Hero */}
      <div className="pt-16 pb-12 px-6 text-center bg-[#F3E4FF]/40 theme-hero">
        <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginBottom: 28, flexWrap: 'wrap' }}>
          <Link href={`/${locale}`} className="text-[#493582]/70 dark:text-[rgba(255,255,255,0.4)] text-[13px] no-underline">Home</Link>
          <ChevronRight size={12} className="text-[#493582]/40 dark:text-[rgba(255,255,255,0.25)]" />
          <Link href={`/${locale}/mantras`} className="text-[#493582]/70 dark:text-[rgba(255,255,255,0.4)] text-[13px] no-underline">Mantras & Stotrams</Link>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
          {SAHASRANAMAS.map(s => {
            const isActive = s.status === 'active';
            const Card = (
              <div style={{
                '--deity-color': s.deity_color,
                '--deity-color-55': s.deity_color + '55',
                borderLeft: `4px solid ${isActive ? s.deity_color : 'rgba(73,53,130,0.2)'}`,
                borderRadius: 16, padding: '24px 20px',
                opacity: isActive ? 1 : 0.6,
                transition: 'all 200ms ease',
                position: 'relative',
              } as React.CSSProperties} className={`group block border ${isActive ? 'bg-[#F3E4FF] theme-card border-[#d0c8e8] dark:border-[var(--deity-color-55)]' : 'bg-[#e5ecf6]/50 dark:bg-[#1B0A3C]/70 border-[#e5ecf6] dark:border-[rgba(200,150,46,0.12)]'}`}>
                {!isActive && (
                  <div style={{ position: 'absolute', top: 12, right: 12 }}>
                    <Lock size={14} className="text-[#493582]/40 dark:text-[rgba(200,150,46,0.4)]" />
                  </div>
                )}
                <p className={`font-['Noto_Sans_Devanagari',Georgia,serif] text-[22px] mb-1 ${isActive ? 'text-[#493582] dark:text-[#D4A843]' : 'text-[#493582]/60 dark:text-[#c8962e]/50'}`}>{s.title_hi}</p>
                <p className={`text-[16px] font-semibold mb-1.5 ${isActive ? 'text-[#1B0A3C] dark:text-white' : 'text-[#493582]/60 dark:text-white/60'}`}>{s.title_en}</p>
                <p className="text-[#493582]/60 dark:text-[rgba(255,255,255,0.4)] text-[12px] mb-4">{s.variant}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: isActive ? s.deity_color : undefined, border: isActive ? `1px solid ${s.deity_color}44` : undefined, borderRadius: 20, padding: '3px 12px' }} className={`text-[12px] font-semibold ${!isActive ? 'text-[#493582]/50 border border-[#493582]/20 dark:text-[rgba(255,255,255,0.3)] dark:border-[rgba(255,255,255,0.2)]' : ''}`}>
                    {s.verses.toLocaleString()} Names
                  </span>
                  {isActive ? (
                    <span className="text-[#493582] dark:text-[#C8962E] text-[12px] font-semibold group-hover:underline">Explore →</span>
                  ) : (
                    <span className="text-[#493582]/40 dark:text-[rgba(200,150,46,0.4)] text-[11px]">Coming Soon</span>
                  )}
                </div>
              </div>
            );

            return isActive && s.slug ? (
              <Link key={s.id} href={`/${locale}${s.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                {Card}
              </Link>
            ) : (
              <div key={s.id}>{Card}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
