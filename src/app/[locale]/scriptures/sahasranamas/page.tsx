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
    slug: '/scriptures/sahasranamas/vishnu-sahasranama',
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #1B0A3C 0%, #2D1654 40%, #1B0A3C 100%)' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(180deg, #0D052A 0%, #1B0A3C 100%)', padding: '64px 24px 48px', textAlign: 'center' }}>
        <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginBottom: 28, flexWrap: 'wrap' }}>
          <Link href={`/${locale}`} style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={12} style={{ color: 'rgba(255,255,255,0.25)' }} />
          <Link href={`/${locale}/scriptures`} style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'none' }}>Scriptures</Link>
          <ChevronRight size={12} style={{ color: 'rgba(255,255,255,0.25)' }} />
          <span style={{ color: '#C8962E', fontSize: 13, fontWeight: 600 }}>Sahasranamas</span>
        </nav>

        <div style={{ fontSize: 48, color: '#F5C518', marginBottom: 14, lineHeight: 1 }}>ॐ</div>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(26px, 5vw, 44px)', color: '#fff', fontWeight: 700, marginBottom: 8 }}>
          Sahasranama
        </h1>
        <p style={{ fontFamily: "'Noto Sans Devanagari', Georgia, serif", fontSize: 'clamp(18px, 3vw, 26px)', color: '#D4A843', marginBottom: 16, fontWeight: 600 }}>
          सहस्रनाम
        </p>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
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
                background: isActive ? 'rgba(45,22,84,0.8)' : 'rgba(25,12,55,0.5)',
                border: `1px solid ${isActive ? s.deity_color + '55' : 'rgba(200,150,46,0.12)'}`,
                borderLeft: `4px solid ${isActive ? s.deity_color : 'rgba(200,150,46,0.15)'}`,
                borderRadius: 16, padding: '24px 20px',
                opacity: isActive ? 1 : 0.55,
                transition: 'all 200ms ease',
                position: 'relative' as const,
              }}>
                {!isActive && (
                  <div style={{ position: 'absolute' as const, top: 12, right: 12 }}>
                    <Lock size={14} style={{ color: 'rgba(200,150,46,0.4)' }} />
                  </div>
                )}
                <p style={{ fontFamily: "'Noto Sans Devanagari', Georgia, serif", fontSize: 22, color: '#D4A843', marginBottom: 4 }}>{s.title_hi}</p>
                <p style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{s.title_en}</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginBottom: 16 }}>{s.variant}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: s.deity_color, fontSize: 12, fontWeight: 600, border: `1px solid ${s.deity_color}44`, borderRadius: 20, padding: '3px 12px' }}>
                    {s.verses.toLocaleString()} Names
                  </span>
                  {isActive ? (
                    <span style={{ color: '#C8962E', fontSize: 12, fontWeight: 600 }}>Explore →</span>
                  ) : (
                    <span style={{ color: 'rgba(200,150,46,0.4)', fontSize: 11 }}>Coming Soon</span>
                  )}
                </div>
              </div>
            );

            return isActive && s.slug ? (
              <Link key={s.id} href={`/${locale}${s.slug}`} style={{
                textDecoration: 'none', display: 'block',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget.firstChild as HTMLElement;
                if (el) { el.style.transform = 'translateY(-4px)'; el.style.boxShadow = `0 8px 28px ${s.deity_color}25`; }
              }}
              onMouseLeave={e => {
                const el = e.currentTarget.firstChild as HTMLElement;
                if (el) { el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }
              }}
              >
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
