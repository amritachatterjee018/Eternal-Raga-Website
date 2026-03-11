# Eternal Raga Website — Navigation Architecture v2.0
# Single source of truth for all website pages and URLs.
# DO NOT add, remove, or reorder navigation items.
# UPDATED: March 2026 — Deities removed from nav (now 7 items, not 8)

---

## Top Navigation Bar (7 items — Sliding Pill Design)

| Position | Nav Item           | Hindi Label       | URL Prefix     | Icon          |
|----------|--------------------|-------------------|----------------|---------------|
| 1        | Home               | गृह               | /              | house         |
| 2        | Mantras & Stotrams | मंत्र और स्तोत्र    | /mantras/      | music-note    |
| 3        | Scriptures         | शास्त्र            | /scriptures/   | book          |
| 4        | Temples            | मंदिर              | /temples/      | building      |
| 5        | Meditate & Yoga    | ध्यान और योग       | /yoga/         | lotus/leaf    |
| 6        | Eternal Gyan       | शाश्वत ज्ञान       | /eternal-gyan/ | lightbulb     |
| 7        | Shop               | दुकान              | /shop/         | shopping-bag  |

**IMPORTANT: Deities are NOT a nav item. They appear as interactive scrollable tabs on the Home page below the hero carousel. Deity hub pages live at /deities/[slug]/ and are accessible from: Home page cards, mantra page sidebars, footer Quick Links.**

---

## Complete Site Map with URLs

### 1. HOME (/)
```
/
├── Hero Carousel (6 slides: Shiva, Krishna, Durga, Ganesh, Ram, Hanuman)
├── Explore by Deity (11 scrollable tabs with content cards)
│   → Links to /deities/[slug]/
├── Daily Mantra Card
├── Featured YouTube Video
├── Latest from Eternal Gyan (3 article cards → /eternal-gyan/)
├── Testimonials Carousel ("What Devotees Say" — 6 testimonial cards)
├── Shop Highlights (6 products, USD → /shop/)
├── Newsletter Signup (MailerLite)
└── Footer (3-layer design)
```

### 2. MANTRAS & STOTRAMS (/mantras/)
```
/mantras/
├── [Search bar with autocomplete]
├── [Type filter pills: All | Chalisas | Stotrams | Ashtakams | Aartis | Suktams | Kavachs | Jap Mantras | Beej Mantras | 108 Names]
├── [Deity filter: circular icons for 11 deities + Universal + All — AND logic with type filter]
├── Results grouped by deity section headers ("Showing 14 of 120+ sacred texts")
│
├── /mantras/[slug]/ → TEMPLATE A (Chalisa, Stotram, Ashtakam, Aarti, Suktam, Kavach)
│   ├── Breadcrumb (Home > Mantras & Stotrams > Ashtakam > [Name])
│   ├── Title (H1) bilingual
│   ├── Quick Info Bar (deity, type, verses, duration, composer, best time)
│   ├── YouTube Video Embed (PRIMARY — large 16:9)
│   ├── 4-Layer Verse Text with Toggle Buttons (Sanskrit, Transliteration, Hindi, English)
│   ├── SIDEBAR: Audio Mini Player + streaming badges + Deity Card + Related Mantras
│   ├── "How to Recite" accordion
│   ├── "In Modern Life" section (NRI context — 200+ words, PRIMARY SEO differentiator)
│   ├── CTA: App Download + Shop Link
│   └── Newsletter + Footer
│
├── /mantras/[slug]/ → TEMPLATE B (Jap Mantras: Gayatri, Om Namah Shivaya, Mahamrityunjaya, etc.)
│   ├── Single mantra in large centered card (Sanskrit + transliteration + meaning)
│   ├── Word-by-word pronunciation breakdown table
│   ├── "How to Chant 108 Times" guide
│   ├── Benefits section
│   ├── "Start 108 Chant in App" CTA
│   ├── Audio mini player + streaming badges
│   └── Related Jap Mantras
│
├── /mantras/beej-mantras/ → TEMPLATE C (Single page for ALL 15 Beej Mantras)
│   ├── Introduction paragraph
│   ├── YouTube video embed
│   ├── 15 Beej Mantra cards (3-col grid):
│   │   Om, Shreem, Hreem, Kleem, Aim, Kreem, Gam/Glaum, Dum, Kshraum,
│   │   Haum/Hum, Fraum, Dam, Treem, Hleem, Dhoom
│   │   Each: large syllable, deity, chakra, frequency, color accent, play button
│   └── "Practice with Mala Counter in App" CTA
│
└── /mantras/108-names-of-[deity]/ → 108 Names Pages
    ├── YouTube Embed
    ├── PDF Lead Magnet (email capture)
    ├── Name of the Day highlight
    ├── Full 108 Names Table (searchable)
    └── Related 108 Names
```

