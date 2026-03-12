'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Play, ChevronDown, ChevronUp } from 'lucide-react';

const VERSES = [
  {
    id: 1,
    sanskrit: 'ब्रह्ममुरारिसुरार्चितलिङ्गं निर्मलभासितशोभितलिङ्गम् ।\nजन्मजदुःखविनाशकलिङ्गं तत्प्रणमामि सदाशिवलिङ्गम् ॥',
    transliteration: 'brahmamurāri surārcita liṅgaṃ nirmalabhāsita śobhita liṅgam |\njanmaja duḥkha vināśaka liṅgaṃ tat praṇamāmi sadāśiva liṅgam ||',
    hindi: 'ब्रह्मा, विष्णु और देवताओं द्वारा पूजित, निर्मल प्रकाश से शोभित, जन्म-जन्म के दुःखों का नाश करने वाले उस सदाशिव लिंग को मैं प्रणाम करता हूँ।',
    english: 'I bow to that Sadashiva Lingam, which is worshipped by Brahma, Vishnu, and all the celestial beings, which shines with a pure radiance, and which destroys the suffering accumulated over lifetimes.',
  },
  {
    id: 2,
    sanskrit: 'देवमुनिप्रवरार्चितलिङ्गं कामदहं करुणाकरलिङ्गम् ।\nरावणदर्पविनाशनलिङ्गं तत्प्रणमामि सदाशिवलिङ्गम् ॥',
    transliteration: 'devamunipravarārcita liṅgaṃ kāmadahaṃ karuṇākara liṅgam |\nrāvaṇadarpavināśana liṅgaṃ tat praṇamāmi sadāśiva liṅgam ||',
    hindi: 'देवताओं और श्रेष्ठ मुनियों द्वारा पूजित, कामदेव को भस्म करने वाले, करुणामय, रावण के अहंकार का नाश करने वाले उस सदाशिव लिंग को मैं प्रणाम करता हूँ।',
    english: 'I bow to that Sadashiva Lingam, which is worshipped by gods and the best of sages, which destroyed the god of love (Kama), which is the source of compassion, and which destroyed the pride of Ravana.',
  },
  {
    id: 3,
    sanskrit: 'सर्वसुगन्धिसुलेपितलिङ्गं बुद्धिविवर्धनकारणलिङ्गम् ।\nसिद्धसुरासुरवन्दितलिङ्गं तत्प्रणमामि सदाशिवलिङ्गम् ॥',
    transliteration: 'sarvasugandhisulepita liṅgaṃ buddhivivardhanakāraṇa liṅgam |\nsiddhasurāsuravandita liṅgaṃ tat praṇamāmi sadāśiva liṅgam ||',
    hindi: 'सभी प्रकार के सुगंधित द्रव्यों से लेपित, बुद्धि को बढ़ाने वाले, सिद्धों, देवताओं और असुरों द्वारा वंदित उस सदाशिव लिंग को मैं प्रणाम करता हूँ।',
    english: 'I bow to that Sadashiva Lingam, which is well-anointed with all fragrant substances, which is the cause of the enhancement of intelligence, and which is praised by Siddhas, gods, and demons.',
  },
];

