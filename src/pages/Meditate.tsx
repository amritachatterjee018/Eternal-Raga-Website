import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Clock, ArrowRight } from 'lucide-react';

/* ─── Data ────────────────────────────────────────────────────── */
const MEDITATION_GUIDES = [
  { title: 'Morning Meditation', hindi: 'प्रातः ध्यान', duration: '15 min', category: 'Morning',     description: 'Start your day with clarity',              image: 'https://picsum.photos/seed/morning-med/400/300' },
  { title: 'Deep Sleep',        hindi: 'गहरी नींद',    duration: '30 min', category: 'Sleep',       description: 'Ambient sounds for restful sleep',        image: 'https://picsum.photos/seed/deep-sleep/400/300' },
  { title: 'Concentration',     hindi: 'एकाग्रता',    duration: '20 min', category: 'Focus',       description: 'Sharpen focus and mental clarity',        image: 'https://picsum.photos/seed/concentration/400/300' },
  { title: 'Mental Peace',      hindi: 'मानसिक शांति', duration: '25 min', category: 'Calm',        description: 'Release anxiety and find calm',           image: 'https://picsum.photos/seed/mental-peace/400/300' },
  { title: 'Yoga Nidra',        hindi: 'योग निद्रा',   duration: '45 min', category: 'Relaxation',  description: 'Deep conscious relaxation',               image: 'https://picsum.photos/seed/yoga-nidra/400/300' },
  { title: 'Stress Relief',     hindi: 'तनाव मुक्ति',  duration: '15 min', category: 'Relief',      description: 'Guided relaxation for busy professionals', image: 'https://picsum.photos/seed/stress-relief/400/300' },
];

const CHAKRAS = [
  { name: 'Muladhara',    hindi: 'मूलाधार',      englishChakra: 'Root Chakra',         number: 1,
    mantra: 'LAM',  affirmation: 'I AM',        frequency: '396 Hz',
    qualities: ['Grounded', 'Safe'],  color: '#D31010',
    yantraImage: '/images/yantra_muladhara.png',
    yogaImage:   '/images/yoga_muladhara.png',   bija: 'लं' },
  { name: 'Svadishthana', hindi: 'स्वाधिष्ठान',  englishChakra: 'Sacral Chakra',       number: 2,
    mantra: 'VAM',  affirmation: 'I FEEL',       frequency: '417 Hz',
    qualities: ['Independent', 'Emotions'], color: '#E67E22',
    yantraImage: '/images/yantra_swadisthan.png',
    yogaImage:   '/images/yoga_swadisthan.png',  bija: 'वं' },
  { name: 'Manipura',     hindi: 'मणिपूर',        englishChakra: 'Solar Plexus Chakra', number: 3,
    mantra: 'RAM',  affirmation: 'I DO',         frequency: '528 Hz',
    qualities: ['Joyful', 'Confident'],     color: '#F39C12',
    yantraImage: '/images/yantra_manipura.png',
    yogaImage:   '/images/yoga_manipura.png',    bija: 'रं' },
  { name: 'Anahata',      hindi: 'अनाहत',          englishChakra: 'Heart Chakra',        number: 4,
    mantra: 'YAM',  affirmation: 'I LOVE',       frequency: '639 Hz',
    qualities: ['Peaceful', 'Balance'],     color: '#27AE60',
    yantraImage: '/images/yantra_anahata.png',
    yogaImage:   '/images/yoga_anahata.png',     bija: 'यं' },
  { name: 'Vishuddhi',    hindi: 'विशुद्ध',        englishChakra: 'Throat Chakra',       number: 5,
    mantra: 'HAM',  affirmation: 'I SPEAK',      frequency: '741 Hz',
    qualities: ['Honesty', 'Healing'],      color: '#16A085',
    yantraImage: '/images/yantra_visuddhi.png',
    yogaImage:   '/images/yoga_vishuddhi.png',   bija: 'हं' },
  { name: 'Ajna',         hindi: 'आज्ञा',          englishChakra: 'Third Eye Chakra',    number: 6,
    mantra: 'AUM',  affirmation: 'I SEE',        frequency: '852 Hz',
    qualities: ['Clarity', 'Wisdom'],       color: '#2980B9',
    yantraImage: '/images/yantra_ajna.png',
    yogaImage:   '/images/yoga_ajna.png',        bija: 'ॐ' },
  { name: 'Sahasrara',    hindi: 'सहस्रार',        englishChakra: 'Crown Chakra',        number: 7,
    mantra: 'OM',   affirmation: 'I UNDERSTAND', frequency: '963 Hz',
    qualities: ['Spirituality', 'Connection'], color: '#8E44AD',
    yantraImage: '/images/yantra_sahasra.png',
    yogaImage:   '/images/yoga_sahasra.png',     bija: 'ॐ' },
];

