import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Search } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Chalisas',
  'Stotrams',
  'Ashtakams',
  'Aartis',
  'Suktams',
  'Kavachs',
  'Jap Mantras',
  'Beej Mantras',
  '108 Names'
];

const DEITIES = [
  { name: 'All Deities', id: 'All', image: 'https://picsum.photos/seed/om-icon/100/100' },
  { name: 'Shiva शिव', id: 'Shiva', image: 'https://picsum.photos/seed/shiva-icon/100/100' },
  { name: 'Krishna कृष्ण', id: 'Krishna', image: 'https://picsum.photos/seed/krishna-icon/100/100' },
  { name: 'Vishnu विष्णु', id: 'Vishnu', image: 'https://picsum.photos/seed/vishnu-icon/100/100' },
  { name: 'Ganesh गणेश', id: 'Ganesh', image: 'https://picsum.photos/seed/ganesh-icon/100/100' },
  { name: 'Durga दुर्गा', id: 'Durga', image: 'https://picsum.photos/seed/durga-icon/100/100' },
  { name: 'Ram राम', id: 'Ram', image: 'https://picsum.photos/seed/ram-icon/100/100' },
  { name: 'Lakshmi लक्ष्मी', id: 'Lakshmi', image: 'https://picsum.photos/seed/lakshmi-icon/100/100' },
  { name: 'Hanuman हनुमान', id: 'Hanuman', image: 'https://picsum.photos/seed/hanuman-icon/100/100' },
  { name: 'Saraswati सरस्वती', id: 'Saraswati', image: 'https://picsum.photos/seed/saraswati-icon/100/100' },
  { name: 'Kali काली', id: 'Kali', image: 'https://picsum.photos/seed/kali-icon/100/100' },
  { name: 'Kartikeya कार्तिकेय', id: 'Kartikeya', image: 'https://picsum.photos/seed/kartikeya-icon/100/100' },
  { name: 'Universal सार्वभौम', id: 'Universal', image: 'https://picsum.photos/seed/universal-icon/100/100' },
];

