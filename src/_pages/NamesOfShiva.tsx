'use client';

/* ─── Print Styles ──────────────────────────────────────────────── */
function PrintStyles() {
  return (
    <style>{`
      @media print {
        /* ── Hide everything that isn't content ── */
        nav, header, footer,
        [data-print="hide"],
        .no-print {
          display: none !important;
        }

        body {
          background: #fff !important;
          color: #1B0A3C !important;
          font-family: Georgia, serif;
        }

        main { background: #fff !important; }

        /* ── Force ALL expanded card content to show ── */
        [data-print-card] > div {
          display: block !important;
        }

        /* ── Theme section: light background for print ── */
        section[data-theme-section] {
          background: #fff !important;
          border-left: 4px solid #888 !important;
          page-break-inside: avoid;
          break-inside: avoid;
        }

        /* ── Each theme starts on a new page ── */
        section[data-theme-section]:not(:first-of-type) {
          page-break-before: always;
          break-before: always;
        }

        /* ── Name card ── */
        [data-name-card] {
          page-break-inside: avoid;
          break-inside: avoid;
          border: 1px solid #ccc !important;
          background: #fafafa !important;
          margin-bottom: 16px;
          border-radius: 8px;
          padding: 12px;
          box-shadow: none !important;
        }

        /* ── Ensure expanded sections print ── */
        [data-expanded-content] {
          display: block !important;
          padding: 8px 0;
        }

        /* ── Reset any dark colors ── */
        * { color: inherit; }
        h1, h2, h3, h4 { color: #1B0A3C !important; }
        .hindi-text { color: #8B4000 !important; }

        /* ── Modern context / journal boxes ── */
        [data-modern-ctx], [data-journal] {
          background: #fffbe8 !important;
          border-left: 3px solid #C8962E !important;
          color: #1B0A3C !important;
        }

        /* ── Practice boxes ── */
        [data-practice] {
          background: #f5f5ff !important;
          border: 1px solid #ddd !important;
          color: #1B0A3C !important;
        }

        /* ── Page info ── */
        @page {
          margin: 20mm;
          size: A4;
        }

        /* ── Suppress spin animation in print ── */
        .spin-border-wrap::before,
        .spin-border-wrap::after {
          display: none !important;
        }
      }
    `}</style>
  );
}

/* ─── Spinning Border Animation (à la @property rotate) ─────────── */
function SpinStyles() {
  return (
    <style>{`
      @property --spin-rotate {
        syntax: "<angle>";
        initial-value: 0deg;
        inherits: false;
      }

      @keyframes shiva-spin {
        0%   { --spin-rotate: 0deg; }
        100% { --spin-rotate: 360deg; }
      }

      .spin-border-wrap {
        position: relative;
        border-radius: 12px;
        /* content area sits above pseudo-elements */
      }

      /* Rotating gradient border */
      .spin-border-wrap::before {
        content: "";
        width: 100.5%;
        height: 103%;
        border-radius: 14px;
        background-image: linear-gradient(
          var(--spin-rotate),
          var(--spin-c1, #C8962E),
          #C8962E 40%,
          var(--spin-c1, #C8962E)
        );
        position: absolute;
        z-index: 0;
        top: -1.5%;
        left: -0.25%;
        animation: shiva-spin 3s linear infinite;
      }

      /* Glow blur below the card */
      .spin-border-wrap::after {
        position: absolute;
        content: "";
        top: 4%;
        left: 0; right: 0;
        z-index: 0;
        height: 100%;
        width: 100%;
        margin: 0 auto;
        transform: scale(0.88);
        filter: blur(14px);
        background-image: linear-gradient(
          var(--spin-rotate),
          var(--spin-c1, #C8962E),
          #C8962E 40%,
          var(--spin-c1, #C8962E)
        );
        opacity: 0.35;
        transition: opacity 0.4s;
        animation: shiva-spin 3s linear infinite;
      }

      /* The actual content pane sits above pseudo-elements */
      .spin-border-inner {
        position: relative;
        z-index: 1;
        border-radius: 10px;
        overflow: hidden;
      }
    `}</style>
  );
}

function SpinBorder({
  themeColor,
  className = '',
  style = {},
  children,
}: {
  themeColor: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`spin-border-wrap ${className}`}
      style={{ '--spin-c1': themeColor, ...style } as React.CSSProperties}
    >
      <div className="spin-border-inner" style={{ width: '100%', height: '100%' }}>
        {children}
      </div>
    </div>
  );
}
import React, { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Download, X, Play, Clock, Calendar } from 'lucide-react';
import namesData from '@/data/108_names/108-names-of-shiva.json';

