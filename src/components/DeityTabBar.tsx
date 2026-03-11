import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

/* ─── Deity Data ────────────────────────────────────────────────────── */
const DEITIES = [
  {
    id: 'shiva',    name: 'Shiva',    hindi: 'शिव',
    epithet: 'The Great God',    epithetHindi: 'महादेव',
    description: 'Lord Shiva, the destroyer and transformer, embodies the supreme consciousness that pervades the universe — fierce, compassionate, and eternal.',
    stats: ['24 Mantras', '12 Temples', '108 Names'],
    image: 'https://picsum.photos/seed/shiva-port/400/520',
    color: '#87CEEB', // Ice Blue — Kailash snow, Ganga
    darkText: false,
  },
  {
    id: 'krishna',  name: 'Krishna',  hindi: 'कृष्ण',
    epithet: 'The Divine Lover',  epithetHindi: 'माधव',
    description: 'Lord Krishna, beloved for his divine teachings in the Bhagavad Gita and enchanting flute melodies, embodies divine love and wisdom.',
    stats: ['18 Mantras', '8 Temples', '108 Names'],
    image: 'https://picsum.photos/seed/krishna-port/400/520',
    color: '#4169E1', // Royal Blue — peacock feather, Shyam
    darkText: false,
  },
  {
    id: 'ganesh',   name: 'Ganesh',   hindi: 'गणेश',
    epithet: 'Remover of Obstacles', epithetHindi: 'विघ्नहर्ता',
    description: 'Lord Ganesha, the elephant-headed son of Shiva and Parvati, is the Lord of new beginnings — worshipped at every auspicious start.',
    stats: ['12 Mantras', '8 Ashtavinayak', '108 Names'],
    image: 'https://picsum.photos/seed/ganesh-port/400/520',
    color: '#FF6347', // Vermillion Red — sindoor
    darkText: false,
  },
  {
    id: 'durga',    name: 'Durga',    hindi: 'दुर्गा',
    epithet: 'The Invincible',    epithetHindi: 'भवानी',
    description: 'Goddess Durga, the warrior goddess, triumphs over evil and symbolises the power of the divine feminine — protective and invincible.',
    stats: ['9 Mantras', '51 Shakti Peethas', '108 Names'],
    image: 'https://picsum.photos/seed/durga-port/400/520',
    color: '#DC143C', // Crimson — red saree, shakti
    darkText: false,
  },
  {
    id: 'ram',      name: 'Ram',      hindi: 'राम',
    epithet: 'The Ideal Man',     epithetHindi: 'मर्यादा पुरुषोत्तम',
    description: 'Lord Ram, the seventh avatar of Vishnu, is the embodiment of virtue, righteousness, and truth — a model of dharmic living.',
    stats: ['10 Mantras', '4 Temples', '108 Names'],
    image: 'https://picsum.photos/seed/ram-port/400/520',
    color: '#FFD700', // Saffron Gold — dharmic robes
    darkText: true,
  },
  {
    id: 'lakshmi',  name: 'Lakshmi',  hindi: 'लक्ष्मी',
    epithet: 'Goddess of Prosperity', epithetHindi: 'धन की देवी',
    description: 'Goddess Lakshmi is the divine embodiment of wealth, fortune, beauty, and grace — bestowing material abundance and spiritual wisdom.',
    stats: ['8 Mantras', '8 Forms', '108 Names'],
    image: 'https://picsum.photos/seed/lakshmi-port/400/520',
    color: '#FF69B4', // Rose Pink — pink lotus
    darkText: false,
  },
  {
    id: 'hanuman',  name: 'Hanuman',  hindi: 'हनुमान',
    epithet: 'The Mighty Devotee',epithetHindi: 'बजरंगबली',
    description: 'Lord Hanuman, the ardent devotee of Ram, is the epitome of strength, devotion, and selfless service — worshipped for courage.',
    stats: ['8 Mantras', '5 Temples', '108 Names'],
    image: 'https://picsum.photos/seed/hanuman-port/400/520',
    color: '#FF8C00', // Deep Orange — sindoor body, saffron
    darkText: false,
  },
  {
    id: 'saraswati',name: 'Saraswati',hindi: 'सरस्वती',
    epithet: 'Goddess of Knowledge',epithetHindi: 'विद्या की देवी',
    description: 'Goddess Saraswati presides over learning, arts, music, and wisdom — invoked by students and seekers to illuminate the mind.',
    stats: ['6 Mantras', '3 Temples', '108 Names'],
    image: 'https://picsum.photos/seed/saraswati-port/400/520',
    color: '#F0F0F0', // Pearl White — white saree, swan
    darkText: true,
  },
  {
    id: 'vishnu',   name: 'Vishnu',   hindi: 'विष्णु',
    epithet: 'The Preserver',     epithetHindi: 'जगत पालक',
    description: 'Lord Vishnu is the preserver of the universe. Through his ten avatars he descends whenever dharma declines and righteousness needs restoring.',
    stats: ['12 Mantras', '108 Divya Desams', '108 Names'],
    image: 'https://picsum.photos/seed/vishnu-port/400/520',
    color: '#1E90FF', // Ocean Blue — Ksheer Sagar
    darkText: false,
  },
  {
    id: 'kali',     name: 'Kali',     hindi: 'काली',
    epithet: 'The Fierce Mother',  epithetHindi: 'महाकाली',
    description: 'Goddess Kali, the most intense form of Shakti, is the destroyer of ego and liberator of the soul — fierce in appearance, boundless in compassion.',
    stats: ['6 Mantras', 'Shakti Peethas', '108 Names'],
    image: 'https://picsum.photos/seed/kali-port/400/520',
    color: '#4B0082', // Deep Indigo — cosmic void
    darkText: false,
  },
  {
    id: 'kartikeya',name: 'Kartikeya',hindi: 'कार्तिकेय',
    epithet: 'God of War',         epithetHindi: 'मुरुगन',
    description: 'Lord Kartikeya, son of Shiva and Parvati, is the commander of the divine army and the embodiment of spiritual wisdom and valour.',
    stats: ['5 Mantras', '6 Paadal Petra', '108 Names'],
    image: 'https://picsum.photos/seed/kartikeya-port/400/520',
    color: '#009688', // Peacock Teal — peacock vahana
    darkText: false,
  },
];