const MANTRAS_DATA = [
  // Shiva
  { id: 1, name: 'Lingashtakam', hindi: 'लिंगाष्टकम्', type: 'Ashtakam', deity: 'Shiva', duration: '~5 min', desc: 'Glorification of the Shiva Lingam by Adi Shankaracharya', link: '/mantras/lingashtakam', deityIcon: 'https://picsum.photos/seed/shiva-icon/100/100' },
  { id: 2, name: 'Bilvashtakam', hindi: 'बिल्वाष्टकम्', type: 'Ashtakam', deity: 'Shiva', duration: '~5 min', desc: 'Offering of Bilva leaves to Lord Shiva', link: '/mantras/bilvashtakam', deityIcon: 'https://picsum.photos/seed/shiva-icon/100/100' },
  { id: 3, name: 'Kalabhairava Ashtakam', hindi: 'कालभैरव अष्टकम्', type: 'Ashtakam', deity: 'Shiva', duration: '~6 min', desc: 'Hymn to the fierce manifestation of Shiva', link: '/mantras/kalabhairava-ashtakam', deityIcon: 'https://picsum.photos/seed/shiva-icon/100/100' },
  { id: 4, name: 'Shiva Tandava Stotram', hindi: 'शिव तांडव स्तोत्रम्', type: 'Stotram', deity: 'Shiva', duration: '~6 min', desc: 'Composed by Ravana describing Shiva\'s power', link: '/mantras/shiva-tandava', deityIcon: 'https://picsum.photos/seed/shiva-icon/100/100' },
  { id: 5, name: 'Shiva Panchakshara Stotram', hindi: 'शिव पंचाक्षर स्तोत्रम्', type: 'Stotram', deity: 'Shiva', duration: '~4 min', desc: 'Praise of the five syllables Na-Ma-Shi-Va-Ya', link: '/mantras/shiva-panchakshara', deityIcon: 'https://picsum.photos/seed/shiva-icon/100/100' },
  { id: 6, name: 'Sri Rudram', hindi: 'श्री रुद्रम्', type: 'Suktam', deity: 'Shiva', duration: '~25 min', desc: 'Vedic hymn praising Rudra from Yajurveda', link: '/mantras/sri-rudram', deityIcon: 'https://picsum.photos/seed/shiva-icon/100/100' },
  
  // Krishna & Vishnu
  { id: 7, name: 'Madhurashtakam', hindi: 'मधुराष्टकम्', type: 'Ashtakam', deity: 'Krishna', duration: '~5 min', desc: 'Everything about Lord Krishna is sweet', link: '/mantras/madhurashtakam', deityIcon: 'https://picsum.photos/seed/krishna-icon/100/100' },
  { id: 8, name: 'Achyutashtakam', hindi: 'अच्युताष्टकम्', type: 'Ashtakam', deity: 'Vishnu', duration: '~5 min', desc: 'Hymn to the infallible Lord Achyuta', link: '/mantras/achyutashtakam', deityIcon: 'https://picsum.photos/seed/vishnu-icon/100/100' },
  { id: 9, name: 'Vishnu Sahasranamam', hindi: 'विष्णु सहस्रनाम', type: 'Stotram', deity: 'Vishnu', duration: '~30 min', desc: '1000 names of Lord Vishnu from Mahabharata', link: '/mantras/vishnu-sahasranamam', deityIcon: 'https://picsum.photos/seed/vishnu-icon/100/100' },
  { id: 10, name: 'Bhaja Govindam', hindi: 'भज गोविंदम्', type: 'Stotram', deity: 'Krishna', duration: '~6 min', desc: 'Worship Govinda, composed by Adi Shankaracharya', link: '/mantras/bhaja-govindam', deityIcon: 'https://picsum.photos/seed/krishna-icon/100/100' },
  
  // Durga & Devi
  { id: 11, name: 'Mahishasura Mardini Stotram', hindi: 'महिषासुर मर्दिनी', type: 'Stotram', deity: 'Durga', duration: '~8 min', desc: 'Hymn to the slayer of Mahishasura', link: '/mantras/mahishasura-mardini', deityIcon: 'https://picsum.photos/seed/durga-icon/100/100' },
  { id: 12, name: 'Mahalakshmy Ashtakam', hindi: 'महालक्ष्म्यष्टकम्', type: 'Ashtakam', deity: 'Lakshmi', duration: '~5 min', desc: 'Prayer to Goddess Mahalakshmi', link: '/mantras/mahalakshmy-ashtakam', deityIcon: 'https://picsum.photos/seed/lakshmi-icon/100/100' },
  { id: 13, name: 'Sri Suktam', hindi: 'श्री सूक्तम्', type: 'Suktam', deity: 'Lakshmi', duration: '~10 min', desc: 'Vedic hymn invoking Goddess Lakshmi', link: '/mantras/sri-suktam', deityIcon: 'https://picsum.photos/seed/lakshmi-icon/100/100' },
  { id: 14, name: 'Lalitha Sahasranamam', hindi: 'ललिता सहस्रनाम', type: 'Stotram', deity: 'Durga', duration: '~35 min', desc: '1000 names of the Divine Mother', link: '/mantras/lalitha-sahasranamam', deityIcon: 'https://picsum.photos/seed/durga-icon/100/100' },
];

