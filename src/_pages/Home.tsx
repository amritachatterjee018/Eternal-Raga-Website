'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlayCircle, ShoppingBag, ArrowRight, Headphones, Music2 } from 'lucide-react';
import DeityTabBar from '../../components/home/DeityTabBar';

const HERO_SLIDES = [
  {
    id: 1,
    title: 'Sacred Wisdom for Modern Souls',
    subtitle: 'आधुनिक आत्माओं के लिए पवित्र ज्ञान',
    image: 'https://picsum.photos/seed/shiva/1920/500?blur=2',
    description: 'Shiva meditating with golden light',
    link: '/deities/shiva',
  },
  {
    id: 2,
    title: 'Devotion in Every Note',
    subtitle: 'भक्ति हर स्वर में',
    image: 'https://picsum.photos/seed/krishna/1920/500?blur=2',
    description: 'Krishna playing flute by moonlit Yamuna river',
    link: '/deities/krishna',
  },
  {
    id: 3,
    title: 'Strength Through Faith',
    subtitle: 'श्रद्धा से शक्ति',
    image: 'https://picsum.photos/seed/durga/1920/500?blur=2',
    description: 'Durga on her lion in fierce golden aura',
    link: '/deities/durga',
  },
  {
    id: 4,
    title: 'Begin Every Journey Blessed',
    subtitle: 'हर यात्रा शुभ आरंभ',
    image: 'https://picsum.photos/seed/ganesh/1920/500?blur=2',
    description: 'Ganesh with modak in warm festive glow',
    link: '/deities/ganesh',
  },
  {
    id: 5,
    title: 'Walk the Path of Dharma',
    subtitle: 'धर्म के मार्ग पर चलें',
    image: 'https://picsum.photos/seed/ram/1920/500?blur=2',
    description: 'Ram with bow, standing noble in forest',
    link: '/deities/ram',
  },
  {
    id: 6,
    title: 'Courage in Devotion',
    subtitle: 'भक्ति में साहस',
    image: 'https://picsum.photos/seed/hanuman/1920/500?blur=2',
    description: 'Hanuman in devotional pose with golden energy',
    link: '/deities/hanuman',
  },
];


const GYAN_ARTICLES = [
  { title: 'The Science Behind Om Chanting', category: 'Meditation', image: 'https://picsum.photos/seed/om/300/200' },
  { title: 'Understanding the 4 Vedas', category: 'Scriptures', image: 'https://picsum.photos/seed/vedas/300/200' },
  { title: 'Significance of Rudraksha', category: 'Traditions', image: 'https://picsum.photos/seed/rudraksha/300/200' },
];

const SHOP_PRODUCTS = [
  { name: 'Panchamukhi Rudraksha Mala', price: '₹1,299', image: 'https://picsum.photos/seed/mala/200/200' },
  { name: 'Brass Nataraja Idol', price: '₹3,499', image: 'https://picsum.photos/seed/nataraja/200/200' },
  { name: 'Premium Sandalwood Incense', price: '₹299', image: 'https://picsum.photos/seed/incense/200/200' },
  { name: 'Bhagavad Gita - Pocket Edition', price: '₹199', image: 'https://picsum.photos/seed/gita/200/200' },
];

const TESTIMONIALS = [
  {
    quote: "Eternal Raga has become part of my morning sadhana. The Hanuman Chalisa with meaning helped me finally understand what I've been chanting for years.",
    name: "Priya S.",
    location: "New Jersey, USA"
  },
  {
    quote: "As someone living away from India for 15 years, this website feels like a spiritual home. The mantra collection is incredible.",
    name: "Rajesh M.",
    location: "London, UK"
  },
  {
    quote: "I bought the Gita flash cards for my children. Now they ask ME to do evening prayers together. Best purchase ever.",
    name: "Anita K.",
    location: "Toronto, Canada"
  },
  {
    quote: "The modern context sections are what sets this apart. Finally someone explaining ancient wisdom in a way that relates to my actual life.",
    name: "Vikram P.",
    location: "Sydney, Australia"
  },
  {
    quote: "I listen to the bhajans while cooking dinner every evening. The quality of the recordings is beautiful and calming.",
    name: "Meera D.",
    location: "San Francisco, USA"
  },
  {
    quote: "The 108 names with meanings have deepened my understanding of Lord Shiva. I download the PDF and keep it on my desk.",
    name: "Suresh T.",
    location: "Dubai, UAE"
  }
];



