'use client';
import React from 'react';
import Link from 'next/link';
import { Play, Headphones, Youtube, Music, Smartphone, Apple, ExternalLink } from 'lucide-react';

/* ─── Data ─────────────────────────────────────────────── */

const PODCAST_SERIES = [
  {
    id: 1,
    title: 'Bhagavad Gita Verse by Verse',
    titleHindi: 'भगवद्गीता श्लोक दर श्लोक',
    episodes: 18,
    description: 'Deep dive into each chapter with Sanskrit chanting and modern interpretation.',
    image: 'https://picsum.photos/seed/gita-pod/400/400',
    color: '#7C3AED',
  },
  {
    id: 2,
    title: '108 Names Explained',
    titleHindi: '108 नामों की व्याख्या',
    episodes: 10,
    description: 'Exploring the meaning and significance behind 108 names of major deities.',
    image: 'https://picsum.photos/seed/108-pod/400/400',
    color: '#C8962E',
  },
  {
    id: 3,
    title: 'Mantra Pronunciation Guide',
    titleHindi: 'मंत्र उच्चारण मार्गदर्शिका',
    episodes: 15,
    description: 'Learn correct Sanskrit pronunciation for popular mantras and stotrams.',
    image: 'https://picsum.photos/seed/mantra-pod/400/400',
    color: '#059669',
  },
  {
    id: 4,
    title: 'Stories from the Puranas',
    titleHindi: 'पुराणों की कथाएँ',
    episodes: 12,
    description: 'Fascinating lesser-known stories from Hindu mythology for modern listeners.',
    image: 'https://picsum.photos/seed/purana-pod/400/400',
    color: '#DC2626',
  },
  {
    id: 5,
    title: 'Meditation & Mindfulness',
    titleHindi: 'ध्यान और माइंडफुलनेस',
    episodes: 8,
    description: 'Guided sessions and discussions on incorporating meditation into daily NRI life.',
    image: 'https://picsum.photos/seed/meditate-pod/400/400',
    color: '#0284C7',
  },
];

const RECENT_VIDEOS = [
  { id: 1, title: 'Om Namah Shivaya — Full Chanting Session', views: '24K', duration: '18:32', thumb: 'https://picsum.photos/seed/vid1/480/270' },
  { id: 2, title: 'Gayatri Mantra — Meaning & Pronunciation', views: '51K', duration: '12:14', thumb: 'https://picsum.photos/seed/vid2/480/270' },
  { id: 3, title: 'Hanuman Chalisa — Sanskrit + Translation', views: '38K', duration: '22:05', thumb: 'https://picsum.photos/seed/vid3/480/270' },
  { id: 4, title: 'Bhagavad Gita Chapter 2 Summary', views: '19K', duration: '28:47', thumb: 'https://picsum.photos/seed/vid4/480/270' },
  { id: 5, title: 'Shiva Tandava Stotram Explained', views: '31K', duration: '16:20', thumb: 'https://picsum.photos/seed/vid5/480/270' },
  { id: 6, title: 'Morning Puja Guide — Step by Step', views: '42K', duration: '14:55', thumb: 'https://picsum.photos/seed/vid6/480/270' },
];

const PLAYLISTS = [
  {
    id: 1,
    title: 'Morning Sadhana',
    titleHindi: 'प्रातः साधना',
    tracks: 12,
    duration: '1h 24m',
    image: 'https://picsum.photos/seed/morning-pl/400/400',
    gradient: 'from-amber-500 to-orange-600',
    description: 'Start your day with mantras, bhajans, and guided pranayama.',
  },
  {
    id: 2,
    title: 'Evening Aarti',
    titleHindi: 'संध्या आरती',
    tracks: 8,
    duration: '52m',
    image: 'https://picsum.photos/seed/evening-pl/400/400',
    gradient: 'from-purple-600 to-indigo-700',
    description: 'Traditional aartis and devotional songs for your evening prayer.',
  },
  {
    id: 3,
    title: 'Deep Meditation',
    titleHindi: 'गहन ध्यान',
    tracks: 6,
    duration: '2h 10m',
    image: 'https://picsum.photos/seed/deep-pl/400/400',
    gradient: 'from-teal-500 to-cyan-700',
    description: 'Long-form binaural mantras and guided dhyana sessions.',
  },
  {
    id: 4,
    title: 'Festival Special',
    titleHindi: 'त्योहार विशेष',
    tracks: 20,
    duration: '3h 05m',
    image: 'https://picsum.photos/seed/festival-pl/400/400',
    gradient: 'from-rose-500 to-pink-600',
    description: 'Curated collections for Diwali, Navratri, Holi, and beyond.',
  },
];

