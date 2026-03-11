import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

/* ─── Deity Data ────────────────────────────────────────────────────── */
const DEITIES = [
  {
    id: 'shiva',     name: 'Shiva',     hindi: 'शिव',
    epithet: 'The Great God',       epithetHindi: 'महादेव',
    description: 'Lord Shiva, the destroyer and transformer, embodies the supreme consciousness that pervades the universe — fierce, compassionate, and eternal.',
    stats: ['24 Mantras', '12 Temples', '108 Names'],
    image: 'https://picsum.photos/seed/shiva-port/400/520',
    color: '#87CEEB', darkText: false,
  },
  {
    id: 'krishna',   name: 'Krishna',   hindi: 'कृष्ण',
    epithet: 'The Divine Lover',    epithetHindi: 'माधव',
    description: 'Lord Krishna, beloved for his divine teachings in the Bhagavad Gita and enchanting flute melodies, embodies divine love and wisdom.',
    stats: ['18 Mantras', '8 Temples', '108 Names'],
    image: 'https://picsum.photos/seed/krishna-port/400/520',
    color: '#4169E1', darkText: false,
  },
  {
    id: 'ganesh',    name: 'Ganesh',    hindi: 'गणेश',
    epithet: 'Remover of Obstacles', epithetHindi: 'विघ्नहर्ता',
    description: 'Lord Ganesha, the elephant-headed son of Shiva and Parvati, is worshipped at the start of every auspicious endeavour.',
    stats: ['12 Mantras', '8 Ashtavinayak', '108 Names'],
    image: 'https://picsum.photos/seed/ganesh-port/400/520',
    color: '#FF6347', darkText: false,
  },
  {
    id: 'durga',     name: 'Durga',     hindi: 'दुर्गा',
    epithet: 'The Invincible',      epithetHindi: 'भवानी',
    description: 'Goddess Durga, the warrior goddess, triumphs over evil and symbolises the power of the divine feminine — protective and invincible.',
    stats: ['9 Mantras', '51 Shakti Peethas', '108 Names'],
    image: 'https://picsum.photos/seed/durga-port/400/520',
    color: '#DC143C', darkText: false,
  },
  {
    id: 'ram',       name: 'Ram',       hindi: 'राम',
    epithet: 'The Ideal Man',       epithetHindi: 'मर्यादा पुरुषोत्तम',
    description: 'Lord Ram, the seventh avatar of Vishnu, is the embodiment of virtue, righteousness, and truth — a model of dharmic living.',
    stats: ['10 Mantras', '4 Temples', '108 Names'],
    image: 'https://picsum.photos/seed/ram-port/400/520',
    color: '#FFD700', darkText: true,
  },
  {
    id: 'lakshmi',   name: 'Lakshmi',   hindi: 'लक्ष्मी',
    epithet: 'Goddess of Prosperity', epithetHindi: 'धन की देवी',
    description: 'Goddess Lakshmi is the divine embodiment of wealth, fortune, beauty, and grace — bestowing material abundance and spiritual wisdom.',
    stats: ['8 Mantras', '8 Forms', '108 Names'],
    image: 'https://picsum.photos/seed/lakshmi-port/400/520',
    color: '#FF69B4', darkText: false,
  },
  {
    id: 'hanuman',   name: 'Hanuman',   hindi: 'हनुमान',
    epithet: 'The Mighty Devotee',  epithetHindi: 'बजरंगबली',
    description: 'Lord Hanuman, the ardent devotee of Ram, is the epitome of strength, devotion, and selfless service — worshipped for courage.',
    stats: ['8 Mantras', '5 Temples', '108 Names'],
    image: 'https://picsum.photos/seed/hanuman-port/400/520',
    color: '#FF8C00', darkText: false,
  },
  {
    id: 'saraswati', name: 'Saraswati', hindi: 'सरस्वती',
    epithet: 'Goddess of Knowledge', epithetHindi: 'विद्या की देवी',
    description: 'Goddess Saraswati presides over learning, arts, music, and wisdom — invoked by students and seekers to illuminate the mind.',
    stats: ['6 Mantras', '3 Temples', '108 Names'],
    image: 'https://picsum.photos/seed/saraswati-port/400/520',
    color: '#AAAAAA', darkText: true, // Pearl White → mid-gray for visibility on cream
  },
  {
    id: 'vishnu',    name: 'Vishnu',    hindi: 'विष्णु',
    epithet: 'The Preserver',       epithetHindi: 'जगत पालक',
    description: 'Lord Vishnu is the preserver of the universe. Through his ten avatars he descends whenever dharma declines and righteousness needs restoring.',
    stats: ['12 Mantras', '108 Divya Desams', '108 Names'],
    image: 'https://picsum.photos/seed/vishnu-port/400/520',
    color: '#1E90FF', darkText: false,
  },
  {
    id: 'kali',      name: 'Kali',      hindi: 'काली',
    epithet: 'The Fierce Mother',   epithetHindi: 'महाकाली',
    description: 'Goddess Kali, the most intense form of Shakti, is the destroyer of ego and liberator of the soul — fierce and boundlessly compassionate.',
    stats: ['6 Mantras', 'Shakti Peethas', '108 Names'],
    image: 'https://picsum.photos/seed/kali-port/400/520',
    color: '#4B0082', darkText: false,
  },
  {
    id: 'kartikeya', name: 'Kartikeya', hindi: 'कार्तिकेय',
    epithet: 'God of War',          epithetHindi: 'मुरुगन',
    description: 'Lord Kartikeya, son of Shiva and Parvati, is the commander of the divine army and the embodiment of spiritual wisdom and valour.',
    stats: ['5 Mantras', '6 Paadal Petra', '108 Names'],
    image: 'https://picsum.photos/seed/kartikeya-port/400/520',
    color: '#009688', darkText: false,
  },
];