/* ─── Types ──────────────────────────────────────────────────────── */
interface ShivaName {
  number: number;
  sanskrit: string;
  transliteration: string;
  mantra: string;
  mantra_iast: string;
  etymology: string;
  meaning_en: string;
  meaning_hi: string;
  story_en: string;
  story_hi: string;
  modern_context_en: string;
  modern_context_hi: string;
  meditation: string;
  mantra_practice: string;
  journal_prompt_en: string;
  journal_prompt_hi: string;
  verse_en: string;
  verse_hi: string;
  significance: string;
}

interface Theme {
  theme_id: string;
  theme_number: number;
  theme_en: string;
  theme_hi: string;
  mood: string;
  color: string;
  background_description: string;
  theme_description_en: string;
  theme_description_hi: string;
  youtube_video_id: string;
  name_range: string;
  name_count: number;
}

/* ─── Helpers ────────────────────────────────────────────────────── */
function hex2rgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/* ─── 3D Theme Card CSS (ggayane-style) ─────────────────────────── */
function ThemeCardStyles() {
  return (
    <style>{`
      /* ── Outer card shell ── */
      .thc-outer {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        padding: 0 28px 28px;
        perspective: 2500px;
        cursor: pointer;
        border-radius: 16px;
        overflow: visible;  /* lets character escape the top */
        outline: none;
      }

      /* ── Background wrapper (.wrapper) ── */
      .thc-wrapper {
        transition: all 0.5s ease;
        position: absolute;
        inset: 0;
        border-radius: 16px;
        overflow: hidden;
        z-index: 0;
      }

      .thc-outer:hover .thc-wrapper,
      .thc-outer:focus-visible .thc-wrapper {
        transform: perspective(900px) translateY(-5%) rotateX(25deg) translateZ(0);
        box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
      }

      /* Top gradient — appears on hover */
      .thc-wrapper::before {
        content: "";
        opacity: 0;
        width: 100%;
        height: 100%;
        transition: all 0.5s;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        background-image: linear-gradient(
          to top,
          transparent 46%,
          rgba(10, 8, 20, 0.55) 68%,
          rgba(10, 8, 20, 0.95) 97%
        );
      }

      /* Bottom scrim — always on, deepens on hover */
      .thc-wrapper::after {
        content: "";
        opacity: 1;
        width: 100%;
        height: 100px;
        transition: all 0.5s;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 1;
        background-image: linear-gradient(
          to bottom,
          transparent 46%,
          rgba(10, 8, 20, 0.55) 68%,
          rgba(10, 8, 20, 0.95) 97%
        );
      }

      .thc-outer:hover .thc-wrapper::before,
      .thc-outer:focus-visible .thc-wrapper::before {
        opacity: 1;
      }

      .thc-outer:hover .thc-wrapper::after,
      .thc-outer:focus-visible .thc-wrapper::after {
        height: 140px;
      }

      /* ── Text block (.title) ── */
      .thc-title {
        width: 100%;
        transition: transform 0.5s ease;
        position: relative;
        z-index: 2;
      }

      .thc-outer:hover .thc-title,
      .thc-outer:focus-visible .thc-title {
        transform: translate3d(0%, -50px, 100px);
      }

      /* ── Deity character image (.character) ── */
      .thc-character {
        width: 100%;
        max-height: 90%;
        opacity: 0;
        transition: all 0.5s ease;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;
        object-fit: contain;
        object-position: bottom center;
        pointer-events: none;
        filter: drop-shadow(0 24px 32px rgba(0, 0, 0, 0.7));
      }

      .thc-outer:hover .thc-character,
      .thc-outer:focus-visible .thc-character {
        opacity: 1;
        transform: translate3d(0%, -30%, 100px);
      }

      /* ── Explore hint pill ── */
      .thc-explore {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 11px;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        color: #C8962E;
        margin-top: 10px;
        font-weight: 600;
        opacity: 0.9;
      }

      /* ── Reduced motion ── */
      @media (prefers-reduced-motion: reduce) {
        .thc-wrapper, .thc-title, .thc-character { transition: none !important; }
        .thc-outer:hover .thc-wrapper { transform: none; }
        .thc-outer:hover .thc-character { opacity: 1; transform: none; }
      }

      /* ── Mobile — no 3D tilt, static character visible ── */
      @media (max-width: 768px) {
        .thc-character { opacity: 0.6; transform: none !important; }
        .thc-outer:hover .thc-wrapper { transform: none !important; }
        .thc-outer:hover .thc-title { transform: translate3d(0, -16px, 0) !important; }
        .thc-outer:hover .thc-character { opacity: 1; transform: none !important; }
      }
    `}</style>
  );
}

