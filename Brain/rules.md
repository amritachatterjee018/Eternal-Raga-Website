# Eternal Raga Website — Development Rules v2.0
# This is the WEBSITE project. NOT the mobile app.
# The website uses Next.js, NOT React Native.
# UPDATED: March 2026

## Framework & Tech
- Next.js 15 with App Router and TypeScript
- Tailwind CSS for styling (NOT StyleSheet from React Native)
- next-intl for internationalization (URL prefix: /en/, /hi/)
- Google Fonts: Noto Sans Devanagari (Hindi), Georgia (brand headings)
- Deploy to Vercel
- Stripe for payments (Shop)
- MailerLite for email capture
- Google Analytics 4 + Search Console for tracking
- Algolia or Pagefind for site search

## CRITICAL — This is a WEBSITE, Not a Mobile App
- Use HTML elements: <div>, <section>, <nav>, <main>, <footer>, <article>
- DO NOT use React Native components: no <View>, <Text>, <ScrollView>, <TouchableOpacity>
- DO NOT add a bottom tab bar or bottom navigation of any kind
- Use standard web patterns: anchor tags <a> for links, <button> for actions
- Use Next.js <Link> component for internal navigation
- Use Next.js <Image> component for optimized images
- All pages must be Server Components by default (use 'use client' only when needed)

## Navigation — CRITICAL — DO NOT MODIFY
- **7 top nav items** (NOT 8 — Deities REMOVED from nav):
  Home | Mantras & Stotrams | Scriptures | Temples | Meditate & Yoga | Eternal Gyan | Shop
