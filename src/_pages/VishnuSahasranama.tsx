'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Search, X, ChevronRight, ChevronUp, ChevronDown, Lock } from 'lucide-react';
import { THEME_COLORS, THEME_DESCRIPTIONS } from '../lib/themeColors';

/* ─── Types ─────────────────────────────────────────────────────── */
export interface NameCard {
  number: number;
  name_sanskrit: string;
  name_devanagari: string;
  name_iast: string;
  meaning_en: string;
  theme: string;
}

interface Props {
  cards: NameCard[];
  themeCounts: Record<string, number>;
  basePath?: string; // 'mantras' | 'scriptures'
}

const PAGE_SIZE = 50;

const MILESTONES = [
  { number: 1,    label: 'Viśvam' },
  { number: 100,  label: 'Acyuta' },
  { number: 108,  label: 'Sammita' },
  { number: 200,  label: 'Purāṇaḥ' },
  { number: 500,  label: 'Puṇya' },
  { number: 540,  label: 'Śāśvata' },
  { number: 700,  label: 'Prajāgara' },
  { number: 777,  label: 'Jitāmitra' },
  { number: 900,  label: 'Yajvā' },
  { number: 1000, label: 'Sarvap.' },
];

/* ─── Individual Name Card (shared between both views) ────────── */
function NameCard({ card, locale, basePath }: { card: NameCard; locale: string; basePath: string }) {
  const theme = THEME_COLORS[card.theme] ?? { color: '#C8962E', label_en: card.theme, label_hi: '' };

  return (
    <Link
      id={`name-${card.number}`}
      href={`/${locale}/${basePath}/sahasranamas/vishnu-sahasranama/${card.number}`}
      className="group block bg-[#F3E4FF] theme-card border border-gray-200 dark:border-[#C8962E]/25 shadow-sm dark:shadow-none"
      style={{
        borderRadius: 16,
        padding: '20px 18px 16px 22px',
        borderLeft: `4px solid ${theme.color}`,
        transition: 'transform 200ms ease, box-shadow 200ms ease, border-left-width 200ms ease',
        position: 'relative',
        display: 'block',
        textDecoration: 'none',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'translateY(-4px)';
        el.style.borderLeftWidth = '6px';
        el.style.boxShadow = `0 8px 32px ${theme.color}30`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'translateY(0)';
        el.style.borderLeftWidth = '4px';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Number badge */}
      <div style={{
        position: 'absolute', top: -13, left: 16,
        width: 32, height: 32, borderRadius: '50%',
        background: '#C8962E', color: '#1B0A3C',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 800,
        boxShadow: '0 2px 8px rgba(200,150,46,0.4)',
      }}>
        {card.number}
      </div>

      {/* Devanagari name */}
      <p style={{ fontFamily: "'Noto Sans Devanagari', Georgia, serif", fontSize: 22, marginBottom: 3, marginTop: 10, lineHeight: 1.2 }} className="text-[#A07424] dark:text-[#D4A843]">
        {card.name_devanagari}
      </p>

      {/* IAST */}
      <p style={{ fontStyle: 'italic', fontSize: 15, marginBottom: 5 }} className="text-[#371C5A] dark:text-[#B8A88A]">
        {card.name_iast}
      </p>

      {/* Sanskrit salutation */}
      <p style={{ fontFamily: "'Noto Sans Devanagari', Georgia, serif", fontSize: 12, marginBottom: 10, opacity: 0.8 }} className="text-[#493582] dark:text-[#C8962E]">
        {card.name_sanskrit}
      </p>

      {/* English meaning */}
      <p style={{
        fontSize: 13.5, lineHeight: 1.5,
        overflow: 'hidden', display: '-webkit-box',
        WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        marginBottom: 12,
      }} className="text-[#1B0A3C] dark:text-white">
        {card.meaning_en}
      </p>

      {/* Theme pill with colored dot */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: theme.color, flexShrink: 0 }} />
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.03em' }} className="text-[#493582] dark:text-gray-300">
          {theme.label_en}
        </span>
      </div>
    </Link>
  );
}