/* ─── Per-theme background gradients ────────────────────────────── */
const THEME_GRADIENTS = [
  // Rudra — fire
  'radial-gradient(ellipse at bottom, #1a0000 0%, #8B0000 40%, #DC143C 75%, #FF4500 100%)',
  // Shanta — snow / dawn lake
  'linear-gradient(180deg, #0d1b2e 0%, #1e3a56 40%, #5b9ec9 80%, #c9e8f5 100%)',
  // Cosmic — nebula
  'radial-gradient(ellipse at center, #000010 0%, #0d0030 35%, #4B0082 70%, #1a004d 100%)',
  // Nature — forest
  'linear-gradient(180deg, #030d03 0%, #0d2d0d 35%, #1a4a1a 65%, #228B22 100%)',
  // Dancer — ring of fire
  'radial-gradient(ellipse at center bottom, #1a0800 0%, #8B3000 40%, #FF8C00 75%, #1a0000 100%)',
  // Protector — golden light
  'linear-gradient(180deg, #1a1000 0%, #4a3200 35%, #8B6914 65%, #FFD700 100%)',
  // Yogi — cremation ground dawn
  'linear-gradient(180deg, #0d0800 0%, #2d1200 35%, #8B4513 65%, #c47a3a 100%)',
  // Eternal — void + pillar of light
  'radial-gradient(ellipse at top center, rgba(255,255,255,0.15) 0%, #1B0A3C 30%, #060010 70%, #000000 100%)',
  // Beloved — Kailash twilight
  'linear-gradient(180deg, #1a0020 0%, #5c003a 40%, #9b1060 65%, #FF69B4 100%)',
];
const THEME_IMAGE_NAMES = ['rudra','shanta','cosmic','nature','dancer','protector','yogi','eternal','beloved'];

/* ─── Single Theme Hero Card (ggayane animation) ─────────────────── */
function ThemeHeroCard({
  theme,
  index,
  onScrollTo,
}: {
  theme: Theme;
  index: number;
  onScrollTo: (i: number) => void;
}) {
  return (
    <div
      className="thc-outer"
      style={{ height: 'clamp(280px, 28vw, 400px)' }}
      onClick={() => onScrollTo(index)}
      onKeyDown={(e) => e.key === 'Enter' && onScrollTo(index)}
      role="button"
      tabIndex={0}
      aria-label={`108 Names of Shiva — Theme: ${theme.theme_en} · ${theme.theme_hi}`}
    >
      {/* Layer 1 — background wrapper (tilts back on hover) */}
      <div
        className="thc-wrapper"
        style={{ background: THEME_GRADIENTS[index] }}
      >
        {/* Theme colour tint */}
        <div style={{
          position: 'absolute', inset: 0,
          background: hex2rgba(theme.color, 0.2),
          zIndex: 0,
        }} />
      </div>

      {/* Layer 2 — deity character (hidden; rises on hover) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="thc-character"
        src={`/images/themes/${THEME_IMAGE_NAMES[index]}.png`}
        alt={`${theme.theme_en} form of Shiva`}
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
      />

      {/* Layer 3 — text title (slides up on hover) */}
      <div className="thc-title">
        <span style={{
          display: 'block',
          fontSize: 10, fontWeight: 700, letterSpacing: '2px',
          textTransform: 'uppercase', color: '#C8962E', marginBottom: 6,
        }}>
          Theme {theme.theme_number} of 9
        </span>
        <h3 style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
          lineHeight: 1.15, color: '#fff', marginBottom: 4,
          textShadow: '0 2px 10px rgba(0,0,0,0.8)',
        }}>
          {theme.theme_en}
        </h3>
        <span
          className="hindi-text"
          style={{ display: 'block', fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)', color: '#C8962E', fontFamily: 'Georgia, serif', marginBottom: 4 }}
        >
          {theme.theme_hi}
        </span>
        <p style={{ fontSize: 11, fontStyle: 'italic', color: 'rgba(255,255,255,0.72)', margin: 0 }}>
          {theme.mood}
        </p>
        <span className="thc-explore" style={{ color: '#C8962E' }}>Explore 12 Names ▼</span>
      </div>
    </div>
  );
}