/* ─── Inline SVG Yantra for each Chakra ────────────────── */
function ChakraYantra({ name, bija, size = 90 }: { name: string; bija: string; size?: number }) {
  // Petal generator: N petals radiating outward from center
  const petals = (n: number, r: number, w: number) =>
    Array.from({ length: n }, (_, i) => {
      const a = (360 / n) * i;
      return (
        <path
          key={i}
          transform={`rotate(${a})`}
          d={`M 0,0 C ${w},-${r * 0.4} ${w},-${r * 0.75} 0,-${r} C -${w},-${r * 0.75} -${w},-${r * 0.4} 0,0`}
          fill="none" stroke="white" strokeWidth="1.2" opacity="0.9"
        />
      );
    });

  const G = ({ children }: { children: React.ReactNode }) => (
    <g transform="translate(60,60)">{children}</g>
  );
  const Label = ({ y = 9, fontSize = 15 }: { y?: number; fontSize?: number }) => (
    <text x="0" y={y} textAnchor="middle" fontSize={fontSize}
      fill="white" fontFamily="serif" fontWeight="bold">{bija}</text>
  );

  const common = { fill: 'none', stroke: 'white', strokeWidth: '1.4' };

  switch (name) {
    /* 4-petal lotus + square + downward triangle */
    case 'Muladhara': return (
      <svg viewBox="0 0 120 120" width={size} height={size}><G>
        {petals(4, 44, 13)}
        <rect x="-26" y="-26" width="52" height="52" {...common} />
        <polygon points="0,-19 17,9.5 -17,9.5" {...common} />
        <Label y={10} fontSize={16} />
      </G></svg>
    );
    /* 6-petal lotus + circle + crescent */
    case 'Svadishthana': return (
      <svg viewBox="0 0 120 120" width={size} height={size}><G>
        {petals(6, 44, 12)}
        <circle r="26" {...common} />
        <circle cx="7" cy="0" r="19" {...common} strokeOpacity="0.6" />
        <Label y={9} fontSize={16} />
      </G></svg>
    );
    /* 10-petal lotus + downward triangle */
    case 'Manipura': return (
      <svg viewBox="0 0 120 120" width={size} height={size}><G>
        {petals(10, 44, 10)}
        <polygon points="0,-26 22,13 -22,13" {...common} />
        <Label y={9} fontSize={16} />
      </G></svg>
    );
    /* 12-petal lotus + Star of David */
    case 'Anahata': return (
      <svg viewBox="0 0 120 120" width={size} height={size}><G>
        {petals(12, 44, 10)}
        <polygon points="0,-24 20.8,12 -20.8,12" {...common} />
        <polygon points="0,24 20.8,-12 -20.8,-12" {...common} />
        <Label y={9} fontSize={16} />
      </G></svg>
    );
    /* 16-petal lotus + circle + inverted triangle */
    case 'Vishuddhi': return (
      <svg viewBox="0 0 120 120" width={size} height={size}><G>
        {petals(16, 44, 9)}
        <circle r="26" {...common} />
        <polygon points="0,20 17,-10 -17,-10" {...common} />
        <Label y={9} fontSize={16} />
      </G></svg>
    );
    /* Ajna — 2 wings + central circle */
    case 'Ajna': return (
      <svg viewBox="0 0 120 120" width={size} height={size}><G>
        {/* Left wing */}
        <path d="M 0,0 C -20,-30 -50,-30 -46,0 C -50,30 -20,30 0,0" {...common} />
        {/* Right wing */}
        <path d="M 0,0 C 20,-30 50,-30 46,0 C 50,30 20,30 0,0" {...common} />
        <circle r="18" {...common} />
        <text x="0" y="8" textAnchor="middle" fontSize={18} fill="white" fontFamily="serif" fontWeight="bold">ॐ</text>
      </G></svg>
    );
    /* Sahasrara — nested lotus rings */
    case 'Sahasrara': return (
      <svg viewBox="0 0 120 120" width={size} height={size}><G>
        {petals(12, 44, 10)}
        {petals(8, 28, 8)}
        <circle r="16" {...common} />
        <text x="0" y="8" textAnchor="middle" fontSize={16} fill="white" fontFamily="serif" fontWeight="bold">ॐ</text>
      </G></svg>
    );
    default: return null;
  }
}

