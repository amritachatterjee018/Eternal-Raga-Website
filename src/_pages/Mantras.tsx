'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Play, Search, ChevronDown, X } from 'lucide-react';

/* ─── Type definitions ─────────────────────────────────────────── */
interface TypeInfo {
  key: string;           // matches MANTRAS_DATA.type
  label: string;
  hindi: string;
  definition: string;
  example: string;
}

/* ─── Category metadata (for filter pill info cards) ────────────── */
const TYPE_INFO: TypeInfo[] = [
  {
    key: 'All',
    label: 'All Types',
    hindi: 'सभी',
    definition: 'Browse the complete collection of sacred texts across all categories.',
    example: '',
  },
  {
    key: 'Chalisas',
    label: 'Chalisa',
    hindi: 'चालीसा',
    definition: 'A devotional hymn of 40 verses (chalis = forty). Written in Awadhi or Hindi, beloved across North India.',
    example: 'Hanuman Chalisa, Shiv Chalisa, Ganesh Chalisa',
  },
  {
    key: 'Stotrams',
    label: 'Stotra / Stotram',
    hindi: 'स्तोत्र',
    definition: 'Hymns of praise composed by saints and sages in Sanskrit, describing a deity\'s powers and glories.',
    example: 'Shiva Tandava Stotram, Vishnu Sahasranamam',
  },
  {
    key: 'Ashtakams',
    label: 'Ashtakam',
    hindi: 'अष्टकम्',
    definition: 'A stotra with exactly 8 verses (ashta = eight). Compact yet powerful — ideal for daily recitation.',
    example: 'Lingashtakam, Madhurashtakam, Kalabhairava Ashtakam',
  },
  {
    key: 'Aartis',
    label: 'Aarti',
    hindi: 'आरती',
    definition: 'Devotional songs sung while waving a lit lamp before the deity during puja ceremonies.',
    example: 'Om Jai Jagdish Hare, Jai Ganesh Deva',
  },
  {
    key: 'Suktams',
    label: 'Suktam',
    hindi: 'सूक्तम्',
    definition: 'Ancient Vedic hymns from the oldest scriptures, chanted in precise Vedic meter.',
    example: 'Sri Suktam, Purusha Suktam, Durga Suktam',
  },
  {
    key: 'Kavachs',
    label: 'Kavach',
    hindi: 'कवच',
    definition: 'Literally "armor" — a protective prayer invoking divine shielding over every part of life.',
    example: 'Devi Kavach, Narayana Kavacham',
  },
  {
    key: 'Jap Mantras',
    label: 'Jap Mantra',
    hindi: 'जप मंत्र',
    definition: 'A short mantra repeated 108 times using a mala (prayer beads) to deepen meditation.',
    example: 'Om Namah Shivaya, Gayatri Mantra, Hare Krishna Mahamantra',
  },
  {
    key: 'Beej Mantras',
    label: 'Beej Mantra',
    hindi: 'बीज मंत्र',
    definition: 'A single sacred syllable — the "seed sound" of a deity or cosmic energy. Most concentrated divine vibration.',
    example: 'OM (ॐ), SHREEM (श्रीं), KLEEM (क्लीं)',
  },
  {
    key: '108 Names',
    label: '108 Names',
    hindi: 'अष्टोत्तर शतनामावली',
    definition: 'A collection of 108 sacred names of a deity, each revealing a different quality or divine form.',
    example: '108 Names of Shiva, 108 Names of Vishnu',
  },
];

/* ─── SEO knowledge definitions (Part 2) ────────────────────────── */
const KNOWLEDGE_DEFS = [
  {
    key: 'beej',
    label: 'Beej Mantra',
    hindi: 'बीज मंत्र',
    body: 'A single sacred syllable — the "seed sound" of a deity or cosmic energy. The most concentrated form of divine vibration, chanted to activate specific spiritual energies. Each deity has a unique beej that carries their essence in one sound.',
    example: 'OM (ॐ), SHREEM (श्रीं), KLEEM (क्लीं)',
  },
  {
    key: 'jap',
    label: 'Jap Mantra',
    hindi: 'जप मंत्र',
    body: 'A short mantra repeated 108 times using a mala (prayer beads). The repetition creates a meditative rhythm that calms the mind and deepens connection to the deity. The number 108 is sacred in Hinduism, representing the universe\'s wholeness.',
    example: 'Om Namah Shivaya, Gayatri Mantra, Hare Krishna Mahamantra',
  },
  {
    key: 'chalisa',
    label: 'Chalisa',
    hindi: 'चालीसा',
    body: 'A devotional hymn of 40 verses (chalis = forty in Hindi). Written in Awadhi or Hindi, Chalisas are the most popular form of daily prayer across North India — easy to memorize and deeply beloved across generations.',
    example: 'Hanuman Chalisa, Shiv Chalisa, Ganesh Chalisa',
  },
  {
    key: 'stotra',
    label: 'Stotra / Stotram',
    hindi: 'स्तोत्र',
    body: 'A hymn of praise composed by saints and sages, usually in Sanskrit. Stotras describe the qualities, powers, and glories of a deity, ranging from short poems to thousand-name collections chanted across temples worldwide.',
    example: 'Shiva Tandava Stotram, Vishnu Sahasranamam, Bhaja Govindam',
  },
  {
    key: 'ashtakam',
    label: 'Ashtakam',
    hindi: 'अष्टकम्',
    body: 'A specific type of stotra with exactly 8 verses (ashta = eight). Each verse praises a different aspect of the deity — compact yet powerful, ideal for daily recitation when time is limited.',
    example: 'Lingashtakam, Madhurashtakam, Kalabhairava Ashtakam',
  },
  {
    key: 'aarti',
    label: 'Aarti',
    hindi: 'आरती',
    body: 'A devotional song sung while waving a lit lamp before the deity. Aartis are performed during puja ceremonies at home and in temples, marking the climactic moment of worship when divine grace descends.',
    example: 'Om Jai Jagdish Hare, Jai Ganesh Deva',
  },
  {
    key: 'suktam',
    label: 'Suktam',
    hindi: 'सूक्तम्',
    body: 'Ancient Vedic hymns from the oldest scriptures in Hinduism. Suktams are chanted in precise Vedic meter and carry the most ancient spiritual vibrations known to humanity — some dating back over 3,500 years.',
    example: 'Sri Suktam, Purusha Suktam, Durga Suktam',
  },
  {
    key: 'kavach',
    label: 'Kavach',
    hindi: 'कवच',
    body: 'Literally "armor" — a protective prayer invoking divine shielding over every part of the body and life. Chanted for spiritual protection against negative energies and obstacles on the path.',
    example: 'Devi Kavach, Narayana Kavacham',
  },
  {
    key: '108names',
    label: '108 Names',
    hindi: 'अष्टोत्तर शतनामावली',
    body: 'A collection of 108 sacred names of a deity, each revealing a different quality or form. Chanting all 108 names equals offering 108 prayers — often used during special pujas and festivals.',
    example: '108 Names of Shiva, 108 Names of Vishnu',
  },
];