### 3. SCRIPTURES (/scriptures/)
```
/scriptures/
├── Bhagavad Gita (ACTIVE — featured prominently)
│   └── /scriptures/bhagavad-gita/
│       ├── Chapter List (18 chapters as cards)
│       └── /scriptures/bhagavad-gita/chapter-[n]/verse-[v]/
│           ├── Sanskrit (Devanagari) + Transliteration + Hindi/English toggle
│           ├── Audio play button
│           ├── Commentary accordion
│           └── Prev/Next verse navigation
│
├── Coming Soon (with email capture — "Get Notified" + MailerLite):
│   ├── Vedas (4 texts, 20,000+ mantras)
│   ├── Upanishads (108 principal texts)
│   ├── Puranas (18 Mahapuranas)
│   └── Epics: Ramayana & Mahabharata (2 epics, 124,000+ verses)
```

### 4. TEMPLES (/temples/)
```
/temples/
├── Grouped by category with section headers:
│   ├── "12 Jyotirlinga · ज्योतिर्लिंग" section
│   ├── "51 Shakti Peeth · शक्तिपीठ" section
│   ├── "Vishnu & Krishna Temples · विष्णु/कृष्ण मंदिर" section
│   ├── "8 Ashtavinayak · अष्टविनायक" section
│   └── "Char Dham · चार धाम" (Coming Soon)
│
└── /temples/[category]/[slug]/ → Temple Detail Page
    ├── Hero Photo Gallery, Category Badge, Location
    ├── History & Significance (bilingual)
    ├── Associated Mantras → links to mantra pages
    ├── Google Maps Embed
    └── Visiting Info (timings, transport, accommodation)
```

### 5. MEDITATE & YOGA (/yoga/)
```
/yoga/
├── SECTION 1 — Meditation Guides · ध्यान (3-col card grid):
│   Morning Meditation, Deep Sleep, Concentration, Mental Peace,
│   Yoga Nidra, Stress Relief
│   Each: image, category pill, duration, description, link to sub-page with multiple videos
│
├── SECTION 2 — 7 Chakras · सात चक्र (horizontal scroll, chakra-colored cards):
│   Muladhara (Root/LAM/396Hz/red), Svadhisthana (Sacral/VAM/417Hz/orange),
│   Manipura (Solar Plexus/RAM/528Hz/yellow), Anahata (Heart/YAM/639Hz/green),
│   Vishuddha (Throat/HAM/741Hz/blue), Ajna (Third Eye/OM/852Hz/indigo),
│   Sahasrara (Crown/AUM/963Hz/violet)
│   Each clickable → /yoga/chakras/[name]/
│
├── SECTION 3 — Yoga Asana Library · योग आसन:
│   6 preview pose cards + "View All Asanas →"
│   Yoga Sequences: Surya Namaskar, Chandra Namaskar, Evening Wind-Down, Desk Yoga
│
└── SECTION 4 — Pranayama · प्राणायाम (4 cards):
    Anulom Vilom, Kapalbhati, Bhramari, Ujjayi
    Each: bilingual name, duration, difficulty, brief benefit
```

### 6. ETERNAL GYAN (/eternal-gyan/)
```
/eternal-gyan/
├── Two tabs: "Blog & Articles" | "Encyclopaedia"
│
├── /eternal-gyan/blog/
│   ├── Article listing (filterable by category)
│   │   Categories: Festival Guides, Mantra Explainers, NRI Life, Wellness, Behind the Scenes
│   └── /eternal-gyan/blog/[slug]/ → Blog Article
│
└── /eternal-gyan/encyclopaedia/
    ├── Collection cards: Divine Weapons, Tantra-Mantra-Yantra, Dashavatar,
    │   Sacred Animals & Vahanas, 14 Lokas, Saptarishi, Samudra Manthan,
    │   Sacred Numbers, Lesser-Known Stories
    └── /eternal-gyan/encyclopaedia/[collection]/[slug]/ → Article
```