/* Card dimensions */
const CARD_H    = 400;  // px — height of all cards
const INACTIVE_W = 130; // px — collapsed card width (≈5-6 visible beside active)
const ACTIVE_W   = 350; // px — expanded card width

export default function DeityTabBar() {
  const [activeIdx, setActiveIdx]         = useState(0);
  const [hoveredIdx, setHoveredIdx]       = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft]   = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const rowRef  = useRef<HTMLDivElement>(null);
  const rafRef  = useRef<number | null>(null);
  const mouseX  = useRef<number>(0.5);

  /* ── Dark mode detection (reactive) ─────────────────────── */
  const [isDark, setIsDark] = useState<boolean>(
    () => document.documentElement.classList.contains('dark')
  );
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains('dark'))
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  /* ── Arrow visibility ───────────────────────────────────── */
  const updateArrows = useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [updateArrows]);

  /* ── Mouse-movement auto-scroll ─────────────────────────── */
  const startAutoScroll = useCallback(() => {
    const tick = () => {
      const el = rowRef.current;
      if (!el) return;
      const pos = mouseX.current;
      const zone = 0.15;
      const maxSpeed = 6;
      if (pos < zone) {
        el.scrollLeft -= ((zone - pos) / zone) * maxSpeed;
        updateArrows();
      } else if (pos > 1 - zone) {
        el.scrollLeft += ((pos - (1 - zone)) / zone) * maxSpeed;
        updateArrows();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [updateArrows]);

  const stopAutoScroll = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.current = (e.clientX - rect.left) / rect.width;
  }, []);

  /* ── Arrow scroll click ──────────────────────────────────── */
  const scrollRow = (dir: 'left' | 'right') => {
    rowRef.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  /* ── Tab select + scroll into view ──────────────────────── */
  const handleSelect = (idx: number) => {
    setActiveIdx(idx);
    const el = rowRef.current;
    if (!el) return;
    const card = el.children[idx] as HTMLElement;
    if (!card) return;
    const cardLeft  = card.offsetLeft;
    const cardRight = cardLeft + card.offsetWidth;
    if (cardLeft < el.scrollLeft + 50) {
      el.scrollBy({ left: cardLeft - el.scrollLeft - 50, behavior: 'smooth' });
    } else if (cardRight > el.scrollLeft + el.clientWidth - 50) {
      el.scrollBy({ left: cardRight - (el.scrollLeft + el.clientWidth) + 50, behavior: 'smooth' });
    }
  };

  /* ── Arrow button shared classes ────────────────────────── */
  const arrowBtn = (canScroll: boolean) =>
    `hidden md:flex flex-shrink-0 w-10 h-10 rounded-full border-2 border-[#C8962E]
     text-[#C8962E] bg-[#FFF8E7] dark:bg-[#110728]
     items-center justify-center
     hover:bg-[#C8962E] hover:text-white
     transition-all duration-200 ease-out z-10
     ${canScroll ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`;

  return (
    <section
      id="deities"
      className="py-14"
      style={{ backgroundColor: 'var(--deity-section-bg, #FFF8E7)' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section heading ──────────────────────────────── */}
        <div className="flex justify-between items-end mb-8">
          <h2 className="scroll-heading text-3xl font-serif text-[#1B0A3C] dark:text-[#E0CFFF]">
            Explore by Deity{' '}
            <span className="text-2xl ml-2 font-serif text-[#C8962E]">· देवता</span>
          </h2>
          <Link
            to="/deities/shiva"
            className="text-[#C8962E] font-semibold hover:text-[#A37826] flex items-center gap-1 text-sm transition-colors"
          >
            View All <ArrowRight size={15} />
          </Link>
        </div>

        {/* ── Gallery row ──────────────────────────────────── */}
        <div
          className="relative flex items-center gap-3"
          onMouseMove={handleMouseMove}
          onMouseEnter={startAutoScroll}
          onMouseLeave={stopAutoScroll}
        >
          {/* Left arrow */}
          <button onClick={() => scrollRow('left')} aria-label="Scroll left" className={arrowBtn(canScrollLeft)}>
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>

          {/* Scrollable strip */}
          <div
            ref={rowRef}
            className="flex flex-1 gap-3 overflow-x-auto deity-tab-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {DEITIES.map((d, idx) => {
              const isActive   = idx === activeIdx;
              // Hover takes full priority: only the hovered card expands.
              // When nothing is hovered, fall back to the selected (active) card.
              const isExpanded = hoveredIdx !== null ? hoveredIdx === idx : isActive;

              return (
                <button
                  key={d.id}
                  onClick={() => handleSelect(idx)}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  aria-pressed={isActive}
                  aria-label={`${d.name} · ${d.hindi}`}
                  className={`
                    flex-none overflow-hidden rounded-2xl cursor-pointer
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8962E]
                    transition-all duration-500 ease-in-out
                    bg-white dark:bg-[#1C0A42]
                  `}
                  style={{
                    width:    isExpanded ? ACTIVE_W : INACTIVE_W,
                    minWidth: isExpanded ? ACTIVE_W : INACTIVE_W,
                    height:   CARD_H,
                    boxShadow: isActive
                      ? `0 0 0 2px #C8962E, 0 6px 28px ${d.color}55`
                      : isExpanded
                        ? `0 0 0 1.5px ${d.color}99, 0 4px 20px ${d.color}33`
                        : '0 2px 8px rgba(0,0,0,0.08)',
                  }}
                >
                  {/* ── Image area ─────────────────────────── */}
                  <div
                    className="w-full overflow-hidden relative"
                    style={{ height: isExpanded ? '55%' : '70%' }}
                  >
                    <img
                      src={d.image}
                      alt={d.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500"
                      style={{ transform: isExpanded ? 'scale(1.06)' : 'scale(1)' }}
                    />
                  </div>

                  {/* ── INACTIVE: white footer card ─────────── */}
                  {!isExpanded && (
                    <div
                      className="w-full flex flex-col items-center justify-center px-3"
                      style={{
                        height: '30%',
                        borderTop: `3px solid ${d.color}`,
                        backgroundColor: isDark ? '#2A1060' : '#ffffff',
                      }}
                    >
                      <p
                        className="text-[14px] font-semibold leading-tight text-center"
                        style={{ color: isDark ? '#ffffff' : '#1B0A3C' }}
                      >
                        {d.name}
                      </p>
                      <p
                        className="text-[12px] font-serif leading-tight text-center mt-1"
                        style={{ color: isDark ? 'rgba(255,255,255,0.75)' : d.color }}
                      >
                        {d.hindi}
                      </p>
                    </div>
                  )}

                  {/* ── EXPANDED: structured content area ─────── */}
                  {isExpanded && (
                    <div
                      className="w-full flex flex-col bg-white dark:bg-[#1C0A42] px-5 pt-4 pb-5"
                      style={{
                        height: '45%',
                        borderTop: `2px solid #C8962E`,
                      }}
                    >
                      {/* Name bilingual */}
                      <h3 className="font-serif text-[22px] leading-tight text-[#1B0A3C] dark:text-[#E0CFFF] mb-1 text-left">
                        {d.name}{' '}
                        <span className="text-[#C8962E]">· {d.hindi}</span>
                      </h3>

                      {/* Epithet */}
                      <p className="text-[13px] font-semibold text-[#C8962E] mb-2 text-left leading-tight">
                        {d.epithet}{' '}
                        <span className="font-serif text-[#A37826] font-normal">· {d.epithetHindi}</span>
                      </p>

                      {/* Description */}
                      <p className="text-[12px] text-gray-600 dark:text-[#BCA8E8] leading-snug line-clamp-2 text-left mb-auto">
                        {d.description}
                      </p>

                      {/* Stats */}
                      <p className="text-[11px] font-semibold text-[#1B0A3C] dark:text-[#D4BFFF] mt-2 mb-3 text-left tracking-wide">
                        {d.stats.join(' · ')}
                      </p>

                      {/* CTA */}
                      <Link
                        to={`/deities/${d.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="cta-button self-start inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-bold"
                      >
                        Explore Full Page <ArrowRight size={12} />
                      </Link>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right arrow */}
          <button onClick={() => scrollRow('right')} aria-label="Scroll right" className={arrowBtn(canScrollRight)}>
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div>

      </div>
    </section>
  );
}
