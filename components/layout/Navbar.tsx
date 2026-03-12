'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, X, User, Sun, Moon, ChevronDown } from 'lucide-react';

/* ── SVG Tab Icons ─────────────────────────────────────────────────── */
const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </svg>
);
const MusicIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
  </svg>
);
const BookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
const TempleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <polygon points="6.6,11 17.4,11 16.5,8 7.5,8"/>
    <polygon points="20,11 20,13 4,13 4,11 2,11 2,22 10,22 10,17 14,17 14,22 22,22 22,11"/>
    <polygon points="15.9,6 15,3 15,1 13,1 13,3 10.97,3 10.97,1 8.97,1 8.97,3.12 8.1,6"/>
  </svg>
);
const MeditateIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="12" cy="6" r="2"/>
    <path d="M21,16v-2c-2.24,0-4.16-0.96-5.6-2.68l-1.34-1.6C13.68,9.26,13.12,9,12.53,9h-1.05c-0.59,0-1.15,0.26-1.53,0.72l-1.34,1.6C7.16,13.04,5.24,14,3,14v2c2.77,0,5.19-1.17,7-3.25V15l-3.88,1.55C5.45,16.82,5,17.48,5,18.21C5,19.2,5.8,20,6.79,20H9v-0.5c0-1.38,1.12-2.5,2.5-2.5h3c0.28,0,0.5,0.22,0.5,0.5S14.78,18,14.5,18h-3c-0.83,0-1.5,0.67-1.5,1.5V20h7.21C18.2,20,19,19.2,19,18.21c0-0.73-0.45-1.39-1.12-1.66L14,15v-2.25C15.81,14.83,18.23,16,21,16z"/>
  </svg>
);
const GyanIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.3,16.9c0.4-0.7,0.7-1.5,0.7-2.4c0-2.5-2-4.5-4.5-4.5S11,12,11,14.5s2,4.5,4.5,4.5c0.9,0,1.7-0.3,2.4-0.7l3.2,3.2l1.4-1.4L19.3,16.9z M15.5,17c-1.4,0-2.5-1.1-2.5-2.5s1.1-2.5,2.5-2.5s2.5,1.1,2.5,2.5S16.9,17,15.5,17z M12,20v2C6.48,22,2,17.52,2,12C2,6.48,6.48,2,12,2c4.84,0,8.87,3.44,9.8,8h-2.07c-0.64-2.46-2.4-4.47-4.73-5.41V5c0,1.1-0.9,2-2,2h-2v2c0,0.55-0.45,1-1,1H8v2h2v3H9l-4.79-4.79C4.08,10.79,4,11.38,4,12C4,16.41,7.59,20,12,20z"/>
  </svg>
);
const ShopIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

