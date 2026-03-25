'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react';
import { THEME_COLORS } from '../lib/themeColors';

/* ─── Types ────────────────────────────────────────────────────── */
export interface WordEntry { sanskrit: string; en: string; hi: string; }
export interface VishnuNameClient {
  number: number;
  name_sanskrit: string;
  name_devanagari: string;
  name_iast: string;
  root_word: string;
  meaning_en: string;
  meaning_hi: string;
  word_by_word: Record<string, WordEntry>;
  theme: string;
  modern_context: string;
  modern_context_en: string;
  nri_context: string;
  usage_context: string;
}

export interface RelatedName {
  number: number;
  name_devanagari: string;
  name_iast: string;
  theme: string;
}

interface Props {
  name: VishnuNameClient;
  relatedNames: RelatedName[];
  locale: string;
  basePath?: string;
}

/* ─── Section header ─────────────────────────────────────────── */
function SectionHeader({ en, hi }: { en: string; hi: string }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-[10px] mb-[6px]">
        <div className="h-[1px] flex-1 bg-[#493582] dark:bg-[#C8962E] opacity-30 dark:opacity-20" />
        <span className="text-[#493582] dark:text-[#C8962E] opacity-90 dark:opacity-80 text-[11px] font-bold tracking-[0.1em] uppercase whitespace-nowrap">{en}</span>
        <div className="h-[1px] flex-1 bg-[#493582] dark:bg-[#C8962E] opacity-30 dark:opacity-20" />
      </div>
      <p className="text-center font-['Noto_Sans_Devanagari',Georgia,serif] text-[#2D1654] dark:text-[#D4A843] text-[13px] opacity-85 dark:opacity-75 mb-0">{hi}</p>
    </div>
  );
}

