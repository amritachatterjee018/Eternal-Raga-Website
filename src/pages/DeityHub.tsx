import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, PlayCircle, MapPin, BookOpen, ShoppingBag, ArrowRight } from 'lucide-react';

const SHIVA_MANTRAS = [
  { name: 'Om Namah Shivaya', hindi: 'ॐ नमः शिवाय', type: 'Panchakshari Mantra' },
  { name: 'Mahamrityunjaya', hindi: 'महामृत्युंजय मंत्र', type: 'Life-giving Mantra' },
  { name: 'Shiva Tandava Stotram', hindi: 'शिवताण्डवस्तोत्रम्', type: 'Stotram' },
  { name: 'Lingashtakam', hindi: 'लिंगाष्टकम्', type: 'Ashtakam' },
  { name: 'Shiv Chalisa', hindi: 'शिव चालीसा', type: 'Chalisa' },
  { name: 'Rudrashtakam', hindi: 'रुद्राष्टकम्', type: 'Ashtakam' },
];

const SHIVA_TEMPLES = [
  { name: 'Somnath', location: 'Gujarat', type: 'Jyotirlinga', image: 'https://picsum.photos/seed/somnath/300/200' },
  { name: 'Mahakaleshwar', location: 'Ujjain, MP', type: 'Jyotirlinga', image: 'https://picsum.photos/seed/mahakal/300/200' },
  { name: 'Kashi Vishwanath', location: 'Varanasi, UP', type: 'Jyotirlinga', image: 'https://picsum.photos/seed/kashi/300/200' },
];

const SHIVA_VIDEOS = [
  { title: 'Powerful Shiva Tandava', duration: '12:45', image: 'https://picsum.photos/seed/shiva-vid1/300/169' },
  { title: 'Om Namah Shivaya Chanting (108 Times)', duration: '45:30', image: 'https://picsum.photos/seed/shiva-vid2/300/169' },
  { title: 'Mahamrityunjaya Mantra 108 Times', duration: '55:10', image: 'https://picsum.photos/seed/shiva-vid3/300/169' },
  { title: 'Story of Lord Shiva', duration: '20:15', image: 'https://picsum.photos/seed/shiva-vid4/300/169' },
];

const SHIVA_SHOP = [
  { name: 'Authentic 5 Mukhi Rudraksha', price: '₹899', image: 'https://picsum.photos/seed/rudraksha-shiva/200/200' },
  { name: 'Brass Shiva Lingam', price: '₹2,499', image: 'https://picsum.photos/seed/lingam/200/200' },
];