const YOGA_ASANAS = [
  { name: 'Adho Mukha Svanasana', english: 'Downward-Facing Dog', difficulty: 'Beginner',     image: 'https://picsum.photos/seed/asana1/400/300' },
  { name: 'Virabhadrasana II',    english: 'Warrior II',          difficulty: 'Beginner',     image: 'https://picsum.photos/seed/asana2/400/300' },
  { name: 'Bakasana',             english: 'Crow Pose',           difficulty: 'Intermediate', image: 'https://picsum.photos/seed/asana3/400/300' },
  { name: 'Sirsasana',            english: 'Headstand',           difficulty: 'Advanced',     image: 'https://picsum.photos/seed/asana4/400/300' },
  { name: 'Vrikshasana',          english: 'Tree Pose',           difficulty: 'Beginner',     image: 'https://picsum.photos/seed/asana5/400/300' },
  { name: 'Ustrasana',            english: 'Camel Pose',          difficulty: 'Intermediate', image: 'https://picsum.photos/seed/asana6/400/300' },
];

const YOGA_SEQUENCES = [
  { title: 'Surya Namaskar',             hindi: 'सूर्य नमस्कार',    image: 'https://picsum.photos/seed/seq1/400/300' },
  { title: 'Chandra Namaskar',           hindi: 'चन्द्र नमस्कार',   image: 'https://picsum.photos/seed/seq2/400/300' },
  { title: 'Evening Wind-Down',          hindi: 'शाम का विश्राम',   image: 'https://picsum.photos/seed/seq3/400/300' },
  { title: 'Desk Yoga for Professionals',hindi: 'कार्यालय योग',     image: 'https://picsum.photos/seed/seq4/400/300' },
];

const PRANAYAMA = [
  { name: 'Anulom Vilom', english: 'Alternate Nostril', duration: '10 min', difficulty: 'Beginner',     description: 'Balances the left and right hemispheres of the brain.', image: 'https://picsum.photos/seed/prana1/400/300' },
  { name: 'Kapalbhati',   english: 'Skull Shining',     duration: '5 min',  difficulty: 'Intermediate', description: 'Cleanses the lungs and invigorates the mind.',          image: 'https://picsum.photos/seed/prana2/400/300' },
  { name: 'Bhramari',     english: 'Bee Breath',         duration: '5 min',  difficulty: 'Beginner',     description: 'Calms the nervous system and relieves stress.',         image: 'https://picsum.photos/seed/prana3/400/300' },
  { name: 'Ujjayi',       english: 'Ocean Breath',       duration: '10 min', difficulty: 'Beginner',     description: 'Builds internal heat and improves focus.',              image: 'https://picsum.photos/seed/prana4/400/300' },
];

/* ─── Helpers ─────────────────────────────────────────────────── */
const Divider = () => (
  <div className="flex items-center justify-center my-16">
    <div className="h-[1px] bg-[var(--color-brand-gold)] flex-grow max-w-[100px]" />
    <span className="mx-4 text-2xl text-[var(--color-brand-gold)] hindi-text">ॐ</span>
    <div className="h-[1px] bg-[var(--color-brand-gold)] flex-grow max-w-[100px]" />
  </div>
);

const difficultyBadge = (d: string) =>
  d === 'Beginner'     ? 'bg-green-100/90 text-green-800' :
  d === 'Intermediate' ? 'bg-yellow-100/90 text-yellow-800' :
                         'bg-red-100/90 text-red-800';