/* ─── Mantra data ──────────────────────────────────────────────── */
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
  { id: 1,  name: 'Lingashtakam',              hindi: 'लिंगाष्टकम्',           type: 'Ashtakams', deity: 'Shiva',   duration: '~5 min',  desc: 'Glorification of the Shiva Lingam by Adi Shankaracharya',     link: '/mantras/lingashtakam',            deityIcon: 'https://picsum.photos/seed/shiva-icon/100/100' },
  { id: 2,  name: 'Bilvashtakam',              hindi: 'बिल्वाष्टकम्',          type: 'Ashtakams', deity: 'Shiva',   duration: '~5 min',  desc: 'Offering of Bilva leaves to Lord Shiva',                      link: '/mantras/bilvashtakam',            deityIcon: 'https://picsum.photos/seed/shiva-icon/100/100' },
  { id: 3,  name: 'Kalabhairava Ashtakam',     hindi: 'कालभैरव अष्टकम्',       type: 'Ashtakams', deity: 'Shiva',   duration: '~6 min',  desc: 'Hymn to the fierce manifestation of Shiva',                   link: '/mantras/kalabhairava-ashtakam',   deityIcon: 'https://picsum.photos/seed/shiva-icon/100/100' },
  { id: 4,  name: 'Shiva Tandava Stotram',     hindi: 'शिव तांडव स्तोत्रम्',    type: 'Stotrams',  deity: 'Shiva',   duration: '~6 min',  desc: "Composed by Ravana describing Shiva's power",                  link: '/mantras/shiva-tandava',           deityIcon: 'https://picsum.photos/seed/shiva-icon/100/100' },
  { id: 5,  name: 'Shiva Panchakshara Stotram',hindi: 'शिव पंचाक्षर स्तोत्रम्', type: 'Stotrams',  deity: 'Shiva',   duration: '~4 min',  desc: 'Praise of the five syllables Na-Ma-Shi-Va-Ya',                link: '/mantras/shiva-panchakshara',      deityIcon: 'https://picsum.photos/seed/shiva-icon/100/100' },
  { id: 6,  name: 'Sri Rudram',                hindi: 'श्री रुद्रम्',           type: 'Suktams',   deity: 'Shiva',   duration: '~25 min', desc: 'Vedic hymn praising Rudra from Yajurveda',                    link: '/mantras/sri-rudram',              deityIcon: 'https://picsum.photos/seed/shiva-icon/100/100' },
  { id: 7,  name: 'Madhurashtakam',            hindi: 'मधुराष्टकम्',           type: 'Ashtakams', deity: 'Krishna', duration: '~5 min',  desc: 'Everything about Lord Krishna is sweet',                      link: '/mantras/madhurashtakam',          deityIcon: 'https://picsum.photos/seed/krishna-icon/100/100' },
  { id: 8,  name: 'Achyutashtakam',            hindi: 'अच्युताष्टकम्',          type: 'Ashtakams', deity: 'Vishnu',  duration: '~5 min',  desc: 'Hymn to the infallible Lord Achyuta',                         link: '/mantras/achyutashtakam',          deityIcon: 'https://picsum.photos/seed/vishnu-icon/100/100' },
  { id: 9,  name: 'Vishnu Sahasranamam',       hindi: 'विष्णु सहस्रनाम',        type: 'Stotrams',  deity: 'Vishnu',  duration: '~30 min', desc: '1000 names of Lord Vishnu from Mahabharata',                  link: '/mantras/vishnu-sahasranamam',     deityIcon: 'https://picsum.photos/seed/vishnu-icon/100/100' },
  { id: 10, name: 'Bhaja Govindam',            hindi: 'भज गोविंदम्',           type: 'Stotrams',  deity: 'Krishna', duration: '~6 min',  desc: 'Worship Govinda, composed by Adi Shankaracharya',             link: '/mantras/bhaja-govindam',          deityIcon: 'https://picsum.photos/seed/krishna-icon/100/100' },
  { id: 11, name: 'Mahishasura Mardini Stotram',hindi: 'महिषासुर मर्दिनी',      type: 'Stotrams',  deity: 'Durga',   duration: '~8 min',  desc: 'Hymn to the slayer of Mahishasura',                           link: '/mantras/mahishasura-mardini',     deityIcon: 'https://picsum.photos/seed/durga-icon/100/100' },
  { id: 12, name: 'Mahalakshmy Ashtakam',      hindi: 'महालक्ष्म्यष्टकम्',      type: 'Ashtakams', deity: 'Lakshmi', duration: '~5 min',  desc: 'Prayer to Goddess Mahalakshmi',                               link: '/mantras/mahalakshmy-ashtakam',    deityIcon: 'https://picsum.photos/seed/lakshmi-icon/100/100' },
  { id: 13, name: 'Sri Suktam',                hindi: 'श्री सूक्तम्',           type: 'Suktams',   deity: 'Lakshmi', duration: '~10 min', desc: 'Vedic hymn invoking Goddess Lakshmi',                         link: '/mantras/sri-suktam',              deityIcon: 'https://picsum.photos/seed/lakshmi-icon/100/100' },
  { id: 14, name: 'Lalitha Sahasranamam',      hindi: 'ललिता सहस्रनाम',         type: 'Stotrams',  deity: 'Durga',   duration: '~35 min', desc: '1000 names of the Divine Mother',                             link: '/mantras/lalitha-sahasranamam',    deityIcon: 'https://picsum.photos/seed/durga-icon/100/100' },
  { id: 15, name: '108 Names of Shiva',        hindi: 'शिव के 108 नाम',          type: '108 Names', deity: 'Shiva',   duration: '~25 min', desc: 'All 108 sacred names with meaning, story & modern context',   link: '/mantras/108-names-of-shiva',      deityIcon: 'https://picsum.photos/seed/shiva-icon/100/100' },
];

