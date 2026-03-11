import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Play, BookOpen, Share2, Heart, Download } from 'lucide-react';

const VERSES = [
  {
    id: 1,
    sanskrit: 'श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि ।\nबरनउँ रघुबर बिमल जसु जो दायकु फल चारि ॥',
    transliteration: 'Shri Guru Charan Saroj Raj, Nij Manu Mukuru Sudhari.\nBaranau Raghubar Bimal Jasu, Jo Dayaku Phal Chari.',
    hindi: 'श्री गुरु महाराज के चरण कमलों की धूलि से अपने मन रूपी दर्पण को पवित्र करके श्री रघुवीर के निर्मल यश का वर्णन करता हूँ, जो चारों फल धर्म, अर्थ, काम और मोक्ष को देने वाला है।',
    english: 'Cleansing the mirror of my mind with the dust from the Lotus-feet of Divine Guru, I describe the unblemished glory of Lord Rama, which bestows four fruits of Righteousness (Dharma), Wealth (Artha), Pleasure (Kama) and Liberation (Moksha).',
  },
  {
    id: 2,
    sanskrit: 'बुद्धिहीन तनु जानिके सुमिरौं पवन-कुमार ।\nबल बुधि बिद्या देहु मोहिं हरहु कलेस बिकार ॥',
    transliteration: 'Buddhiheen Tanu Janike, Sumirau Pavan-Kumar.\nBal Budhi Vidya Dehu Mohi, Harahu Kalesh Bikaar.',
    hindi: 'हे पवन कुमार! मैं आपको सुमिरन करता हूँ। आप तो जानते ही हैं कि मेरा शरीर और बुद्धि निर्बल है। मुझे शारीरिक बल, सद्बुद्धि एवं ज्ञान दीजिए और मेरे दुःखों व दोषों का नाश कर दीजिए।',
    english: 'Knowing my body to be devoid of intelligence, I remember Hanuman, the son of Vayu. Give me strength, intelligence and knowledge and remove all ailments (sorrows) and impurities.',
  },
  {
    id: 3,
    sanskrit: 'जय हनुमान ज्ञान गुन सागर ।\nजय कपीस तिहुँ लोक उजागर ॥',
    transliteration: 'Jai Hanuman Gyan Gun Sagar.\nJai Kapis Tihun Lok Ujagar.',
    hindi: 'श्री हनुमान जी! आपकी जय हो। आपका ज्ञान और गुण अथाह है। हे कपीश्वर! आपकी जय हो! तीनों लोकों (स्वर्ग, भूलोक और पाताल) में आपकी कीर्ति है।',
    english: 'Victory to Thee, O Hanuman, Ocean of Wisdom and Virtue. Victory to the Lord of Monkeys, who is well known in all the three worlds.',
  },
  {
    id: 4,
    sanskrit: 'राम दूत अतुलित बल धामा ।\nअंजनि-पुत्र पवनसुत नामा ॥',
    transliteration: 'Ram Doot Atulit Bal Dhama.\nAnjani-Putra Pavansut Nama.',
    hindi: 'हे पवनसुत अंजनी नंदन! आपके समान दूसरा बलवान नहीं है। आप श्रीराम के दूत हैं।',
    english: 'You are the divine messenger of Lord Rama. The repository of immeasurable strength, though known only as Son of Pavan (Wind), born of Anjani.',
  },
];

