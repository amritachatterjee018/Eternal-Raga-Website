'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ChevronDown, ChevronRight, Lock, BookOpen, Mail,
  Layers, Flame, Star, Scroll,
} from 'lucide-react';
import catalogData from '../../data/scriptures-catalog.json';
import LiquidGradientHero from '../../components/scriptures/LiquidGradientHero';

/* ─── Types ────────────────────────────────────────────────────── */
interface ScriptureItem {
  id: string;
  title_en: string;
  title_hi: string;
  chapters?: number;
  verses?: number;
  variant?: string;
  veda?: string;
  deity?: string;
  status: 'active' | 'coming_soon';
  slug?: string;
}

interface Category {
  id: string;
  title_en: string;
  title_hi: string;
  icon: string;
  color: string;
  description_en: string;
  description_hi: string;
  items: ScriptureItem[];
}

/* ─── Icon map ─────────────────────────────────────────────────── */
function CategoryIcon({ icon, color }: { icon: string; color: string }) {
  const cls = `w-8 h-8 flex-shrink-0`;
  const style = { color };
  switch (icon) {
    case 'chariot-wheel':
      return (
        <svg className={cls} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" />
          <line x1="12" y1="2" x2="12" y2="9" />
          <line x1="12" y1="15" x2="12" y2="22" />
          <line x1="2" y1="12" x2="9" y2="12" />
          <line x1="15" y1="12" x2="22" y2="12" />
          <line x1="4.22" y1="4.22" x2="7.76" y2="7.76" />
          <line x1="16.24" y1="16.24" x2="19.78" y2="19.78" />
          <line x1="4.22" y1="19.78" x2="7.76" y2="16.24" />
          <line x1="16.24" y1="7.76" x2="19.78" y2="4.22" />
        </svg>
      );
    case 'ancient-scroll':
      return <Scroll className={cls} style={style} />;
    case 'flame-of-knowledge':
      return <Flame className={cls} style={style} />;
    case 'sacred-fire':
      return <Star className={cls} style={style} />;
    default:
      return <Layers className={cls} style={style} />;
  }
}