export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isTestimonialHovered) return;
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isTestimonialHovered]);

  return (
    <div className="flex flex-col">
      {/* Hero Carousel — NO animation, already has its own auto-scroll */}
      <section className="relative h-[500px] w-full overflow-hidden bg-[var(--color-brand-purple)]">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-16">
              <div className="max-w-7xl mx-auto w-full">
                <h1 className="text-4xl md:text-6xl font-serif text-white mb-2">
                  {slide.title}
                </h1>
                <p className="text-2xl md:text-3xl font-serif text-[var(--color-brand-gold)] mb-6">
                  {slide.subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/mantras"
                    className="cta-button px-6 py-3 rounded-md flex items-center gap-2"
                  >
                    <PlayCircle size={20} /> Explore Mantras
                  </Link>
                  <Link
                    href="/shop"
                    className="secondary-button rounded-md px-6 py-3 font-medium flex items-center gap-2"
                  >
                    <ShoppingBag size={20} /> Visit Shop
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Dot Indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-[var(--color-brand-gold)]' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      <DeityTabBar />

      {/* Daily Mantra & Featured Video */}
      <section className="py-12 bg-[var(--color-brand-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Daily Mantra Card — scale + fade */}
            <div className="scroll-scale bg-white rounded-2xl border border-[var(--color-brand-gold-dark)] shadow-md p-8 flex flex-col justify-center items-center text-center">
              <h3 className="text-sm font-bold tracking-widest text-[var(--color-brand-gold-dark)] uppercase mb-6">Daily Mantra</h3>
              <p className="text-5xl font-serif hindi-text mb-4">ॐ नमः शिवाय</p>
              <p className="text-lg italic text-gray-600 mb-4">Om Namah Shivaya</p>
              <p className="text-gray-800 mb-8 max-w-md">
                "I bow to Shiva." The supreme reality, the inner Self. It is the name given to consciousness that dwells in all.
              </p>
              <Link
                href="/mantras/om-namah-shivaya"
                className="cta-button px-6 py-3 rounded-md flex items-center gap-2"
              >
                <PlayCircle size={20} /> Listen on YouTube
              </Link>
            </div>

            {/* Featured Video — slide up with slight delay */}
            <div className="scroll-reveal scroll-delay-2 interactive-card rounded-2xl overflow-hidden shadow-md bg-black relative aspect-video flex items-center justify-center group cursor-pointer">
              <img
                src="https://picsum.photos/seed/video/800/450?blur=1"
                alt="Featured Video"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10 w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                <PlayCircle size={48} className="text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-serif text-xl">Morning Shiva Stotram</h3>
                <p className="text-white/80 text-sm">Peaceful Chants for Meditation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eternal Gyan Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="scroll-heading text-3xl font-serif text-[var(--color-brand-purple)]">
              Eternal Gyan <span className="hindi-text text-2xl ml-2">शाश्वत ज्ञान</span>
            </h2>
            <Link href="/eternal-gyan" className="text-[var(--color-brand-purple)] font-medium hover:text-[var(--color-brand-gold-dark)] flex items-center gap-1">
              Read More <ArrowRight size={16} />
            </Link>
          </div>

          {/* Article cards — staggered slide-up */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GYAN_ARTICLES.map((article, index) => (
              <Link
                key={index}
                href="/eternal-gyan"
                className={`scroll-reveal scroll-stagger-${index + 1} interactive-card group rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white`}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold tracking-wider text-[var(--color-brand-gold-dark)] uppercase mb-2 block">
                    {article.category}
                  </span>
                  <h3 className="text-xl font-serif text-[var(--color-brand-purple)] group-hover:text-[var(--color-brand-gold-dark)] transition-colors">
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Highlights */}
      <section className="py-12 bg-[var(--color-brand-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="scroll-heading text-3xl font-serif text-[var(--color-brand-purple)]">
              Sacred Shop <span className="hindi-text text-2xl ml-2">पवित्र दुकान</span>
            </h2>
            <Link href="/shop" className="text-[var(--color-brand-purple)] font-medium hover:text-[var(--color-brand-gold-dark)] flex items-center gap-1">
              Shop All <ArrowRight size={16} />
            </Link>
          </div>

          {/* Product cards — staggered slide-up with subtle rotation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SHOP_PRODUCTS.map((product, index) => (
              <div
                key={index}
                className={`scroll-reveal scroll-delay-${index + 1} interactive-card bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col`}
              >
                <div className="aspect-square p-4 flex items-center justify-center bg-gray-50 dark:bg-[#1C0A42]/50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-medium text-gray-900 mb-2 flex-grow">{product.name}</h3>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-bold text-[var(--color-brand-purple)]">{product.price}</span>
                    <Link
                      href="/shop"
                      className="secondary-button rounded-md px-3 py-1 text-sm font-medium"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading — gentle fade */}
          <div className="text-center mb-12">
            <h2 className="scroll-fade text-3xl font-serif text-[var(--color-brand-purple)]">
              What Devotees Say <span className="hindi-text text-2xl ml-2">भक्तों के विचार</span>
            </h2>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setIsTestimonialHovered(true)}
            onMouseLeave={() => setIsTestimonialHovered(false)}
          >
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
              {TESTIMONIALS.map((testimonial, idx) => (
                <div key={idx} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                  <div className="bg-white border border-[var(--color-brand-gold)] rounded-2xl p-8 h-full flex flex-col shadow-sm">
                    <div className="flex text-[var(--color-brand-gold)] mb-4">
                      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                    <p className="italic text-gray-700 mb-6 flex-grow">"{testimonial.quote}"</p>
                    <div className="w-12 h-px bg-[var(--color-brand-gold)] mb-4"></div>
                    <div>
                      <p className="font-bold text-[var(--color-brand-purple)]">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === activeTestimonial ? 'w-6 bg-[var(--color-brand-gold)]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LISTEN & PODCAST TEASER ────────────────────── */}
      <section className="scroll-scale bg-gradient-to-br from-[var(--color-brand-purple)] via-[#2D1060] to-[#1B0A3C]
                          py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* Icon cluster */}
          <div className="flex items-center justify-center gap-4 flex-shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-[var(--color-brand-gold)]/20 border border-[var(--color-brand-gold)]/30
                            flex items-center justify-center neu-raised">
              <Headphones size={36} className="text-[var(--color-brand-gold)]" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                <Music2 size={24} className="text-white/70" />
              </div>
              <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                <PlayCircle size={24} className="text-white/70" />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="text-center md:text-left flex-1">
            <p className="text-[var(--color-brand-gold)] text-sm font-medium mb-2 tracking-wide uppercase">Now Available</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold" style={{ color: '#C8962E' }}>
              Listen · सुनें
            </h2>
            <p className="text-white/60 mt-2 text-sm leading-relaxed">
              Devotional podcasts, curated playlists, guided meditations, and our YouTube channel —
              all in one place.
            </p>
          </div>

          {/* CTA */}
          <div className="flex-shrink-0">
            <Link
              href="/listen"
              className="cta-button inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm whitespace-nowrap"
            >
              <Headphones size={16} />
              Go to Listen
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