export default function Lingashtakam() {
  const [activeTabs, setActiveTabs] = useState({
    sanskrit: true,
    transliteration: true,
    hindi: true,
    english: true,
  });
  
  const [isHowToReciteOpen, setIsHowToReciteOpen] = useState(false);

  const toggleTab = (tab: keyof typeof activeTabs) => {
    setActiveTabs((prev) => ({ ...prev, [tab]: !prev[tab] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-[var(--color-brand-purple)]">Home</Link>
        <ChevronRight size={16} className="mx-2" />
        <Link href="/mantras" className="hover:text-[var(--color-brand-purple)]">Mantras & Stotrams</Link>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-gray-500">Ashtakam</span>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-[var(--color-brand-purple)] font-medium">Lingashtakam</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8 max-w-[800px]">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif text-[var(--color-brand-purple)] mb-2">
              Lingashtakam — Glorification of the Shiva Lingam
            </h1>
            <h2 className="text-xl font-serif text-[var(--color-brand-gold-dark)] mb-6">
              लिंगाष्टकम् — शिव लिंग की स्तुति
            </h2>
            
            {/* Quick Info Bar */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 bg-white p-4 rounded-lg border-l-4 border-[var(--color-brand-gold)] shadow-sm">
              <span className="font-medium">Deity: Lord Shiva · शिव</span>
              <span className="text-gray-300">|</span>
              <span className="font-medium">Type: Ashtakam · अष्टकम्</span>
              <span className="text-gray-300">|</span>
              <span className="font-medium">Verses: 8</span>
              <span className="text-gray-300">|</span>
              <span className="font-medium">Duration: ~5 min</span>
              <span className="text-gray-300">|</span>
              <span className="font-medium">Composer: Adi Shankaracharya</span>
              <span className="text-gray-300">|</span>
              <span className="font-medium">Best Time: Monday morning, Pradosh Kaal</span>
            </div>
          </div>

          {/* Video Placeholder */}
          <div className="mb-12">
            <div className="aspect-video bg-black rounded-2xl overflow-hidden relative shadow-md group cursor-pointer mb-3">
              <img
                src="https://picsum.photos/seed/shiva-lingam/800/450?blur=1"
                alt="Lingashtakam Video"
                className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <Play size={48} className="text-white ml-2" />
                </div>
              </div>
            </div>
            <a href="#" className="text-[var(--color-brand-purple)] hover:text-[var(--color-brand-gold-dark)] font-medium flex items-center gap-1 transition-colors">
              Watch more Shiva content on YouTube <ChevronRight size={16} />
            </a>
          </div>

          {/* Toggles */}
          <div className="sticky top-16 z-40 bg-[var(--color-brand-bg)] py-4 mb-8 border-b border-gray-200">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => toggleTab('sanskrit')}
                className={`toggle-switch ${
                  activeTabs.sanskrit
                    ? 'toggle-switch-on'
                    : 'toggle-switch-off'
                }`}
              >
                Sanskrit संस्कृत
              </button>
              <button
                onClick={() => toggleTab('transliteration')}
                className={`toggle-switch ${
                  activeTabs.transliteration
                    ? 'toggle-switch-on'
                    : 'toggle-switch-off'
                }`}
              >
                Transliteration लिप्यन्तरण
              </button>
              <button
                onClick={() => toggleTab('hindi')}
                className={`toggle-switch ${
                  activeTabs.hindi
                    ? 'toggle-switch-on'
                    : 'toggle-switch-off'
                }`}
              >
                Hindi Meaning हिंदी अर्थ
              </button>
              <button
                onClick={() => toggleTab('english')}
                className={`toggle-switch ${
                  activeTabs.english
                    ? 'toggle-switch-on'
                    : 'toggle-switch-off'
                }`}
              >
                English Meaning अंग्रेजी अर्थ
              </button>
            </div>
          </div>

          {/* Verses */}
          <div className="space-y-8 mb-12">
            {VERSES.map((verse, index) => (
              <div key={verse.id} className="relative">
                <div className="mb-2 text-sm font-serif text-gray-400">Verse {verse.id}</div>
                
                {activeTabs.sanskrit && (
                  <div className="mb-4">
                    <p className="text-[20px] font-serif hindi-text leading-relaxed whitespace-pre-line text-gray-900">
                      {verse.sanskrit}
                    </p>
                  </div>
                )}
                
                {activeTabs.transliteration && (
                  <div className="mb-4">
                    <p className="text-[15px] italic text-gray-600 leading-relaxed whitespace-pre-line">
                      {verse.transliteration}
                    </p>
                  </div>
                )}
                
                {activeTabs.hindi && (
                  <div className="mb-4">
                    <p className="text-[16px] text-[var(--color-brand-gold-dark)] leading-relaxed">
                      {verse.hindi}
                    </p>
                  </div>
                )}
                
                {activeTabs.english && (
                  <div className="mb-4">
                    <p className="text-[16px] text-gray-700 leading-relaxed">
                      {verse.english}
                    </p>
                  </div>
                )}
                
                {index < VERSES.length - 1 && (
                  <hr className="border-t border-[var(--color-brand-gold)]/30 my-8" />
                )}
              </div>
            ))}
            
            <div className="text-center mt-12 mb-8">
              <p className="text-lg font-serif italic text-[var(--color-brand-gold-dark)]">
                इति लिंगाष्टकम् सम्पूर्णम् ॥ Thus ends the Lingashtakam ॥
              </p>
            </div>
          </div>

          {/* How to Recite Accordion */}
          <div className="mb-8 border border-[var(--color-brand-gold)]/30 rounded-xl overflow-hidden bg-white shadow-sm">
            <button 
              onClick={() => setIsHowToReciteOpen(!isHowToReciteOpen)}
              className="w-full flex items-center justify-between p-6 bg-[var(--color-brand-gold)]/10 hover:bg-[var(--color-brand-gold)]/20 transition-colors"
            >
              <h3 className="text-xl font-serif text-[var(--color-brand-purple)]">How to Recite</h3>
              {isHowToReciteOpen ? <ChevronUp size={24} className="text-[var(--color-brand-purple)]" /> : <ChevronDown size={24} className="text-[var(--color-brand-purple)]" />}
            </button>
            
            {isHowToReciteOpen && (
              <div className="p-6">
                <ul className="list-disc pl-5 space-y-3 text-gray-700">
                  <li>Best recited during Pradosh Kaal or on Mondays</li>
                  <li>Sit facing North or East</li>
                  <li>Light a diya and incense before reciting</li>
                  <li>Can be chanted 1, 3, or 11 times for deeper effect</li>
                </ul>
              </div>
            )}
          </div>

          {/* In Modern Life Section */}
          <div className="bg-[#FFF8E7] rounded-2xl p-8 mb-12 shadow-sm border border-[var(--color-brand-gold)]/20">
            <h2 className="text-2xl font-serif text-[var(--color-brand-purple)] mb-4">
              In Modern Life <span className="hindi-text ml-2 text-[var(--color-brand-gold-dark)]">आधुनिक जीवन में</span>
            </h2>
            <p className="text-gray-800 leading-relaxed mb-4">
              For NRI professionals navigating the pressures of corporate life abroad, the Lingashtakam offers a profound reminder that the divine is formless and can be worshipped anywhere — you don't need a temple to connect with Shiva. Each verse dissolves a layer of worldly attachment, making this an ideal 5-minute practice before a stressful meeting or during a lunch break.
            </p>
            <p className="text-gray-800 leading-relaxed">
              By chanting these verses, you anchor yourself in the eternal, finding peace amidst the chaos of modern existence. It serves as a spiritual reset button, clearing the mind and rejuvenating the spirit.
            </p>
          </div>

          {/* CTA Block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="interactive-card bg-gradient-to-br from-[var(--color-brand-purple)] to-indigo-900 rounded-2xl p-6 text-white flex flex-col items-center text-center shadow-md">
              <h3 className="text-xl font-bold mb-4">Listen in the Eternal Raga App</h3>
              <div className="w-24 h-40 bg-gray-800 rounded-xl border-4 border-gray-700 mb-4 flex items-center justify-center">
                <Play size={32} className="text-[var(--color-brand-gold)]" />
              </div>
              <div className="flex gap-2">
                <div className="bg-black px-3 py-1 rounded-md text-xs border border-gray-600">App Store</div>
                <div className="bg-black px-3 py-1 rounded-md text-xs border border-gray-600">Play Store</div>
              </div>
            </div>
            
            <div className="interactive-card bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-md">
              <h3 className="text-xl font-bold text-[var(--color-brand-purple)] mb-4">Buy Shiva Stotram Collection Book</h3>
              <div className="w-28 h-40 bg-gray-100 rounded-md shadow-inner mb-4 flex items-center justify-center overflow-hidden">
                <img src="https://picsum.photos/seed/shiva-book/200/300" alt="Book Cover" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="text-2xl font-bold text-[var(--color-brand-purple)] mb-4">$12.99</div>
              <button className="cta-button w-full px-6 py-2 rounded-full flex items-center justify-center">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-8">
            {/* Audio Mini Player */}
            <div className="interactive-card bg-white rounded-2xl border border-gray-200 shadow-md p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                  <img src="https://picsum.photos/seed/shiva-audio/100/100" alt="Album Art" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-brand-purple)]">Lingashtakam</h3>
                  <p className="text-sm text-gray-500 hindi-text">लिंगाष्टकम्</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <button className="w-12 h-12 rounded-full bg-[var(--color-brand-gold)] text-[var(--color-brand-purple)] flex items-center justify-center hover:scale-105 transition-transform flex-shrink-0">
                  <Play size={24} className="ml-1" />
                </button>
                <div className="flex-grow">
                  <div className="h-2 bg-gray-200 rounded-full w-full overflow-hidden">
                    <div className="h-full bg-[var(--color-brand-purple)] w-1/3"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1:42</span>
                    <span>5:12</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center gap-3 pt-4 border-t border-gray-100">
                <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded text-gray-600">Spotify</span>
                <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded text-gray-600">Apple Music</span>
                <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded text-gray-600">YT Music</span>
              </div>
            </div>

            <hr className="border-t border-[var(--color-brand-gold)]/30" />

            {/* Deity Card */}
            <Link href="/deities/shiva" className="interactive-card block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group">
              <div className="h-32 overflow-hidden relative">
                <img
                  src="https://picsum.photos/seed/shiva-card/400/200"
                  alt="Shiva"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-xl font-serif text-white">
                    Shiva <span className="hindi-text text-sm ml-1">शिव</span>
                  </h3>
                </div>
              </div>
              <div className="p-4 bg-[var(--color-brand-purple)] text-white flex items-center justify-between">
                <span className="text-sm font-medium">More Shiva Content</span>
                <ChevronRight size={18} className="text-[var(--color-brand-gold)]" />
              </div>
            </Link>

            <hr className="border-t border-[var(--color-brand-gold)]/30" />

            {/* Related Ashtakams */}
            <div>
              <h3 className="text-lg font-serif text-[var(--color-brand-purple)] mb-4">Related Ashtakams</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-700 hover:text-[var(--color-brand-gold-dark)] font-medium flex items-center gap-2 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-gold)]"></div>
                    Bilvashtakam
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-700 hover:text-[var(--color-brand-gold-dark)] font-medium flex items-center gap-2 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-gold)]"></div>
                    Shiva Ashtakam
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-700 hover:text-[var(--color-brand-gold-dark)] font-medium flex items-center gap-2 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-gold)]"></div>
                    Chandrashekhara Ashtakam
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-700 hover:text-[var(--color-brand-gold-dark)] font-medium flex items-center gap-2 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-gold)]"></div>
                    Kalabhairava Ashtakam
                  </Link>
                </li>
              </ul>
            </div>

            <hr className="border-t border-[var(--color-brand-gold)]/30" />

            {/* Other Shiva Texts */}
            <div>
              <h3 className="text-lg font-serif text-[var(--color-brand-purple)] mb-4">Other Shiva Texts</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-700 hover:text-[var(--color-brand-gold-dark)] font-medium flex items-center gap-2 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-gold)]"></div>
                    Shiv Chalisa
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-700 hover:text-[var(--color-brand-gold-dark)] font-medium flex items-center gap-2 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-gold)]"></div>
                    Shiva Tandava Stotram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-700 hover:text-[var(--color-brand-gold-dark)] font-medium flex items-center gap-2 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-gold)]"></div>
                    Rudrashtakam
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
