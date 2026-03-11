import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Clock, ArrowRight } from 'lucide-react';

const MEDITATION_GUIDES = [
  { title: 'Morning Meditation', hindi: 'प्रातः ध्यान', duration: '15 min', category: 'Morning', description: 'Start your day with clarity', image: 'https://picsum.photos/seed/morning-med/400/300' },
  { title: 'Deep Sleep', hindi: 'गहरी नींद', duration: '30 min', category: 'Sleep', description: 'Ambient sounds for restful sleep', image: 'https://picsum.photos/seed/deep-sleep/400/300' },
  { title: 'Concentration', hindi: 'एकाग्रता', duration: '20 min', category: 'Focus', description: 'Sharpen focus and mental clarity', image: 'https://picsum.photos/seed/concentration/400/300' },
  { title: 'Mental Peace', hindi: 'मानसिक शांति', duration: '25 min', category: 'Calm', description: 'Release anxiety and find calm', image: 'https://picsum.photos/seed/mental-peace/400/300' },
  { title: 'Yoga Nidra', hindi: 'योग निद्रा', duration: '45 min', category: 'Relaxation', description: 'Deep conscious relaxation', image: 'https://picsum.photos/seed/yoga-nidra/400/300' },
  { title: 'Stress Relief', hindi: 'तनाव मुक्ति', duration: '15 min', category: 'Relief', description: 'Guided relaxation for busy professionals', image: 'https://picsum.photos/seed/stress-relief/400/300' },
];

const CHAKRAS = [
  { name: 'Muladhara', hindi: 'मूलाधार', english: 'Root', mantra: 'LAM', frequency: '396Hz', color: '#EF4444' },
  { name: 'Svadhisthana', hindi: 'स्वाधिष्ठान', english: 'Sacral', mantra: 'VAM', frequency: '417Hz', color: '#F97316' },
  { name: 'Manipura', hindi: 'मणिपूर', english: 'Solar Plexus', mantra: 'RAM', frequency: '528Hz', color: '#EAB308' },
  { name: 'Anahata', hindi: 'अनाहत', english: 'Heart', mantra: 'YAM', frequency: '639Hz', color: '#22C55E' },
  { name: 'Vishuddha', hindi: 'विशुद्ध', english: 'Throat', mantra: 'HAM', frequency: '741Hz', color: '#3B82F6' },
  { name: 'Ajna', hindi: 'आज्ञा', english: 'Third Eye', mantra: 'OM', frequency: '852Hz', color: '#4F46E5' },
  { name: 'Sahasrara', hindi: 'सहस्रार', english: 'Crown', mantra: 'AUM', frequency: '963Hz', color: '#8B5CF6' },
];

const YOGA_ASANAS = [
  { name: 'Adho Mukha Svanasana', english: 'Downward-Facing Dog', difficulty: 'Beginner', image: 'https://picsum.photos/seed/asana1/400/300' },
  { name: 'Virabhadrasana II', english: 'Warrior II', difficulty: 'Beginner', image: 'https://picsum.photos/seed/asana2/400/300' },
  { name: 'Bakasana', english: 'Crow Pose', difficulty: 'Intermediate', image: 'https://picsum.photos/seed/asana3/400/300' },
  { name: 'Sirsasana', english: 'Headstand', difficulty: 'Advanced', image: 'https://picsum.photos/seed/asana4/400/300' },
  { name: 'Vrikshasana', english: 'Tree Pose', difficulty: 'Beginner', image: 'https://picsum.photos/seed/asana5/400/300' },
  { name: 'Ustrasana', english: 'Camel Pose', difficulty: 'Intermediate', image: 'https://picsum.photos/seed/asana6/400/300' },
];

const YOGA_SEQUENCES = [
  { title: 'Surya Namaskar', hindi: 'सूर्य नमस्कार', image: 'https://picsum.photos/seed/seq1/400/300' },
  { title: 'Chandra Namaskar', hindi: 'चन्द्र नमस्कार', image: 'https://picsum.photos/seed/seq2/400/300' },
  { title: 'Evening Wind-Down', hindi: 'शाम का विश्राम', image: 'https://picsum.photos/seed/seq3/400/300' },
  { title: 'Desk Yoga for Professionals', hindi: 'कार्यालय योग', image: 'https://picsum.photos/seed/seq4/400/300' },
];

const PRANAYAMA = [
  { name: 'Anulom Vilom', english: 'Alternate Nostril', duration: '10 min', difficulty: 'Beginner', description: 'Balances the left and right hemispheres of the brain.', image: 'https://picsum.photos/seed/prana1/400/300' },
  { name: 'Kapalbhati', english: 'Skull Shining', duration: '5 min', difficulty: 'Intermediate', description: 'Cleanses the lungs and invigorates the mind.', image: 'https://picsum.photos/seed/prana2/400/300' },
  { name: 'Bhramari', english: 'Bee Breath', duration: '5 min', difficulty: 'Beginner', description: 'Calms the nervous system and relieves stress.', image: 'https://picsum.photos/seed/prana3/400/300' },
  { name: 'Ujjayi', english: 'Ocean Breath', duration: '10 min', difficulty: 'Beginner', description: 'Builds internal heat and improves focus.', image: 'https://picsum.photos/seed/prana4/400/300' },
];