const NAV_ITEMS = [
  { name: 'Home',              path: '/en/',           Icon: HomeIcon },
  { name: 'Mantras & Stotrams', path: '/en/mantras',  Icon: MusicIcon },
  { name: 'Scriptures',        path: '/en/scriptures', Icon: BookIcon },
  { name: 'Temples',           path: '/en/temples',    Icon: TempleIcon },
  { name: 'Meditate & Yoga',   path: '/en/yoga',       Icon: MeditateIcon },
  { name: 'Eternal Gyan',      path: '/en/eternal-gyan', Icon: GyanIcon },
  { name: 'Shop',              path: '/en/shop',        Icon: ShopIcon },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const pillContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const liveRef = useRef<HTMLDivElement>(null);

  // Initialise dark mode from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('er-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = saved ? saved === 'dark' : prefersDark;
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('er-theme', next ? 'dark' : 'light');
      return next;
    });
  };

  // Close mobile menu on route change
  useEffect(() => { setIsMobileOpen(false); }, [pathname]);

  // Scroll to top on route change
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  // Scroll reveal IntersectionObserver
  useEffect(() => {
    const SELECTOR = [
      '.scroll-reveal', '.scroll-scale', '.scroll-from-right',
      '.scroll-heading', '.scroll-fade', '.scroll-footer-layer', '.scroll-verse',
    ].join(',');
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll<HTMLElement>(SELECTOR);
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 }
      );
      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 50);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Active nav index
  const activeIndex = NAV_ITEMS.findIndex(item =>
    item.path === '/en/'
      ? pathname === '/en' || pathname === '/en/'
      : (pathname ?? '').startsWith(item.path)
  );

  // Sliding indicator position
  const updateIndicator = useCallback(() => {
    const container = pillContainerRef.current;
    if (!container) return;
    const idx = activeIndex >= 0 ? activeIndex : 0;
    const btn = tabRefs.current[idx];
    if (!btn) return;
    const cRect = container.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();
    setIndicatorStyle({
      left: bRect.left - cRect.left + container.scrollLeft,
      width: bRect.width,
      opacity: 1,
    });
  }, [activeIndex]);

  useEffect(() => {
    const t = setTimeout(updateIndicator, 30);
    return () => clearTimeout(t);
  }, [updateIndicator, pathname]);

  useEffect(() => {
    const container = pillContainerRef.current;
    if (!container) return;
    let debounce: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      clearTimeout(debounce);
      debounce = setTimeout(updateIndicator, 60);
    });
    ro.observe(container);
    return () => { ro.disconnect(); clearTimeout(debounce); };
  }, [updateIndicator]);

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let next = idx;
    if (e.key === 'ArrowRight') next = (idx + 1) % NAV_ITEMS.length;
    else if (e.key === 'ArrowLeft') next = (idx - 1 + NAV_ITEMS.length) % NAV_ITEMS.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = NAV_ITEMS.length - 1;
    else return;
    e.preventDefault();
    tabRefs.current[next]?.focus();
    router.push(NAV_ITEMS[next].path);
    if (liveRef.current) {
      liveRef.current.textContent = '';
      requestAnimationFrame(() => {
        if (liveRef.current) liveRef.current.textContent = `${NAV_ITEMS[next].name} selected`;
      });
    }
  };

  return (
    <>
      {/* Screen-reader live region */}
      <div ref={liveRef} role="status" aria-live="polite"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }} />

      <header
        className="sticky top-0 z-50 text-white"
        style={{
          background: 'rgba(27,10,60,0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
        aria-label="Site header"
      >
        {/* ══ ROW 1: Brand Bar ══ */}
        <div
          className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
          style={{ height: 52 }}
        >
          {/* Logo */}
          <Link href="/en/" className="flex items-center gap-2 flex-shrink-0 group">
            <span
              className="text-[#C8962E] text-2xl leading-none select-none"
              style={{ textShadow: '0 0 12px rgba(200,150,46,0.5)' }}
            >
              ॐ
            </span>
            <span className="font-serif text-[#C8962E] text-lg font-bold tracking-wider whitespace-nowrap group-hover:text-yellow-400 transition-colors">
              Eternal Raga
            </span>
          </Link>

          {/* Desktop right controls */}
          <div className="hidden lg:flex items-center gap-5 flex-shrink-0">
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn text-white/60 hover:text-[#C8962E] transition-colors"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={isDark}
            >
              {isDark ? <Sun size={19} strokeWidth={1.8} /> : <Moon size={19} strokeWidth={1.8} />}
            </button>

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="w-8 h-8 rounded-full bg-[#C8962E] text-[#1B0A3C] flex items-center justify-center hover:bg-yellow-400 transition-colors"
                >
                  <User size={17} />
                </button>
                {isUserDropdownOpen && (
                  <div className="absolute top-10 right-0 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Favorites</Link>
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Reading Progress</Link>
                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Order History</Link>
                    <button onClick={() => { setIsLoggedIn(false); setIsUserDropdownOpen(false); }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100">
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {/* sign in modal handled per-page if needed */}}
                className="text-sm font-medium text-white/70 hover:text-[#C8962E] transition-colors"
              >
                Sign In
              </button>
            )}

            <button
              onClick={() => router.push('/en/shop')}
              className="text-white/60 hover:text-[#C8962E] transition-colors"
              aria-label="Shop"
            >
              <ShopIcon />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-white/70 hover:text-[#C8962E] transition-colors"
            onClick={() => setIsMobileOpen(prev => !prev)}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ══ ROW 2: Pill Tab Strip (Desktop) ══ */}
        <div
          className="hidden lg:flex items-center"
          style={{ paddingBottom: 10, paddingTop: 2, paddingLeft: 16, paddingRight: 16 }}
        >
          <div
            ref={pillContainerRef}
            role="tablist"
            aria-label="Site sections"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              padding: '5px 6px',
              borderRadius: 18,
              background: 'rgba(0,0,0,0.55)',
              boxShadow:
                'inset 0 2px 8px rgba(0,0,0,0.7), inset 0 1px 3px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.04)',
              border: '1px solid rgba(200,150,46,0.5)',
              width: '100%',
              overflow: 'hidden',
            }}
          >
            {/* Sliding gold pill indicator */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 5,
                bottom: 5,
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                opacity: indicatorStyle.opacity,
                borderRadius: 13,
                background: 'linear-gradient(135deg, #C8962E 0%, #F5C518 50%, #C8962E 100%)',
                boxShadow: '0 0 18px rgba(200,150,46,0.45), 0 2px 6px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)',
                transition: 'left 300ms cubic-bezier(0.4,0,0.2,1), width 300ms cubic-bezier(0.4,0,0.2,1), opacity 200ms ease',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={item.path}
                  ref={el => { tabRefs.current[idx] = el; }}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => router.push(item.path)}
                  onKeyDown={e => handleKeyDown(e, idx)}
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    padding: '9px 18px',
                    borderRadius: 13,
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 15.5,
                    fontWeight: isActive ? 600 : 450,
                    whiteSpace: 'nowrap',
                    color: isActive ? '#1B0A3C' : 'rgba(255,255,255,0.55)',
                    transition: 'color 200ms ease',
                    fontFamily: 'inherit',
                    letterSpacing: '0.01em',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.9)';
                  }}
                  onMouseLeave={e => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.55)';
                  }}
                >
                  <item.Icon />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Thin separator */}
        <div className="hidden lg:block" style={{ height: 1, background: 'rgba(200,150,46,0.12)' }} />

        {/* ══ Mobile Menu ══ */}
        {isMobileOpen && (
          <div
            className="lg:hidden border-t border-white/10"
            style={{ background: 'rgba(20,6,48,0.99)' }}
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {NAV_ITEMS.map(item => {
                const isActive = item.path === '/en/'
                  ? pathname === '/en' || pathname === '/en/'
                  : (pathname ?? '').startsWith(item.path);
                return (
                  <button
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-left w-full transition-colors"
                    style={{
                      background: isActive ? 'rgba(200,150,46,0.12)' : 'transparent',
                      color: isActive ? '#F5C518' : 'rgba(255,255,255,0.7)',
                      fontSize: 15,
                      fontWeight: isActive ? 600 : 400,
                      borderLeft: isActive ? '3px solid #C8962E' : '3px solid transparent',
                    }}
                  >
                    <item.Icon />
                    {item.name}
                  </button>
                );
              })}
              <div className="flex items-center gap-4 mt-2 pt-3 border-t border-white/10 px-4">
                <button onClick={toggleTheme} className="theme-toggle-btn text-white/60 hover:text-[#C8962E] transition-colors"
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
                  {isDark ? <Sun size={18} strokeWidth={1.8} /> : <Moon size={18} strokeWidth={1.8} />}
                </button>
                <button onClick={() => setIsLoggedIn(false)}
                  className="text-sm text-white/70 hover:text-[#C8962E] transition-colors">
                  {isLoggedIn ? 'Sign Out' : 'Sign In'}
                </button>
                <button onClick={() => router.push('/en/shop')} className="text-white/60 hover:text-[#C8962E] transition-colors ml-auto" aria-label="Shop">
                  <ShopIcon />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