export default function VishnuNameDetail({ name, relatedNames, locale, basePath = 'mantras' }: Props) {
  const [contextTab, setContextTab] = useState<'hi' | 'en'>('hi');
  const theme = THEME_COLORS[name.theme] ?? { color: '#C8962E', label_en: name.theme, label_hi: '' };
  const hasPrev = name.number > 1;
  const hasNext = name.number < 1000;

  /* Keyboard navigation */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return;
      if (e.key === 'ArrowLeft' && hasPrev) {
        window.location.href = `/${locale}/${basePath}/sahasranamas/vishnu-sahasranama/${name.number - 1}`;
      } else if (e.key === 'ArrowRight' && hasNext) {
        window.location.href = `/${locale}/${basePath}/sahasranamas/vishnu-sahasranama/${name.number + 1}`;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [name.number, hasPrev, hasNext, locale]);

  // Shared card container styles
  const cardClass = "rounded-2xl p-6 mb-[18px] border border-[#493582]/20 dark:border-[#C8962E]/25 bg-[#F3E4FF] theme-card shadow-sm dark:shadow-none transition-colors duration-300";

  return (
    <div className="min-h-screen bg-white theme-bg transition-colors duration-300 pointer-events-auto">

      {/* ── Breadcrumb ── */}
      <div className="bg-[#F3E4FF]/60 dark:bg-[#262E69]/80 border-b border-[#C8962E]/10 px-4 py-[11px] transition-colors duration-300">
        <nav className="max-w-[900px] mx-auto flex items-center gap-[5px] flex-wrap">
          {[
            { label: 'Home', href: `/${locale}` },
            { label: basePath === 'mantras' ? 'Mantras & Stotrams' : 'Scriptures', href: `/${locale}/${basePath}` },
            { label: 'Sahasranamas', href: `/${locale}/${basePath}/sahasranamas` },
            { label: 'Vishnu Sahasranama', href: `/${locale}/${basePath}/sahasranamas/vishnu-sahasranama` },
          ].map(item => (
            <React.Fragment key={item.label}>
              <Link href={item.href} className="text-[#493582] dark:text-white/40 text-[12px] no-underline hover:text-[#1B0A3C] dark:hover:text-white transition-colors">
                {item.label}
              </Link>
              <ChevronRight size={10} className="text-[#493582]/70 dark:text-white/20" />
            </React.Fragment>
          ))}
          <span className="text-[#2D1654] dark:text-[#C8962E] text-[12px] font-semibold">Name #{name.number}</span>
        </nav>
      </div>

      <div className="max-w-[900px] mx-auto px-4 pt-[30px] pb-[80px]">

        {/* ── Hero Name Card ── */}
        <div 
          className="rounded-2xl text-center px-7 pt-[42px] pb-[32px] mb-[22px] bg-[#F3E4FF] theme-hero shadow-sm dark:shadow-none transition-colors duration-300"
          style={{
            borderTop: `4px solid ${theme.color}`,
            border: `1px solid ${theme.color}44`,
          }}
        >
          {/* Number badge */}
          <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center mx-auto mb-[22px] text-[#1B0A3C] font-[800] text-[20px] shadow-[0_4px_20px_rgba(200,150,46,0.45)]"
               style={{ background: 'linear-gradient(135deg, #C8962E, #F5C518)' }}>
            {name.number}
          </div>

          {/* Sanskrit salutation */}
          <p className="font-['Noto_Sans_Devanagari',Georgia,serif] text-[22px] text-[#493582] dark:text-[#D4A843] mb-[14px]">
            {name.name_sanskrit}
          </p>

          {/* Devanagari name */}
          <h1 className="font-['Noto_Sans_Devanagari',Georgia,serif] text-[clamp(26px,6vw,42px)] text-[#2D1654] dark:text-[#D4A843] font-[700] mb-[10px] leading-[1.2]">
            {name.name_devanagari}
          </h1>

          {/* IAST */}
          <p className="italic text-[#371C5A] dark:text-[#B8A88A] text-[22px] mb-[10px]">
            {name.name_iast}
          </p>

          {/* Root word */}
          <p className="text-[#493582] dark:text-white/40 text-[13px] mb-[18px]">
            Root: <span className="text-[#1B0A3C] dark:text-white/70 italic">{name.root_word}</span>
          </p>

          {/* Theme badge with colored dot */}
          <div className="inline-flex items-center gap-2 rounded-full px-[18px] py-[5px]"
               style={{ border: `1.5px solid ${theme.color}55`, background: `${theme.color}10`, '--tc': theme.color } as React.CSSProperties}>
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: theme.color }} />
            <span className="text-[13px] font-[600] text-[#2D1654] dark:text-[var(--tc)]">{theme.label_en}</span>
            <span className="text-[#493582]/60 dark:text-white/30 text-[12px]">·</span>
            <span className="font-['Noto_Sans_Devanagari',Georgia,serif] text-[#371C5A] dark:text-[#D4A843] text-[13px]">{theme.label_hi}</span>
          </div>
        </div>

        {/* ── Meaning ── */}
        <div className={cardClass} style={{ borderLeft: `4px solid ${theme.color}` }}>
          <SectionHeader en="Meaning" hi="अर्थ" />
          <p className="text-[#1B0A3C] dark:text-white text-[18px] leading-[1.8] pl-4 mb-5" style={{ borderLeft: `3px solid ${theme.color}` }}>
            {name.meaning_en}
          </p>
          <p className="font-['Noto_Sans_Devanagari',Georgia,serif] text-[#2D1654] dark:text-[#D4A843] text-[16px] leading-[1.9]">
            {name.meaning_hi}
          </p>
        </div>

        {/* ── Word-by-Word ── */}
        {Object.keys(name.word_by_word).length > 0 && (
          <div className={cardClass} style={{ borderLeft: `4px solid ${theme.color}` }}>
            <SectionHeader en="Word-by-Word Breakdown" hi="शब्द-दर-शब्द विश्लेषण" />
            <div className="flex flex-wrap gap-3">
              {Object.entries(name.word_by_word).map(([key, entry]) => (
                <div key={key} className="flex-[1_1_180px] rounded-xl px-4 py-[14px]"
                     style={{ background: `${theme.color}10`, border: `1px solid ${theme.color}30` }}>
                  <p className="font-['Noto_Sans_Devanagari',Georgia,serif] text-[#2D1654] dark:text-[#D4A843] text-[18px] font-[700] mb-1">
                    {entry.sanskrit}
                  </p>
                  <p className="text-[#1B0A3C] dark:text-white text-[14px] italic mb-[3px]">{entry.en}</p>
                  <p className="font-['Noto_Sans_Devanagari',Georgia,serif] text-[#493582] dark:text-white/80 text-[13px]">{entry.hi}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interpretation / Commentary */}
        <div className={cardClass} style={{ borderLeft: `4px solid ${theme.color}` }}>
          <h3 className="text-xl font-bold mb-4 text-[#493582] dark:text-[#C8962E]">In-depth Meaning</h3>
          <p className="text-[#1B0A3C] dark:text-white text-[18px] leading-[1.8] pl-4 mb-5" style={{ borderLeft: `3px solid ${theme.color}` }}>
            {name.meaning_en}
          </p>
          <p className="font-['Noto_Sans_Devanagari',Georgia,serif] text-[#2D1654] dark:text-[#D4A843] text-[16px] leading-[1.9]">
            {name.meaning_hi}
          </p>
        </div>

        {/* ── Modern Context ── */}
        <div className={cardClass} style={{ borderLeft: `4px solid ${theme.color}` }}>
          <SectionHeader en="Modern Context" hi="आधुनिक संदर्भ" />
          <div className="flex gap-2 mb-4">
            {(['hi', 'en'] as const).map(lang => (
              <button key={lang} onClick={() => setContextTab(lang)} 
                className={`px-5 py-[6px] rounded-full cursor-pointer font-inherit text-[13px] transition-all duration-150 ${contextTab === lang ? 'font-[700] text-[#1B0A3C] dark:text-[#1B0A3C]' : 'font-[500] text-[#2D1654] dark:text-white/70'}`}
                style={{
                  border: `1.5px solid ${contextTab === lang ? theme.color : 'rgba(200,150,46,0.25)'}`,
                  background: contextTab === lang ? theme.color : 'transparent',
                }}>
                {lang === 'hi' ? 'हिंदी' : 'English'}
              </button>
            ))}
          </div>
          {contextTab === 'hi' ? (
            <p className="font-['Noto_Sans_Devanagari',Georgia,serif] text-[#2D1654] dark:text-white/90 text-[16px] leading-[2]">
              {name.modern_context}
            </p>
          ) : (
            <p className="text-[#2D1654] dark:text-white/90 text-[16px] leading-[1.85]">{name.modern_context_en}</p>
          )}
        </div>

        {/* ── Diaspora Context ── */}
        <div className={cardClass} style={{ borderLeft: `4px solid ${theme.color}` }}>
          <SectionHeader en="Diaspora Reflection" hi="प्रवासी चिंतन" />
          <p className="text-[#2D1654] dark:text-white/90 text-[15px] leading-[1.85]">{name.nri_context}</p>
        </div>

        {/* ── When to Chant ── */}
        <div className={cardClass} style={{ borderLeft: `4px solid ${theme.color}` }}>
          <SectionHeader en="When to Chant" hi="कब जपें" />
          <p className="text-[#2D1654] dark:text-white/90 text-[15px] leading-[1.85]">
            <span className="font-['Noto_Sans_Devanagari',Georgia,serif] text-[18px] mr-2" style={{ color: theme.color }}>ॐ</span>
            {name.usage_context}
          </p>
        </div>

        {/* ── More in this Theme ── */}
        {relatedNames.length > 0 && (
          <div className={cardClass}>
            <SectionHeader en={`More ${theme.label_en} Names`} hi={`और ${theme.label_hi} नाम`} />
            <div className="flex gap-3 overflow-x-auto pb-2">
              {relatedNames.map(r => {
                const rTheme = THEME_COLORS[r.theme] ?? theme;
                return (
                  <Link key={r.number} href={`/${locale}/${basePath}/sahasranamas/vishnu-sahasranama/${r.number}`} 
                    className="shrink-0 w-[150px] rounded-xl p-[12px_13px] no-underline transition-all duration-150 block"
                    style={{
                      background: `${rTheme.color}10`, border: `1px solid ${rTheme.color}35`,
                      borderLeft: `3px solid ${rTheme.color}`,
                    }}>
                    <p className="text-[#493582] dark:text-[#C8962E] text-[11px] font-[700] mb-[5px]">
                      #{r.number}
                    </p>
                    <p className="font-['Noto_Sans_Devanagari',Georgia,serif] text-[#2D1654] dark:text-[#D4A843] text-[16px] mb-[3px] leading-[1.2]">
                      {r.name_devanagari}
                    </p>
                    <p className="text-[#371C5A] dark:text-[#B8A88A] text-[12px] italic">{r.name_iast}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Prev / Next ── */}
        <div className="flex gap-3 mt-7">
          {hasPrev ? (
            <Link href={`/${locale}/${basePath}/sahasranamas/vishnu-sahasranama/${name.number - 1}`} 
              className="flex-1 flex items-center gap-[10px] rounded-xl p-[15px_18px] no-underline transition-colors duration-200 border border-[#493582]/20 dark:border-[#C8962E]/25 bg-[#F3E4FF] theme-card hover:bg-[#F3E4FF]/80 dark:hover:brightness-110"
            >
              <ChevronLeft size={20} className="text-[#493582] dark:text-[#C8962E] shrink-0" />
              <div>
                <p className="text-[#493582]/80 dark:text-white/40 text-[11px] mb-[2px]">← PREVIOUS</p>
                <p className="text-[#1B0A3C] dark:text-white text-[14px] font-[600]">Name #{name.number - 1}</p>
              </div>
            </Link>
          ) : <div className="flex-1" />}

          {hasNext ? (
            <Link href={`/${locale}/${basePath}/sahasranamas/vishnu-sahasranama/${name.number + 1}`} 
              className="flex-1 flex items-center justify-end gap-[10px] rounded-xl p-[15px_18px] no-underline transition-colors duration-200 border border-[#493582]/20 dark:border-[#C8962E]/25 bg-[#F3E4FF] theme-card hover:bg-[#F3E4FF]/80 dark:hover:brightness-110"
            >
              <div className="text-right">
                <p className="text-[#493582]/80 dark:text-white/40 text-[11px] mb-[2px]">NEXT →</p>
                <p className="text-[#1B0A3C] dark:text-white text-[14px] font-[600]">Name #{name.number + 1}</p>
              </div>
              <ChevronRight size={20} className="text-[#493582] dark:text-[#C8962E] shrink-0" />
            </Link>
          ) : <div className="flex-1" />}
        </div>

        {/* Back link */}
        <div className="text-center mt-5">
          <Link href={`/${locale}/${basePath}/sahasranamas/vishnu-sahasranama`} 
            className="inline-flex items-center gap-[6px] text-[#493582] hover:text-[#1B0A3C] dark:text-[#C8962E]/65 dark:hover:text-[#C8962E] text-[14px] no-underline transition-colors">
            <ArrowLeft size={15} />
            Back to all 1000 names
          </Link>
        </div>

        <p className="text-center text-[#493582]/70 dark:text-white/20 text-[11px] mt-7">
          ← → arrow keys to navigate
        </p>
      </div>
    </div>
  );
}