/* ─── Schema.org FAQPage JSON-LD ────────────────────────────────── */
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: KNOWLEDGE_DEFS.map((d) => ({
    '@type': 'Question',
    name: `What is a ${d.label} (${d.hindi})?`,
    acceptedAnswer: {
      '@type': 'Answer',
      text: `${d.body} Example: ${d.example}`,
    },
  })),
};

/* ─── Filter Pill (pill button + hover tooltip only) ─────────────── */
interface PillProps {
  info: TypeInfo;
  isActive: boolean;
  onSelect: () => void;
  onOpenCard: () => void;
}

function FilterPill({ info, isActive, onSelect, onOpenCard }: PillProps) {
  const [hoverTip, setHoverTip] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (hoverTimer.current) clearTimeout(hoverTimer.current); }, []);

  const handleMouseEnter = () => {
    if (info.key === 'All' || !info.definition) return;
    hoverTimer.current = setTimeout(() => setHoverTip(true), 500);
  };
  const handleMouseLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setHoverTip(false);
  };

  return (
    <div
      className="relative flex-shrink-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => { onSelect(); onOpenCard(); }}
        className={`filter-pill transition-all duration-200 ${
          isActive ? 'filter-pill-active' : 'filter-pill-inactive'
        }`}
      >
        {info.key === 'All' ? 'All' : info.label}
      </button>

      {/* Hover tooltip — shows ABOVE the pill so it's never clipped downward */}
      {hoverTip && !isActive && info.key !== 'All' && (
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50
                     w-56 bg-[#1B0A3C] text-white text-xs rounded-lg px-3 py-2 shadow-xl
                     pointer-events-none"
        >
          {info.definition}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1B0A3C] rotate-45" />
        </div>
      )}
    </div>
  );
}