/* ─── Component ───────────────────────────────────────────────── */
export default function Meditate() {
  return (
    <>
      {/* ── SECTION 1 + Page header — padded ──────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Page heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-brand-purple)] dark:text-[#E0CFFF] mb-4">
            Meditate &amp; Yoga <span className="hindi-text ml-2">ध्यान और योग</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-[#BCA8E8] max-w-2xl mx-auto">
            Guided practices for inner peace, focus, and spiritual awakening.
          </p>
        </div>

        {/* Meditation Guides */}
        <section>
          <h2 className="text-3xl font-serif text-[var(--color-brand-purple)] dark:text-[#E0CFFF] mb-8 text-center">
            Meditation Guides <span className="hindi-text ml-2 text-2xl">ध्यान</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MEDITATION_GUIDES.map((guide, idx) => (
              <Link key={idx} to="#" className="interactive-card bg-white dark:bg-[#1C0A42] rounded-2xl overflow-hidden border border-gray-200 dark:border-[rgba(200,150,46,0.2)] shadow-sm group block">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={guide.image} alt={guide.title} loading="lazy" referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    <PlayCircle size={48} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[var(--color-brand-purple)] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {guide.category}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                    <Clock size={12} /> {guide.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-[var(--color-brand-purple)] dark:text-[#E0CFFF] group-hover:text-[var(--color-brand-gold-dark)] transition-colors mb-2">
                    {guide.title} <span className="hindi-text text-lg ml-1">{guide.hindi}</span>
                  </h3>
                  <p className="text-gray-600 dark:text-[#BCA8E8] text-sm">{guide.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <Divider />
      </div>

      {/* ══════ SECTION 2: 7 Chakras — FULL BLEED RAINBOW ══════ */}
      <section className="w-full" aria-label="7 Chakras">

        {/* Heading */}
        <div className="text-center py-12 px-4" style={{ backgroundColor: 'var(--deity-section-bg, #FFF8E7)' }}>
          <h2 className="text-3xl md:text-4xl font-serif text-[#1B0A3C] dark:text-[#E0CFFF] mb-3 tracking-wide">
            The 7 Chakras{' '}
            <span className="text-[#C8962E] hindi-text ml-2 text-2xl">· सात चक्र</span>
          </h2>
          <p className="text-gray-500 dark:text-[#BCA8E8] text-sm md:text-base max-w-xl mx-auto">
            Energy centers of the subtle body
            <span className="hindi-text mx-2">·</span>
            <span className="hindi-text">सूक्ष्म शरीर के ऊर्जा केंद्र</span>
          </p>
        </div>

        {/* Rainbow columns — Chakra Sanctuary layout */}
        <div className="chakra-rainbow flex w-full" style={{ height: 'min(90vh, 680px)' }}>
          {CHAKRAS.map((chakra) => (
            <div
              key={chakra.name}
              className="chakra-col group flex flex-col items-center justify-between
                         cursor-pointer select-none overflow-hidden py-6 px-1"
              style={{ backgroundColor: chakra.color, borderRight: '1px solid rgba(212,175,55,0.25)' }}
            >
              {/* Name — always horizontal, with English Chakra subtitle */}
              <div className="text-center flex-shrink-0 px-1">
                <h3
                  className="text-white font-bold leading-tight text-base md:text-lg"
                  style={{ fontFamily: "'Cinzel', Georgia, serif" }}
                >
                  {chakra.name}
                </h3>
                <p className="text-white/90 text-xs uppercase tracking-wide mt-0.5 font-medium">
                  {chakra.englishChakra}
                </p>
              </div>

              {/* Yantra — height-constrained, blend removes white bg */}
              <div className="w-full flex justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <img
                  src={chakra.yantraImage}
                  alt={`${chakra.name} yantra`}
                  className="max-h-28 w-auto object-contain"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </div>

              {/* Affirmation */}
              <p
                className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase
                           text-white/80 group-hover:text-white transition-colors duration-300"
                style={{ fontFamily: "'Cinzel', Georgia, serif" }}
              >
                {chakra.affirmation}
              </p>

              {/* Yoga pose — height-constrained, screen blends away bg */}
              <div className="w-full flex justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <img
                  src={chakra.yogaImage}
                  alt={`${chakra.name} yoga pose`}
                  className="max-h-24 w-auto object-contain"
                  style={{ mixBlendMode: 'screen' }}
                />
              </div>

              {/* Qualities */}
              <div className="flex flex-col items-center gap-0.5 flex-shrink-0
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {chakra.qualities.map((q) => (
                  <span
                    key={q}
                    className="text-[13px] text-white/90 font-medium whitespace-nowrap"
                  >
                    {q}
                  </span>
                ))}
              </div>

              {/* Mantra */}
              <p
                className="text-white font-bold text-xl md:text-2xl tracking-widest drop-shadow
                           transition-transform duration-300 group-hover:scale-110"
                style={{ fontFamily: "'Cinzel', Georgia, serif" }}
              >
                {chakra.mantra}
              </p>
            </div>
          ))}
        </div>

        {/* Rainbow gradient bottom line */}
        <div style={{ height: 3, background: 'linear-gradient(to right, #D31010, #E67E22, #F39C12, #27AE60, #16A085, #2980B9, #8E44AD)' }} />

      </section>

      {/* ── SECTIONS 3 & 4 — padded ───────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mt-16" />

        {/* Yoga Asana Library */}
        <section>
          <h2 className="text-3xl font-serif text-[var(--color-brand-purple)] dark:text-[#E0CFFF] mb-8 text-center">
            Yoga Asana Library <span className="hindi-text ml-2 text-2xl">योग आसन</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {YOGA_ASANAS.map((asana, idx) => (
              <Link key={idx} to="#" className="interactive-card bg-white dark:bg-[#1C0A42] rounded-xl overflow-hidden border border-gray-200 dark:border-[rgba(200,150,46,0.2)] shadow-sm group">
                <div className="aspect-square relative overflow-hidden">
                  <img src={asana.image} alt={asana.name} loading="lazy" referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium backdrop-blur-md ${difficultyBadge(asana.difficulty)}`}>
                      {asana.difficulty}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg text-gray-900 dark:text-[#E0CFFF] group-hover:text-[var(--color-brand-purple)] transition-colors line-clamp-1">
                    {asana.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-[#9E88CC] line-clamp-1">{asana.english}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mb-16">
            <Link to="#" className="inline-flex items-center gap-2 text-[var(--color-brand-purple)] dark:text-[#D4BFFF] font-medium hover:text-[var(--color-brand-gold-dark)] transition-colors">
              View All Asanas <ArrowRight size={16} />
            </Link>
          </div>

          <h3 className="text-2xl font-serif text-[var(--color-brand-purple)] dark:text-[#E0CFFF] mb-6">
            Yoga Sequences <span className="hindi-text ml-2 text-xl">योग अनुक्रम</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {YOGA_SEQUENCES.map((seq, idx) => (
              <Link key={idx} to="#" className="interactive-card bg-white dark:bg-[#1C0A42] rounded-xl overflow-hidden border border-gray-200 dark:border-[rgba(200,150,46,0.2)] shadow-sm group">
                <div className="aspect-video relative overflow-hidden">
                  <img src={seq.image} alt={seq.title} loading="lazy" referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <div>
                      <h4 className="text-white font-medium">{seq.title}</h4>
                      <div className="text-white/80 text-sm hindi-text">{seq.hindi}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <Divider />

        {/* Pranayama */}
        <section>
          <h2 className="text-3xl font-serif text-[var(--color-brand-purple)] dark:text-[#E0CFFF] mb-8 text-center">
            Pranayama <span className="hindi-text ml-2 text-2xl">प्राणायाम</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRANAYAMA.map((prana, idx) => (
              <Link key={idx} to="#" className="interactive-card bg-white dark:bg-[#1C0A42] rounded-2xl overflow-hidden border border-gray-200 dark:border-[rgba(200,150,46,0.2)] shadow-sm group flex flex-col sm:flex-row">
                <div className="sm:w-2/5 aspect-video sm:aspect-auto relative overflow-hidden">
                  <img src={prana.image} alt={prana.name} loading="lazy" referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    <PlayCircle size={48} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  </div>
                </div>
                <div className="p-6 sm:w-3/5 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${difficultyBadge(prana.difficulty)}`}>
                      {prana.difficulty}
                    </span>
                    <span className="text-gray-500 dark:text-[#9E88CC] text-sm flex items-center gap-1">
                      <Clock size={14} /> {prana.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif text-[var(--color-brand-purple)] dark:text-[#E0CFFF] group-hover:text-[var(--color-brand-gold-dark)] transition-colors mb-1">
                    {prana.name}
                  </h3>
                  <div className="text-sm text-gray-500 dark:text-[#9E88CC] mb-3">{prana.english}</div>
                  <p className="text-gray-600 dark:text-[#BCA8E8] text-sm">{prana.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
