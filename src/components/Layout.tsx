import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Facebook, Instagram, Youtube, Music2, Apple, User, ChevronDown, Sun, Moon } from 'lucide-react';

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
  { name: 'Home',              path: '/',            Icon: HomeIcon },
  { name: 'Mantras & Stotrams', path: '/mantras',   Icon: MusicIcon },
  { name: 'Scriptures',        path: '/scriptures',  Icon: BookIcon },
  { name: 'Temples',           path: '/temples',     Icon: TempleIcon },
  { name: 'Meditate & Yoga',   path: '/meditate',    Icon: MeditateIcon },
  { name: 'Eternal Gyan',      path: '/eternal-gyan', Icon: GyanIcon },
  { name: 'Shop',              path: '/shop',         Icon: ShopIcon },
];

/* ── SlidingPillNav Component ─────────────────────────────────────── */
interface SlidingPillNavProps {
  items: typeof NAV_ITEMS;
  isDark: boolean;
  toggleTheme: () => void;
  isLoggedIn: boolean;
  onSignInClick: () => void;
  onSignOut: () => void;
  isUserDropdownOpen: boolean;
  setIsUserDropdownOpen: (v: boolean) => void;
}

function SlidingPillNav({
  items, isDark, toggleTheme, isLoggedIn,
  onSignInClick, onSignOut, isUserDropdownOpen, setIsUserDropdownOpen,
}: SlidingPillNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const pillContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const liveRef = useRef<HTMLDivElement>(null);

  /* Active index based on current route — uses all items */
  const activeIndex = items.findIndex(item =>
    item.path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(item.path)
  );

  /* Reposition indicator */
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
  }, [updateIndicator, location.pathname]);

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
    if (e.key === 'ArrowRight') next = (idx + 1) % items.length;
    else if (e.key === 'ArrowLeft') next = (idx - 1 + items.length) % items.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    else return;
    e.preventDefault();
    tabRefs.current[next]?.focus();
    navigate(items[next].path);
    if (liveRef.current) {
      liveRef.current.textContent = '';
      requestAnimationFrame(() => {
        if (liveRef.current) liveRef.current.textContent = `${items[next].name} selected`;
      });
    }
  };

  useEffect(() => { setIsMobileOpen(false); }, [location.pathname]);

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
        {/* ══════════════════ ROW 1: Brand Bar ══════════════════ */}
        <div
          className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
          style={{ height: 52 }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
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
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn text-white/60 hover:text-[#C8962E] transition-colors"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={isDark}
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark ? <Sun size={19} strokeWidth={1.8} /> : <Moon size={19} strokeWidth={1.8} />}
            </button>

            {/* Sign In / avatar */}
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
                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Favorites</Link>
                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Reading Progress</Link>
                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Order History</Link>
                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Email Preferences</Link>
                    <button onClick={onSignOut} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100">
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onSignInClick}
                className="text-sm font-medium text-white/70 hover:text-[#C8962E] transition-colors"
              >
                Sign In
              </button>
            )}

            {/* Shop icon */}
            <button
              onClick={() => navigate('/shop')}
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

        {/* ══════════════════ ROW 2: Pill Tab Strip (Desktop) ══════════════════ */}
        <div
          className="hidden lg:flex items-center"
          style={{
            paddingBottom: 10,
            paddingTop: 2,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          {/* Outer dip track — deep inset shadow gives the 'dip' effect, gold border wraps everything */}
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

            {items.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={item.path}
                  ref={el => { tabRefs.current[idx] = el; }}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => navigate(item.path)}
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

        {/* Thin separator line */}
        <div className="hidden lg:block" style={{ height: 1, background: 'rgba(200,150,46,0.12)' }} />

        {/* ══════════════════ Mobile Menu ══════════════════ */}
        {isMobileOpen && (
          <div
            className="lg:hidden border-t border-white/10"
            style={{ background: 'rgba(20,6,48,0.99)' }}
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {items.map(item => {
                const isActive = item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path);
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
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
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={isDark}>
                  {isDark ? <Sun size={18} strokeWidth={1.8} /> : <Moon size={18} strokeWidth={1.8} />}
                </button>
                <button onClick={isLoggedIn ? onSignOut : onSignInClick}
                  className="text-sm text-white/70 hover:text-[#C8962E] transition-colors">
                  {isLoggedIn ? 'Sign Out' : 'Sign In'}
                </button>
                <button onClick={() => navigate('/shop')} className="text-white/60 hover:text-[#C8962E] transition-colors ml-auto" aria-label="Shop">
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


export default function Layout() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [openFooterSection, setOpenFooterSection] = useState<string | null>(null);
  const [isDark, setIsDark] = useState<boolean>(() => {
    // Initialise from localStorage, then system preference
    const saved = localStorage.getItem('er-theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const location = useLocation();

  // ── Dark Mode: apply / remove .dark on <html> ─────────────────────
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('er-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // ── Scroll Reveal: IntersectionObserver ──────────────────────────
  // Adds `.is-visible` to any element with a scroll-* class when it
  // enters the viewport. Fires once per element then stops observing.
  useEffect(() => {
    const SELECTOR = [
      '.scroll-reveal',
      '.scroll-scale',
      '.scroll-from-right',
      '.scroll-heading',
      '.scroll-fade',
      '.scroll-footer-layer',
      '.scroll-verse',
    ].join(',');

    // Small delay so newly rendered page elements are in the DOM
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll<HTMLElement>(SELECTOR);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target); // animate once only
            }
          });
        },
        { threshold: 0.08 }  // fire when 8% of element is visible
      );

      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setIsSignInModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ─────────────────────── NEW SLIDING-PILL NAV ─────────────────────── */}
      <SlidingPillNav
        items={NAV_ITEMS}
        isDark={isDark}
        toggleTheme={toggleTheme}
        isLoggedIn={isLoggedIn}
        onSignInClick={() => setIsSignInModalOpen(true)}
        onSignOut={() => { setIsLoggedIn(false); setIsUserDropdownOpen(false); }}
        isUserDropdownOpen={isUserDropdownOpen}
        setIsUserDropdownOpen={setIsUserDropdownOpen}
      />

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative flex flex-col mt-auto">
        {/* Layer 1: Newsletter Bar */}
        <div className="scroll-footer-layer w-full bg-gradient-to-b from-[var(--color-brand-bg)] to-[#1B0A3C] py-[60px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-brand-gold)] mb-2">Get Daily Mantras in Your Inbox</h2>
            <p className="text-xl font-serif text-[var(--color-brand-gold-dark)] mb-4">दैनिक मंत्र प्राप्त करें</p>
            <p className="text-[#FFFDF0] mb-8">Join 2,000+ devotees. Weekly mantras, festival guides, and spiritual wisdom.</p>
            
            <div className="flex flex-col sm:flex-row w-full max-w-lg gap-3 mb-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-md bg-[#120828] border border-[var(--color-brand-gold)] text-[#FFFDF0] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-gold)] focus:border-transparent transition-all"
              />
              <button className="cta-button px-8 py-3 rounded-md whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-white/50">We respect your inbox. Unsubscribe anytime.</p>
          </div>
        </div>

        {/* Layer 2: Main Footer Content */}
        <div className="scroll-footer-layer w-full bg-[#1B0A3C] pt-[80px] pb-[80px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1200px] mx-auto">

            {/* ── DESKTOP & TABLET GRID (sm+) ── */}
            <div className="hidden sm:grid grid-cols-3 lg:grid-cols-12 gap-10 lg:gap-8">

              {/* Column 1: Brand — full first row on tablet (col-span-3), 4 cols on desktop */}
              <div className="col-span-3 lg:col-span-4 flex flex-col items-start">
                <img
                  src="/images/eternal-raga-logo.png"
                  alt="Eternal Raga - शाश्वत राग - Hindu devotional content platform logo"
                  className="w-[140px] h-[140px] rounded-full mb-5"
                />
                <p className="text-[24px] font-serif text-[var(--color-brand-gold)] mb-1 leading-tight font-bold">Eternal Raga</p>
                <p className="text-[18px] font-serif text-[var(--color-brand-gold)] mb-5">शाश्वत राग</p>
                <p className="text-[#FFFDF0] text-sm leading-relaxed mb-3">
                  Your digital sanctuary for Hindu devotional content. Mantras, scriptures, meditation, and spiritual wisdom for modern souls.
                </p>
                <p className="text-xs text-[#FFFDF0] mb-8">
                  A <a href="#" className="text-[var(--color-brand-gold)] underline hover:text-yellow-400 transition-colors">Creative Chronix</a> Product
                </p>
                {/* Social Icons — prominent */}
                <p className="text-xs font-bold tracking-widest uppercase text-[#C8962E] mb-3">
                  Follow Us · हमें फॉलो करें
                </p>
                <div className="flex flex-row gap-4">
                  {[
                    { icon: <Youtube size={24} />, label: 'YouTube' },
                    { icon: <Instagram size={24} />, label: 'Instagram' },
                    { icon: <Facebook size={24} />, label: 'Facebook' },
                    { icon: <Music2 size={24} />, label: 'Spotify' },
                    { icon: <Apple size={24} />, label: 'Apple Music' },
                  ].map(({ icon, label }) => (
                    <a key={label} href="#" aria-label={label} className="footer-social-icon">
                      {icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Column 2: Quick Links */}
              <div className="lg:col-span-2">
                <h4 className="text-[12px] uppercase tracking-wider font-bold text-[var(--color-brand-gold)] mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  <li><Link to="/mantras" className="text-[#FFFDF0] text-sm footer-link">Popular Mantras</Link></li>
                  <li><Link to="/scriptures" className="text-[#FFFDF0] text-sm footer-link">Bhagavad Gita</Link></li>
                  <li><Link to="/#deities" className="text-[#FFFDF0] text-sm footer-link">Browse by Deity</Link></li>
                  <li><Link to="/mantras" className="text-[#FFFDF0] text-sm footer-link">108 Names Collections</Link></li>
                  <li><Link to="#" className="text-[#FFFDF0] text-sm footer-link">Download App</Link></li>
                </ul>
              </div>

              {/* Column 3: Explore */}
              <div className="lg:col-span-2">
                <h4 className="text-[12px] uppercase tracking-wider font-bold text-[var(--color-brand-gold)] mb-6">Explore</h4>
                <ul className="space-y-3">
                  <li><Link to="/scriptures" className="text-[#FFFDF0] text-sm footer-link">Scriptures</Link></li>
                  <li><Link to="/temples" className="text-[#FFFDF0] text-sm footer-link">Temples</Link></li>
                  <li><Link to="/meditate" className="text-[#FFFDF0] text-sm footer-link">Meditate &amp; Yoga</Link></li>
                  <li><Link to="/eternal-gyan" className="text-[#FFFDF0] text-sm footer-link">Eternal Gyan</Link></li>
                  <li><Link to="/shop" className="text-[#FFFDF0] text-sm footer-link">Shop</Link></li>
                </ul>
              </div>

              {/* Column 4: Listen & Follow */}
              <div className="lg:col-span-2">
                <h4 className="text-[12px] uppercase tracking-wider font-bold text-[var(--color-brand-gold)] mb-6">Listen &amp; Follow</h4>
                <ul className="space-y-3">
                  <li>
                    <Link to="/listen" className="text-[#FFFDF0] text-sm footer-link">
                      Listen &amp; Podcast Page →
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 5: Support */}
              <div className="lg:col-span-2">
                <h4 className="text-[12px] uppercase tracking-wider font-bold text-[var(--color-brand-gold)] mb-6">Support</h4>
                <ul className="space-y-3">
                  <li><Link to="#" className="text-[#FFFDF0] text-sm footer-link">About Us</Link></li>
                  <li><Link to="#" className="text-[#FFFDF0] text-sm footer-link">Contact</Link></li>
                  <li><Link to="/feedback" className="text-[#FFFDF0] text-sm footer-link">Request Content</Link></li>
                  <li><Link to="#" className="text-[#FFFDF0] text-sm footer-link">Privacy Policy</Link></li>
                  <li><Link to="#" className="text-[#FFFDF0] text-sm footer-link">Terms of Service</Link></li>
                  <li><Link to="#" className="text-[#FFFDF0] text-sm footer-link">Sitemap</Link></li>
                </ul>
              </div>
            </div>

            {/* ── MOBILE: Single Column + Accordion ── */}
            <div className="sm:hidden flex flex-col">
              {/* Brand + Social always visible */}
              <div className="flex flex-col items-center text-center pb-8 border-b border-white/10">
                <img
                  src="/images/eternal-raga-logo.png"
                  alt="Eternal Raga - शाश्वत राग - Hindu devotional content platform logo"
                  className="w-[140px] h-[140px] rounded-full mb-5"
                />
                <p className="text-[24px] font-serif text-[var(--color-brand-gold)] mb-1 leading-tight font-bold">Eternal Raga</p>
                <p className="text-[18px] font-serif text-[var(--color-brand-gold)] mb-5">शाश्वत राग</p>
                <p className="text-[#FFFDF0] text-sm leading-relaxed mb-3">
                  Your digital sanctuary for Hindu devotional content. Mantras, scriptures, meditation, and spiritual wisdom for modern souls.
                </p>
                <p className="text-xs text-[#FFFDF0] mb-8">
                  A <a href="#" className="text-[var(--color-brand-gold)] underline hover:text-yellow-400 transition-colors">Creative Chronix</a> Product
                </p>
                <p className="text-xs font-bold tracking-widest uppercase text-[#C8962E] mb-3">
                  Follow Us · हमें फॉलो करें
                </p>
                <div className="flex flex-row gap-4 justify-center flex-wrap">
                  {[
                    { icon: <Youtube size={24} />, label: 'YouTube' },
                    { icon: <Instagram size={24} />, label: 'Instagram' },
                    { icon: <Facebook size={24} />, label: 'Facebook' },
                    { icon: <Music2 size={24} />, label: 'Spotify' },
                    { icon: <Apple size={24} />, label: 'Apple Music' },
                  ].map(({ icon, label }) => (
                    <a key={label} href="#" aria-label={label} className="footer-social-icon">
                      {icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Accordion sections */}
              {([
                { id: 'quick-links', title: 'Quick Links', items: [
                  <li key="m"><Link to="/mantras" className="text-[#FFFDF0] text-sm footer-link">Popular Mantras</Link></li>,
                  <li key="s"><Link to="/scriptures" className="text-[#FFFDF0] text-sm footer-link">Bhagavad Gita</Link></li>,
                  <li key="d"><Link to="/#deities" className="text-[#FFFDF0] text-sm footer-link">Browse by Deity</Link></li>,
                  <li key="n"><Link to="/mantras" className="text-[#FFFDF0] text-sm footer-link">108 Names Collections</Link></li>,
                  <li key="a"><Link to="#" className="text-[#FFFDF0] text-sm footer-link">Download App</Link></li>,
                ]},
                { id: 'explore', title: 'Explore', items: [
                  <li key="sc"><Link to="/scriptures" className="text-[#FFFDF0] text-sm footer-link">Scriptures</Link></li>,
                  <li key="te"><Link to="/temples" className="text-[#FFFDF0] text-sm footer-link">Temples</Link></li>,
                  <li key="me"><Link to="/meditate" className="text-[#FFFDF0] text-sm footer-link">Meditate &amp; Yoga</Link></li>,
                  <li key="eg"><Link to="/eternal-gyan" className="text-[#FFFDF0] text-sm footer-link">Eternal Gyan</Link></li>,
                  <li key="sh"><Link to="/shop" className="text-[#FFFDF0] text-sm footer-link">Shop</Link></li>,
                ]},
                { id: 'listen', title: 'Listen & Follow', items: [
                  <li key="l"><Link to="/listen" className="text-[#FFFDF0] text-sm footer-link">Listen &amp; Podcast Page →</Link></li>,
                ]},
                { id: 'support', title: 'Support', items: [
                  <li key="ab"><Link to="#" className="text-[#FFFDF0] text-sm footer-link">About Us</Link></li>,
                  <li key="co"><Link to="#" className="text-[#FFFDF0] text-sm footer-link">Contact</Link></li>,
                  <li key="rc"><Link to="/feedback" className="text-[#FFFDF0] text-sm footer-link">Request Content</Link></li>,
                  <li key="pp"><Link to="#" className="text-[#FFFDF0] text-sm footer-link">Privacy Policy</Link></li>,
                  <li key="tos"><Link to="#" className="text-[#FFFDF0] text-sm footer-link">Terms of Service</Link></li>,
                  <li key="sm"><Link to="#" className="text-[#FFFDF0] text-sm footer-link">Sitemap</Link></li>,
                ]},
              ] as { id: string; title: string; items: React.ReactNode[] }[]).map(({ id, title, items }) => (
                <div key={id} className="border-b border-white/10">
                  <button
                    onClick={() => setOpenFooterSection(openFooterSection === id ? null : id)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-[12px] uppercase tracking-wider font-bold text-[var(--color-brand-gold)]">{title}</span>
                    <ChevronDown
                      size={16}
                      className={`text-[var(--color-brand-gold)] transition-transform duration-200 ${openFooterSection === id ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFooterSection === id && (
                    <ul className="space-y-3 pt-1 pb-4">{items}</ul>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Gold divider between Layer 2 and Layer 3 */}
        <div className="w-full" style={{ height: '1px', background: 'rgba(200,150,46,0.20)' }} />

        {/* Layer 3: Bottom Bar — animated ETERNAL RAGA only */}
        <div className="w-full bg-[#120828] py-[80px] relative overflow-hidden flex items-center justify-center" style={{ minHeight: '160px' }}>
          <div className="pointer-events-none select-none overflow-hidden w-full flex items-center justify-center">
            <span className="text-[84px] md:text-[140px] lg:text-[182px] font-serif font-bold whitespace-nowrap footer-shimmer-text tracking-widest">
              ETERNAL RAGA
            </span>
          </div>
        </div>
      </footer>

      {/* Sign In Modal */}
      {isSignInModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => setIsSignInModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-serif text-[var(--color-brand-purple)] mb-2">Welcome to Eternal Raga</h2>
                <p className="text-[var(--color-brand-gold-dark)] font-serif">शाश्वत राग में स्वागत है</p>
              </div>

              <div className="space-y-4 mb-6">
                <button 
                  onClick={handleSignIn}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </button>
                
                <button 
                  onClick={handleSignIn}
                  className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white px-4 py-3 rounded-xl font-medium hover:bg-[#166FE5] transition-colors shadow-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Continue with Facebook
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-gray-400 font-medium">or</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              <form onSubmit={handleSignIn} className="space-y-4 mb-6">
                <div>
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-gold)] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <input 
                    type="password" 
                    placeholder="Password" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-gold)] focus:border-transparent"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="cta-button w-full px-4 py-3 rounded-xl"
                >
                  Sign In
                </button>
              </form>

              <div className="flex justify-between text-sm text-[var(--color-brand-purple)] font-medium mb-8">
                <a href="#" className="hover:text-[var(--color-brand-gold-dark)] transition-colors">Create Account</a>
                <a href="#" className="hover:text-[var(--color-brand-gold-dark)] transition-colors">Forgot Password?</a>
              </div>

              <div className="text-xs text-center text-gray-500 leading-relaxed bg-gray-50 p-4 rounded-xl">
                Sign in to save favorites, track reading progress, and manage your shop orders. All content is freely accessible without an account.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