/* ─── Knowledge definition card ─────────────────────────────────── */
function KnowledgeCard({ def }: { def: typeof KNOWLEDGE_DEFS[0] }) {
  return (
    <article
      className="bg-white dark:bg-[#1C0A42] rounded-2xl p-6 shadow-sm
                 border border-gray-100 dark:border-[rgba(200,150,46,0.15)]
                 border-l-4 border-l-[#C8962E]"
    >
      <div className="mb-3">
        <h3 className="text-[18px] font-bold text-[#1B0A3C] dark:text-white font-serif leading-tight">
          {def.label}
        </h3>
        <span className="text-[14px] text-[#C8962E] hindi-text">{def.hindi}</span>
      </div>
      <p className="text-[14px] text-gray-600 dark:text-[#BCA8E8] leading-relaxed mb-3">
        {def.body}
      </p>
      <p className="text-[12px] text-gray-400 dark:text-[#9E88CC] italic">
        e.g. {def.example}
      </p>
    </article>
  );
}

/* ─── Beej Mantra data ────────────────────────────────────────── */
const BEEJ_MANTRAS = [
  { syllable: 'ॐ',   iast: 'OṂ',      deity: 'Universal · ब्रह्म',  chakra: 'Crown · सहस्रार',    hz: '963 Hz', color: '#8E24AA', slug: 'beej-mantras' },
  { syllable: 'श्रीं', iast: 'ŚRĪṂ',   deity: 'Lakshmi · लक्ष्मी',   chakra: 'Prosperity · समृद्धि', hz: '528 Hz', color: '#FF69B4', slug: 'beej-mantras' },
  { syllable: 'ह्रीं', iast: 'HRĪṂ',   deity: 'Bhuvaneshwari · भुवन',chakra: 'Heart · अनाहत',      hz: '639 Hz', color: '#FF7043', slug: 'beej-mantras' },
  { syllable: 'क्लीं', iast: 'KLĪṂ',   deity: 'Krishna · कृष्ण',     chakra: 'Sacral · स्वाधिष्ठान', hz: '417 Hz', color: '#4169E1', slug: 'beej-mantras' },
  { syllable: 'ऐं',  iast: 'AIṂ',     deity: 'Saraswati · सरस्वती',chakra: 'Throat · विशुद्ध',    hz: '741 Hz', color: '#B0BEC5', slug: 'beej-mantras' },
  { syllable: 'क्रीं', iast: 'KRĪṂ',   deity: 'Kali · काली',         chakra: 'Root · मूलाधार',      hz: '396 Hz', color: '#4B0082', slug: 'beej-mantras' },
  { syllable: 'गं',  iast: 'GAṂ',     deity: 'Ganesha · गणेश',      chakra: 'Root · मूलाधार',      hz: '396 Hz', color: '#FF6347', slug: 'beej-mantras' },
  { syllable: 'दुं',  iast: 'DUṂ',     deity: 'Durga · दुर्गा',       chakra: 'Solar · मणिपुर',      hz: '528 Hz', color: '#DC143C', slug: 'beej-mantras' },
  { syllable: 'क्षरौं',iast: 'KṢRAUṂ', deity: 'Narasimha · नरसिंह',  chakra: 'Solar · मणिपुर',      hz: '528 Hz', color: '#FFB300', slug: 'beej-mantras' },
  { syllable: 'हौं',  iast: 'HAUṂ',    deity: 'Shiva · शिव',         chakra: 'Third Eye · आज्ञा',   hz: '852 Hz', color: '#87CEEB', slug: 'beej-mantras' },
  { syllable: 'फ्रौं', iast: 'PHRAUṂ',  deity: 'Hanuman · हनुमान',    chakra: 'Solar · मणिपुर',      hz: '528 Hz', color: '#FF8C00', slug: 'beej-mantras' },
  { syllable: 'दं',  iast: 'DAṂ',     deity: 'Vishnu · विष्णु',      chakra: 'Heart · अनाहत',      hz: '639 Hz', color: '#1E90FF', slug: 'beej-mantras' },
  { syllable: 'त्रीं', iast: 'TRĪṂ',   deity: 'Tara · तारा',         chakra: 'Throat · विशुद्ध',    hz: '741 Hz', color: '#009688', slug: 'beej-mantras' },
  { syllable: 'ह्लीं', iast: 'HLĪṂ',   deity: 'Bagalamukhi · बगलामुखी', chakra: 'Solar · मणिपुर',   hz: '528 Hz', color: '#FFD700', slug: 'beej-mantras' },
  { syllable: 'धूं',  iast: 'DHŪṂ',   deity: 'Dhumavati · धूमावती',  chakra: 'Root · मूलाधार',      hz: '396 Hz', color: '#78909C', slug: 'beej-mantras' },
];

function hex2rgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function BeejMantraSection({ show }: { show: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const hoverDir  = useRef<-1 | 0 | 1>(0);   // -1 left, 0 none, 1 right
  const [navVisible, setNavVisible] = React.useState(false);
  const [canLeft,  setCanLeft]  = React.useState(false);
  const [canRight, setCanRight] = React.useState(true);

  /* Update arrow-disable state */
  const syncArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  /* Auto-scroll: 1px every 20ms = 50px/s, loops when reaching end */
  const startAuto = () => {
    if (autoRef.current) return;
    autoRef.current = setInterval(() => {
      if (hoverDir.current !== 0) return;          // hover zone takes over
      const el = scrollRef.current;
      if (!el) return;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) {
        el.scrollLeft = 0;                          // loop back to start
      } else {
        el.scrollLeft += 1;
      }
      syncArrows();
    }, 20);
  };

  const stopAuto = () => {
    if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = null; }
  };

  useEffect(() => {
    startAuto();
    return stopAuto;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Hover-zone continuous scroll (replaces auto while active) */
  const hoverScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startHoverScroll = (dir: -1 | 1) => {
    hoverDir.current = dir;
    if (hoverScrollRef.current) clearInterval(hoverScrollRef.current);
    hoverScrollRef.current = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      el.scrollLeft += dir * 3;
      syncArrows();
    }, 16);
  };

  const stopHoverScroll = () => {
    hoverDir.current = 0;
    if (hoverScrollRef.current) { clearInterval(hoverScrollRef.current); hoverScrollRef.current = null; }
  };

  /* Arrow button click — jump one card width */
  const scrollBy = (dir: -1 | 1) => {
    scrollRef.current?.scrollBy({ left: dir * 196, behavior: 'smooth' });
    setTimeout(syncArrows, 350);
  };

  if (!show) return null;
  return (
    <section
      aria-label="Beej Mantras"
      className="mb-14 relative"
      onMouseEnter={() => setNavVisible(true)}
      onMouseLeave={() => { setNavVisible(false); stopHoverScroll(); }}
    >
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <h2 className="text-2xl font-serif text-[#1B0A3C] dark:text-[#E0CFFF]">
            Beej Mantras · <span className="text-[#C8962E] hindi-text">बीज मंत्र</span>
            <span className="text-lg font-normal ml-2 text-gray-500 dark:text-[#9E88CC]">— Sacred Seed Syllables</span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-[#9E88CC] mt-1">The most concentrated form of divine sound energy</p>
        </div>
      </div>

      {/* Scroll wrapper with edge hover zones */}
      <div className="relative">

        {/* LEFT edge hover zone — invisible, sits over left 15% */}
        <div
          className="absolute left-0 top-0 bottom-0 z-20 cursor-w-resize"
          style={{ width: '15%' }}
          onMouseEnter={() => startHoverScroll(-1)}
          onMouseLeave={stopHoverScroll}
        />

        {/* RIGHT edge hover zone */}
        <div
          className="absolute right-0 top-0 bottom-0 z-20 cursor-e-resize"
          style={{ width: '15%' }}
          onMouseEnter={() => startHoverScroll(1)}
          onMouseLeave={stopHoverScroll}
        />

        {/* LEFT fade + arrow button */}
        <button
          aria-label="Scroll left"
          onClick={() => scrollBy(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center
                     w-10 h-10 rounded-full shadow-lg transition-all duration-200"
          style={{
            background: 'rgba(27,10,60,0.85)',
            border: '1.5px solid rgba(200,150,46,0.6)',
            opacity: navVisible && canLeft ? 1 : 0,
            pointerEvents: navVisible && canLeft ? 'auto' : 'none',
            transform: 'translateY(-50%) translateX(-4px)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8962E" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        {/* RIGHT fade + arrow button */}
        <button
          aria-label="Scroll right"
          onClick={() => scrollBy(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center
                     w-10 h-10 rounded-full shadow-lg transition-all duration-200"
          style={{
            background: 'rgba(27,10,60,0.85)',
            border: '1.5px solid rgba(200,150,46,0.6)',
            opacity: navVisible && canRight ? 1 : 0,
            pointerEvents: navVisible && canRight ? 'auto' : 'none',
            transform: 'translateY(-50%) translateX(4px)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8962E" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>

        {/* Left gradient fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--color-bg, #FFF8E7) 0%, transparent 100%)',
                   opacity: canLeft ? 1 : 0, transition: 'opacity 0.2s' }} />
        {/* Right gradient fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--color-bg, #FFF8E7) 0%, transparent 100%)',
                   opacity: canRight ? 1 : 0, transition: 'opacity 0.2s' }} />

        {/* Horizontal scroll */}
        <div
          ref={scrollRef}
          onScroll={syncArrows}
          className="flex gap-5 overflow-x-auto pb-6 hide-scrollbar"
        >
          {BEEJ_MANTRAS.map((bm) => (
            <a
              key={bm.iast}
              href={`/mantras/${bm.slug}`}
              className="group flex-shrink-0 relative"
              style={{
                width: 180,
                paddingTop: 36,
              }}
            >
              {/* Circle */}
              <div
                className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center rounded-full
                           shadow-lg group-hover:scale-105 transition-transform duration-300"
                style={{
                  top: 0,
                  width: 72, height: 72,
                  background: bm.color,
                  boxShadow: `0 4px 16px ${hex2rgba(bm.color, 0.45)}`,
                }}
              >
                <span style={{ fontSize: 28, fontWeight: 700, color: '#fff', fontFamily: 'serif', lineHeight: 1 }}>
                  {bm.syllable}
                </span>
              </div>

              {/* Card body */}
              <div
                className="rounded-2xl text-center flex flex-col items-center
                           group-hover:-translate-y-1 transition-all duration-300"
                style={{
                  background: hex2rgba(bm.color, 0.10),
                  border: `1px solid ${hex2rgba(bm.color, 0.3)}`,
                  boxShadow: `0 2px 12px ${hex2rgba(bm.color, 0.12)}`,
                  height: 224,
                  padding: '44px 12px 16px',
                }}
              >
                <p className="text-[13px] italic text-gray-400 dark:text-[#9E88CC] mb-1">{bm.iast}</p>
                <p className="text-[14px] font-bold text-[#1B0A3C] dark:text-white leading-tight mb-2 hindi-text">{bm.deity}</p>
                <div className="h-px w-10 bg-[#C8962E] mb-2" />
                <p className="text-[12px] text-gray-500 dark:text-[#BCA8E8] mb-1">{bm.chakra}</p>
                <p className="text-[12px] font-semibold" style={{ color: '#C8962E' }}>{bm.hz}</p>

                {/* Play button */}
                <button
                  aria-label={`Play ${bm.iast} pronunciation`}
                  onClick={e => e.preventDefault()}
                  className="mt-auto w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
                             hover:scale-110"
                  style={{ background: hex2rgba(bm.color, 0.2), border: `1.5px solid ${bm.color}` }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill={bm.color}>
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ─── Jap Mantra data ─────────────────────────────────────────── */
const JAP_MANTRAS = [
  { name: 'Om Namah Shivaya',              hindi: 'ॐ नमः शिवाय',             deity: 'Shiva · शिव',              circleSymbol: 'ॐ',    firstLine: 'ॐ नमः शिवाय...',                    color: '#87CEEB', duration: '~12 min', slug: 'om-namah-shivaya' },
  { name: 'Om Namo Narayanaya',            hindi: 'ॐ नमो नारायणाय',          deity: 'Vishnu · विष्णु',          circleSymbol: 'नं',   firstLine: 'ॐ नमो भगवते...',                    color: '#1E90FF', duration: '~12 min', slug: 'om-namo-narayanaya' },
  { name: 'Om Namo Bhagavate Vasudevaya', hindi: 'ॐ नमो भगवते वासुदेवाय',   deity: 'Krishna · कृष्ण',          circleSymbol: 'वा',   firstLine: 'ॐ नमो भगवते वासुदेवाय...',         color: '#4169E1', duration: '~12 min', slug: 'om-namo-bhagavate' },
  { name: 'Hare Krishna Mahamantra',       hindi: 'हरे कृष्ण महामंत्र',       deity: 'Krishna & Ram · कृष्ण',   circleSymbol: 'हरे', firstLine: 'हरे कृष्ण हरे कृष्ण...',           color: '#4169E1', duration: '~14 min', slug: 'hare-krishna' },
  { name: 'Gayatri Mantra',               hindi: 'गायत्री मंत्र',            deity: 'Savitr / Sun · सवित्र',   circleSymbol: 'गा',   firstLine: 'ॐ भूर्भुवः स्वः...',               color: '#FFB300', duration: '~15 min', slug: 'gayatri-mantra' },
  { name: 'Maha Mrityunjaya',             hindi: 'महामृत्युंजय मंत्र',       deity: 'Shiva · शिव',              circleSymbol: 'त्र्यं', firstLine: 'ॐ त्र्यम्बकं यजामहे...',          color: '#87CEEB', duration: '~12 min', slug: 'maha-mrityunjaya' },
  { name: 'Om Sri Ram Jaya Ram',          hindi: 'ॐ श्री राम जय राम',       deity: 'Ram · राम',                circleSymbol: 'रा',   firstLine: 'ॐ श्री राम जय राम जय जय राम...',   color: '#FFD700', duration: '~12 min', slug: 'om-sri-ram' },
  { name: 'Om Gam Ganapataye Namah',      hindi: 'ॐ गं गणपतये नमः',         deity: 'Ganesha · गणेश',           circleSymbol: 'गं',   firstLine: 'ॐ गं गणपतये नमः...',               color: '#FF6347', duration: '~10 min', slug: 'om-gam-ganapataye' },
  { name: 'Om Sri Hanumate Namah',        hindi: 'ॐ श्री हनुमते नमः',       deity: 'Hanuman · हनुमान',         circleSymbol: 'ह',    firstLine: 'ॐ श्री हनुमते नमः...',             color: '#FF8C00', duration: '~10 min', slug: 'om-sri-hanumate' },
  { name: 'Om Durgayai Namah',            hindi: 'ॐ दुर्गायै नमः',           deity: 'Durga · दुर्गा',           circleSymbol: 'दुं',  firstLine: 'ॐ दुर्गायै नमः...',                color: '#DC143C', duration: '~10 min', slug: 'om-durgayai' },
  { name: 'Om Aim Saraswatyai Namah',     hindi: 'ॐ ऐं सरस्वत्यै नमः',     deity: 'Saraswati · सरस्वती',     circleSymbol: 'ऐं',  firstLine: 'ॐ ऐं सरस्वत्यै नमः...',           color: '#B0BEC5', duration: '~10 min', slug: 'om-aim-saraswatyai' },
  { name: 'Om Shreem Mahalakshmyai Namah',hindi: 'ॐ श्रीं महालक्ष्म्यै नमः', deity: 'Lakshmi · लक्ष्मी',       circleSymbol: 'श्रीं', firstLine: 'ॐ श्रीं महालक्ष्म्यै नमः...',     color: '#FF69B4', duration: '~10 min', slug: 'om-shreem-mahalakshmyai' },
  { name: 'Om Sharavanabhavaya Namah',    hindi: 'ॐ शरवणभवाय नमः',          deity: 'Kartikeya · कार्तिकेय',  circleSymbol: 'श',    firstLine: 'ॐ शरवणभवाय नमः...',               color: '#009688', duration: '~10 min', slug: 'om-sharavanabhavaya' },
  { name: 'Om Shanti Shanti Shanti',      hindi: 'ॐ शांति शांति शांति',      deity: 'Universal · सार्वभौम',    circleSymbol: 'शां', firstLine: 'ॐ शांति शांति शांति...',            color: '#8E24AA', duration: '~8 min',  slug: 'om-shanti' },
  { name: 'Om Kali Ma',                   hindi: 'ॐ काली मा',               deity: 'Kali · काली',             circleSymbol: 'कां', firstLine: 'ॐ काली मा...',                      color: '#4B0082', duration: '~8 min',  slug: 'om-kali-ma' },
];

function JapMantraSection({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <section aria-label="Jap Mantras" className="mb-14">
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <h2 className="text-2xl font-serif text-[#1B0A3C] dark:text-[#E0CFFF]">
            Jap Mantras · <span className="text-[#C8962E] hindi-text">जप मंत्र</span>
            <span className="text-lg font-normal ml-2 text-gray-500 dark:text-[#9E88CC]">— Mantras for 108 Repetition</span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-[#9E88CC] mt-1">Short powerful mantras chanted with a mala for deep meditation</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {JAP_MANTRAS.map((jm) => (
          <a
            key={jm.slug + jm.name}
            href={`/mantras/${jm.slug}`}
            className="group relative flex-shrink-0"
            style={{ paddingTop: 36 }}
          >
            {/* Circle with unique seed syllable */}
            <div
              className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center rounded-full
                         shadow-md group-hover:scale-105 transition-all duration-300"
              style={{
                top: 0,
                width: 72, height: 72,
                background: jm.color,
                boxShadow: `0 4px 14px ${hex2rgba(jm.color, 0.4)}`,
              }}
            >
              <span style={{
                fontSize: jm.circleSymbol.length >= 3 ? 18 : jm.circleSymbol.length === 2 ? 22 : 26,
                fontWeight: 700, color: '#fff', fontFamily: 'serif', lineHeight: 1,
                textAlign: 'center',
              }}>{jm.circleSymbol}</span>
            </div>

            {/* Card body */}
            <div
              className="rounded-2xl text-center flex flex-col items-center
                         group-hover:-translate-y-1 transition-all duration-300"
              style={{
                background: hex2rgba(jm.color, 0.08),
                border: `1px solid ${hex2rgba(jm.color, 0.28)}`,
                boxShadow: `0 2px 10px ${hex2rgba(jm.color, 0.1)}`,
                minHeight: 262,
                padding: '44px 10px 14px',
              }}
            >
              <p className="text-[15px] font-bold text-[#1B0A3C] dark:text-white leading-tight mb-1">{jm.name}</p>
              <p className="text-[15px] hindi-text mb-2" style={{ color: '#C8962E' }}>{jm.hindi}</p>
              <div className="h-px w-10 bg-[#C8962E] mb-2" />
              <p className="text-[14px] text-gray-500 dark:text-[#BCA8E8] mb-1 hindi-text">{jm.deity}</p>
              <p className="text-[13px] italic text-gray-400 dark:text-[#9E88CC] mb-2 line-clamp-1 hindi-text w-full px-1">{jm.firstLine}</p>

              {/* Chant button */}
              <button
                onClick={e => e.preventDefault()}
                className="text-[12px] font-semibold px-3 py-1 rounded-full transition-all duration-200
                           hover:opacity-90 mt-auto"
                style={{ border: `1.5px solid ${jm.color}`, color: jm.color, background: 'transparent' }}
              >
                Chant →
              </button>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ─── Shared entry type (used by both MANTRAS_DATA and serverMantras) ─── */
type MantraEntry = {
  id: number;
  name: string;
  hindi: string;
  type: string;
  deity: string;
  duration: string;
  desc: string;
  link: string;
  deityIcon: string;
};

/* ─── Main component ─────────────────────────────────────────────── */
const KNOWLEDGE_SECTION_ID = 'sacred-text-guide';

interface MantrasProps {
  /** Injected by server component from JSON files. Falls back to MANTRAS_DATA if not provided. */
  serverMantras?: MantraEntry[];
}

export default function Mantras({ serverMantras }: MantrasProps = {}) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDeity, setActiveDeity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openCardKey, setOpenCardKey]   = useState<string | null>(null);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openCard = (key: string) => {
    if (key === 'All') { setOpenCardKey(null); return; }
    setOpenCardKey(key);
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    dismissTimer.current = setTimeout(() => setOpenCardKey(null), 4000);
  };
  const closeCard = useCallback(() => {
    setOpenCardKey(null);
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
  }, []);

  // Close card on click outside the pills section
  const pillsWrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pillsWrapRef.current && !pillsWrapRef.current.contains(e.target as Node)) closeCard();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [closeCard]);

  const activeCardInfo = TYPE_INFO.find(t => t.key === openCardKey);

  // Use server-injected data if available, otherwise fall back to hardcoded list
  const allData: MantraEntry[] = serverMantras && serverMantras.length > 0 ? serverMantras : MANTRAS_DATA;

  const filteredMantras = allData.filter((m) => {
    const categoryMatch = activeCategory === 'All' || m.type === activeCategory;
    const deityMatch    = activeDeity === 'All'    || m.deity === activeDeity;
    const searchMatch   = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.hindi.includes(searchQuery);
    return categoryMatch && deityMatch && searchMatch;
  });

  const renderMantraCard = (mantra: typeof MANTRAS_DATA[0], idx: number = 0, animate = false) => (
    <Link
      key={mantra.id}
      href={mantra.link}
      className={`${
        animate ? `scroll-verse scroll-delay-${(idx % 6) + 1} ` : ''
      }interactive-card
                  bg-white dark:bg-[#1C0A42] p-5 rounded-2xl
                  border border-gray-200 dark:border-[rgba(200,150,46,0.15)]
                  shadow-sm group flex items-center justify-between`}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-gray-100">
          <img src={mantra.deityIcon} alt={mantra.deity} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div>
          <h3
            className="text-base font-semibold leading-tight mb-0.5 text-[#1B0A3C] dark:text-white group-hover:text-[#C8962E] transition-colors"
          >
            {mantra.name}
          </h3>
          <p className="hindi-text text-sm text-[#C8962E] mb-1">{mantra.hindi}</p>
          <div className="flex items-center gap-2 text-xs mb-1">
            <span className="bg-[var(--color-brand-gold)]/20 text-[var(--color-brand-gold-dark)] px-2 py-0.5 rounded-full font-medium">
              {mantra.type.replace(/s$/, '')}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500 dark:text-[#9E88CC]">{mantra.deity}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500 dark:text-[#9E88CC]">{mantra.duration}</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-[#9E88CC] line-clamp-1">{mantra.desc}</p>
        </div>
      </div>
      <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-[#2A1060] flex items-center justify-center
                      group-hover:bg-[var(--color-brand-gold)] group-hover:text-[var(--color-brand-purple)]
                      transition-colors text-gray-400 flex-shrink-0 ml-4">
        <Play size={20} className="ml-1" />
      </div>
    </Link>
  );

  return (
    <>
      {/* ── Schema.org FAQPage JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Page heading */}
        <div className="scroll-heading text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-brand-purple)] dark:text-[#E0CFFF] mb-4">
            Mantras &amp; Stotrams{' '}
            <span className="hindi-text ml-2">मंत्र और स्तोत्र</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-[#BCA8E8] max-w-2xl mx-auto mb-8">
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
              className="block w-full pl-11 pr-4 py-4 border border-gray-300 dark:border-[rgba(200,150,46,0.3)]
                         rounded-full leading-5 bg-white dark:bg-[#1C0A42] placeholder-gray-500
                         dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-gold)]
                         focus:border-[var(--color-brand-gold)] sm:text-sm shadow-sm transition-shadow hover:shadow-md"
            />
          </div>

          {/* ── PART 1: Interactive Type Filter Pills ── */}
          <div ref={pillsWrapRef}>
            {/* Scrollable pill bar */}
            <div className="flex overflow-x-auto justify-start md:justify-center gap-3 pb-2 mb-2 hide-scrollbar">
              {TYPE_INFO.map((info) => (
                <FilterPill
                  key={info.key}
                  info={info}
                  isActive={activeCategory === info.key}
                  onSelect={() => setActiveCategory(info.key)}
                  onOpenCard={() => openCard(info.key)}
                />
              ))}
            </div>

            {/* Info card rendered OUTSIDE overflow-x-auto — never clipped */}
            <div
              style={{
                maxHeight: openCardKey && activeCardInfo ? 200 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.2s ease',
              }}
              className="flex justify-center mb-2"
            >
              {openCardKey && activeCardInfo && (
                <div className="bg-white dark:bg-[#1C0A42] rounded-xl shadow-xl
                                border-l-4 border-[#C8962E] p-4 relative mt-3"
                  style={{ width: 320, maxWidth: '90vw' }}
                >
                  <button onClick={closeCard}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-white">
                    <X size={14} />
                  </button>
                  <h4 className="text-[16px] font-bold text-[#1B0A3C] dark:text-white mb-1 pr-5">
                    {activeCardInfo.label}{' '}
                    <span className="text-[#C8962E] hindi-text font-normal text-sm">· {activeCardInfo.hindi}</span>
                  </h4>
                  <p className="text-[13px] text-gray-600 dark:text-[#BCA8E8] mb-2 leading-snug">
                    {activeCardInfo.definition}
                  </p>
                  {activeCardInfo.example && (
                    <p className="text-[12px] text-gray-400 dark:text-[#9E88CC] italic mb-3">
                      e.g. {activeCardInfo.example}
                    </p>
                  )}
                  <a href={`#${KNOWLEDGE_SECTION_ID}`} onClick={closeCard}
                    className="inline-flex items-center gap-1 text-[12px] text-[#C8962E] font-semibold hover:underline">
                    Learn more <ChevronDown size={12} />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Hint text */}
          <p className="text-xs text-gray-400 dark:text-[#9E88CC] mb-6 text-center">
            Click any pill to filter &amp; learn what it means
          </p>

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
                  <img src={deity.image} alt={deity.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <span className={`text-sm font-medium transition-colors ${
                  activeDeity === deity.id
                    ? 'text-[var(--color-brand-gold-dark)]'
                    : 'text-gray-500 dark:text-[#9E88CC] group-hover:text-[var(--color-brand-purple)]'
                }`}>
                  {deity.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {/* ── Beej Mantra Section ── */}
        <BeejMantraSection show={activeCategory === 'All' || activeCategory === 'Beej Mantras'} />
        {/* ── Jap Mantra Section ── */}
        <JapMantraSection show={activeCategory === 'All' || activeCategory === 'Jap Mantras'} />

        <div className="mb-12">
          <div className="mb-6 text-gray-500 dark:text-[#9E88CC] font-medium">
            Showing {filteredMantras.length} of {allData.length}+ sacred texts
          </div>

          {activeDeity === 'All' && activeCategory === 'All' && !searchQuery ? (
            <>
              {[
                { label: 'शिव Shiva',                deities: ['Shiva'] },
                { label: 'कृष्ण/विष्णु Krishna & Vishnu', deities: ['Krishna', 'Vishnu'] },
                { label: 'दुर्गा/देवी Durga & Devi',  deities: ['Durga', 'Lakshmi'] },
                { label: 'गणेश Ganesha',              deities: ['Ganesh', 'Ganesha'] },
                { label: 'हनुमान Hanuman',             deities: ['Hanuman'] },
                { label: 'राम Ram',                   deities: ['Ram', 'Rama', 'Ram'] },
                { label: 'अन्य Other',                deities: ['Saraswati', 'Kali', 'Universal', 'Surya', 'Shani', 'Santoshi', 'Subramanya', 'Kartikeya'] },
              ].map(({ label, deities }) => {
                const items = filteredMantras.filter((m) => deities.some(d => m.deity.toLowerCase() === d.toLowerCase()));
                if (!items.length) return null;
                return (
                  <div key={label} className="mb-10">
                    <h2 className="text-2xl font-serif text-[var(--color-brand-purple)] dark:text-[#E0CFFF]
                                   mb-6 border-b border-gray-200 dark:border-[rgba(200,150,46,0.2)] pb-2">
                      {label}
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {items.map((m, i) => renderMantraCard(m, i, true))}
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {filteredMantras.map((m, i) => renderMantraCard(m, i, false))}
              {filteredMantras.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 dark:bg-[#1C0A42] rounded-2xl border border-gray-200 dark:border-[rgba(200,150,46,0.15)]">
                  No matching sacred texts found. Try adjusting your filters.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="scroll-scale bg-[var(--color-brand-purple)] rounded-2xl p-8 text-center text-white shadow-md mb-16">
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

      {/* ══════ PART 2: SEO Knowledge Section — full bleed cream ══════ */}
      <section id={KNOWLEDGE_SECTION_ID} aria-label="Understanding Sacred Texts"
        className="w-full py-16 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: 'var(--deity-section-bg, #FFF8E7)' }}
      >
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[#1B0A3C] dark:text-[#E0CFFF] mb-3">
              Understanding Sacred Texts{' '}
              <span className="text-[#C8962E] hindi-text ml-2 text-2xl">· पवित्र ग्रंथों को समझें</span>
            </h2>
            <p className="text-gray-500 dark:text-[#BCA8E8] max-w-2xl mx-auto text-base">
              A guide to the different forms of Hindu devotional chanting
            </p>
            {/* Gold rule */}
            <div className="flex items-center justify-center mt-6 gap-4">
              <div className="h-px bg-[#C8962E] w-20 opacity-50" />
              <span className="text-[#C8962E] text-xl hindi-text">ॐ</span>
              <div className="h-px bg-[#C8962E] w-20 opacity-50" />
            </div>
          </div>

          {/* 3-column knowledge grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {KNOWLEDGE_DEFS.map((def) => (
              <KnowledgeCard key={def.key} def={def} />
            ))}
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-gray-400 dark:text-[#9E88CC] mt-10 italic">
            These classifications follow traditional Sanskrit scholarship and are used by practising Hindu devotees worldwide.
          </p>
        </div>
      </section>
    </>
  );
}