/* ─── Theme Explorer Accordion ──────────────────────────────────── */
function ThemeAccordion({
  themeId, count, cards, locale, search, isOpen, onToggle, basePath,
}: {
  themeId: string; count: number; cards: NameCard[]; locale: string;
  search: string; isOpen: boolean; onToggle: () => void; basePath: string;
}) {
  const theme = THEME_COLORS[themeId] ?? { color: '#C8962E', label_en: themeId, label_hi: '' };
  const description = THEME_DESCRIPTIONS[themeId] ?? '';

  const displayed = search.trim()
    ? cards.filter(c =>
        c.name_devanagari.includes(search) ||
        c.name_iast.toLowerCase().includes(search.toLowerCase()) ||
        c.meaning_en.toLowerCase().includes(search.toLowerCase())
      )
    : cards;

  return (
    <div style={{
      marginBottom: 12, borderRadius: 14,
      border: `1px solid ${isOpen ? theme.color + '55' : 'rgba(200,150,46,0.18)'}`,
      overflow: 'hidden',
      transition: 'border-color 200ms ease',
    }} className="bg-[#F3E4FF] dark:bg-transparent">
      {/* Header */}
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
          background: isOpen ? `${theme.color}14` : 'transparent',
          borderLeft: `4px solid ${theme.color}`,
          padding: '16px 18px', border: 'none', cursor: 'pointer',
          transition: 'background 200ms ease',
          fontFamily: 'inherit',
        }}
        className={isOpen ? "" : "hover:bg-[#F3E4FF]/50 dark:hover:bg-[#493582]/40 bg-transparent dark:bg-[#493582]/60"}
      >
        {/* Dot */}
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: theme.color, flexShrink: 0 }} />

        {/* Labels */}
        <div style={{ flex: 1, textAlign: 'left' }}>
          <span style={{ fontSize: 16, fontWeight: 600, marginRight: 10 }} className="text-[#1B0A3C] dark:text-[#fff]">{theme.label_en}</span>
          <span style={{ fontFamily: "'Noto Sans Devanagari', Georgia, serif", fontSize: 14 }} className="text-[#493582] dark:text-[#D4A843]">{theme.label_hi}</span>
        </div>

        {/* Count badge */}
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: `${theme.color}22`, border: `1.5px solid ${theme.color}55`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: theme.color, fontSize: 13, fontWeight: 700, flexShrink: 0,
        }}>
          {count}
        </div>

        {isOpen ? <ChevronUp size={18} style={{ color: theme.color, flexShrink: 0 }} /> : <ChevronDown size={18} style={{ color: 'rgba(200,150,46,0.5)', flexShrink: 0 }} />}
      </button>

      {/* Expanded content */}
      {isOpen && (
        <div style={{ padding: '16px 18px' }} className="bg-[#F3E4FF]/40 dark:bg-[#262E69]/60">
          <p style={{ fontSize: 13.5, lineHeight: 1.7, marginBottom: 18, fontStyle: 'italic' }} className="text-[#493582] dark:text-white/50">
            {description}
          </p>
          {displayed.length === 0 ? (
            <p style={{ fontSize: 13, textAlign: 'center', padding: '20px 0' }} className="text-[#493582]/70 dark:text-white/30">No names match your search in this theme.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {displayed.map(card => <NameCard key={card.number} card={card} locale={locale} basePath={basePath} />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */
export default function VishnuSahasranama({ cards, themeCounts, basePath = 'mantras' }: Props) {
  const rawParams = useParams();
  const locale = (Array.isArray(rawParams?.locale) ? rawParams.locale[0] : rawParams?.locale) || 'en';

  const [view, setView] = useState<'sequential' | 'theme'>('sequential');
  const [search, setSearch] = useState('');
  const [activeTheme, setActiveTheme] = useState('All');
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  /* Sorted theme list (by count desc) for theme explorer */
  const sortedThemes = Object.entries(themeCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([id]) => id);

  /* Initially open first 2 themes */
  const [openThemes, setOpenThemes] = useState<Set<string>>(
    () => new Set(sortedThemes.slice(0, 2))
  );

  /* Group cards by theme (sorted by canonical number) */
  const cardsByTheme = React.useMemo(() => {
    const map: Record<string, NameCard[]> = {};
    for (const card of cards) {
      if (!map[card.theme]) map[card.theme] = [];
      map[card.theme].push(card);
    }
    return map;
  }, [cards]);

  /* Sequential view: client-side filter */
  const filteredSeq = React.useMemo(() => {
    let result = cards;
    if (activeTheme !== 'All') result = result.filter(c => c.theme === activeTheme);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(c =>
        c.name_devanagari.includes(search.trim()) ||
        c.name_iast.toLowerCase().includes(q) ||
        c.name_sanskrit.toLowerCase().includes(q) ||
        c.meaning_en.toLowerCase().includes(q)
      );
    }
    return result;
  }, [cards, activeTheme, search]);

  const displayedSeq = filteredSeq.slice(0, displayCount);

  /* IntersectionObserver for infinite scroll */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && displayCount < filteredSeq.length) {
        setDisplayCount(prev => prev + PAGE_SIZE);
      }
    }, { rootMargin: '200px' });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [displayCount, filteredSeq.length]);

  useEffect(() => { setDisplayCount(PAGE_SIZE); }, [activeTheme, search]);

  useEffect(() => {
    const handleScroll = () => {
      setIsFilterSticky(window.scrollY > 420);
      setShowScrollTop(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCard = useCallback((number: number) => {
    // Make sure the card is rendered first
    const cardIdx = filteredSeq.findIndex(c => c.number === number);
    if (cardIdx >= displayCount) setDisplayCount(cardIdx + PAGE_SIZE);
    setTimeout(() => {
      const el = document.getElementById(`name-${number}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
  }, [filteredSeq, displayCount]);

  const toggleTheme = (id: string) => {
    setOpenThemes(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  /* ── Theme Legend Bar (for Theme Explorer) ── */
  const ThemeLegendBar = () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingBottom: 4, paddingTop: 4 }}>
      {sortedThemes.map(id => {
        const theme = THEME_COLORS[id] ?? { color: '#C8962E', label_en: id, label_hi: '' };
        const count = themeCounts[id] ?? 0;
        return (
          <button key={id} onClick={() => {
            const el = document.getElementById(`theme-section-${id}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setOpenThemes(prev => new Set([...prev, id]));
          }} style={{
            flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 14px', borderRadius: 24,
            cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all 150ms ease',
          }} className="border border-[#1B0A3C]/20 bg-white/50 dark:border-[rgba(200,150,46,0.25)] dark:bg-[rgba(200,150,46,0.05)]">
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: theme.color }} />
            <span style={{ fontSize: 12, fontWeight: 600 }} className="text-[#1B0A3C] dark:text-[#fff]">{theme.label_en}</span>
            <span style={{ fontSize: 11 }} className="text-[#493582] dark:text-white/40">({count})</span>
          </button>
        );
      })}
    </div>
  );

  /* ── Theme Filter Pills (Sequential View) ── */
  const ThemeFilterPills = () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingBottom: 2 }}>
      {/* All pill */}
      <button onClick={() => setActiveTheme('All')} style={{
        flexShrink: 0, padding: '5px 16px', borderRadius: 24,
        fontSize: 13, fontWeight: activeTheme === 'All' ? 700 : 500,
        cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
      }} className={activeTheme === 'All' 
        ? "bg-[#493582] border-none text-white dark:bg-[#C8962E] dark:text-white" 
        : "bg-transparent border-[1.5px] border-[#493582]/30 text-[#493582] dark:border-[rgba(200,150,46,0.3)] dark:text-[#C8962E]"}>
        All ({cards.length})
      </button>

      {sortedThemes.map(id => {
        const theme = THEME_COLORS[id] ?? { color: '#C8962E', label_en: id };
        const count = themeCounts[id] ?? 0;
        const isActive = activeTheme === id;
        return (
          <button key={id} onClick={() => setActiveTheme(id)} style={{
            flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6,
            padding: '5px 14px', borderRadius: 24, fontFamily: 'inherit',
            cursor: 'pointer', whiteSpace: 'nowrap',
            transition: 'all 150ms ease',
          }} className={isActive
            ? "bg-[#493582]/10 border-[1.5px] border-[#493582] dark:bg-[rgba(200,150,46,0.15)] dark:border-[#C8962E]"
            : "bg-transparent border-[1.5px] border-[#493582]/20 dark:border-[rgba(200,150,46,0.25)]"}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: theme.color, flexShrink: 0 }} />
            <span style={{ fontSize: 13, fontWeight: isActive ? 700 : 500 }} className={isActive ? "text-[#1B0A3C] dark:text-[#fff]" : "text-[#2D1654] dark:text-white/70"} >
              <span>{theme.label_en}</span> <span style={{ opacity: 0.65, fontSize: 11 }}>({count})</span>
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="bg-white theme-bg min-h-screen transition-colors duration-300">

      {/* ── Hero ── */}
      <div style={{
        padding: '80px 24px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }} className="bg-[#F3E4FF]/40 theme-hero">
        <div style={{ fontSize: 160, position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', lineHeight: 1 }} className="text-[#493582]/5 dark:text-[#C8962E]/5">ॐ</div>

        {/* Breadcrumb */}
        <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginBottom: 32, flexWrap: 'wrap' }}>
          {[
            { label: 'Home', href: `/${locale}` },
            { label: basePath === 'mantras' ? 'Mantras & Stotrams' : 'Scriptures', href: `/${locale}/${basePath}` },
            { label: 'Sahasranamas', href: `/${locale}/${basePath}/sahasranamas` },
          ].map(item => (
            <React.Fragment key={item.label}>
              <Link href={item.href} style={{ fontSize: 13, textDecoration: 'none' }} className="text-[#493582] dark:text-white/40 hover:text-[#1B0A3C] dark:hover:text-[#C8962E]">{item.label}</Link>
              <ChevronRight size={12} className="text-[#493582]/70 dark:text-white/25" />
            </React.Fragment>
          ))}
          <span style={{ color: '#C8962E', fontSize: 13, fontWeight: 600 }}>Vishnu Sahasranama</span>
        </nav>

        <div style={{ fontSize: 52, color: '#F5C518', marginBottom: 14, lineHeight: 1 }}>ॐ</div>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(30px, 6vw, 54px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 8 }} className="text-[#1B0A3C] dark:text-[#fff]">
          Vishnu Sahasranama
        </h1>
        <p style={{ fontFamily: "'Noto Sans Devanagari', Georgia, serif", fontSize: 'clamp(20px, 4vw, 30px)', marginBottom: 18, fontWeight: 600 }} className="text-[#493582] dark:text-[#D4A843]">
          विष्णु सहस्रनाम
        </p>
        <p style={{ fontSize: 16, marginBottom: 8 }} className="text-[#2D1654] dark:text-white/60">
          The 1000 Sacred Names of Lord Vishnu · भगवान विष्णु के 1000 पवित्र नाम
        </p>
        <p style={{ fontSize: 14, maxWidth: 620, margin: '0 auto 32px', lineHeight: 1.7 }} className="text-[#493582] dark:text-white/45">
          From the Anushasana Parva of the Mahabharata, as taught by Bhishma to Yudhishthira on the battlefield of Kurukshetra. Each name reveals a divine quality of the Supreme Lord.
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
          {[{ v: '1,000', l: 'Names' }, { v: '15', l: 'Themes' }, { v: '13,000+', l: 'Content Fields' }].map(s => (
            <div key={s.l} style={{
              background: 'rgba(200,150,46,0.12)', border: '1px solid rgba(200,150,46,0.3)',
              borderRadius: 24, padding: '5px 18px', color: '#C8962E', fontSize: 13, fontWeight: 600,
            }}>
              <span style={{ color: '#F5C518', fontWeight: 700 }}>{s.v}</span> · {s.l}
            </div>
          ))}
        </div>
      </div>

      {/* ── Milestone Bar ── */}
      <div style={{ borderBottom: '1px solid rgba(200,150,46,0.12)', padding: '9px 16px', display: 'flex', gap: 8, alignItems: 'center', overflowX: 'auto' }} className="bg-[#F3E4FF] dark:bg-[rgba(38,46,105,0.7)]">
        <span style={{ fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap', letterSpacing: '0.06em', textTransform: 'uppercase' }} className="text-[#493582] dark:text-[#C8962E]/60">Jump:</span>
        {MILESTONES.map(m => (
          <button key={m.number} onClick={() => {
            if (view !== 'sequential') setView('sequential');
            scrollToCard(m.number);
          }} style={{
            background: 'rgba(200,150,46,0.08)', border: '1px solid rgba(200,150,46,0.28)',
            borderRadius: 20, padding: '4px 12px', cursor: 'pointer', whiteSpace: 'nowrap',
            color: '#C8962E', fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
          }}>
            #{m.number} {m.label}
          </button>
        ))}
      </div>

      {/* ── Controls Bar ── */}
      <div style={{
        position: isFilterSticky ? 'sticky' : 'relative',
        top: isFilterSticky ? 0 : 'auto', zIndex: 40,
        backdropFilter: isFilterSticky ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isFilterSticky ? 'blur(20px)' : 'none',
        borderBottom: '1px solid rgba(200,150,46,0.18)',
        padding: '14px 16px',
      }} className="bg-[#F3E4FF]/80 dark:bg-[#1B0A3C]/90">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Row 1: View Toggle + Search */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
            {/* View Toggle */}
            <div style={{
              display: 'flex', flexShrink: 0,
              borderRadius: 10,
              border: '1px solid rgba(200,150,46,0.3)', overflow: 'hidden',
            }} className="bg-[#F3E4FF] dark:bg-black/40">
              {([['sequential', 'Sequential · क्रमबद्ध'], ['theme', 'By Theme · विषयानुसार']] as const).map(([id, label]) => (
                <button key={id} onClick={() => setView(id)} style={{
                  padding: '8px 16px', border: 'none', cursor: 'pointer',
                  fontFamily: "'Noto Sans Devanagari', sans-serif",
                  background: view === id ? '#C8962E' : 'transparent',
                  color: view === id ? '#1B0A3C' : '#C8962E',
                  fontSize: 13, fontWeight: view === id ? 700 : 500,
                  transition: 'all 150ms ease',
                }}>
                  {label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
              <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#C8962E', pointerEvents: 'none' }} />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search 1000 names... · 1000 नामों में खोजें..."
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    border: '1px solid rgba(200,150,46,0.28)',
                    borderRadius: 10, padding: '8px 36px 8px 36px',
                    fontSize: 14, outline: 'none', fontFamily: 'inherit',
                  }}
                  className="bg-[#F3E4FF] dark:bg-[#493582]/60 text-[#1B0A3C] dark:text-[#fff] placeholder:text-[#493582]/70 dark:placeholder:text-white/40"
                />
              {search && (
                <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 2 }}>
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Row 2: Pills (sequential) or Theme Legend (theme) */}
          {view === 'sequential' ? <ThemeFilterPills /> : <ThemeLegendBar />}
        </div>
      </div>

      {/* ── Content Area ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 16px 80px' }}>

        {view === 'sequential' ? (
          <>
            {/* Counter */}
            <p style={{ fontSize: 13, marginBottom: 22, textAlign: 'center' }} className="text-[#493582] dark:text-white/40">
              Showing <span style={{ color: '#C8962E', fontWeight: 600 }}>{Math.min(displayCount, filteredSeq.length)}</span>{' '}
              of <span className="text-[#1B0A3C] dark:text-[#fff] font-medium">{filteredSeq.length}</span> names
              {activeTheme !== 'All' && (
                <span className="text-[#493582] dark:text-white/35">
                  {' '}in <em>{THEME_COLORS[activeTheme]?.label_en ?? activeTheme}</em>
                </span>
              )}
              {search && <span className="text-[#493582] dark:text-white/35"> matching &quot;{search}&quot;</span>}
            </p>

            {displayedSeq.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }} className="text-[#493582]/80 dark:text-white/35">
                <div style={{ fontSize: 48, color: 'rgba(200,150,46,0.15)', marginBottom: 16 }}>ॐ</div>
                <p>No names match your search. Try a different query or clear the filter.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 24 }}>
                {displayedSeq.map(card => <NameCard key={card.number} card={card} locale={locale} basePath={basePath} />)}
              </div>
            )}

            <div ref={sentinelRef} style={{ height: 1 }} />

            {displayCount < filteredSeq.length && (
              <div style={{ textAlign: 'center', marginTop: 28 }}>
                <button onClick={() => setDisplayCount(p => p + PAGE_SIZE)} style={{
                  background: 'rgba(200,150,46,0.12)', border: '1px solid rgba(200,150,46,0.35)',
                  borderRadius: 10, padding: '11px 28px', color: '#C8962E', fontSize: 14,
                  fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  Load More ({filteredSeq.length - displayCount} remaining)
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {sortedThemes.map(id => (
              <div key={id} id={`theme-section-${id}`}>
                <ThemeAccordion
                  themeId={id}
                  count={themeCounts[id] ?? 0}
                  cards={cardsByTheme[id] ?? []}
                  locale={locale}
                  search={search}
                  isOpen={openThemes.has(id)}
                  onToggle={() => toggleTheme(id)}
                  basePath={basePath}
                />
              </div>
            ))}
          </>
        )}
      </div>

      {/* Scroll-to-top FAB */}
      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 50,
          width: 44, height: 44, borderRadius: '50%',
          background: '#C8962E', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(200,150,46,0.4)',
        }} aria-label="Scroll to top">
          <ChevronUp size={20} color="#1B0A3C" />
        </button>
      )}
    </div>
  );
}