export default function Mantra() {
  const [activeTabs, setActiveTabs] = useState({
    sanskrit: true,
    transliteration: true,
    hindi: true,
    english: true,
  });

  const toggleTab = (tab: keyof typeof activeTabs) => {
    setActiveTabs((prev) => ({ ...prev, [tab]: !prev[tab] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-[var(--color-brand-purple)]">Home</Link>
        <ChevronRight size={16} className="mx-2" />
        <Link to="/mantras" className="hover:text-[var(--color-brand-purple)]">Mantras & Stotrams</Link>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-[var(--color-brand-purple)] font-medium">Hanuman Chalisa</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="scroll-heading mb-8">
            <h1 className="text-3xl md:text-4xl font-serif text-[var(--color-brand-purple)] mb-4">
              Hanuman Chalisa — Complete Text with Meaning <span className="hindi-text ml-2">हनुमान चालीसा</span>
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <span className="flex items-center gap-1"><span className="font-semibold text-[var(--color-brand-purple)]">Deity:</span> Hanuman</span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1"><span className="font-semibold text-[var(--color-brand-purple)]">Type:</span> Chalisa</span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1"><span className="font-semibold text-[var(--color-brand-purple)]">Verses:</span> 40+3</span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1"><span className="font-semibold text-[var(--color-brand-purple)]">Duration:</span> ~8 min</span>
            </div>
          </div>

          {/* Video Placeholder */}
          <div className="aspect-video bg-black rounded-2xl overflow-hidden relative mb-12 shadow-md group cursor-pointer">
            <img
              src="https://picsum.photos/seed/hanuman-video/800/450?blur=1"
              alt="Hanuman Chalisa Video"
              className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                <Play size={48} className="text-white ml-2" />
              </div>
            </div>
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
                Sanskrit
              </button>
              <button
                onClick={() => toggleTab('transliteration')}
                className={`toggle-switch ${
                  activeTabs.transliteration
                    ? 'toggle-switch-on'
                    : 'toggle-switch-off'
                }`}
              >
                Transliteration
              </button>
              <button
                onClick={() => toggleTab('hindi')}
                className={`toggle-switch ${
                  activeTabs.hindi
                    ? 'toggle-switch-on'
                    : 'toggle-switch-off'
                }`}
              >
                Hindi Meaning
              </button>
              <button
                onClick={() => toggleTab('english')}
                className={`toggle-switch ${
                  activeTabs.english
                    ? 'toggle-switch-on'
                    : 'toggle-switch-off'
                }`}
              >
                English Meaning
              </button>
            </div>
          </div>

          {/* Verses */}
          <div className="space-y-8 mb-12">
            {VERSES.map((verse) => (
              <div key={verse.id} className="scroll-verse bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative">
                <div className="absolute top-6 right-6 text-sm font-serif text-[var(--color-brand-gold-dark)]">
                  {verse.id}
                </div>
                
                {activeTabs.sanskrit && (
                  <div className="mb-4">
                    <p className="text-2xl font-serif hindi-text leading-relaxed whitespace-pre-line">
                      {verse.sanskrit}
                    </p>
                  </div>
                )}
                
                {activeTabs.transliteration && (
                  <div className="mb-4">
                    <p className="text-lg italic text-gray-700 leading-relaxed whitespace-pre-line">
                      {verse.transliteration}
                    </p>
                  </div>
                )}
                
                {activeTabs.hindi && (
                  <div className="mb-4 pt-4 border-t border-gray-100">
                    <p className="text-gray-800 leading-relaxed">
                      <span className="font-semibold text-[var(--color-brand-purple)] mr-2">अर्थ:</span>
                      {verse.hindi}
                    </p>
                  </div>
                )}
                
                {activeTabs.english && (
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-gray-800 leading-relaxed">
                      <span className="font-semibold text-[var(--color-brand-purple)] mr-2">Meaning:</span>
                      {verse.english}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* In Modern Life Section */}
          <div className="scroll-scale bg-[#FFFDF8] border border-[var(--color-brand-gold-dark)] rounded-2xl p-8 mb-12 shadow-sm">
            <h2 className="text-2xl font-serif text-[var(--color-brand-purple)] mb-4">
              In Modern Life <span className="hindi-text ml-2">आधुनिक जीवन में</span>
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For the modern NRI or busy professional, the Hanuman Chalisa serves as a powerful anchor. Chanting it during your morning commute or before a stressful meeting invokes courage and clarity. It reminds us that no matter how complex our challenges seem, devotion and inner strength can overcome any obstacle.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The Chalisa is not just a prayer; it's a psychological tool to banish fear and anxiety, connecting you to your roots wherever you are in the world.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="scroll-from-right lg:col-span-1">
          <div className="sticky top-32 space-y-8">
            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              <button className="cta-button w-full px-6 py-4 rounded-xl flex items-center justify-center gap-2">
                <Play size={20} /> Listen in App
              </button>
              <button className="secondary-button w-full bg-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                <BookOpen size={20} /> Buy the Book
              </button>
              <div className="flex gap-4 mt-2">
                <button className="secondary-button flex-1 bg-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2">
                  <Heart size={18} /> Save
                </button>
                <button className="secondary-button flex-1 bg-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2">
                  <Share2 size={18} /> Share
                </button>
              </div>
            </div>

            {/* Deity Card */}
            <div className="interactive-card bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="h-32 overflow-hidden">
                <img
                  src="https://picsum.photos/seed/hanuman-card/400/200"
                  alt="Hanuman"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif text-[var(--color-brand-purple)] mb-2">
                  Hanuman <span className="hindi-text text-sm ml-1">हनुमान</span>
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  The Devoted Monkey · बजरंगबली
                </p>
                <Link
                  to="/deities/hanuman"
                  className="text-[var(--color-brand-gold-dark)] font-medium hover:text-[var(--color-brand-purple)] transition-colors flex items-center gap-1"
                >
                  More Hanuman Content <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            {/* Related Mantras */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-serif text-[var(--color-brand-purple)] mb-4">Related Mantras</h3>
              <div className="space-y-4">
                <Link to="/mantras/bajrang-baan" className="block group">
                  <h4 className="font-medium text-gray-900 group-hover:text-[var(--color-brand-gold-dark)] transition-colors">Bajrang Baan</h4>
                  <p className="text-sm text-gray-500">Powerful hymn for protection</p>
                </Link>
                <Link to="/mantras/sankat-mochan" className="block group">
                  <h4 className="font-medium text-gray-900 group-hover:text-[var(--color-brand-gold-dark)] transition-colors">Sankat Mochan Hanuman Ashtak</h4>
                  <p className="text-sm text-gray-500">To overcome difficulties</p>
                </Link>
                <Link to="/mantras/hanuman-bahuk" className="block group">
                  <h4 className="font-medium text-gray-900 group-hover:text-[var(--color-brand-gold-dark)] transition-colors">Hanuman Bahuk</h4>
                  <p className="text-sm text-gray-500">For physical ailments</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
