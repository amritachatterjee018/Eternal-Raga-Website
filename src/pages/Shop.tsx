import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Filter, Star, Heart } from 'lucide-react';

const SHOP_PRODUCTS = [
  {
    id: 1,
    name: 'Bhagavad Gita Hardcover',
    price: '$24.99',
    rating: 4.9,
    reviews: 124,
    image: 'https://picsum.photos/seed/gita-hardcover/400/400',
    category: 'Books',
    badge: 'Bestseller',
  },
  {
    id: 2,
    name: 'Sadhana Journal',
    price: '$14.99',
    rating: 4.8,
    reviews: 86,
    image: 'https://picsum.photos/seed/sadhana-journal/400/400',
    category: 'Journals',
    badge: 'Premium',
  },
  {
    id: 3,
    name: 'Gita Flash Cards',
    price: '$12.99',
    rating: 4.7,
    reviews: 312,
    image: 'https://picsum.photos/seed/gita-cards/400/400',
    category: 'Gita Cards',
  },
  {
    id: 4,
    name: '108 Mantras eBook',
    price: '$9.99',
    rating: 5.0,
    reviews: 540,
    image: 'https://picsum.photos/seed/mantras-ebook/400/400',
    category: 'Digital Downloads',
  },
  {
    id: 5,
    name: 'Hanuman Chalisa Pocket Book',
    price: '$7.99',
    rating: 4.6,
    reviews: 75,
    image: 'https://picsum.photos/seed/hanuman-pocket/400/400',
    category: 'Books',
  },
  {
    id: 6,
    name: 'Sadhana Starter Kit Bundle',
    price: '$39.99',
    rating: 4.9,
    reviews: 210,
    image: 'https://picsum.photos/seed/sadhana-bundle/400/400',
    category: 'Bundles',
    badge: 'Value Pack',
  },
];

const CATEGORIES = ['All', 'Books', 'Journals', 'Digital Downloads', 'Gita Cards', 'Bundles'];

const SHOP_TESTIMONIALS = [
  { quote: "The Sadhana Journal completely transformed my morning routine.", name: "Arjun K." },
  { quote: "Beautiful quality. The Gita flash cards are perfect for my kids.", name: "Priya S." },
  { quote: "Fast shipping and the books were packaged with such care.", name: "David M." }
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % SHOP_TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const filteredProducts = activeCategory === 'All'
    ? SHOP_PRODUCTS
    : SHOP_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-brand-purple)] mb-2">
            Sacred Shop <span className="hindi-text ml-2">पवित्र दुकान</span>
          </h1>
          <p className="text-gray-600">Authentic spiritual items for your daily practice.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="secondary-button rounded-lg px-4 py-2 flex items-center gap-2">
            <Filter size={18} /> Filters
          </button>
          <button className="cta-button rounded-lg px-4 py-2 flex items-center gap-2 relative">
            <ShoppingCart size={18} /> Cart
            <span className="absolute -top-2 -right-2 bg-[var(--color-brand-gold)] text-[var(--color-brand-purple)] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex overflow-x-auto gap-3 pb-4 mb-8 hide-scrollbar">
        {CATEGORIES.map(category => (
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

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="interactive-card bg-white rounded-2xl border border-[var(--color-brand-gold-dark)] shadow-sm overflow-hidden group flex flex-col relative">
            {/* Badge */}
            {product.badge && (
              <div className="absolute top-4 left-4 z-10 bg-[var(--color-brand-purple)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {product.badge}
              </div>
            )}
            
            {/* Favorite Button */}
            <button className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-colors shadow-sm">
              <Heart size={16} />
            </button>

            {/* Image */}
            <Link to={`/shop/${product.id}`} className="aspect-square bg-gray-50 overflow-hidden relative flex items-center justify-center p-6">
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </Link>

            {/* Details */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-1 text-sm text-[var(--color-brand-gold-dark)] mb-2">
                <Star size={14} fill="currentColor" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-gray-400">({product.reviews})</span>
              </div>
              
              <Link to={`/shop/${product.id}`} className="block flex-grow">
                <h3 className="text-lg font-medium text-gray-900 mb-1 group-hover:text-[var(--color-brand-purple)] transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{product.category}</p>
              </Link>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <span className="text-2xl font-bold text-[var(--color-brand-purple)]">{product.price}</span>
                <button className="cta-button px-4 py-2 rounded-lg flex items-center gap-2">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonial Strip */}
      <div className="mt-16 bg-[#FFFDF0] border border-[var(--color-brand-gold)]/30 rounded-2xl p-8 text-center relative overflow-hidden">
        <div className="flex justify-center mb-4 text-[var(--color-brand-gold)]">
          <Star size={20} fill="currentColor" />
          <Star size={20} fill="currentColor" />
          <Star size={20} fill="currentColor" />
          <Star size={20} fill="currentColor" />
          <Star size={20} fill="currentColor" />
        </div>
        <div className="relative h-20">
          {SHOP_TESTIMONIALS.map((testimonial, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 flex flex-col items-center justify-center ${
                idx === activeTestimonial ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <p className="text-lg italic text-[var(--color-brand-purple)] mb-2">"{testimonial.quote}"</p>
              <p className="text-sm font-bold text-gray-500">— {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