### 7. SHOP (/shop/)
```
/shop/
├── Filter: All | Books | Journals | Digital Downloads | Gita Cards | Bundles
├── Products (USD):
│   Bhagavad Gita Hardcover $24.99, Sadhana Journal $14.99,
│   Gita Flash Cards $12.99, 108 Mantras eBook $9.99,
│   Hanuman Chalisa Pocket Book $7.99, Sadhana Starter Kit Bundle $39.99
├── Cart badge, Filters, Wishlist hearts
├── Testimonials strip above footer
├── /shop/[slug]/ → Product Detail
├── /shop/cart/ → Cart
└── /shop/checkout/ → Stripe Checkout
```

### 8. DEITY HUBS (/deities/[slug]/) — NOT IN NAV
```
Accessible from: Home page deity cards, mantra page sidebars, footer Quick Links
11 deities: shiva, krishna, ganesh, durga, ram, lakshmi, hanuman, saraswati, vishnu, kali, kartikeya

/deities/[slug]/
├── Hero (deity artwork, name bilingual, stats)
├── Introduction (bilingual toggle)
├── 108 Names Preview → /mantras/108-names-of-[deity]/
├── Associated Mantras → /mantras/[slug]/
├── Associated Temples → /temples/[category]/[slug]/
├── Festival Calendar
├── YouTube Playlist Embed
└── Related Shop Products
```

### 9. UTILITY PAGES (not in main nav)
```
/listen/       → Podcast series, YouTube gallery, curated playlists, app download CTA
/feedback/     → Content Request form (categories: Mantra, Bhajan, Meditation, Scripture, Yoga, Temple, Bug, General)
/about/        → About Eternal Raga
/contact/      → Contact form
/privacy/      → Privacy Policy
/terms/        → Terms of Service
/search/       → Search results page
/sitemap.xml   → XML sitemap
```

---

## Footer Navigation (5 columns — 3-Layer Design)

### Layer 1: Newsletter Bar
- "Get Daily Mantras in Your Inbox · दैनिक मंत्र प्राप्त करें"
- Email input + gold Subscribe button

### Layer 2: Main Footer

| Col 1: BRAND       | Col 2: QUICK LINKS   | Col 3: EXPLORE       | Col 4: LISTEN & FOLLOW | Col 5: SUPPORT       |
|---------------------|----------------------|----------------------|------------------------|----------------------|
| Logo (140px)        | Popular Mantras      | Scriptures           | 5 large social icons:  | About Us             |
| "Eternal Raga"      | Bhagavad Gita        | Temples              | YouTube, Instagram,    | Contact              |
| "शाश्वत राग"         | Browse by Deity      | Meditate & Yoga      | Facebook, Spotify,     | Privacy Policy       |
| Brand description   | 108 Names Collections| Eternal Gyan         | Apple Music            | Terms of Service     |
| Creative Chronix    | Download App         | Shop                 | "Listen Page →"        | Sitemap              |
|                     |                      |                      |                        | Request Content      |

### Layer 3: Bottom Bar
- Large outlined "ETERNAL RAGA" (80-100px, gold stroke 15% opacity, shimmer animation)
- Copyright "© 2026 Eternal Raga (शाश्वत राग). Crafted for the divine." | OM ॐ | "A Creative Chronix Product"

---

## Language Toggle Behavior
- Toggle between /en/ and /hi/ URL prefixes
- Same page, different language: /en/mantras/hanuman-chalisa ↔ /hi/mantras/hanuman-chalisa
- Hreflang tags on every page linking both versions
- Default: /en/ (English)

---

## Login (Optional — Never Blocks Content)
- "Sign In" link in nav bar top-right (subtle, not a button)
- Modal: Continue with Google + Continue with Facebook + Email/Password
- After sign-in: avatar dropdown (My Favorites, Reading Progress, Order History, Email Preferences, Sign Out)
- ALL content freely accessible without login
