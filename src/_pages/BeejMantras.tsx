'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronRight, Play } from 'lucide-react';

const BEEJ_MANTRAS = [
  {
    sanskrit: 'ॐ',
    iast: 'oṃ',
    deity: 'Universal · ब्रह्म',
    chakra: 'Crown · सहस्रार',
    frequency: '963 Hz',
    benefit: 'Cosmic consciousness, spiritual awakening',
    color: '#8B5CF6', // violet
  },
  {
    sanskrit: 'लं',
    iast: 'laṃ',
    deity: 'Ganesh/Earth',
    chakra: 'Root · मूलाधार',
    frequency: '396 Hz',
    benefit: 'Grounding, stability, removing fear',
    color: '#EF4444', // red
  },
  {
    sanskrit: 'वं',
    iast: 'vaṃ',
    deity: 'Vishnu/Water',
    chakra: 'Sacral · स्वाधिष्ठान',
    frequency: '417 Hz',
    benefit: 'Creativity, emotional balance, flow',
    color: '#F97316', // orange
  },
  {
    sanskrit: 'रं',
    iast: 'raṃ',
    deity: 'Agni/Fire',
    chakra: 'Solar Plexus · मणिपूर',
    frequency: '528 Hz',
    benefit: 'Personal power, transformation, energy',
    color: '#EAB308', // yellow
  },
  {
    sanskrit: 'यं',
    iast: 'yaṃ',
    deity: 'Shiva/Air',
    chakra: 'Heart · अनाहत',
    frequency: '639 Hz',
    benefit: 'Love, compassion, connection',
    color: '#22C55E', // green
  },
  {
    sanskrit: 'हं',
    iast: 'haṃ',
    deity: 'Shiva/Ether',
    chakra: 'Throat · विशुद्ध',
    frequency: '741 Hz',
    benefit: 'Communication, truth, self-expression',
    color: '#3B82F6', // blue
  },
  {
    sanskrit: 'ॐ',
    iast: 'oṃ',
    deity: 'Shiva/Mind',
    chakra: 'Third Eye · आज्ञा',
    frequency: '852 Hz',
    benefit: 'Intuition, insight, inner vision',
    color: '#4F46E5', // indigo
  },
  {
    sanskrit: 'क्रीं',
    iast: 'krīṃ',
    deity: 'Kali',
    chakra: 'Power',
    frequency: '963 Hz',
    benefit: 'Transformation, destroying negativity',
    color: '#4C1D95', // dark purple
  },
  {
    sanskrit: 'श्रीं',
    iast: 'śrīṃ',
    deity: 'Lakshmi',
    chakra: 'Prosperity',
    frequency: '432 Hz',
    benefit: 'Abundance, wealth, beauty',
    color: '#EC4899', // pink-gold
  },
];

export default function BeejMantras() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-[var(--color-brand-purple)]">Home</Link>
        <ChevronRight size={16} className="mx-2 flex-shrink-0" />
        <Link href="/mantras" className="hover:text-[var(--color-brand-purple)]">Mantras & Stotrams</Link>
        <ChevronRight size={16} className="mx-2 flex-shrink-0" />
        <span className="text-[var(--color-brand-purple)] font-medium">Beej Mantras</span>
      </nav>

      {/* Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-brand-purple)] mb-6">
          Beej Mantras <span className="hindi-text ml-2 text-3xl md:text-4xl">बीज मंत्र</span>
          <span className="block text-2xl md:text-3xl text-[var(--color-brand-gold-dark)] mt-2">— Sacred Seed Syllables —</span>
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Beej (Seed) Mantras are single-syllable sounds that contain the essence of a particular deity or cosmic energy. Just as a tiny seed contains the potential of a massive tree, a Beej Mantra holds immense spiritual power.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Chanting these sacred syllables activates specific chakras (energy centers) in the body, aligning your personal frequency with the universal vibration. They are often used as the foundation for longer mantras or chanted repeatedly during deep meditation.
        </p>
      </div>

      {/* Video Placeholder */}
      <div className="interactive-card aspect-video max-w-4xl mx-auto bg-black rounded-2xl overflow-hidden relative mb-16 shadow-lg group cursor-pointer">
        <img
          src="https://picsum.photos/seed/beej-video/1200/675?blur=1"
          alt="Beej Mantras Chanting Video"
          className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
            <Play size={56} className="text-white ml-2" />
          </div>
        </div>
        <div className="absolute bottom-6 left-6 right-6 text-white text-xl font-medium drop-shadow-md">
          Complete 9 Beej Mantras Chanting (432 Hz)
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {BEEJ_MANTRAS.map((mantra, idx) => (
          <div 
            key={idx} 
            className="interactive-card bg-white rounded-2xl p-8 shadow-sm relative overflow-hidden flex flex-col items-center text-center border-t-4"
            style={{ borderTopColor: mantra.color }}
          >
            {/* Background subtle glow */}
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-3xl opacity-10"
              style={{ backgroundColor: mantra.color }}
            ></div>

            <div className="text-6xl font-medium hindi-text text-[var(--color-brand-purple)] mb-2 relative z-10">
              {mantra.sanskrit}
            </div>
            <div className="text-2xl italic text-gray-500 mb-6 relative z-10">
              {mantra.iast}
            </div>

            <div className="w-full space-y-3 mb-6 flex-grow">
              <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                <span className="text-gray-500">Deity</span>
                <span className="font-medium text-gray-800">{mantra.deity}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                <span className="text-gray-500">Chakra</span>
                <span className="font-medium text-gray-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: mantra.color }}></span>
                  {mantra.chakra}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                <span className="text-gray-500">Frequency</span>
                <span className="font-medium text-gray-800">{mantra.frequency}</span>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-6 italic h-10 flex items-center justify-center">
              "{mantra.benefit}"
            </div>

            <button className="w-12 h-12 rounded-full bg-[var(--color-brand-gold)] text-[var(--color-brand-purple)] flex items-center justify-center hover:scale-110 transition-transform shadow-md">
              <Play size={20} className="ml-1" />
            </button>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <button className="cta-button rounded-full py-4 px-8 font-semibold inline-flex items-center justify-center gap-2 text-lg">
          Practice with Mala Counter in App
        </button>
      </div>
    </div>
  );
}
