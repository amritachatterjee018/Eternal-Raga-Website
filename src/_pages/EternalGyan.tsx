'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, User, ArrowRight } from 'lucide-react';

const BLOG_POSTS = [
  {
    title: 'The Science Behind Om Chanting',
    category: 'Meditation',
    author: 'Swami Vidyaranya',
    date: 'Oct 12, 2023',
    image: 'https://picsum.photos/seed/om-chanting/600/400',
    excerpt: 'Discover the physiological and psychological benefits of chanting the primordial sound of the universe.',
  },
  {
    title: 'Understanding the 4 Vedas',
    category: 'Scriptures',
    author: 'Dr. R. K. Sharma',
    date: 'Sep 28, 2023',
    image: 'https://picsum.photos/seed/vedas-book/600/400',
    excerpt: 'A comprehensive guide to the Rigveda, Samaveda, Yajurveda, and Atharvaveda and their relevance today.',
  },
  {
    title: 'Significance of Rudraksha',
    category: 'Traditions',
    author: 'Pandit Shivram',
    date: 'Sep 15, 2023',
    image: 'https://picsum.photos/seed/rudraksha-beads/600/400',
    excerpt: 'Explore the spiritual significance, types, and benefits of wearing Rudraksha beads according to Shiva Purana.',
  },
];

const ENCYCLOPAEDIA_COLLECTIONS = [
  {
    title: 'Divine Weapons',
    hindi: 'दिव्य अस्त्र',
    count: '15 Articles',
    image: 'https://picsum.photos/seed/weapons/400/300',
    description: 'Sudarshana Chakra, Trishul, Brahmastra and more.',
  },
  {
    title: 'Tantra-Mantra-Yantra',
    hindi: 'तंत्र-मंत्र-यंत्र',
    count: '24 Articles',
    image: 'https://picsum.photos/seed/yantra/400/300',
    description: 'The esoteric sciences of spiritual realization.',
  },
  {
    title: 'Dashavatar',
    hindi: 'दशावतार',
    count: '10 Articles',
    image: 'https://picsum.photos/seed/dashavatar/400/300',
    description: 'The ten primary incarnations of Lord Vishnu.',
  },
  {
    title: 'Sacred Animals',
    hindi: 'पवित्र पशु',
    count: '12 Articles',
    image: 'https://picsum.photos/seed/nandi/400/300',
    description: 'Nandi, Garuda, Airavata and their symbolism.',
  },
];

export default function EternalGyan() {
  const [activeTab, setActiveTab] = useState<'blog' | 'encyclopaedia'>('blog');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="scroll-heading text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-brand-purple)] mb-4">
          Eternal Gyan <span className="hindi-text ml-2">शाश्वत ज्ञान</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore the depths of Hindu philosophy, traditions, and spiritual sciences through our curated articles and encyclopaedia.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <div className="bg-white rounded-full p-1 border border-gray-200 shadow-sm inline-flex">
          <button
            onClick={() => setActiveTab('blog')}
            className={`filter-pill ${
              activeTab === 'blog'
                ? 'filter-pill-active'
                : 'filter-pill-inactive border-transparent'
            }`}
          >
            Blog & Articles
          </button>
          <button
            onClick={() => setActiveTab('encyclopaedia')}
            className={`filter-pill ${
              activeTab === 'encyclopaedia'
                ? 'filter-pill-active'
                : 'filter-pill-inactive border-transparent'
            }`}
          >
            Encyclopaedia
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'blog' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <article key={idx} className={`scroll-reveal scroll-stagger-${idx + 1} interactive-card bg-white rounded-2xl overflow-hidden border border-[var(--color-brand-gold-dark)] shadow-sm group flex flex-col`}>
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[var(--color-brand-gold)] text-[var(--color-brand-purple)] px-3 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider">
                  {post.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-serif text-[var(--color-brand-purple)] mb-3 group-hover:text-[var(--color-brand-gold-dark)] transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100 mt-auto">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-[var(--color-brand-gold-dark)]" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-[var(--color-brand-gold-dark)]" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ENCYCLOPAEDIA_COLLECTIONS.map((collection, idx) => (
            <Link key={idx} href="/eternal-gyan" className={`scroll-from-right scroll-stagger-${idx + 1} interactive-card bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm group flex flex-col sm:flex-row h-full`}>
              <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 sm:w-3/5 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={16} className="text-[var(--color-brand-gold-dark)]" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{collection.count}</span>
                </div>
                <h2 className="text-2xl font-serif text-[var(--color-brand-purple)] mb-1">
                  {collection.title}
                </h2>
                <p className="text-lg font-serif text-[var(--color-brand-gold-dark)] mb-3">
                  {collection.hindi}
                </p>
                <p className="text-gray-600 mb-4 text-sm">
                  {collection.description}
                </p>
                <span className="text-[var(--color-brand-purple)] font-medium hover:text-[var(--color-brand-gold-dark)] flex items-center gap-1 mt-auto text-sm transition-colors">
                  Explore Collection <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