/* ─── 3×3 Theme Card Grid ────────────────────────────────────────── */
function ThemeCardGrid({ themes, isDark }: { themes: Theme[]; isDark: boolean }) {
  const scrollToTheme = useCallback((index: number) => {
    const el = document.getElementById(`theme-section-${index + 1}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <section
      className="px-4 sm:px-6 py-14"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, #0D0520 0%, #120830 50%, #0D0520 100%)'
          : 'linear-gradient(180deg, #FFF8E7 0%, #F5EDD5 50%, #FFF8E7 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest font-semibold text-[#C8962E] mb-2">
            Nine Divine Themes
          </p>
          <h2
            className="text-3xl md:text-4xl font-serif dark:text-white text-[#1B0A3C]"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Explore All 9 Facets of Shiva
          </h2>
          <p className="text-sm dark:text-[#BCA8E8] text-gray-500 mt-2 italic">
            Click any theme to begin — each card leads to 12 sacred names
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
          }}
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {themes.map((theme, i) => (
            <ThemeHeroCard
              key={theme.theme_id}
              theme={theme}
              index={i}
              onScrollTo={scrollToTheme}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
function getNamesForTheme(theme: Theme): ShivaName[] {
  const [start, end] = theme.name_range.split('-').map(Number);
  return (namesData.names as ShivaName[]).filter(
    (n) => n.number >= start && n.number <= end
  );
}

/* ─── Dark mode hook ─────────────────────────────────────────────── */
function useDarkMode(): boolean {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

/* ─── PDF Email Capture Modal ────────────────────────────────────── */
function PdfModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const isDark = useDarkMode();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      window.print();
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ background: 'rgba(27,10,60,0.88)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative rounded-2xl shadow-2xl max-w-md w-full p-8"
        style={{ background: isDark ? '#1C0A42' : '#fff', border: isDark ? '1px solid rgba(200,150,46,0.3)' : 'none' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-3">🙏</div>
            <h3 className="text-xl font-serif text-white mb-2">Downloading…</h3>
            <p className="text-gray-400 text-sm">Your printable PDF is ready. Om Namah Shivaya.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="text-3xl mb-2" style={{ color: '#C8962E' }}>ॐ</div>
              <h3 className="text-xl font-serif dark:text-white text-[#1B0A3C] mb-1">
                Download Printable PDF
              </h3>
              <p className="text-sm text-gray-400 hindi-text">प्रिंट करने योग्य PDF</p>
              <p className="text-xs text-gray-500 mt-2">
                Enter your email to receive the complete 108 Names of Shiva as a beautifully formatted PDF.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full border border-gray-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8962E] focus:border-[#C8962E] dark:bg-[#2A1060] dark:text-white bg-white text-[#1B0A3C]"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-lg text-sm font-semibold text-[#1B0A3C] transition-all duration-200 hover:brightness-105"
                style={{ background: 'linear-gradient(135deg, #C8962E, #F5C518)' }}
              >
                Download PDF · PDF डाउनलोड करें
              </button>
            </form>
            <p className="text-center text-[11px] text-gray-500 mt-3">
              We respect your privacy. No spam.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── YouTube Embed / Coming Soon ────────────────────────────────── */
function VideoBlock({ videoId, themeColor }: { videoId: string; themeColor: string }) {
  if (!videoId) {
    return (
      <div
        className="w-full aspect-video rounded-2xl flex flex-col items-center justify-center gap-3 mb-8"
        style={{
          background: hex2rgba(themeColor, 0.08),
          border: `1.5px dashed ${hex2rgba(themeColor, 0.4)}`,
        }}
      >
        <Play size={36} style={{ color: hex2rgba(themeColor, 0.5) }} />
        <p className="text-sm font-medium" style={{ color: hex2rgba(themeColor, 0.8) }}>
          Video Coming Soon · वीडियो जल्द आएगा
        </p>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video rounded-2xl overflow-hidden mb-8 shadow-lg">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title="Theme video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
        loading="lazy"
      />
    </div>
  );
}

/* ─── Single Name Card ───────────────────────────────────────────── */
function NameCard({
  name,
  themeColor,
  locale,
  isDark,
}: {
  name: ShivaName;
  themeColor: string;
  locale: string;
  isDark: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const isHi = locale === 'hi';
  const toggle = useCallback(() => setExpanded((v) => !v), []);

  /* ── Dynamic backgrounds based on dark mode ── */
  const cardBg       = isDark ? (expanded ? hex2rgba(themeColor, 0.12) : '#1C0A42') : (expanded ? hex2rgba(themeColor, 0.04) : '#fff');
  const modernCtxBg  = isDark ? '#2A1060' : '#FFF8E7';
  const practiceBg   = isDark ? '#1A0840' : '#f8f9ff';
  const practiceBdr  = isDark ? 'rgba(200,150,46,0.15)' : '#e8e8f0';
  const journalBg    = isDark ? '#2A1060' : '#FFF8E7';
  const mantraBg     = isDark ? hex2rgba(themeColor, 0.15) : hex2rgba(themeColor, 0.06);

  return (
    <div
      data-name-card
      className="rounded-xl overflow-hidden transition-all duration-300 mb-3"
      style={{
        border: `1.5px solid ${expanded ? themeColor : hex2rgba(themeColor, 0.25)}`,
        background: cardBg,
        boxShadow: expanded ? `0 4px 20px ${hex2rgba(themeColor, 0.2)}` : '0 1px 4px rgba(0,0,0,0.1)',
      }}
    >
      {/* ── Collapsed row ── */}
      <button
        className="w-full flex items-center gap-4 p-4 text-left"
        onClick={toggle}
        aria-expanded={expanded}
      >
        {/* Number circle */}
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
          style={{ background: themeColor, boxShadow: `0 2px 8px ${hex2rgba(themeColor, 0.4)}` }}
        >
          {name.number}
        </div>

        {/* Name info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span
              className="hindi-text font-semibold dark:text-white text-[#1B0A3C]"
              style={{ fontSize: 20 }}
            >
              {name.sanskrit}
            </span>
            <span className="text-sm italic dark:text-[#9E88CC] text-gray-500">{name.transliteration}</span>
          </div>
          <p className="text-xs mt-0.5" style={{ color: '#C8962E' }}>
            {name.mantra}
          </p>
        </div>

        {/* Significance */}
        <div className="hidden sm:block flex-shrink-0 max-w-xs">
          <p className="text-xs font-medium line-clamp-1 text-right" style={{ color: isDark ? '#9E88CC' : '#C8962E' }}>{name.significance}</p>
        </div>
        <div className="flex-shrink-0 ml-2" style={{ color: themeColor }}>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {/* ── Expanded content ── */}
      {expanded && (
        <div data-expanded-content className="px-4 pb-6 pt-2 border-t" style={{ borderColor: hex2rgba(themeColor, 0.2) }}>

          {/* Mantra block — spinning border */}
          <SpinBorder themeColor={themeColor} className="mb-6">
            <div className="text-center py-4 rounded-xl" style={{ background: mantraBg }}>
              <p className="hindi-text text-3xl font-semibold mb-1" style={{ color: isDark ? '#FFFFFF' : '#0D0520' }}>{name.mantra}</p>
              <p className="text-sm italic" style={{ color: isDark ? '#EDE0FF' : '#2A1040' }}>{name.mantra_iast}</p>
            </div>
          </SpinBorder>

          {/* Etymology */}
          <div className="mb-5">
            <h4 className="text-xs uppercase tracking-widest font-semibold mb-1" style={{ color: isDark ? '#9E88CC' : '#C8962E' }}>
              Etymology · व्युत्पत्ति
            </h4>
            <p className="text-sm leading-relaxed" style={{ color: isDark ? '#BCA8E8' : '#F3E4FF' }}>{name.etymology}</p>
          </div>

          {/* Two-column: Meaning + Modern Context */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: isDark ? '#9E88CC' : '#C8962E' }}>
                {isHi ? 'अर्थ' : 'Meaning'}
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: isDark ? '#BCA8E8' : '#F3E4FF' }}>
                {isHi ? name.meaning_hi : name.meaning_en}
              </p>

              <h4 className="text-xs uppercase tracking-widest font-semibold mt-4 mb-2" style={{ color: isDark ? '#9E88CC' : '#C8962E' }}>
                {isHi ? 'कथा' : 'Story'} · <span className="text-[10px] font-normal normal-case italic" style={{ color: isDark ? '#9E88CC' : '#E0CFFF' }}>From tradition</span>
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: isDark ? '#BCA8E8' : '#F3E4FF' }}>
                {isHi ? name.story_hi : name.story_en}
              </p>
            </div>

            {/* Modern Context */}
            <div
              data-modern-ctx
              className="rounded-xl p-4"
              style={{
                background: modernCtxBg,
                borderLeft: `3px solid ${themeColor}`,
              }}
            >
              <h4 className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: isDark ? '#C8962E' : '#1B0A3C' }}>
                {isHi ? 'आज के समय में' : 'Modern Context'}
                {' '}· <span className="text-[10px] font-normal normal-case italic" style={{ color: isDark ? hex2rgba('#C8962E', 0.8) : '#493582' }}>For your life right now</span>
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: isDark ? '#E0CFFF' : '#1B0A3C', fontWeight: 500 }}>
                {isHi ? name.modern_context_hi : name.modern_context_en}
              </p>
            </div>
          </div>

          {/* Practice: Meditation + Mantra Practice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <SpinBorder themeColor={themeColor}>
              <div data-practice className="rounded-xl p-4" style={{ background: practiceBg, border: `1px solid ${practiceBdr}` }}>
                <h4 className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: isDark ? '#C8962E' : '#1B0A3C' }}>
                  Meditation · ध्यान
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: isDark ? '#BCA8E8' : '#1B0A3C', fontWeight: 500 }}>{name.meditation}</p>
              </div>
            </SpinBorder>
            <SpinBorder themeColor={themeColor}>
              <div data-practice className="rounded-xl p-4" style={{ background: practiceBg, border: `1px solid ${practiceBdr}` }}>
                <h4 className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: isDark ? '#C8962E' : '#1B0A3C' }}>
                  Mantra Practice · मंत्र जप
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: isDark ? '#BCA8E8' : '#1B0A3C', fontWeight: 500 }}>{name.mantra_practice}</p>
              </div>
            </SpinBorder>
          </div>

          {/* Journal Prompt */}
          <div
            data-journal
            className="rounded-xl px-5 py-4 mb-5 italic"
            style={{ background: journalBg, borderLeft: `3px solid ${themeColor}` }}
          >
            <p className="text-xs uppercase tracking-widest font-semibold mb-1 not-italic" style={{ color: isDark ? '#C8962E' : '#1B0A3C' }}>
              Journal Prompt · चिंतन
            </p>
            <p className="text-sm" style={{ color: isDark ? '#E0CFFF' : '#1B0A3C', fontWeight: 500 }}>
              &ldquo;{isHi ? name.journal_prompt_hi : name.journal_prompt_en}&rdquo;
            </p>
          </div>

          {/* Verse */}
          <div className="text-center py-4">
            <pre
              className="font-serif text-sm leading-loose whitespace-pre-wrap inline-block text-left"
              style={{ fontFamily: 'Georgia, serif', color: isDark ? '#E0CFFF' : '#F3E4FF' }}
            >
              {isHi ? name.verse_hi : name.verse_en}
            </pre>
          </div>

          {/* Collapse button */}
          <div className="text-center mt-2">
            <button
              onClick={toggle}
              className="text-xs font-semibold px-4 py-1.5 rounded-full border transition-all duration-200 hover:opacity-80"
              style={{ borderColor: themeColor, color: themeColor }}
            >
              Collapse ↑
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── OM Divider ─────────────────────────────────────────────────── */
function OmDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-8 dark:bg-[#0D0520] bg-white">
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(200,150,46,0.4))' }} />
      <span className="text-2xl" style={{ color: '#C8962E', fontFamily: 'serif' }}>ॐ</span>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(200,150,46,0.4))' }} />
    </div>
  );
}

/* ─── Theme Section ──────────────────────────────────────────────── */
function ThemeSection({
  theme,
  themeNames,
  locale,
  isDark,
}: {
  theme: Theme;
  themeNames: ShivaName[];
  locale: string;
  isDark: boolean;
}) {
  const isHi = locale === 'hi';

  const sectionBg = isDark
    ? `linear-gradient(135deg, ${hex2rgba(theme.color, 0.18)} 0%, #0D0520 100%)`
    : `linear-gradient(135deg, ${hex2rgba(theme.color, 0.07)} 0%, ${hex2rgba(theme.color, 0.03)} 100%)`;

  return (
    <section
      id={`theme-section-${theme.theme_number}`}
      data-theme-section
      className="py-12 px-4 sm:px-6 transition-all duration-500"
      style={{
        background: sectionBg,
        borderLeft: `4px solid ${theme.color}`,
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Theme Header */}
        <div className="mb-6">
          <div
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-sm"
            style={{ background: isDark ? hex2rgba(theme.color, 0.25) : hex2rgba(theme.color, 0.15), color: '#FFFFFF' }}
          >
            Theme {theme.theme_number} of 9
          </div>
          <h2
            className="text-3xl md:text-4xl font-serif mb-2"
            style={{ fontFamily: 'Georgia, serif', color: '#FFFFFF' }}
          >
            {theme.theme_en}
            <span className="mx-3" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.5)' }}>·</span>
            <span className="hindi-text" style={{ color: '#C8962E' }}>
              {theme.theme_hi}
            </span>
          </h2>
          <p className="text-sm italic mb-4" style={{ color: '#C8962E', fontWeight: 500 }}>{theme.mood}</p>
          <p className="text-base leading-relaxed max-w-3xl" style={{ color: isDark ? '#BCA8E8' : '#F3E4FF' }}>
            {isHi ? theme.theme_description_hi : theme.theme_description_en}
          </p>
        </div>

        {/* YouTube or placeholder */}
        <VideoBlock videoId={theme.youtube_video_id} themeColor={theme.color} />

        {/* Name Cards */}
        <div>
          <p className="text-xs uppercase tracking-widest font-semibold dark:text-[#9E88CC] text-gray-400 mb-4">
            Names {theme.name_range} · {theme.name_count} Names
          </p>
          {themeNames.map((name) => (
            <NameCard
              key={name.number}
              name={name}
              themeColor={theme.color}
              locale={locale}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Main Page Component ────────────────────────────────────────── */
export default function NamesOfShiva() {
  const [showPdfModal, setShowPdfModal] = useState(false);
  const locale = 'en';
  const isDark = useDarkMode();
  const themes = namesData.themes as Theme[];

  const heroBg = isDark
    ? 'linear-gradient(135deg, #1B0A3C 0%, #0D0520 50%, #1B0A3C 100%)'
    : 'linear-gradient(135deg, #FFF8E7 0%, #FFEFD5 50%, #FFF8E7 100%)';

  const pillBg    = isDark ? 'rgba(44,14,90,0.9)'    : '#fff';
  const pillBdr   = isDark ? 'rgba(200,150,46,0.2)'  : '#f0f0f0';
  const benefitBg = isDark ? 'rgba(44,14,90,0.7)'    : '#fff';
  const benefitBdr= isDark ? 'rgba(200,150,46,0.15)' : '#f0f0f0';

  return (
    <main className="min-h-screen dark:bg-[#0D0520] bg-white">
      <ThemeCardStyles />
      <PrintStyles />
      <SpinStyles />
      {showPdfModal && <PdfModal onClose={() => setShowPdfModal(false)} />}

      {/* ══ HERO SECTION ══ */}
      <section
        className="relative py-16 px-4 sm:px-6 text-center overflow-hidden"
        style={{ background: heroBg }}
      >
        {/* OM watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
          <span
            className="text-[280px] font-serif leading-none"
            style={{ color: isDark ? 'rgba(200,150,46,0.04)' : 'rgba(200,150,46,0.05)', userSelect: 'none' }}
          >
            ॐ
          </span>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex justify-center items-center gap-1 text-xs dark:text-[#9E88CC] text-gray-400 mb-6 flex-wrap" aria-label="Breadcrumb">
            <Link href="/en" className="hover:text-[#C8962E] transition-colors">Home</Link>
            <span>›</span>
            <Link href="/en/mantras" className="hover:text-[#C8962E] transition-colors">Mantras &amp; Stotrams</Link>
            <span>›</span>
            <span className="text-[#C8962E] font-medium">108 Names of Shiva</span>
          </nav>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-serif dark:text-white text-[#1B0A3C] mb-2 leading-tight">
            {namesData.title_en}
          </h1>
          <p className="hindi-text text-2xl mb-6" style={{ color: '#C8962E' }}>
            {namesData.title_hi}
          </p>

          {/* Description */}
          <p className="dark:text-[#BCA8E8] text-gray-600 text-base leading-relaxed mb-8 max-w-2xl mx-auto">
            {namesData.description_en}
          </p>

          {/* Quick Info Pills */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
            {[
              { bold: '108', label: 'Names' },
              { bold: '9', label: 'Themes' },
            ].map(({ bold, label }) => (
              <div key={label} className="flex items-center gap-1.5 rounded-full px-4 py-2 shadow-sm text-sm dark:text-[#BCA8E8] text-gray-600"
                style={{ background: pillBg, border: `1px solid ${pillBdr}` }}>
                <span className="font-semibold dark:text-white text-[#1B0A3C]">{bold}</span> {label}
              </div>
            ))}
            <div className="flex items-center gap-1.5 rounded-full px-4 py-2 shadow-sm text-sm dark:text-[#BCA8E8] text-gray-600"
              style={{ background: pillBg, border: `1px solid ${pillBdr}` }}>
              <Clock size={13} className="text-[#C8962E]" />
              {namesData.estimated_duration}
            </div>
            <div className="flex items-center gap-1.5 rounded-full px-4 py-2 shadow-sm text-sm dark:text-[#BCA8E8] text-gray-600"
              style={{ background: pillBg, border: `1px solid ${pillBdr}` }}>
              <Calendar size={13} className="text-[#C8962E]" />
              <span className="text-xs">{namesData.best_time_to_recite.join(' · ')}</span>
            </div>
          </div>

          {/* PDF Download CTA */}
          <button
            data-print="hide"
            onClick={() => setShowPdfModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-[#1B0A3C] text-sm transition-all duration-200 hover:brightness-105 hover:-translate-y-0.5 shadow-md"
            style={{ background: 'linear-gradient(135deg, #C8962E, #F5C518)' }}
          >
            <Download size={16} />
            Download Printable PDF · प्रिंट करने योग्य PDF
          </button>

          {/* Recitation benefits */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-2xl mx-auto" data-print="hide">
            {namesData.recitation_benefits.slice(0, 3).map((benefit, i) => (
              <div
                key={i}
                className="rounded-xl p-4 shadow-sm"
                style={{ background: benefitBg, border: `1px solid ${benefitBdr}` }}
              >
                <span className="text-[#C8962E] font-serif mr-1">✦</span>
                <span className="text-xs dark:text-[#BCA8E8] text-gray-600">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ YOUTUBE VIDEO ══ */}
      <section
        className="px-4 sm:px-6"
        style={{
          background: isDark
            ? 'linear-gradient(180deg, #0D0520 0%, #0D0520 100%)'
            : 'linear-gradient(180deg, #FFF8E7 0%, #FFF8E7 100%)',
        }}
        data-print="hide"
      >
        <div className="w-full max-w-4xl mx-auto pb-2 pt-10">
          {/* 16:9 responsive iframe wrapper */}
          <div className="relative w-full rounded-xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube-nocookie.com/embed/Cpn3EQedm7E?rel=0&modestbranding=1"
              title="Shiva Ashtottara Shatanamavali — 108 Names of Lord Shiva Chanting"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
          {/* Caption */}
          <div
            className="rounded-b-xl px-5 py-4 border-t"
            style={{
              background: isDark ? 'rgba(27,10,60,0.9)' : '#fff',
              borderColor: isDark ? 'rgba(200,150,46,0.2)' : '#f0e8d0',
            }}
          >
            <p className="text-base font-semibold dark:text-white text-[#1B0A3C]" style={{ fontFamily: 'Georgia, serif' }}>
              Shiva Ashtottara Shatanamavali · <span className="hindi-text" style={{ color: '#C8962E' }}>शिव अष्टोत्तर शतनामावली</span>
            </p>
            <p className="text-sm dark:text-[#9E88CC] text-gray-500 mt-1">
              Listen to all 108 names chanted in traditional Vedic style
            </p>
          </div>
        </div>
      </section>

      {/* ══ NINE THEME CARDS GRID ══ */}
      <ThemeCardGrid themes={themes} isDark={isDark} />


      {/* ══ NINE THEME SECTIONS ══ */}
      {themes.map((theme, idx) => {
        const themeNames = getNamesForTheme(theme);
        return (
          <React.Fragment key={theme.theme_id}>
            <ThemeSection theme={theme} themeNames={themeNames} locale={locale} isDark={isDark} />
            {idx < themes.length - 1 && <OmDivider />}
          </React.Fragment>
        );
      })}

      {/* ══ FOOTER CTA ══ */}
      <section
        className="py-16 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #1B0A3C 0%, #2D1060 100%)' }}
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-[#C8962E] font-serif text-5xl mb-4">ॐ</p>
          <h2 className="text-2xl font-serif text-white mb-3">
            You have journeyed through all 108 names.
          </h2>
          <p className="hindi-text text-lg mb-6" style={{ color: 'rgba(200,150,46,0.85)' }}>
            आपने सभी 108 नाम पूरे किए।
          </p>
          <p className="text-white/70 text-sm mb-8 leading-relaxed">
            From Rudra&rsquo;s fire to the tenderness of Umapati — you have touched every face of the infinite.
            Om Namah Shivaya.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/en/mantras"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-[#1B0A3C] text-sm transition-all duration-200 hover:brightness-105"
              style={{ background: 'linear-gradient(135deg, #C8962E, #F5C518)' }}
            >
              Explore More Mantras
            </Link>
            <button
              onClick={() => setShowPdfModal(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white text-sm border border-white/30 transition-all duration-200 hover:bg-white/10"
            >
              <Download size={15} /> Download PDF
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
