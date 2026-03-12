'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronRight, Play, PlayCircle, Headphones, Download, ArrowRight } from 'lucide-react';

const PRONUNCIATION_GUIDE = [
  { sanskrit: 'ॐ', iast: 'oṃ', meaning: 'The primordial sound' },
  { sanskrit: 'भूर्', iast: 'bhūr', meaning: 'Earth plane' },
  { sanskrit: 'भुवः', iast: 'bhuvaḥ', meaning: 'Atmospheric plane' },
  { sanskrit: 'स्वः', iast: 'svaḥ', meaning: 'Heavenly plane' },
  { sanskrit: 'तत्', iast: 'tat', meaning: 'That (Supreme Spirit)' },
  { sanskrit: 'सवितुर्', iast: 'savitur', meaning: 'The Creator/Sun' },
  { sanskrit: 'वरेण्यं', iast: 'vareṇyaṃ', meaning: 'Most adorable/fit to be worshipped' },
];

export default function GayatriMantra() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-[var(--color-brand-purple)]">Home</Link>
        <ChevronRight size={16} className="mx-2 flex-shrink-0" />
        <Link href="/mantras" className="hover:text-[var(--color-brand-purple)]">Mantras & Stotrams</Link>
        <ChevronRight size={16} className="mx-2 flex-shrink-0" />
        <span className="hover:text-[var(--color-brand-purple)] cursor-pointer">Jap Mantras</span>
        <ChevronRight size={16} className="mx-2 flex-shrink-0" />
        <span className="text-[var(--color-brand-purple)] font-medium">Gayatri Mantra</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-serif text-[var(--color-brand-purple)] mb-4">
              Gayatri Mantra <span className="hindi-text ml-2">गायत्री मंत्र</span>
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <span className="flex items-center gap-1"><span className="font-semibold text-[var(--color-brand-purple)]">Deity:</span> Savitri/Universal</span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1"><span className="font-semibold text-[var(--color-brand-purple)]">Type:</span> Jap Mantra</span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1"><span className="font-semibold text-[var(--color-brand-purple)]">Repetitions:</span> 108</span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1"><span className="font-semibold text-[var(--color-brand-purple)]">Duration:</span> ~15 min</span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1"><span className="font-semibold text-[var(--color-brand-purple)]">Best Time:</span> Sunrise (Sandhya)</span>
            </div>
          </div>

          {/* Video Placeholder */}
          <div className="aspect-video bg-black rounded-2xl overflow-hidden relative mb-12 shadow-md group cursor-pointer">
            <img
              src="https://picsum.photos/seed/gayatri-video/800/450?blur=1"
              alt="Gayatri Mantra Video"
              className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                <Play size={48} className="text-white ml-2" />
              </div>
            </div>
          </div>

          {/* THE MANTRA CENTERPIECE */}
          <div className="bg-white rounded-2xl border-2 border-[var(--color-brand-gold)] shadow-lg p-8 md:p-12 mb-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--color-brand-gold-light)] via-[var(--color-brand-gold)] to-[var(--color-brand-gold-light)]"></div>
            
            <p className="text-3xl md:text-4xl leading-relaxed text-[var(--color-brand-purple)] font-medium mb-6 hindi-text">
              ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्
            </p>
            
            <p className="text-lg md:text-xl italic text-gray-600 mb-8">
              oṃ bhūr bhuvaḥ svaḥ tat savitur vareṇyaṃ bhargo devasya dhīmahi dhiyo yo naḥ pracodayāt
            </p>
            
            <div className="w-24 h-[1px] bg-[var(--color-brand-gold)] mx-auto mb-8"></div>
            
            <p className="text-lg text-gray-800 mb-6 hindi-text leading-relaxed">
              हम उस परमात्मा की उपासना करते हैं जो सब जगत का प्रकाशक है, पूजनीय है, जो सभी दुखों का नाशक है। हम उस देवता के तेज का ध्यान करते हैं। वह हमारी बुद्धि को सन्मार्ग पर प्रेरित करें।
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed font-serif">
              We meditate upon the glory of that Supreme Being who illuminates all the three worlds. May that divine being enlighten our intellect and guide us on the right path.
            </p>
          </div>

          {/* PRONUNCIATION GUIDE */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif text-[var(--color-brand-purple)] mb-6">Pronunciation Guide</h2>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-4 px-6 font-semibold text-gray-700">Sanskrit</th>
                    <th className="py-4 px-6 font-semibold text-gray-700">Transliteration</th>
                    <th className="py-4 px-6 font-semibold text-gray-700">Meaning</th>
                    <th className="py-4 px-6 font-semibold text-gray-700 text-right">Audio</th>
                  </tr>
                </thead>
                <tbody>
                  {PRONUNCIATION_GUIDE.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-xl hindi-text text-[var(--color-brand-purple)]">{item.sanskrit}</td>
                      <td className="py-4 px-6 italic text-gray-600">{item.iast}</td>
                      <td className="py-4 px-6 text-gray-700">{item.meaning}</td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-[var(--color-brand-gold-dark)] hover:text-[var(--color-brand-purple)] transition-colors">
                          <PlayCircle size={24} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* HOW TO CHANT 108 TIMES */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif text-[var(--color-brand-purple)] mb-6">How to Chant 108 Times</h2>
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <ol className="space-y-6 mb-8">
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-brand-purple)] text-[var(--color-brand-gold)] flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">Find a Quiet Space</h3>
                    <p className="text-gray-600">Sit comfortably facing East or North, preferably during Sandhya (sunrise, noon, or sunset).</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-brand-purple)] text-[var(--color-brand-gold)] flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">Use a Rudraksha Mala</h3>
                    <p className="text-gray-600">Hold the mala in your right hand, using your thumb and middle finger to move the beads. Avoid using the index finger.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-brand-purple)] text-[var(--color-brand-gold)] flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">Focus and Breathe</h3>
                    <p className="text-gray-600">Take a few deep breaths. Chant the mantra clearly, focusing on the meaning and vibration of each syllable.</p>
                  </div>
                </li>
              </ol>
              
              <button className="cta-button w-full sm:w-auto rounded-full py-4 px-8 font-semibold flex items-center justify-center gap-2 text-lg">
                Start 108 Chant in App <span className="hindi-text ml-1">ऐप में 108 जप शुरू करें</span>
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif text-[var(--color-brand-purple)] mb-6">Benefits of Chanting</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Improves concentration and learning power',
                'Removes toxins from the body',
                'Improves breathing and nervous system',
                'Keeps the heart healthy',
                'Removes negativity and brings peace',
                'Awakens spiritual consciousness'
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-brand-gold)] mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* In Modern Life */}
          <div className="bg-[var(--color-brand-bg)] rounded-2xl p-8 mb-12 border border-[var(--color-brand-gold-light)]">
            <h2 className="text-2xl font-serif text-[var(--color-brand-purple)] mb-4">In Modern Life</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For the modern NRI or busy professional, the Gayatri Mantra serves as a powerful grounding tool. Just 15 minutes of chanting before starting the workday can significantly reduce stress and improve focus. 
            </p>
            <p className="text-gray-700 leading-relaxed">
              It acts as a mental reset button, helping to clear the noise of endless notifications and deadlines, replacing anxiety with clarity and purpose. Many find that silently repeating it during a stressful commute transforms the experience into a moving meditation.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            {/* Audio Player */}
            <div className="interactive-card bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-serif text-xl text-[var(--color-brand-purple)] mb-4">Listen to Mantra</h3>
              <div className="flex items-center gap-4 mb-6">
                <button className="w-14 h-14 rounded-full bg-[var(--color-brand-gold)] text-[var(--color-brand-purple)] flex items-center justify-center hover:scale-105 transition-transform flex-shrink-0">
                  <Play size={24} className="ml-1" />
                </button>
                <div>
                  <div className="font-medium text-gray-900">Gayatri Mantra (108 Times)</div>
                  <div className="text-sm text-gray-500">Anuradha Paudwal</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button className="secondary-button w-full rounded-xl py-3 px-4 flex items-center justify-between group">
                  <span className="flex items-center gap-2 text-gray-700 group-hover:text-[var(--color-brand-purple)]">
                    <Headphones size={20} /> Listen on Spotify
                  </span>
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-[var(--color-brand-gold)]" />
                </button>
                <button className="secondary-button w-full rounded-xl py-3 px-4 flex items-center justify-between group">
                  <span className="flex items-center gap-2 text-gray-700 group-hover:text-[var(--color-brand-purple)]">
                    <Download size={20} /> Download MP3
                  </span>
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-[var(--color-brand-gold)]" />
                </button>
              </div>
            </div>

            {/* Related Jap Mantras */}
            <div className="interactive-card bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-serif text-xl text-[var(--color-brand-purple)] mb-4">Related Jap Mantras</h3>
              <div className="space-y-4">
                {[
                  { name: 'Om Namah Shivaya', type: 'Panchakshari Mantra' },
                  { name: 'Mahamrityunjaya', type: 'Life-giving Mantra' },
                  { name: 'Hare Krishna', type: 'Maha Mantra' }
                ].map((mantra, idx) => (
                  <Link key={idx} href="#" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
                    <div className="font-medium text-[var(--color-brand-purple)]">{mantra.name}</div>
                    <div className="text-sm text-gray-500">{mantra.type}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