const Divider = () => (
  <div className="flex items-center justify-center my-16">
    <div className="h-[1px] bg-[var(--color-brand-gold)] flex-grow max-w-[100px]"></div>
    <span className="mx-4 text-2xl text-[var(--color-brand-gold)] hindi-text">ॐ</span>
    <div className="h-[1px] bg-[var(--color-brand-gold)] flex-grow max-w-[100px]"></div>
  </div>
);

export default function Meditate() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-brand-purple)] mb-4">
          Meditate & Yoga <span className="hindi-text ml-2">ध्यान और योग</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Guided practices for inner peace, focus, and spiritual awakening.
        </p>
      </div>

      {/* SECTION 1: Meditation Guides */}
      <section>
        <h2 className="text-3xl font-serif text-[var(--color-brand-purple)] mb-8 text-center">
          Meditation Guides <span className="hindi-text ml-2 text-2xl">ध्यान</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MEDITATION_GUIDES.map((guide, idx) => (
            <Link key={idx} to="#" className="interactive-card bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm group block">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
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
                <h3 className="text-xl font-serif text-[var(--color-brand-purple)] group-hover:text-[var(--color-brand-gold-dark)] transition-colors mb-2">
                  {guide.title} <span className="hindi-text text-lg ml-1">{guide.hindi}</span>
                </h3>
                <p className="text-gray-600 text-sm">{guide.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Divider />

      {/* SECTION 2: 7 Chakras */}
      <section>
        <h2 className="text-3xl font-serif text-[var(--color-brand-purple)] mb-8 text-center">
          7 Chakras <span className="hindi-text ml-2 text-2xl">सात चक्र</span>
        </h2>
        <div className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x snap-mandatory">
          {CHAKRAS.map((chakra, idx) => (
            <Link 
              key={idx} 
              to="#"
              className="interactive-card flex-none w-[280px] bg-white rounded-2xl p-6 shadow-sm snap-start group border-t-4"
              style={{ borderTopColor: chakra.color }}
            >
              <div className="flex items-center justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-serif text-xl shadow-inner"
                  style={{ backgroundColor: chakra.color }}
                >
                  {idx + 1}
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-500">{chakra.english}</div>
                  <div className="text-xs text-gray-400">{chakra.frequency}</div>
                </div>
              </div>
              <h3 className="text-2xl font-serif text-gray-900 mb-1 group-hover:text-[var(--color-brand-purple)] transition-colors">
                {chakra.name}
              </h3>
              <div className="text-xl hindi-text text-gray-600 mb-4">{chakra.hindi}</div>
              <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center border border-gray-100">
                <span className="text-sm text-gray-500">Beej Mantra</span>
                <span className="font-medium text-gray-900">{chakra.mantra}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Divider />

      {/* SECTION 3: Yoga Asana Library */}
      <section>
        <h2 className="text-3xl font-serif text-[var(--color-brand-purple)] mb-8 text-center">
          Yoga Asana Library <span className="hindi-text ml-2 text-2xl">योग आसन</span>
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {YOGA_ASANAS.map((asana, idx) => (
            <Link key={idx} to="#" className="interactive-card bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm group">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={asana.image}
                  alt={asana.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium backdrop-blur-md ${
                    asana.difficulty === 'Beginner' ? 'bg-green-100/90 text-green-800' :
                    asana.difficulty === 'Intermediate' ? 'bg-yellow-100/90 text-yellow-800' :
                    'bg-red-100/90 text-red-800'
                  }`}>
                    {asana.difficulty}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-serif text-lg text-gray-900 group-hover:text-[var(--color-brand-purple)] transition-colors line-clamp-1">
                  {asana.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-1">{asana.english}</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mb-16">
          <Link to="#" className="inline-flex items-center gap-2 text-[var(--color-brand-purple)] font-medium hover:text-[var(--color-brand-gold-dark)] transition-colors">
            View All Asanas <ArrowRight size={16} />
          </Link>
        </div>

        <h3 className="text-2xl font-serif text-[var(--color-brand-purple)] mb-6">
          Yoga Sequences <span className="hindi-text ml-2 text-xl">योग अनुक्रम</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {YOGA_SEQUENCES.map((seq, idx) => (
            <Link key={idx} to="#" className="interactive-card bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm group">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={seq.image}
                  alt={seq.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
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

      {/* SECTION 4: Pranayama */}
      <section>
        <h2 className="text-3xl font-serif text-[var(--color-brand-purple)] mb-8 text-center">
          Pranayama <span className="hindi-text ml-2 text-2xl">प्राणायाम</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRANAYAMA.map((prana, idx) => (
            <Link key={idx} to="#" className="interactive-card bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm group flex flex-col sm:flex-row">
              <div className="sm:w-2/5 aspect-video sm:aspect-auto relative overflow-hidden">
                <img
                  src={prana.image}
                  alt={prana.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <PlayCircle size={48} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                </div>
              </div>
              <div className="p-6 sm:w-3/5 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    prana.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    prana.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {prana.difficulty}
                  </span>
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    <Clock size={14} /> {prana.duration}
                  </span>
                </div>
                <h3 className="text-xl font-serif text-[var(--color-brand-purple)] group-hover:text-[var(--color-brand-gold-dark)] transition-colors mb-1">
                  {prana.name}
                </h3>
                <div className="text-sm text-gray-500 mb-3">{prana.english}</div>
                <p className="text-gray-600 text-sm">{prana.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