export default function Mantras() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDeity, setActiveDeity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMantras = MANTRAS_DATA.filter(m => {
    const categoryMatch = activeCategory === 'All' || m.type === activeCategory;
    const deityMatch = activeDeity === 'All' || m.deity === activeDeity || (activeDeity === 'Krishna' && m.deity === 'Vishnu') || (activeDeity === 'Vishnu' && m.deity === 'Krishna'); // Grouping Krishna and Vishnu for simplicity if needed, but strict match is better. Let's do strict match.
    const searchMatch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.hindi.includes(searchQuery);
    
    // Actually, let's stick to strict deity match unless it's 'All'
    const strictDeityMatch = activeDeity === 'All' || m.deity === activeDeity;
    
    return categoryMatch && strictDeityMatch && searchMatch;
  });

  const renderMantraCard = (mantra: any, idx: number = 0) => (
    <Link
      key={mantra.id}
      to={mantra.link}
      className={`scroll-verse scroll-delay-${(idx % 6) + 1} interactive-card bg-white p-5 rounded-2xl border border-gray-200 shadow-sm group flex items-center justify-between`}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-gray-100">
          <img src={mantra.deityIcon} alt={mantra.deity} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div>
          <h3 className="text-lg font-serif text-[var(--color-brand-purple)] group-hover:text-[var(--color-brand-gold-dark)] transition-colors mb-1">
            {mantra.name} <span className="hindi-text text-sm ml-1 text-gray-500">{mantra.hindi}</span>
          </h3>
          <div className="flex items-center gap-2 text-xs mb-1">
            <span className="bg-[var(--color-brand-gold)]/20 text-[var(--color-brand-gold-dark)] px-2 py-0.5 rounded-full font-medium">
              {mantra.type}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">Lord {mantra.deity}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">{mantra.duration}</span>
          </div>
          <p className="text-sm text-gray-500 line-clamp-1">{mantra.desc}</p>
        </div>
      </div>
      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[var(--color-brand-gold)] group-hover:text-[var(--color-brand-purple)] transition-colors text-gray-400 flex-shrink-0 ml-4">
        <Play size={20} className="ml-1" />
      </div>
    </Link>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="scroll-heading text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-brand-purple)] mb-4">
          Mantras & Stotrams <span className="hindi-text ml-2">मंत्र और स्तोत्र</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Explore our collection of sacred chants, hymns, and prayers
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search mantras, stotrams, ashtakams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-11 pr-4 py-4 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-gold)] focus:border-[var(--color-brand-gold)] sm:text-sm shadow-sm transition-shadow hover:shadow-md"
          />
        </div>

        {/* Type Filter Pills */}
        <div className="flex overflow-x-auto justify-start md:justify-center gap-3 pb-4 mb-6 hide-scrollbar">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`filter-pill ${
                activeCategory === category
                  ? 'filter-pill-active'
                  : 'filter-pill-inactive'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Deity Filter Row */}
        <div className="flex overflow-x-auto justify-start md:justify-center gap-6 pb-4 hide-scrollbar">
          {DEITIES.map((deity) => (
            <button
              key={deity.id}
              onClick={() => setActiveDeity(deity.id)}
              className="flex flex-col items-center gap-2 group flex-shrink-0"
            >
              <div className={`w-16 h-16 rounded-full overflow-hidden border-[3px] transition-all ${
                activeDeity === deity.id 
                  ? 'border-[var(--color-brand-gold)] shadow-md scale-110' 
                  : 'border-transparent group-hover:border-[var(--color-brand-gold)]/50'
              }`}>
                <img 
                  src={deity.image} 
                  alt={deity.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className={`text-sm font-medium transition-colors ${
                activeDeity === deity.id ? 'text-[var(--color-brand-gold-dark)]' : 'text-gray-500 group-hover:text-[var(--color-brand-purple)]'
              }`}>
                {deity.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="mb-12">
        <div className="mb-6 text-gray-500 font-medium">
          Showing {filteredMantras.length} of 120+ sacred texts
        </div>

        {activeDeity === 'All' && activeCategory === 'All' && !searchQuery ? (
          <>
            <div className="mb-10">
              <h2 className="text-2xl font-serif text-[var(--color-brand-purple)] mb-6 border-b border-gray-200 pb-2">
                शिव Shiva
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {filteredMantras.filter(m => m.deity === 'Shiva').map((m, i) => renderMantraCard(m, i))}
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-serif text-[var(--color-brand-purple)] mb-6 border-b border-gray-200 pb-2">
                कृष्ण/विष्णु Krishna & Vishnu
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {filteredMantras.filter(m => m.deity === 'Krishna' || m.deity === 'Vishnu').map((m, i) => renderMantraCard(m, i))}
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-serif text-[var(--color-brand-purple)] mb-6 border-b border-gray-200 pb-2">
                दुर्गा/देवी Durga & Devi
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {filteredMantras.filter(m => m.deity === 'Durga' || m.deity === 'Lakshmi').map((m, i) => renderMantraCard(m, i))}
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredMantras.map((m, i) => renderMantraCard(m, i))}
            {filteredMantras.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-2xl border border-gray-200">
                No matching sacred texts found. Try adjusting your filters.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="scroll-scale bg-[var(--color-brand-purple)] rounded-2xl p-8 text-center text-white shadow-md">
        <h3 className="text-2xl font-serif mb-4">Can't find what you're looking for?</h3>
        <p className="text-white/80 mb-6 max-w-lg mx-auto">
          We're adding new content every week. Subscribe to get notified when new mantras and stotrams are added.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-lg text-gray-900 w-full focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-gold)]"
          />
          <button className="cta-button rounded-lg px-6 py-3 font-bold whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
