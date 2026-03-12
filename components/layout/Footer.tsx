'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Youtube, Instagram, Facebook, Music2, Apple, ChevronDown } from 'lucide-react';

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
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
            <button className="cta-button px-8 py-3 rounded-md whitespace-nowrap">Subscribe</button>
          </div>
          <p className="text-xs text-white/50">We respect your inbox. Unsubscribe anytime.</p>
        </div>
      </div>

      {/* Layer 2: Main Footer Content */}
      <div className="scroll-footer-layer w-full bg-[#1B0A3C] pt-[80px] pb-[80px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">

          {/* ── DESKTOP & TABLET GRID (sm+) ── */}
          <div className="hidden sm:grid grid-cols-3 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Column 1: Brand */}
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
              <p className="text-xs font-bold tracking-widest uppercase text-[#C8962E] mb-3">Follow Us · हमें फॉलो करें</p>
              <div className="flex flex-row gap-4">
                {[
                  { icon: <Youtube size={24} />, label: 'YouTube' },
                  { icon: <Instagram size={24} />, label: 'Instagram' },
                  { icon: <Facebook size={24} />, label: 'Facebook' },
                  { icon: <Music2 size={24} />, label: 'Spotify' },
                  { icon: <Apple size={24} />, label: 'Apple Music' },
                ].map(({ icon, label }) => (
                  <a key={label} href="#" aria-label={label} className="footer-social-icon">{icon}</a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="text-[12px] uppercase tracking-wider font-bold text-[var(--color-brand-gold)] mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="/en/mantras" className="text-[#FFFDF0] text-sm footer-link">Popular Mantras</Link></li>
                <li><Link href="/en/scriptures" className="text-[#FFFDF0] text-sm footer-link">Bhagavad Gita</Link></li>
                <li><Link href="/en/#deities" className="text-[#FFFDF0] text-sm footer-link">Browse by Deity</Link></li>
                <li><Link href="/en/mantras" className="text-[#FFFDF0] text-sm footer-link">108 Names Collections</Link></li>
                <li><Link href="#" className="text-[#FFFDF0] text-sm footer-link">Download App</Link></li>
              </ul>
            </div>

            {/* Column 3: Explore */}
            <div className="lg:col-span-2">
              <h4 className="text-[12px] uppercase tracking-wider font-bold text-[var(--color-brand-gold)] mb-6">Explore</h4>
              <ul className="space-y-3">
                <li><Link href="/en/scriptures" className="text-[#FFFDF0] text-sm footer-link">Scriptures</Link></li>
                <li><Link href="/en/temples" className="text-[#FFFDF0] text-sm footer-link">Temples</Link></li>
                <li><Link href="/en/yoga" className="text-[#FFFDF0] text-sm footer-link">Meditate &amp; Yoga</Link></li>
                <li><Link href="/en/eternal-gyan" className="text-[#FFFDF0] text-sm footer-link">Eternal Gyan</Link></li>
                <li><Link href="/en/shop" className="text-[#FFFDF0] text-sm footer-link">Shop</Link></li>
              </ul>
            </div>

            {/* Column 4: Listen & Follow */}
            <div className="lg:col-span-2">
              <h4 className="text-[12px] uppercase tracking-wider font-bold text-[var(--color-brand-gold)] mb-6">Listen &amp; Follow</h4>
              <ul className="space-y-3">
                <li><Link href="/en/listen" className="text-[#FFFDF0] text-sm footer-link">Listen &amp; Podcast Page →</Link></li>
              </ul>
            </div>

            {/* Column 5: Support */}
            <div className="lg:col-span-2">
              <h4 className="text-[12px] uppercase tracking-wider font-bold text-[var(--color-brand-gold)] mb-6">Support</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-[#FFFDF0] text-sm footer-link">About Us</Link></li>
                <li><Link href="#" className="text-[#FFFDF0] text-sm footer-link">Contact</Link></li>
                <li><Link href="/en/feedback" className="text-[#FFFDF0] text-sm footer-link">Request Content</Link></li>
                <li><Link href="#" className="text-[#FFFDF0] text-sm footer-link">Privacy Policy</Link></li>
                <li><Link href="#" className="text-[#FFFDF0] text-sm footer-link">Terms of Service</Link></li>
                <li><Link href="#" className="text-[#FFFDF0] text-sm footer-link">Sitemap</Link></li>
              </ul>
            </div>
          </div>

          {/* ── MOBILE: Accordion ── */}
          <div className="sm:hidden flex flex-col">
            <div className="flex flex-col items-center text-center pb-8 border-b border-white/10">
              <img
                src="/images/eternal-raga-logo.png"
                alt="Eternal Raga logo"
                className="w-[140px] h-[140px] rounded-full mb-5"
              />
              <p className="text-[24px] font-serif text-[var(--color-brand-gold)] mb-1 leading-tight font-bold">Eternal Raga</p>
              <p className="text-[18px] font-serif text-[var(--color-brand-gold)] mb-5">शाश्वत राग</p>
              <p className="text-[#FFFDF0] text-sm leading-relaxed mb-3">
                Your digital sanctuary for Hindu devotional content.
              </p>
              <p className="text-xs text-[#FFFDF0] mb-8">
                A <a href="#" className="text-[var(--color-brand-gold)] underline hover:text-yellow-400 transition-colors">Creative Chronix</a> Product
              </p>
              <div className="flex flex-row gap-4 justify-center flex-wrap">
                {[
                  { icon: <Youtube size={24} />, label: 'YouTube' },
                  { icon: <Instagram size={24} />, label: 'Instagram' },
                  { icon: <Facebook size={24} />, label: 'Facebook' },
                  { icon: <Music2 size={24} />, label: 'Spotify' },
                  { icon: <Apple size={24} />, label: 'Apple Music' },
                ].map(({ icon, label }) => (
                  <a key={label} href="#" aria-label={label} className="footer-social-icon">{icon}</a>
                ))}
              </div>
            </div>

            {([
              { id: 'quick-links', title: 'Quick Links', links: [
                { href: '/en/mantras', label: 'Popular Mantras' },
                { href: '/en/scriptures', label: 'Bhagavad Gita' },
                { href: '/en/mantras', label: '108 Names Collections' },
              ]},
              { id: 'explore', title: 'Explore', links: [
                { href: '/en/scriptures', label: 'Scriptures' },
                { href: '/en/temples', label: 'Temples' },
                { href: '/en/yoga', label: 'Meditate & Yoga' },
                { href: '/en/eternal-gyan', label: 'Eternal Gyan' },
                { href: '/en/shop', label: 'Shop' },
              ]},
              { id: 'support', title: 'Support', links: [
                { href: '#', label: 'About Us' },
                { href: '#', label: 'Contact' },
                { href: '/en/feedback', label: 'Request Content' },
                { href: '#', label: 'Privacy Policy' },
              ]},
            ]).map(({ id, title, links }) => (
              <div key={id} className="border-b border-white/10">
                <button
                  onClick={() => setOpenSection(openSection === id ? null : id)}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <span className="text-[12px] uppercase tracking-wider font-bold text-[var(--color-brand-gold)]">{title}</span>
                  <ChevronDown
                    size={16}
                    className={`text-[var(--color-brand-gold)] transition-transform duration-200 ${openSection === id ? 'rotate-180' : ''}`}
                  />
                </button>
                {openSection === id && (
                  <ul className="space-y-3 pt-1 pb-4">
                    {links.map(l => (
                      <li key={l.href + l.label}><Link href={l.href} className="text-[#FFFDF0] text-sm footer-link">{l.label}</Link></li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gold divider */}
      <div className="w-full" style={{ height: '1px', background: 'rgba(200,150,46,0.20)' }} />

      {/* Layer 3: Bottom Bar */}
      <div className="w-full bg-[#120828] py-[80px] relative overflow-hidden flex items-center justify-center" style={{ minHeight: '160px' }}>
        <div className="pointer-events-none select-none overflow-hidden w-full flex items-center justify-center">
          <span className="text-[84px] md:text-[140px] lg:text-[182px] font-serif font-bold whitespace-nowrap footer-shimmer-text tracking-widest">
            ETERNAL RAGA
          </span>
        </div>
      </div>
    </footer>
  );
}
