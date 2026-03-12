'use client';
import React from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

const JYOTIRLINGAS = [
  { name: 'Kashi Vishwanath', location: 'Varanasi, UP', type: 'Jyotirlinga', image: 'https://picsum.photos/seed/kashi/400/300' },
  { name: 'Kedarnath', location: 'Uttarakhand', type: 'Jyotirlinga', image: 'https://picsum.photos/seed/kedarnath/400/300' },
  { name: 'Somnath', location: 'Gujarat', type: 'Jyotirlinga', image: 'https://picsum.photos/seed/somnath/400/300' },
  { name: 'Mahakaleshwar', location: 'Ujjain, MP', type: 'Jyotirlinga', image: 'https://picsum.photos/seed/mahakal/400/300' },
];

const SHAKTI_PEETHS = [
  { name: 'Meenakshi Temple', location: 'Madurai, TN', type: 'Shakti Peeth', image: 'https://picsum.photos/seed/meenakshi/400/300' },
  { name: 'Kamakhya Temple', location: 'Guwahati, Assam', type: 'Shakti Peeth', image: 'https://picsum.photos/seed/kamakhya/400/300' },
  { name: 'Vaishno Devi', location: 'Katra, J&K', type: 'Shakti Peeth', image: 'https://picsum.photos/seed/vaishno/400/300' },
  { name: 'Kalighat', location: 'Kolkata, WB', type: 'Shakti Peeth', image: 'https://picsum.photos/seed/kalighat/400/300' },
];

const VISHNU_KRISHNA = [
  { name: 'Tirupati Balaji', location: 'Andhra Pradesh', type: 'Divya Desam', image: 'https://picsum.photos/seed/tirupati/400/300' },
  { name: 'Jagannath Temple', location: 'Puri, Odisha', type: 'Char Dham', image: 'https://picsum.photos/seed/puri/400/300' },
  { name: 'Dwarkadhish', location: 'Dwarka, Gujarat', type: 'Char Dham', image: 'https://picsum.photos/seed/dwarka/400/300' },
  { name: 'Badrinath', location: 'Uttarakhand', type: 'Char Dham', image: 'https://picsum.photos/seed/badrinath/400/300' },
];

const TempleCard: React.FC<{ temple: any }> = ({ temple }) => (
  <Link href={`/temples/${temple.name.toLowerCase().replace(/\s+/g, '-')}`} className="interactive-card group rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white">
    <div className="aspect-video overflow-hidden relative">
      <img
        src={temple.image}
        alt={temple.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[var(--color-brand-purple)] shadow-sm">
        {temple.type}
      </div>
    </div>
    <div className="p-6 bg-white">
      <h3 className="text-2xl font-serif text-[var(--color-brand-purple)] group-hover:text-[var(--color-brand-gold-dark)] transition-colors mb-2">
        {temple.name}
      </h3>
      <p className="text-gray-600 flex items-center gap-1">
        <MapPin size={18} className="text-[var(--color-brand-gold-dark)]" /> {temple.location}
      </p>
    </div>
  </Link>
);

export default function Temples() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-brand-purple)] mb-4">
          Sacred Temples <span className="hindi-text ml-2">पवित्र मंदिर</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the spiritual heritage and architectural marvels of Hindu temples.
        </p>
      </div>

      <section className="mb-16">
        <h2 className="text-3xl font-serif text-[var(--color-brand-purple)] mb-8 border-b border-gray-200 pb-4">
          12 Jyotirlinga <span className="hindi-text ml-2 text-2xl text-gray-500">· ज्योतिर्लिंग</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {JYOTIRLINGAS.map((temple, idx) => (
            <TempleCard key={idx} temple={temple} />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-serif text-[var(--color-brand-purple)] mb-8 border-b border-gray-200 pb-4">
          51 Shakti Peeth <span className="hindi-text ml-2 text-2xl text-gray-500">· शक्तिपीठ</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SHAKTI_PEETHS.map((temple, idx) => (
            <TempleCard key={idx} temple={temple} />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-serif text-[var(--color-brand-purple)] mb-8 border-b border-gray-200 pb-4">
          Vishnu & Krishna Temples <span className="hindi-text ml-2 text-2xl text-gray-500">· विष्णु/कृष्ण मंदिर</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VISHNU_KRISHNA.map((temple, idx) => (
            <TempleCard key={idx} temple={temple} />
          ))}
        </div>
      </section>
    </div>
  );
}