const CARD_H = 400;  // card height in px
const INACTIVE_W = 110; // collapsed card width

/* ─── Component ─────────────────────────────────────────────────────── */
export default function DeityTabBar() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [canScrollLeft, setCanScrollLeft]   = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const rowRef   = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number | null>(null);
  const mouseX   = useRef<number>(0.5); // 0–1 relative position

  /* ── Arrow visibility ──────────────────────────────────────── */
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

  /* ── Mouse-movement auto-scroll ────────────────────────────── */
  const startAutoScroll = useCallback(() => {
    const tick = () => {
      const el = rowRef.current;
      if (!el) return;
      const pos = mouseX.current;       // 0–1
      const edgeZone = 0.18;            // 18% from each side triggers scroll
      const maxSpeed = 7;               // px per frame at extreme edge

      if (pos < edgeZone) {
        const t = 1 - pos / edgeZone;   // 0→1 as cursor approaches left edge
        el.scrollLeft -= t * maxSpeed;
        updateArrows();
      } else if (pos > 1 - edgeZone) {
        const t = (pos - (1 - edgeZone)) / edgeZone;
        el.scrollLeft += t * maxSpeed;
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

  /* ── Scroll by arrow click ──────────────────────────────────── */
  const scrollRow = (dir: 'left' | 'right') => {
    const el = rowRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' });
  };

  /* ── Tab select + scroll into view ─────────────────────────── */
  const handleSelect = (idx: number) => {
    setActiveIdx(idx);
    const el = rowRef.current;
    if (!el) return;
    const card = el.children[idx] as HTMLElement;
    if (!card) return;
    const cardLeft  = card.offsetLeft;
    const cardRight = cardLeft + card.offsetWidth;
    if (cardLeft < el.scrollLeft + 60) {
      el.scrollBy({ left: cardLeft - el.scrollLeft - 60, behavior: 'smooth' });
    } else if (cardRight > el.scrollLeft + el.clientWidth - 60) {
      el.scrollBy({ left: cardRight - (el.scrollLeft + el.clientWidth) + 60, behavior: 'smooth' });
    }
  };

  const deity = DEITIES[activeIdx];

  return (
    <section id="deities" className="py-14 bg-[var(--color-brand-bg)] dark:bg-[#110728]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section heading ─────────────────────────────────── */}
        <div className="flex justify-between items-end mb-8">
          <div className="scroll-heading">
            <h2 className="text-3xl font-serif text-[var(--color-brand-purple)] dark:text-[#E0CFFF]">
              Explore by Deity{' '}
              <span className="hindi-text text-2xl ml-2 text-[var(--color-brand-gold-dark)]">देवता</span>
            </h2>
          </div>
          <Link
            to="/deities/shiva"
            className="text-[var(--color-brand-purple)] dark:text-[#C8962E] font-medium
                       hover:text-[var(--color-brand-gold-dark)] flex items-center gap-1 text-sm"
          >
            View All <ArrowRight size={15} />
          </Link>
        </div>

        {/* ── Card gallery row ────────────────────────────────── */}
        <div
          className="relative flex items-stretch"
          onMouseMove={handleMouseMove}
          onMouseEnter={startAutoScroll}
          onMouseLeave={stopAutoScroll}
        >
          {/* Left arrow */}
          <button
            onClick={() => scrollRow('left')}
            aria-label="Scroll left"
            className={`
              hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2
              z-20 w-10 h-10 rounded-full items-center justify-center flex-shrink-0
              bg-[#1B0A3C] text-[#C8962E] border border-[#C8962E]/40
              hover:bg-[#C8962E] hover:text-white shadow-lg
              transition-all duration-200
              ${canScrollLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
            `}
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>

          {/* Scrollable card strip */}
          <div
            ref={rowRef}
            className="flex gap-2 overflow-x-auto w-full deity-tab-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {DEITIES.map((d, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={d.id}
                  onClick={() => handleSelect(idx)}
                  aria-pressed={isActive}
                  aria-label={`${d.name} · ${d.hindi}`}
                  className={`
                    relative flex-none overflow-hidden rounded-2xl
                    cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8962E]
                    transition-all duration-500 ease-in-out
                  `}
                  style={{
                    width: isActive ? 340 : INACTIVE_W,
                    minWidth: isActive ? 260 : INACTIVE_W,
                    height: CARD_H,
                  }}
                >
                  {/* Full colour image — no grayscale */}
                  <img
                    src={d.image}
                    alt={d.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className={`
                      absolute inset-0 w-full h-full object-cover
                      transition-transform duration-500 ease-in-out
                      ${isActive ? 'scale-105' : 'scale-100 hover:scale-[1.03]'}
                    `}
                  />

                  {/* Deity colour gradient — always visible at bottom, stronger on active */}
                  <div
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      background: isActive
                        ? `linear-gradient(to top, ${d.color}CC 0%, ${d.color}44 40%, transparent 75%)`
                        : `linear-gradient(to top, ${d.color}99 0%, ${d.color}22 50%, transparent 80%)`,
                    }}
                  />

                  {/* Dark overlay for readability on top of color gradient */}
                  <div
                    className={`
                      absolute inset-0 transition-all duration-500
                      ${isActive
                        ? 'bg-gradient-to-t from-black/55 via-transparent to-black/10'
                        : 'bg-gradient-to-t from-black/30 via-transparent to-black/5'
                      }
                    `}
                  />

                  {/* Deity-coloured ring on active */}
                  {isActive && (
                    <div
                      className="absolute inset-0 rounded-2xl ring-[2.5px] ring-inset pointer-events-none"
                      style={{ boxShadow: `inset 0 0 0 2.5px ${d.color}` }}
                    />
                  )}

                  {/* ── COLLAPSED: vertical name label ──────── */}
                  <div
                    className={`
                      absolute inset-0 flex flex-col items-center justify-center gap-2
                      transition-all duration-300
                      ${isActive ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}
                    `}
                  >
                    {/* Deity-coloured badge */}
                    <div
                      className="rounded-xl px-2.5 py-1.5 flex flex-col items-center gap-0.5 backdrop-blur-sm"
                      style={{ backgroundColor: `${d.color}CC` }}
                    >
                      <span
                        className={`text-[11px] font-bold tracking-wide whitespace-nowrap ${d.darkText ? 'text-gray-900' : 'text-white'}`}
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      >
                        {d.name}
                      </span>
                      <span
                        className={`text-[10px] font-serif mt-0.5 whitespace-nowrap ${d.darkText ? 'text-gray-700' : 'text-white/80'}`}
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      >
                        {d.hindi}
                      </span>
                    </div>
                  </div>

                  {/* ── EXPANDED: content overlay slides up ─── */}
                  <div
                    className={`
                      absolute bottom-0 left-0 right-0 p-6
                      transition-all duration-500 ease-out
                      ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
                    `}
                  >
                    {/* Gold bar */}
                    <div className="w-9 h-[2px] bg-[#C8962E] mb-3 rounded-full" />

                    {/* Name */}
                    <h3 className="text-white font-serif text-[1.75rem] leading-tight mb-1">
                      {d.name}&nbsp;
                      <span className="text-[#F5C518] font-serif text-xl">· {d.hindi}</span>
                    </h3>

                    {/* Epithet */}
                    <p className="text-[#C8962E] text-sm font-semibold mb-3">
                      {d.epithet} <span className="text-[#F5C518]/70 font-serif">· {d.epithetHindi}</span>
                    </p>

                    {/* Description */}
                    <p className="text-white/75 text-xs leading-relaxed mb-4 line-clamp-3 max-w-[280px]">
                      {d.description}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-3 mb-5">
                      {d.stats.map((stat) => (
                        <span key={stat} className="flex items-center gap-1.5 text-white/80 text-xs font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C8962E] flex-shrink-0" />
                          {stat}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link
                      to={`/deities/${d.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="cta-button inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
                    >
                      Explore Full Page <ArrowRight size={14} />
                    </Link>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scrollRow('right')}
            aria-label="Scroll right"
            className={`
              hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2
              z-20 w-10 h-10 rounded-full items-center justify-center flex-shrink-0
              bg-[#1B0A3C] text-[#C8962E] border border-[#C8962E]/40
              hover:bg-[#C8962E] hover:text-white shadow-lg
              transition-all duration-200
              ${canScrollRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
            `}
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div>

      </div>
    </section>
  );
}
