'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Bell, ArrowRight } from 'lucide-react';

const SCRIPTURES = [
  {
    id: 'gita',
    title: 'Bhagavad Gita',
    hindi: 'भगवद्गीता',
    description: 'The Song of God. A 700-verse Hindu scripture that is part of the epic Mahabharata.',
    stats: '18 Chapters · 700 Verses',
    image: 'https://picsum.photos/seed/gita-cover/400/600',
    active: true,
  },
  {
    id: 'vedas',
    title: 'The Vedas',
    hindi: 'वेद',
    description: 'The oldest layer of Sanskrit literature and the oldest scriptures of Hinduism.',
    stats: '4 Texts · 20,000+ Mantras',
    image: 'https://picsum.photos/seed/vedas-cover/400/600',
    active: false,
  },
  {
    id: 'upanishads',
    title: 'Upanishads',
    hindi: 'उपनिषद',
    description: 'Late Vedic Sanskrit texts of religious teaching and ideas still revered in Hinduism.',
    stats: '108 Principal Texts',
    image: 'https://picsum.photos/seed/upanishads-cover/400/600',
    active: false,
  },
  {
    id: 'puranas',
    title: 'Puranas',
    hindi: 'पुराण',
    description: 'Vast genre of Indian literature about a wide range of topics, particularly myths, legends and other traditional lore.',
    stats: '18 Mahapuranas',
    image: 'https://picsum.photos/seed/puranas-cover/400/600',
    active: false,
  },
  {
    id: 'epics',
    title: 'The Epics',
    hindi: 'इतिहास',
    description: 'Ramayana and Mahabharata, the great epic poems of ancient India.',
    stats: '2 Epics · 124,000+ Verses',
    image: 'https://picsum.photos/seed/epics-cover/400/600',
    active: false,
  },
];

export default function Scriptures() {
  const [email, setEmail] = useState('');

  const handleNotify = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    alert(`You will be notified when ${id} is available!`);
    setEmail('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="scroll-heading text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-brand-purple)] mb-4">
          Sacred Scriptures <span className="hindi-text ml-2">पवित्र शास्त्र</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Immerse yourself in the timeless wisdom of ancient Indian texts, translated and explained for the modern seeker.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Active Scripture (Gita) */}
        <div className="lg:col-span-2">
          {SCRIPTURES.filter(s => s.active).map(scripture => (
            <div key={scripture.id} className="scroll-scale bg-white rounded-3xl border-2 border-[var(--color-brand-gold-dark)] shadow-lg overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/3 aspect-[3/4] md:aspect-auto relative">
                <img
                  src={scripture.image}
                  alt={scripture.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="bg-[var(--color-brand-gold)] text-[var(--color-brand-purple)] px-4 py-1 rounded-full text-sm font-bold shadow-sm uppercase tracking-wider">
                    Available Now
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center bg-[var(--color-brand-bg)]">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen size={20} className="text-[var(--color-brand-gold-dark)]" />
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">{scripture.stats}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-[var(--color-brand-purple)] mb-2">
                  {scripture.title}
                </h2>
                <p className="text-2xl font-serif text-[var(--color-brand-gold-dark)] mb-6">
                  {scripture.hindi}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {scripture.description}
                </p>
                <div className="flex flex-wrap gap-4 mt-auto">
                  <Link
                    href={`/scriptures/${scripture.id}`}
                    className="cta-button rounded-xl px-8 py-4 text-lg font-bold flex items-center justify-center gap-2"
                  >
                    Start Reading <ArrowRight size={20} />
                  </Link>
                  <button className="secondary-button rounded-xl px-8 py-4 text-lg font-bold">
                    Listen Audio
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Scriptures */}
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-serif text-[var(--color-brand-purple)] mb-8 border-b border-gray-200 pb-4">
            Coming Soon <span className="hindi-text ml-2">जल्द आ रहा है</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SCRIPTURES.filter(s => !s.active).map(scripture => (
              <div key={scripture.id} className={`scroll-reveal scroll-delay-${SCRIPTURES.filter(s => !s.active).indexOf(scripture) + 1} interactive-card bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col sm:flex-row h-full opacity-80 hover:opacity-100 transition-opacity`}>
                <div className="sm:w-1/3 aspect-[3/4] sm:aspect-auto relative grayscale">
                  <img
                    src={scripture.image}
                    alt={scripture.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider backdrop-blur-sm">
                    In Progress
                  </div>
                </div>
                <div className="sm:w-2/3 p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen size={16} className="text-gray-400" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{scripture.stats}</span>
                  </div>
                  <h4 className="text-2xl font-serif text-[var(--color-brand-purple)] mb-1">
                    {scripture.title}
                  </h4>
                  <p className="text-lg font-serif text-[var(--color-brand-gold-dark)] mb-3">
                    {scripture.hindi}
                  </p>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                    {scripture.description}
                  </p>
                  
                  <form onSubmit={(e) => handleNotify(e, scripture.title)} className="mt-auto">
                    <label htmlFor={`email-${scripture.id}`} className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Get Notified
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        id={`email-${scripture.id}`}
                        placeholder="Enter your email"
                        required
                        className="flex-grow px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[var(--color-brand-gold-dark)] focus:ring-1 focus:ring-[var(--color-brand-gold-dark)]"
                      />
                      <button
                        type="submit"
                        className="cta-button rounded-lg p-2 flex items-center justify-center"
                        title="Notify Me"
                      >
                        <Bell size={18} />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