- **Deities are shown as rectangular cards below the hero carousel on the Home page, NOT as a nav item**
- Desktop: **sliding pill navigation** with gold gradient active indicator (adapted from EliteTabs component)
- Each nav item has an SVG icon + text label inside a pill container
- Active tab: gold gradient pill (#C8962E to #F5C518) slides behind active item (300ms cubic-bezier(0.4,0,0.2,1))
- Inactive: rgba(255,255,255,0.6) text. Hover: rgba(255,255,255,0.9)
- Mobile (<768px): hamburger menu with slide-in drawer
- Language toggle (EN | हिंदी) in top-right corner
- Search icon next to language toggle
- Sign In link (subtle, between search and language toggle)
- Logo (OM icon + "Eternal Raga") on the left
- Nav bar: sticky, deep purple #1B0A3C background, z-index 50
- Full ARIA: role='tablist', role='tab', aria-selected, keyboard nav (Arrow keys, Home, End)
- ResizeObserver for responsive indicator repositioning
- NEVER add extra nav items. NEVER remove nav items. NEVER reorder.
- See WEBSITE_NAVIGATION.md for complete site map.

## Color Scheme — INVERTED from Mobile App
- Page backgrounds: white #FFFFFF or warm cream #FFF8F0
- Text: dark gray #333333 for body, deep purple #1B0A3C for headings
- Hindi text: dark gold #A07424 (must be readable on white backgrounds)
- Nav bar and footer: deep purple #1B0A3C background
- Accent: gold #C8962E for links, borders, decorative elements, hover states
- CTA buttons: bright gold #F5C518 with dark text #1B0A3C
- Secondary buttons: transparent with gold #C8962E border
- Cards: white background with subtle gold border rgba(200,150,46,0.2) and light shadow
- Section dividers: thin gold line, optionally with centered OM (ॐ) symbol
- NEVER use deep purple as a page background. Only nav bar and footer are dark purple.

## Hero Carousel — 6 Slides
- Slide 1: Shiva — "Sacred Wisdom for Modern Souls" / "आधुनिक आत्माओं के लिए पवित्र ज्ञान"
- Slide 2: Krishna — "Devotion in Every Note" / "भक्ति हर स्वर में"
- Slide 3: Durga — "Strength Through Faith" / "श्रद्धा से शक्ति"
- Slide 4: Ganesh — "Begin Every Journey Blessed" / "हर यात्रा शुभ आरंभ"
- Slide 5: Ram — "Walk the Path of Dharma" / "धर्म के मार्ग पर चलें"
- Slide 6: Hanuman — "Courage in Devotion" / "भक्ति में साहस"
- Auto-advance 5 seconds, pause on hover, dot indicators, prefers-reduced-motion support

## 11 Deity Cards (Below Hero — NOT in nav)
- Scrollable tab bar with left/right arrow buttons (adapted from CodePen fyildiz1974/RNRwEjr)
- 11 deities: Shiva, Krishna, Ganesh, Durga, Ram, Lakshmi, Hanuman, Saraswati, Vishnu, Kali, Kartikeya
- Each tab: circular deity image + bilingual name. Gold active indicator slides between tabs.
- Content area below: shows deity's preview card (image + name + epithet + stats + "Explore →" link)
- Desktop: 5 tabs visible + scroll. Mobile: 2 visible + touch scroll

## 3 Mantra Page Templates
- **Template A** (Chalisa, Stotram, Ashtakam, Aarti, Suktam, Kavach): video top + 4-layer verse display + audio sidebar
- **Template B** (Jap Mantra — Gayatri, Om Namah Shivaya, etc.): single mantra prominent + pronunciation guide + 108 chant guide
- **Template C** (Beej Mantra): all 15 seed syllables on one page, chakra color accents, inline play buttons

## Video + Audio on Mantra Pages
- YouTube video: PRIMARY media, large 16:9, at TOP of content
- Audio mini player: SECONDARY, slim card in sidebar (desktop) / below content (mobile)
- Streaming badges: Spotify, Apple Music, YouTube Music, Amazon Music
- Coming Soon: grayed play button + email capture for unpublished content
- All media links in /data/media-links.json

## Footer — 3-Layer Design
### Layer 1: Newsletter Bar
- Gradient transition cream → deep purple
- "Get Daily Mantras in Your Inbox / दैनिक मंत्र प्राप्त करें" + email input + Subscribe button

### Layer 2: Main Footer (5 columns on desktop)
- Col 1 (Brand): Logo 140px + "Eternal Raga" + "शाश्वत राग" + description + "A Creative Chronix Product"
- Col 2 (Quick Links): Popular Mantras, Bhagavad Gita, Browse by Deity, 108 Names, Download App
- Col 3 (Explore): Scriptures, Temples, Meditate & Yoga, Eternal Gyan, Shop
- Col 4 (Listen & Follow): 5 large 48px social icons (YouTube, Instagram, Facebook, Spotify, Apple Music) + "Listen & Podcast Page →"
- Col 5 (Support): About Us, Contact, Privacy Policy, Terms of Service, Sitemap, Request Content

### Layer 3: Bottom Bar
- Large outlined "ETERNAL RAGA" text (80-100px, gold stroke rgba(200,150,46,0.15))
- Slow shimmer animation (gold gradient highlight, 8 second loop)
- Copyright + OM + "A Creative Chronix Product" overlaid
- Subtle parallax on scroll

## Login — Optional
- "Sign In" link in nav bar (not prominent button)
- Modal: Continue with Google + Continue with Facebook + Email/Password
- After sign-in: avatar dropdown (Favorites, Reading Progress, Orders, Sign Out)
- ALL content freely accessible without login

## Interactive Elements
- Scroll animations: CSS scroll-driven (animation-timeline: view()), see animation.rules.md
- Button hover: lift (translateY -2px) + deeper shadow, 200ms ease
- Card hover: lift + border highlights + deeper shadow
- Filter pills: gold fill on active, press effect on click
- Scripture toggles: smooth slide fill transition
- Respect prefers-reduced-motion for all animations

## Additional Pages
- /feedback — Content Request form with category + deity dropdowns, "Most Requested" section
- /listen — Podcast series, YouTube gallery, curated playlists, app download CTA
- Testimonials carousel on Home page (between Shop Highlights and Newsletter) + Shop page

## CodePen References (for Antigravity implementation)
- Pill navigation: codepen.io/oathanrex/pen/MYeaRay (EliteTabs class)
- Neumorphic dark theme (Phase 2): codepen.io/oathanrex/pen/azNQpPj
- Scroll animations: codepen.io/pimskie/pen/OPMQVjP
- Scrollable tabs: codepen.io/fyildiz1974/pen/RNRwEjr

## Reference Files
- WEBSITE_NAVIGATION.md → Complete site map and URL structure
- WEBSITE_DESIGN_SYSTEM.md → All visual rules and component specs
- website-seo.rules.md → SEO requirements for every page
- scripture-content.rules.md → Content schemas and data structures
- mailerlite.rules.md → Email integration rules
- accessibility.rules.md → Web accessibility (WCAG) rules
- animation.rules.md → Web animation rules (CSS transitions + scroll-driven)
- tailwind-theme.rules.md → Tailwind config with design tokens