/* ─── Coming Soon card ─────────────────────────────────────────── */
function ComingSoonCard({ item }: { item: ScriptureItem }) {
  return (
    <div
      className="relative rounded-xl p-4 flex items-start gap-3"
      style={{
        background: '#F5F3F0',
        border: '1px solid #E8DFC8',
        opacity: 0.7,
      }}
    >
      <Lock size={13} className="text-gray-400 mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-gray-500 leading-tight">{item.title_en}</p>
        <p className="hindi-text text-xs text-gray-400 mt-0.5">{item.title_hi}</p>
        <p className="text-xs text-gray-400 mt-1">
          {item.chapters ? `${item.chapters} Ch · ` : ''}
          {item.verses ? `${item.verses} Verses` : ''}
          {item.variant ? item.variant : ''}
          {item.veda ? ` · ${item.veda}` : ''}
        </p>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
            Coming Soon · जल्द आ रहा है
          </span>
          <button
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-[11px] text-[#C8962E] font-semibold hover:opacity-70 transition-opacity"
          >
            <Mail size={11} /> Notify Me
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Active scripture card ─────────────────────────────────────── */
function ActiveCard({ item, color, locale }: { item: ScriptureItem; color: string; locale: string }) {
  return (
    <Link
      href={`/${locale}${item.slug}`}
      className="group relative rounded-xl p-4 flex items-start gap-3 hover:-translate-y-0.5 transition-all duration-200"
      style={{
        background: '#fff',
        border: `1px solid rgba(200,150,46,0.2)`,
        borderLeft: `4px solid ${color}`,
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 20px rgba(0,0,0,0.12)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)';
      }}
    >
      <BookOpen size={14} className="flex-shrink-0 mt-0.5" style={{ color }} />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-[#1B0A3C] group-hover:text-[#C8962E] transition-colors leading-tight">
          {item.title_en}
        </p>
        <p className="hindi-text text-xs mt-0.5" style={{ color: '#A07424' }}>{item.title_hi}</p>
        <p className="text-xs text-gray-500 mt-1">
          {item.chapters ? `${item.chapters} Chapters · ` : ''}
          {item.verses ? `${item.verses}+ Verses` : ''}
          {item.variant ? item.variant : ''}
        </p>
      </div>
      <ChevronRight size={14} className="text-gray-300 group-hover:text-[#C8962E] transition-colors flex-shrink-0 mt-0.5" />
    </Link>
  );
}

/* ─── Accordion category card ───────────────────────────────────── */
function CategoryCard({
  category, isOpen, onToggle, locale,
}: {
  category: Category;
  isOpen: boolean;
  onToggle: () => void;
  locale: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!panelRef.current) return;
    setHeight(isOpen ? panelRef.current.scrollHeight : 0);
  }, [isOpen]);

  const activeItems = category.items.filter(i => i.status === 'active');
  const comingItems = category.items.filter(i => i.status === 'coming_soon');

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        border: `1px solid ${isOpen ? category.color + '60' : 'rgba(200,150,46,0.15)'}`,
        boxShadow: isOpen ? `0 4px 24px ${category.color}18` : '0 1px 6px rgba(0,0,0,0.06)',
      }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-5 px-6 text-left group"
        style={{
          minHeight: '200px',
          background: `linear-gradient(135deg, #1B0A3C 0%, #2D1B69 70%, #1F1250 100%)`,
          borderBottom: isOpen ? `3px solid ${category.color}` : '3px solid transparent',
          transition: 'border-color 300ms ease',
        }}
        aria-expanded={isOpen}
      >
        {/* Left: Icon + info */}
        <div className="flex items-center gap-5 flex-1 min-w-0">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
            style={{ background: `${category.color}20`, border: `2px solid ${category.color}50` }}
          >
            <CategoryIcon icon={category.icon} color={category.color} />
          </div>
          <div className="min-w-0">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2
                className="text-3xl md:text-4xl font-serif"
                style={{ fontFamily: 'Georgia, serif', color: '#fff' }}
              >
                {category.title_en}
              </h2>
              <span className="hindi-text text-xl" style={{ color: 'rgba(255,255,255,0.6)' }}>{category.title_hi}</span>
            </div>
            <p className="text-sm mt-1 max-w-md" style={{ color: 'rgba(255,255,255,0.7)' }}>{category.description_en}</p>
            <p className="hindi-text text-xs mt-0.5" style={{ color: `${category.color}cc` }}>
              {category.description_hi}
            </p>
          </div>
        </div>

        {/* Right: counts + chevron */}
        <div className="flex flex-col items-end gap-3 flex-shrink-0">
          <div className="text-right">
            <p className="text-sm font-semibold" style={{ color: category.color }}>
              {activeItems.length} available
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{comingItems.length} coming soon</p>
          </div>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: `${category.color}20`,
              border: `1.5px solid ${category.color}50`,
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 300ms ease',
            }}
          >
            <ChevronDown size={18} style={{ color: category.color }} />
          </div>
        </div>
      </button>

      {/* Expandable panel */}
      <div
        ref={panelRef}
        style={{
          maxHeight: `${height}px`,
          overflow: 'hidden',
          transition: 'max-height 400ms cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div className="px-6 py-6" style={{ background: '#FFFDF8' }}>

          {/* Active items */}
          {activeItems.length > 0 && (
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                Available Now · अभी उपलब्ध
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeItems.map((item, i) => (
                  <div
                    key={item.id}
                    style={{ animation: isOpen ? `fadeSlideIn 300ms ease ${i * 60}ms both` : 'none' }}
                  >
                    <ActiveCard item={item} color={category.color} locale={locale} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Separator */}
          {activeItems.length > 0 && comingItems.length > 0 && (
            <div className="flex items-center gap-4 my-5">
              <div className="h-px bg-gray-200 flex-1" />
              <span className="text-xs text-gray-400 font-medium">Coming Soon · जल्द आ रहा है</span>
              <div className="h-px bg-gray-200 flex-1" />
            </div>
          )}

          {/* Coming soon items */}
          {comingItems.length > 0 && (
            <div>
              {activeItems.length === 0 && (
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                  Coming Soon · जल्द आ रहा है
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {comingItems.map((item, i) => (
                  <div
                    key={item.id}
                    style={{
                      animation: isOpen
                        ? `fadeSlideIn 300ms ease ${(activeItems.length + i) * 60 + 120}ms both`
                        : 'none',
                    }}
                  >
                    <ComingSoonCard item={item} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── FAQ accordion ──────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What is the difference between the Gita and the Upanishads?',
    a: 'The Bhagavad Gita is a dialogue between Krishna and Arjuna set on a battlefield, focusing on dharma, karma yoga, jnana yoga, and bhakti yoga. The Upanishads are older philosophical texts that explore the nature of Brahman (ultimate reality) and Atman (the self). The Gita draws heavily from Upanishadic thought and presents it in a practical, narrative form accessible to all.'
  },
  {
    q: 'How many Puranas are there?',
    a: 'There are 18 Mahapuranas (great Puranas) and 18 Upapuranas (minor Puranas). The Mahapuranas include the Shiva Purana, Bhagavata Purana, Vishnu Purana, Garuda Purana, and others. Together they contain over 400,000 verses and cover cosmology, genealogy of gods and sages, and philosophical teachings.',
  },
  {
    q: 'What are the Upanishads?',
    a: 'The Upanishads are a collection of 108 ancient philosophical texts that form the end-portion of the Vedas, hence also called Vedanta (end of the Vedas). They explore questions about consciousness, reality, and liberation (moksha). The principal Upanishads — Isha, Kena, Katha, Mundaka, Mandukya, and others — are considered the most philosophically significant.',
  },
  {
    q: 'What is the difference between Shruti and Smriti?',
    a: 'Shruti ("that which is heard") refers to the eternally revealed scriptures — the four Vedas and the Upanishads. These are considered directly revealed divine knowledge. Smriti ("that which is remembered") refers to texts composed by human sages including the Bhagavad Gita, Puranas, Mahabharata, and Ramayana. Shruti has supreme authority; Smriti derives authority from Shruti.',
  },
  {
    q: 'Which scripture should I read first?',
    a: 'The Bhagavad Gita (700 verses in 18 chapters) is the ideal starting point — it is comprehensive, presents all major paths of yoga (karma, jnana, bhakti, raja), and is available in many excellent translations. After the Gita, the Isha Upanishad (only 18 mantras) offers a beautiful, concise introduction to Vedantic philosophy.',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl border transition-colors"
      style={{
        borderColor: open ? 'rgba(200,150,46,0.4)' : 'rgba(200,150,46,0.15)',
        background: '#fff',
      }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between text-left px-5 py-4 gap-3"
      >
        <span className="font-semibold text-sm text-[#1B0A3C] leading-snug">{q}</span>
        <ChevronDown
          size={16}
          className="text-[#C8962E] flex-shrink-0 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════ */
export default function Scriptures() {
  const rawParams = useParams();
  const locale = (Array.isArray(rawParams?.locale)
    ? rawParams.locale[0]
    : rawParams?.locale) || 'en';

  const [openCategory, setOpenCategory] = useState<string | null>('gita');
  const categories = catalogData.categories as Category[];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Hindu Scriptures Online — Eternal Raga',
    description: 'Explore sacred Hindu scriptures including the Bhagavad Gita, Upanishads, Puranas, and Vedas with Sanskrit, transliteration, and English meaning.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://eternalraga.com/${locale}` },
        { '@type': 'ListItem', position: 2, name: 'Scriptures', item: `https://eternalraga.com/${locale}/scriptures` },
      ],
    },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Keyframe for staggered fade-in */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="min-h-screen" style={{ background: '#FFFDF8' }}>

        {/* ── Hero ── */}
        <LiquidGradientHero className="py-16 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1 text-xs text-white/50 mb-8 flex-wrap">
              <Link href={`/${locale}`} className="hover:text-[#C8962E] transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span className="text-[#C8962E] font-medium">Scriptures</span>
            </nav>

            <div className="text-5xl mb-4 hindi-text opacity-60" style={{ color: '#F5C518' }}>ॐ</div>

            <h1 className="text-4xl md:text-6xl font-serif text-white mb-3 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              Sacred Scriptures
              <span className="block hindi-text text-3xl md:text-4xl mt-2" style={{ color: '#F5C518' }}>
                पवित्र शास्त्र
              </span>
            </h1>
            <p className="text-lg text-white/80 max-w-xl mx-auto mb-10">
              Explore the eternal wisdom of Hindu spiritual texts
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              {[
                { label: 'Categories', value: '4' },
                { label: 'Active Texts', value: '3' },
                { label: 'Coming Soon', value: '27' },
                { label: 'Languages', value: 'Sa · Hi · En' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold" style={{ color: '#F5C518' }}>{s.value}</div>
                  <div className="text-[11px] text-white/40 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </LiquidGradientHero>

        {/* ── Accordion ── */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-5">
          <p className="text-xs text-gray-400 text-center mb-6 uppercase tracking-widest">
            Click any category to explore
          </p>

          {categories.map(cat => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isOpen={openCategory === cat.id}
              onToggle={() => setOpenCategory(prev => prev === cat.id ? null : cat.id)}
              locale={locale}
            />
          ))}
        </main>

        {/* ── FAQ ── */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20" aria-label="Frequently Asked Questions">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1" style={{ background: 'rgba(200,150,46,0.2)' }} />
            <span className="hindi-text text-[#C8962E] text-xl">ज्ञान</span>
            <div className="h-px flex-1" style={{ background: 'rgba(200,150,46,0.2)' }} />
          </div>

          <h2 className="text-2xl md:text-3xl font-serif text-[#1B0A3C] text-center mb-1"
            style={{ fontFamily: 'Georgia, serif' }}>
            Frequently Asked Questions
          </h2>
          <p className="hindi-text text-center text-[#A07424] text-sm mb-8">सामान्य प्रश्न</p>

          <div className="space-y-3">
            {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>

          {/* Email CTA */}
          <div
            className="mt-12 rounded-2xl p-8 text-center text-white"
            style={{ background: 'linear-gradient(135deg, #1B0A3C, #2D1B69)' }}
          >
            <div className="text-4xl mb-3">📚</div>
            <h3 className="text-xl font-serif mb-1" style={{ fontFamily: 'Georgia, serif' }}>
              More is Coming
            </h3>
            <p className="hindi-text mb-3 text-sm" style={{ color: '#C8962E' }}>और भी आ रहा है</p>
            <p className="text-white/70 text-sm mb-6 max-w-sm mx-auto">
              We are actively producing high-quality translations and word-by-word analyses for all scriptures. Subscribe to be notified.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="px-4 py-3 rounded-lg text-gray-900 flex-1 focus:outline-none focus:ring-2 text-sm"
                style={{ focusRingColor: '#C8962E' } as React.CSSProperties}
              />
              <button
                className="px-5 py-3 rounded-lg font-bold text-sm whitespace-nowrap text-[#1B0A3C] transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #F5C518, #C8962E)' }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