/* ─── Platform badge component ─────────────────────────── */
function PlatformBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium
                     bg-[var(--color-brand-purple)]/8 text-[var(--color-brand-purple)]
                     border border-[var(--color-brand-purple)]/20">
      {icon}
      {label}
    </span>
  );
}

/* ─── Section heading ───────────────────────────────────── */
function SectionHeading({ en, hi, icon }: { en: string; hi: string; icon: React.ReactNode }) {
  return (
    <div className="scroll-heading flex flex-col items-center text-center mb-10 gap-2">
      <div className="w-14 h-14 rounded-2xl bg-[var(--color-brand-gold)]/15 flex items-center justify-center
                      text-[var(--color-brand-gold)] mb-2 neu-raised">
        {icon}
      </div>
      <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-brand-purple)]">{en}</h2>
      <p className="text-lg font-serif text-[var(--color-brand-gold-dark)] hindi-text">{hi}</p>
      <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-brand-gold)] to-transparent mt-1" />
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────── */
export default function Listen() {
  return (
    <div className="bg-[var(--color-brand-bg)] min-h-screen">

      {/* ── PAGE HEADER ────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-[var(--color-brand-purple)] to-[#2D1060]
                          py-20 px-4 text-center overflow-hidden">
        {/* Decorative Om symbols */}
        <span className="absolute left-6 top-6 text-white/5 text-[200px] font-serif select-none pointer-events-none leading-none">ॐ</span>
        <span className="absolute right-6 bottom-0 text-white/5 text-[180px] font-serif select-none pointer-events-none leading-none">ॐ</span>

        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[var(--color-brand-gold)]/20
                          text-[var(--color-brand-gold)] px-4 py-1.5 rounded-full text-sm
                          font-medium mb-6 border border-[var(--color-brand-gold)]/30">
            <Headphones size={14} />
            Audio · Podcasts · Playlists
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-[var(--color-brand-gold)] mb-3 font-bold">
            Listen · सुनें
          </h1>
          <p className="text-lg text-white/70 font-serif">
            Devotional Audio, Podcasts &amp; Playlists
          </p>
          <p className="text-base text-white/50 mt-1">
            भक्ति संगीत, पॉडकास्ट और प्लेलिस्ट
          </p>
        </div>
      </section>

      {/* ── SECTION 1: PODCAST SERIES ──────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          en="Podcast Series"
          hi="पॉडकास्ट"
          icon={<Headphones size={26} />}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PODCAST_SERIES.map((pod, i) => (
            <div
              key={pod.id}
              className={`scroll-reveal scroll-delay-${(i % 4) + 1} interactive-card
                          bg-white rounded-2xl overflow-hidden border border-gray-100 flex`}
            >
              {/* Cover art */}
              <div className="relative flex-shrink-0 w-28 sm:w-36">
                <img
                  src={pod.image}
                  alt={pod.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                {/* Episode count badge */}
                <div className="absolute bottom-2 left-2 bg-black/60 rounded-full px-2 py-0.5 text-[10px]
                                text-white font-medium">
                  {pod.episodes} eps
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5 gap-3">
                <div>
                  <h3 className="text-base font-bold text-[var(--color-brand-purple)] leading-tight">
                    {pod.title}
                  </h3>
                  <p className="text-sm font-serif text-[var(--color-brand-gold-dark)] hindi-text mt-0.5">
                    {pod.titleHindi}
                  </p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed flex-1">
                  {pod.description}
                </p>

                {/* Platform badges */}
                <div className="flex flex-wrap gap-1.5">
                  <PlatformBadge icon={<Apple size={10} />} label="Apple" />
                  <PlatformBadge icon={<Music size={10} />} label="Spotify" />
                  <PlatformBadge icon={<Youtube size={10} />} label="YouTube" />
                </div>

                <a
                  href="#"
                  className="cta-button inline-flex items-center justify-center gap-2
                             text-xs font-bold px-4 py-2 rounded-lg w-fit mt-auto"
                >
                  <Play size={12} fill="currentColor" />
                  Listen Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 2: YOUTUBE CHANNEL ─────────────────────── */}
      <section className="bg-gradient-to-b from-white to-[var(--color-brand-bg)] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            en="YouTube Channel"
            hi="यूट्यूब"
            icon={<Youtube size={26} />}
          />

          {/* Main video embed placeholder */}
          <div className="scroll-scale relative aspect-video w-full max-w-3xl mx-auto
                          rounded-2xl overflow-hidden bg-black mb-8 neu-card">
            <img
              src="https://picsum.photos/seed/yt-banner/1280/720"
              alt="Latest YouTube video"
              className="w-full h-full object-cover opacity-80"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            {/* Play overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[var(--color-brand-gold)] flex items-center
                              justify-center shadow-[0_0_40px_rgba(245,197,24,0.5)]
                              hover:scale-110 transition-transform duration-200 cursor-pointer">
                <Play size={36} fill="white" className="text-white ml-1" />
              </div>
            </div>
            {/* Video label */}
            <div className="absolute bottom-4 left-4 bg-black/70 rounded-lg px-3 py-1.5">
              <p className="text-white text-sm font-medium">Latest: Om Namah Shivaya — Full Chanting Session</p>
            </div>
          </div>

          {/* Subscribe CTA */}
          <div className="flex flex-col items-center gap-3 mb-12">
            <p className="text-gray-600 text-sm">Join 12,000+ subscribers on our YouTube channel</p>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold"
            >
              <Youtube size={18} />
              Subscribe to Eternal Raga on YouTube
            </a>
          </div>

          {/* Recent video grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RECENT_VIDEOS.map((vid, i) => (
              <div
                key={vid.id}
                className={`scroll-reveal scroll-stagger-${(i % 3) + 1} interactive-card
                            bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer group`}
              >
                <div className="relative aspect-video">
                  <img
                    src={vid.thumb}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  {/* Duration badge */}
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px]
                                   font-medium px-2 py-0.5 rounded">
                    {vid.duration}
                  </span>
                  {/* Play overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors
                                  duration-200 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-brand-gold)] opacity-0
                                    group-hover:opacity-100 transition-opacity duration-200
                                    flex items-center justify-center">
                      <Play size={20} fill="white" className="text-white ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-[var(--color-brand-purple)] line-clamp-2 leading-snug">
                    {vid.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">{vid.views} views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: CURATED PLAYLISTS ───────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          en="Curated Playlists"
          hi="प्लेलिस्ट"
          icon={<Music size={26} />}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLAYLISTS.map((pl, i) => (
            <div
              key={pl.id}
              className={`scroll-reveal scroll-delay-${i + 1} interactive-card
                          bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col`}
            >
              {/* Cover */}
              <div className="relative">
                <img
                  src={pl.image}
                  alt={pl.title}
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pl.gradient} opacity-40`} />
                {/* Track count */}
                <div className="absolute top-3 right-3 bg-black/60 rounded-full px-2.5 py-1
                                text-[11px] text-white font-medium">
                  {pl.tracks} tracks
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col flex-1 p-4 gap-3">
                <div>
                  <h3 className="font-bold text-[var(--color-brand-purple)] text-sm">{pl.title}</h3>
                  <p className="text-xs font-serif text-[var(--color-brand-gold-dark)] hindi-text">{pl.titleHindi}</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed flex-1">{pl.description}</p>
                <p className="text-xs text-gray-400 font-medium">{pl.duration}</p>

                {/* Platform buttons */}
                <div className="flex flex-col gap-2 mt-auto">
                  <a
                    href="#"
                    className="secondary-button inline-flex items-center justify-center gap-1.5
                               text-[11px] font-bold px-3 py-2 rounded-lg"
                  >
                    <Music size={11} />
                    Play on Spotify
                  </a>
                  <a
                    href="#"
                    className="secondary-button inline-flex items-center justify-center gap-1.5
                               text-[11px] font-bold px-3 py-2 rounded-lg"
                  >
                    <Youtube size={11} />
                    Play on YouTube Music
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4: DOWNLOAD APP ────────────────────────── */}
      <section className="bg-gradient-to-br from-[var(--color-brand-purple)] via-[#2D1060] to-[#1B0A3C]
                          py-20 px-4 overflow-hidden relative">
        {/* Decorative */}
        <span className="absolute right-0 top-0 text-white/5 text-[300px] font-serif
                         select-none pointer-events-none leading-none translate-x-12 -translate-y-8">ॐ</span>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="scroll-heading text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-[var(--color-brand-gold)]/20
                              text-[var(--color-brand-gold)] px-4 py-1.5 rounded-full text-sm
                              font-medium mb-6 border border-[var(--color-brand-gold)]/30">
                <Smartphone size={14} />
                Mobile App
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-2 font-bold">
                Get the Full Experience
              </h2>
              <p className="text-xl font-serif text-[var(--color-brand-gold)]">
                पूरा अनुभव प्राप्त करें
              </p>
              <p className="text-white/70 mt-5 text-sm leading-relaxed">
                For offline listening, guided meditation, 108 Japa counter, and Bhakti Points —
                download the Eternal Raga app.
              </p>
              <p className="text-white/50 text-sm mt-2">
                ऑफलाइन श्रवण, ध्यान, 108 जप काउंटर और भक्ति पॉइंट्स के लिए एप डाउनलोड करें।
              </p>

              {/* App badges */}
              <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
                <a
                  href="#"
                  className="flex items-center gap-3 bg-black/40 border border-white/20
                             rounded-xl px-5 py-3 hover:bg-black/60 hover:-translate-y-1
                             transition-all duration-200 backdrop-blur-sm"
                >
                  <Apple size={28} className="text-white" />
                  <div className="text-left">
                    <p className="text-white/60 text-[10px] leading-none">Download on the</p>
                    <p className="text-white font-bold text-sm">App Store</p>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 bg-black/40 border border-white/20
                             rounded-xl px-5 py-3 hover:bg-black/60 hover:-translate-y-1
                             transition-all duration-200 backdrop-blur-sm"
                >
                  <Smartphone size={28} className="text-white" />
                  <div className="text-left">
                    <p className="text-white/60 text-[10px] leading-none">Get it on</p>
                    <p className="text-white font-bold text-sm">Google Play</p>
                  </div>
                </a>
              </div>

              {/* Feature chips */}
              <div className="flex flex-wrap gap-2 mt-6 justify-center md:justify-start">
                {['🎵 Offline Audio', '📿 108 Japa Counter', '🧘 Guided Meditation', '✨ Bhakti Points'].map(f => (
                  <span key={f} className="text-xs bg-white/10 text-white/80
                                           rounded-full px-3 py-1 border border-white/15">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* App mockup */}
            <div className="scroll-scale flex items-center justify-center">
              <div className="relative">
                {/* Phone frame */}
                <div className="w-64 h-[520px] bg-black rounded-[42px] border-4 border-white/20
                                shadow-[0_40px_80px_rgba(0,0,0,0.5)] relative overflow-hidden neu-raised">
                  <img
                    src="https://picsum.photos/seed/app-mock/400/700"
                    alt="Eternal Raga App"
                    className="w-full h-full object-cover opacity-90"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  {/* App overlay branding */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-brand-purple)]/80
                                  via-transparent to-[var(--color-brand-purple)]/60 flex flex-col
                                  items-center justify-between py-10 px-4">
                    <div className="text-center">
                      <div className="text-5xl mb-2">ॐ</div>
                      <p className="text-[var(--color-brand-gold)] font-serif font-bold text-lg">
                        Eternal Raga
                      </p>
                    </div>
                    <div className="w-full">
                      <div className="bg-white/15 backdrop-blur rounded-2xl p-4 border border-white/10">
                        <div className="w-full h-2 bg-white/20 rounded-full mb-2">
                          <div className="w-2/3 h-full bg-[var(--color-brand-gold)] rounded-full" />
                        </div>
                        <p className="text-white text-xs text-center">Om Namah Shivaya — Playing</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative glow */}
                <div className="absolute inset-0 rounded-[42px] bg-[var(--color-brand-gold)]/10
                                blur-2xl -z-10 scale-110" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NAV LINK TO OTHER SECTIONS ─────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500 text-sm mb-4">
          Looking for more spiritual content?
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/mantras" className="secondary-button px-5 py-2.5 rounded-xl text-sm font-semibold">
            Mantras &amp; Stotrams
          </Link>
          <Link href="/scriptures" className="secondary-button px-5 py-2.5 rounded-xl text-sm font-semibold">
            Sacred Scriptures
          </Link>
          <Link href="/meditate" className="secondary-button px-5 py-2.5 rounded-xl text-sm font-semibold">
            Meditate &amp; Yoga
          </Link>
        </div>
      </div>

    </div>
  );
}