export default function DeityHub() {
  const { id } = useParams();
  
  // In a real app, we'd fetch data based on the ID. For the prototype, we'll use Shiva data if the ID is 'shiva', otherwise generic data.
  const deityName = id ? id.charAt(0).toUpperCase() + id.slice(1) : 'Shiva';
  const hindiName = id === 'shiva' ? 'शिव' : 'देवता';

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full bg-[var(--color-brand-purple)] flex items-center justify-center">
        <img
          src={`https://picsum.photos/seed/${id || 'shiva'}-hero/1920/400?blur=1`}
          alt={deityName}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-4">
            {deityName} <span className="text-[var(--color-brand-gold)] ml-4">{hindiName}</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-serif mb-6">
            Mahadeva · The Great God · महादेव
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-white/80 font-medium bg-black/30 backdrop-blur-md py-3 px-6 rounded-full border border-white/10">
            <span>24 Mantras</span>
            <span className="text-[var(--color-brand-gold)]">|</span>
            <span>12 Temples</span>
            <span className="text-[var(--color-brand-gold)]">|</span>
            <span>108 Names</span>
            <span className="text-[var(--color-brand-gold)]">|</span>
            <span>15 Videos</span>
          </div>
        </div>
      </section>

      {/* 108 Names Preview */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-serif text-[var(--color-brand-purple)]">
              108 Names <span className="hindi-text text-2xl ml-2">१०८ नाम</span>
            </h2>
            <a href="#" className="text-[var(--color-brand-purple)] font-medium hover:text-[var(--color-brand-gold-dark)] flex items-center gap-1">
              View All 108 Names <ArrowRight size={16} />
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {['Shiva (The Auspicious One)', 'Maheshwara (Lord of Gods)', 'Shambhu (Giver of Prosperity)', 'Pinakin (One who has a bow)', 'Shashi Shekhara (Crested with the moon)'].map((name, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-center hover:border-[var(--color-brand-gold)] transition-colors cursor-pointer">
                <p className="font-serif text-[var(--color-brand-purple)] mb-1">{idx + 1}. {name.split(' ')[0]}</p>
                <p className="text-xs text-gray-500">{name.split('(')[1]?.replace(')', '') || 'Meaning'}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mantras Grid */}
      <section className="py-12 bg-[var(--color-brand-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-serif text-[var(--color-brand-purple)]">
              Mantras & Stotrams <span className="hindi-text text-2xl ml-2">मंत्र और स्तोत्र</span>
            </h2>
            <Link to="/mantras" className="text-[var(--color-brand-purple)] font-medium hover:text-[var(--color-brand-gold-dark)] flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHIVA_MANTRAS.map((mantra, idx) => (
              <Link
                key={idx}
                to={`/mantras/${mantra.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="interactive-card bg-white p-6 rounded-xl border border-gray-200 shadow-sm group flex items-center justify-between"
              >
                <div>
                  <h3 className="text-lg font-serif text-[var(--color-brand-purple)] group-hover:text-[var(--color-brand-gold-dark)] transition-colors mb-1">
                    {mantra.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="hindi-text">{mantra.hindi}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500">{mantra.type}</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[var(--color-brand-gold)] group-hover:text-[var(--color-brand-purple)] transition-colors text-gray-400">
                  <PlayCircle size={24} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Temples */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-serif text-[var(--color-brand-purple)]">
              Sacred Temples <span className="hindi-text text-2xl ml-2">पवित्र मंदिर</span>
            </h2>
            <Link to="/temples" className="text-[var(--color-brand-purple)] font-medium hover:text-[var(--color-brand-gold-dark)] flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SHIVA_TEMPLES.map((temple, idx) => (
              <Link key={idx} to={`/temples/${temple.name.toLowerCase()}`} className="interactive-card group rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
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
                  <h3 className="text-xl font-serif text-[var(--color-brand-purple)] group-hover:text-[var(--color-brand-gold-dark)] transition-colors mb-2">
                    {temple.name}
                  </h3>
                  <p className="text-gray-600 flex items-center gap-1 text-sm">
                    <MapPin size={16} className="text-[var(--color-brand-gold-dark)]" /> {temple.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Playlist */}
      <section className="py-12 bg-[var(--color-brand-purple)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-serif">
              Featured Videos <span className="text-[var(--color-brand-gold)] text-2xl ml-2">वीडियो</span>
            </h2>
            <a href="#" className="text-white/80 font-medium hover:text-[var(--color-brand-gold)] flex items-center gap-1 transition-colors">
              View Channel <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SHIVA_VIDEOS.map((video, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="aspect-video rounded-xl overflow-hidden relative mb-3 border border-white/10">
                  <img
                    src={video.image}
                    alt={video.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform border border-white/20">
                      <PlayCircle size={24} className="text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-medium text-white">
                    {video.duration}
                  </div>
                </div>
                <h3 className="font-medium text-white/90 group-hover:text-[var(--color-brand-gold)] transition-colors line-clamp-2 text-sm">
                  {video.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop */}
      <section className="py-12 bg-[var(--color-brand-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-serif text-[var(--color-brand-purple)]">
              Sacred Shop <span className="hindi-text text-2xl ml-2">पवित्र दुकान</span>
            </h2>
            <Link to="/shop" className="text-[var(--color-brand-purple)] font-medium hover:text-[var(--color-brand-gold-dark)] flex items-center gap-1">
              Shop All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
            {SHIVA_SHOP.map((product, idx) => (
              <div key={idx} className="interactive-card bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-row h-40">
                <div className="w-40 h-full p-4 flex items-center justify-center bg-gray-50 border-r border-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow justify-center">
                  <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                  <span className="font-bold text-[var(--color-brand-purple)] text-lg mb-4">{product.price}</span>
                  <Link
                    to="/shop"
                    className="secondary-button rounded-md px-4 py-2 text-sm font-medium flex items-center justify-center gap-2 w-fit"
                  >
                    <ShoppingBag size={16} /> View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
