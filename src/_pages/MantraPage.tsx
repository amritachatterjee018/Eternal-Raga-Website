'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ChevronRight, Clock, Calendar, User, BookOpen,
  ChevronDown, ChevronUp, Share2, Heart,
} from 'lucide-react';
import AudioPlayer from '../../components/mantras/AudioPlayer';
import type { MantraItem, MantraVerse } from '../lib/contentLoader';


/* ─── Dark-mode hook ─────────────────────────────────────────────── */
function useDarkMode() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);
  return isDark;
}

/* ─── Toggle pill component ─────────────────────────────────────── */
function TogglePill({
  active, label, onClick,
}: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
        active
          ? 'bg-[#C8962E] text-white shadow-sm'
          : 'bg-gray-100 dark:bg-[#1B0A3C] text-gray-500 dark:text-[#9E88CC] hover:bg-gray-200 dark:hover:bg-[#250F50]'
      }`}
    >
      {label}
    </button>
  );
}

/* ─── Single verse card ──────────────────────────────────────────── */
function VerseCard({
  verse, showSanskrit, showTranslit, showHindi, showEnglish, isDark,
}: {
  verse: MantraVerse;
  showSanskrit: boolean;
  showTranslit: boolean;
  showHindi: boolean;
  showEnglish: boolean;
  isDark: boolean;
}) {
  const [wordOpen, setWordOpen] = useState(false);
  const [modernOpen, setModernOpen] = useState(false);
  const hasWordByWord = verse.word_by_word && Object.keys(verse.word_by_word).length > 0;
  const hasModern = verse.modern_context_en || verse.modern_context_hi;

  const cardBg  = isDark ? '#150A30' : '#FFFFF8';
  const border  = isDark ? '#2D1860' : '#E8DFC8';
  const numCol  = '#C8962E';

  return (
    <div
      className="rounded-2xl border shadow-sm overflow-visible relative"
      style={{ background: cardBg, borderColor: border }}
    >
      {/* Section floating tag — top-right corner */}
      {verse.section && (
        <div
          className="absolute -top-3 right-4 z-10"
        >
          <span
            style={{
              background: isDark
                ? 'linear-gradient(135deg, #2D1B69, #1B0A3C)'
                : 'linear-gradient(135deg, #1B0A3C, #2D1B69)',
              color: '#F5C518',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '4px 10px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(27,10,60,0.35)',
              whiteSpace: 'nowrap',
              display: 'inline-block',
              border: '1px solid rgba(200,150,46,0.25)',
            }}
          >
            {verse.section.replace(/_/g, ' ')}
          </span>
        </div>
      )}

      {/* Verse number bar */}
      <div
        className="flex items-center px-5 py-3 border-b"
        style={{ borderColor: border, background: isDark ? '#1B0A3C' : '#FFF8E7' }}
      >
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: numCol }}>
          Verse {verse.verse_number}
        </span>
      </div>

      <div className="px-5 py-5 space-y-4">
        {/* Sanskrit / Devanagari */}
        {showSanskrit && (
          <div>
            <p className="hindi-text text-xl leading-loose dark:text-white text-[#1B0A3C] whitespace-pre-line">
              {verse.hindi_text}
            </p>
          </div>
        )}

        {/* Transliteration */}
        {showTranslit && (
          <div className="border-t pt-4" style={{ borderColor: border }}>
            <p className="italic text-base dark:text-[#BCA8E8] text-gray-800 leading-relaxed whitespace-pre-line">
              {verse.transliteration}
            </p>
          </div>
        )}

        {/* Hindi meaning */}
        {showHindi && (
          <div className="border-t pt-4" style={{ borderColor: border }}>
            <span className="text-xs font-bold text-[#C8962E] uppercase tracking-widest block mb-1">अर्थ</span>
            <p className="hindi-text text-base dark:text-[#E8DFC8] text-gray-900 leading-relaxed">
              {verse.meaning_hi}
            </p>
          </div>
        )}

        {/* English meaning */}
        {showEnglish && (
          <div className="border-t pt-4" style={{ borderColor: border }}>
            <span className="text-xs font-bold text-[#C8962E] uppercase tracking-widest block mb-1">Meaning</span>
            <p
              className="text-base leading-relaxed"
              style={{ color: isDark ? '#E8DFC8' : '#1a1a1a' }}
            >
              {verse.meaning_en}
            </p>
          </div>
        )}

        {/* Word-by-word accordion */}
        {hasWordByWord && (
          <div className="border-t" style={{ borderColor: border }}>
            <button
              onClick={() => setWordOpen(v => !v)}
              className="flex items-center gap-2 w-full pt-4 text-sm font-semibold text-[#C8962E] hover:opacity-80 transition-opacity"
            >
              {wordOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              Word-by-Word Analysis · पद विश्लेषण
            </button>
            {wordOpen && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(verse.word_by_word!).map(([word, def]) => (
                  <div
                    key={word}
                    className="rounded-lg px-3 py-2"
                    style={{ background: isDark ? '#0D0520' : '#FFF8E7' }}
                  >
                    <span className="text-sm font-semibold italic dark:text-[#C8962E] text-[#1B0A3C]">
                      {word}
                    </span>
                    <span className="text-xs dark:text-[#BCA8E8] text-gray-800 ml-2">— {String(def)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Modern context accordion */}
        {hasModern && (
          <div className="border-t" style={{ borderColor: border }}>
            <button
              onClick={() => setModernOpen(v => !v)}
              className="flex items-center gap-2 w-full pt-4 text-sm font-semibold dark:text-[#9E88CC] text-gray-700 hover:opacity-80 transition-opacity"
            >
              {modernOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              In Modern Life · आधुनिक जीवन में
            </button>
            {modernOpen && (
              <div
                className="mt-3 rounded-xl p-4 space-y-3"
                style={{ background: isDark ? '#0D0520' : '#FFF8E7', border: `1px solid ${border}` }}
              >
                {verse.modern_context_en && (
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: isDark ? '#E8DFC8' : '#1a1a1a' }}
                  >
                    {verse.modern_context_en}
                  </p>
                )}
                {verse.modern_context_hi && (
                  <p className="hindi-text text-sm dark:text-[#BCA8E8] text-gray-800 leading-relaxed">
                    {verse.modern_context_hi}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Quick Info pill ────────────────────────────────────────────── */
function InfoPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm dark:bg-[#1B0A3C] bg-white border dark:border-[#2D1860] border-gray-200 shadow-sm dark:text-[#BCA8E8] text-gray-800">
      {icon}
      <span>{label}</span>
    </div>
  );
}

/* ─── Capitalise deity name for display ─────────────────────────── */
function capitalise(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
}

/* ─── TYPE label map ─────────────────────────────────────────────── */
const TYPE_LABELS: Record<string, string> = {
  ashtakam: 'Ashtakam',
  aarti: 'Aarti',
  chalisa: 'Chalisa',
  stotram: 'Stotram / Stotra',
  suktam: 'Suktam',
  kavach: 'Kavach',
  'jap-mantra': 'Jap Mantra',
  sahasranama: 'Sahasranama',
  '108-names': '108 Names',
};

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════ */
export interface MantraPageProps {
  mantra: MantraItem;
  relatedMantras?: Pick<MantraItem, 'id' | 'title_en' | 'title_hi' | 'type'>[];
  locale?: string;
}

export default function MantraPage({ mantra, relatedMantras = [], locale = 'en' }: MantraPageProps) {
  const isDark = useDarkMode();

  /* Toggle state */
  const [showSanskrit,  setShowSanskrit]  = useState(true);
  const [showTranslit,  setShowTranslit]  = useState(true);
  const [showHindi,     setShowHindi]     = useState(true);
  const [showEnglish,   setShowEnglish]   = useState(true);
  const [benefitsOpen,  setBenefitsOpen]  = useState(false);

  const heroBg  = isDark
    ? 'linear-gradient(135deg, #0D0520 0%, #1B0A3C 100%)'
    : 'linear-gradient(135deg, #FFF8E7 0%, #F5EDD5 100%)';

  const localPrefix = `/${locale}`;

  return (
    <div className="min-h-screen" style={{ background: isDark ? '#0D0520' : '#FFFDF8' }}>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="py-12 px-4 text-center" style={{ background: heroBg }}>
        <div className="max-w-4xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-1 text-xs text-gray-500 dark:text-[#9E88CC] mb-8 flex-wrap">
            <Link href={`${localPrefix}/`} className="hover:text-[#C8962E] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href={`${localPrefix}/mantras`} className="hover:text-[#C8962E] transition-colors">Mantras & Stotrams</Link>
            <ChevronRight size={12} />
            <span className="text-[#C8962E] font-medium">{mantra.title_en}</span>
          </nav>

          {/* Type badge */}
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#C8962E]/10 text-[#C8962E] border border-[#C8962E]/30 mb-4">
            {TYPE_LABELS[mantra.type] ?? mantra.type}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-serif dark:text-white text-[#1B0A3C] mb-2 leading-tight"
            style={{ fontFamily: 'Georgia, serif' }}>
            {mantra.title_en}
          </h1>
          <p className="hindi-text text-xl md:text-2xl text-[#C8962E] mb-6">
            {mantra.title_hi}
          </p>

          {/* Description */}
          {mantra.description_en && (
            <p className="text-sm md:text-base dark:text-[#BCA8E8] text-gray-800 max-w-2xl mx-auto leading-relaxed mb-8">
              {mantra.description_en}
            </p>
          )}

          {/* Quick info pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {mantra.deity && (
              <InfoPill
                icon={<span className="text-[#C8962E]">✦</span>}
                label={`Deity: ${capitalise(mantra.deity)}`}
              />
            )}
            {mantra.total_verses && (
              <InfoPill icon={<BookOpen size={13} className="text-[#C8962E]" />} label={`${mantra.total_verses} Verses`} />
            )}
            {mantra.author && (
              <InfoPill icon={<User size={13} className="text-[#C8962E]" />} label={mantra.author} />
            )}
            {mantra.best_time_to_recite && mantra.best_time_to_recite.length > 0 && (
              <InfoPill icon={<Calendar size={13} className="text-[#C8962E]" />} label={mantra.best_time_to_recite.slice(0, 2).join(' · ')} />
            )}
          </div>
        </div>
      </section>

      {/* ── Main grid ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ── LEFT: Verse Reader ───────────────────────────────── */}
        <div className="lg:col-span-2 space-y-4">

          {/* Sticky toggle bar */}
          <div
            className="sticky top-16 z-30 py-3 px-4 rounded-2xl shadow-sm flex flex-wrap gap-2 mb-2"
            style={{
              background: isDark ? 'rgba(13,5,32,0.95)' : 'rgba(255,253,248,0.95)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${isDark ? '#2D1860' : '#E8DFC8'}`,
            }}
          >
            <TogglePill active={showSanskrit} label="Sanskrit"       onClick={() => setShowSanskrit(v => !v)} />
            <TogglePill active={showTranslit} label="Transliteration" onClick={() => setShowTranslit(v => !v)} />
            <TogglePill active={showHindi}    label="Hindi Meaning"  onClick={() => setShowHindi(v => !v)} />
            <TogglePill active={showEnglish}  label="English Meaning" onClick={() => setShowEnglish(v => !v)} />
          </div>

          {/* Description Hindi */}
          {mantra.description_hi && (
            <p className="hindi-text text-sm dark:text-[#BCA8E8] text-gray-800 italic leading-relaxed px-1">
              {mantra.description_hi}
            </p>
          )}

          {/* Verse cards */}
          <div className="space-y-5">
            {(mantra.verses ?? []).map(verse => (
              <VerseCard
                key={verse.verse_number}
                verse={verse}
                showSanskrit={showSanskrit}
                showTranslit={showTranslit}
                showHindi={showHindi}
                showEnglish={showEnglish}
                isDark={isDark}
              />
            ))}
          </div>
        </div>

        {/* ── RIGHT: Sidebar ───────────────────────────────────── */}
        <div className="space-y-6">
          <div className="sticky top-24 space-y-6">

            {/* ── YouTube Mini-Player ──────────────────────────── */}
            {(() => {
              // Extract video ID from youtube_url if present
              const ytUrl = mantra.youtube_url;
              let videoId: string | null = null;
              if (ytUrl) {
                const m = ytUrl.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
                videoId = m ? m[1] : null;
              }
              const searchQuery = encodeURIComponent(`${mantra.title_en} ${mantra.title_hi}`);
              const ytSearchUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;

              return (
                <div
                  className="rounded-2xl overflow-hidden border"
                  style={{ background: isDark ? '#150A30' : '#fff', borderColor: isDark ? '#2D1860' : '#E8DFC8' }}
                >
                  {videoId ? (
                    /* Embedded player */
                    <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                        title={`${mantra.title_en} - YouTube`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                        style={{ border: 'none' }}
                      />
                    </div>
                  ) : (
                    /* Placeholder with YouTube search link */
                    <a
                      href={ytSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-3 py-8 group"
                      style={{ background: 'linear-gradient(135deg, #1B0A3C, #2D1B69)' }}
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{ background: 'rgba(255,0,0,0.85)' }}
                      >
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M5 3l14 9-14 9V3z"/></svg>
                      </div>
                      <div className="text-center">
                        <p className="text-white text-sm font-semibold">{mantra.title_en}</p>
                        <p className="text-white/60 text-xs mt-0.5">Watch on YouTube</p>
                      </div>
                    </a>
                  )}
                  <div className="px-4 py-3 flex items-center justify-between" style={{ borderTop: `1px solid ${isDark ? '#2D1860' : '#E8DFC8'}` }}>
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#C8962E' }}>Now Playing</span>
                    <a
                      href={ytSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 dark:text-gray-400 hover:text-[#C8962E] transition-colors"
                    >
                      More on YouTube →
                    </a>
                  </div>
                </div>
              );
            })()}

            {/* ── Audio Player ─────────────────────────────────── */}
            <AudioPlayer
              src={mantra.audio_url ?? ''}
              title={mantra.title_en}
              author={mantra.author}
              isDark={isDark}
            />

            {/* Share / Save */}
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-semibold dark:border-[#2D1860] border-gray-200 dark:text-[#BCA8E8] text-gray-600 hover:border-[#C8962E] hover:text-[#C8962E] transition-all">
                <Heart size={16} /> Save
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-semibold dark:border-[#2D1860] border-gray-200 dark:text-[#BCA8E8] text-gray-600 hover:border-[#C8962E] hover:text-[#C8962E] transition-all">
                <Share2 size={16} /> Share
              </button>
            </div>

            {/* Deity card */}
            {mantra.deity && (
              <div
                className="rounded-2xl overflow-hidden border"
                style={{ background: isDark ? '#150A30' : '#fff', borderColor: isDark ? '#2D1860' : '#E8DFC8' }}
              >
                <div
                  className="h-24 flex items-center justify-center text-5xl"
                  style={{ background: 'linear-gradient(135deg, #1B0A3C, #4B1680)' }}
                >
                  🕉️
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-serif dark:text-white text-[#1B0A3C] mb-1">
                    {capitalise(mantra.deity)}
                  </h3>
                  <Link
                    href={`${localPrefix}/deities/${mantra.deity}`}
                    className="text-sm text-[#C8962E] hover:opacity-80 flex items-center gap-1 transition-opacity"
                  >
                    Explore {capitalise(mantra.deity)} <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            )}

            {/* Recitation benefits */}
            {mantra.recitation_benefits && mantra.recitation_benefits.length > 0 && (
              <div
                className="rounded-2xl border p-5"
                style={{ background: isDark ? '#150A30' : '#fff', borderColor: isDark ? '#2D1860' : '#E8DFC8' }}
              >
                <button
                  onClick={() => setBenefitsOpen(v => !v)}
                  className="flex items-center justify-between w-full"
                >
                  <h3 className="text-base font-serif dark:text-white text-[#1B0A3C]">
                    Recitation Benefits
                  </h3>
                  {benefitsOpen ? <ChevronUp size={16} className="text-[#C8962E]" /> : <ChevronDown size={16} className="text-[#C8962E]" />}
                </button>
                {benefitsOpen && (
                  <ul className="mt-4 space-y-2">
                    {mantra.recitation_benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-base dark:text-[#BCA8E8] text-gray-800">
                        <span className="text-[#C8962E] mt-0.5">✦</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Best time to recite */}
            {mantra.best_time_to_recite && mantra.best_time_to_recite.length > 0 && (
              <div
                className="rounded-2xl border p-5"
                style={{ background: isDark ? '#150A30' : '#fff', borderColor: isDark ? '#2D1860' : '#E8DFC8' }}
              >
                <h3 className="text-base font-serif dark:text-white text-[#1B0A3C] mb-3 flex items-center gap-2">
                  <Clock size={15} className="text-[#C8962E]" /> Best Time to Recite
                </h3>
                <div className="flex flex-wrap gap-2">
                  {mantra.best_time_to_recite.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ background: isDark ? '#1B0A3C' : '#FFF8E7', color: '#C8962E', border: '1px solid #C8962E40' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related mantras */}
            {relatedMantras.length > 0 && (
              <div
                className="rounded-2xl border p-5"
                style={{ background: isDark ? '#150A30' : '#fff', borderColor: isDark ? '#2D1860' : '#E8DFC8' }}
              >
                <h3 className="text-base font-serif dark:text-white text-[#1B0A3C] mb-4">Related</h3>
                <div className="space-y-3">
                  {relatedMantras.slice(0, 6).map(m => (
                    <Link
                      key={m.id}
                      href={`${localPrefix}/mantras/${m.id}`}
                      className="flex items-start gap-2 group"
                    >
                      <span className="text-[#C8962E] mt-0.5">›</span>
                      <div>
                        <p className="text-base font-medium dark:text-white text-[#1B0A3C] group-hover:text-[#C8962E] transition-colors leading-tight">
                          {m.title_en}
                        </p>
                        <p className="hindi-text text-sm dark:text-[#9E88CC] text-gray-700">{m.title_hi}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to listing */}
            <Link
              href={`${localPrefix}/mantras`}
              className="flex items-center gap-2 text-sm text-[#C8962E] hover:opacity-80 transition-opacity font-medium"
            >
              ← All Mantras & Stotrams
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
