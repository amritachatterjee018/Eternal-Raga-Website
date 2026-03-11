import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Search, Menu, X, Facebook, Instagram, Youtube, Music2, Apple, User, ChevronDown, Sun, Moon } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Mantras & Stotrams', path: '/mantras' },
  { name: 'Scriptures', path: '/scriptures' },
  { name: 'Temples', path: '/temples' },
  { name: 'Meditate & Yoga', path: '/meditate' },
  { name: 'Eternal Gyan', path: '/eternal-gyan' },
  { name: 'Shop', path: '/shop' },
];

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      {/* Navigation Bar */}
      <nav className="bg-[var(--color-brand-purple)] text-white sticky top-0 z-50 h-16 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-[var(--color-brand-gold)] text-2xl">ॐ</span>
            <span className="font-serif text-[var(--color-brand-gold)] text-xl font-bold tracking-wide">
              Eternal Raga
            </span>
          </Link>

          {/* Center: Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = item.path === '/' 
                ? location.pathname === '/' 
                : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`nav-item ${isActive ? 'nav-item-active' : 'nav-item-inactive'}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right: Search, Theme Toggle & Language */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="hover:text-[var(--color-brand-gold)] transition-colors">
              <Search size={20} />
            </button>

            {/* ── Dark / Light Mode Toggle ── */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={isDark}
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark
                ? <Sun size={20} strokeWidth={1.8} />
                : <Moon size={20} strokeWidth={1.8} />}
            </button>
            
            {/* Sign In / User Avatar */}
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="w-8 h-8 rounded-full bg-[var(--color-brand-gold)] text-[var(--color-brand-purple)] flex items-center justify-center hover:bg-yellow-400 transition-colors"
                >
                  <User size={18} />
                </button>
                
                {isUserDropdownOpen && (
                  <div className="absolute top-10 right-0 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[var(--color-brand-purple)]">My Favorites</Link>
                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[var(--color-brand-purple)]">Reading Progress</Link>
                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[var(--color-brand-purple)]">Order History</Link>
                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[var(--color-brand-purple)]">Email Preferences</Link>
                    <button 
                      onClick={() => {
                        setIsLoggedIn(false);
                        setIsUserDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[var(--color-brand-purple)] border-t border-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setIsSignInModalOpen(true)}
                className="text-sm text-white/90 hover:text-[var(--color-brand-gold)] transition-colors"
              >
                Sign In
              </button>
            )}

            <div className="text-sm font-medium cursor-pointer hover:text-[var(--color-brand-gold)] transition-colors">
              EN | <span className="font-serif">हिंदी</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:text-[var(--color-brand-gold)] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-[var(--color-brand-purple)] border-t border-white/10 shadow-lg">
            <div className="px-4 py-4 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => {
                const isActive = item.path === '/' 
                  ? location.pathname === '/' 
                  : location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`nav-item w-fit ${isActive ? 'nav-item-active' : 'nav-item-inactive'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <button className="hover:text-[var(--color-brand-gold)] transition-colors">
                  <Search size={20} />
                </button>
                {/* Mobile theme toggle */}
                <button
                  onClick={toggleTheme}
                  className="theme-toggle-btn"
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                  aria-pressed={isDark}
                >
                  {isDark
                    ? <Sun size={18} strokeWidth={1.8} />
                    : <Moon size={18} strokeWidth={1.8} />}
                </button>
                <div className="text-sm font-medium cursor-pointer hover:text-[var(--color-brand-gold)] transition-colors">
                  EN | <span className="font-serif">हिंदी</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

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
                  src="https://picsum.photos/seed/chakra/140/140"
                  alt="Eternal Raga Logo"
                  className="w-[140px] h-[140px] rounded-full mb-5 border-2 border-[var(--color-brand-gold)]/40 p-1"
                  referrerPolicy="no-referrer"
                />
                <p className="text-[28px] font-serif text-[var(--color-brand-gold)] mb-1 leading-tight font-bold">Eternal Raga</p>
                <p className="text-[20px] font-serif text-[var(--color-brand-gold)] mb-5">शाश्वत राग</p>
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
                  src="https://picsum.photos/seed/chakra/140/140"
                  alt="Eternal Raga Logo"
                  className="w-[140px] h-[140px] rounded-full mb-5 border-2 border-[var(--color-brand-gold)]/40 p-1"
                  referrerPolicy="no-referrer"
                />
                <p className="text-[28px] font-serif text-[var(--color-brand-gold)] mb-1 leading-tight font-bold">Eternal Raga</p>
                <p className="text-[20px] font-serif text-[var(--color-brand-gold)] mb-5">शाश्वत राग</p>
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
