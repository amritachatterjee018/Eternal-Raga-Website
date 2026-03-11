# Eternal Raga Website — SEO Rules
# Every page MUST follow these rules. SEO is the primary purpose of the website.

## Page-Level Requirements (EVERY page)

### Meta Tags
- Unique <title> tag: "[Page Title] | Eternal Raga · शाश्वत राग" (max 60 chars)
- Unique <meta name="description"> (max 155 chars, include primary keyword + Hindi keyword)
- <meta name="keywords"> with relevant terms (English + Hindi)
- Canonical URL: <link rel="canonical" href="https://eternalraga.com/en/[path]" />

### Open Graph (Social Sharing)
- og:title — same as page title
- og:description — same as meta description
- og:image — unique per page (deity art for mantras, temple photo for temples, product image for shop)
- og:type — "article" for content pages, "product" for shop, "website" for home
- og:url — canonical URL
- og:locale — "en_US" for English, "hi_IN" for Hindi

### Twitter Cards
- twitter:card — "summary_large_image"
- twitter:title, twitter:description, twitter:image — mirror OG tags

### Hreflang (Multilingual)
Every page MUST include both:
```html
<link rel="alternate" hreflang="en" href="https://eternalraga.com/en/[path]" />
<link rel="alternate" hreflang="hi" href="https://eternalraga.com/hi/[path]" />
<link rel="alternate" hreflang="x-default" href="https://eternalraga.com/en/[path]" />
```

## HTML Structure

### Heading Hierarchy (CRITICAL)
- ONE H1 per page — the page title
- H2 for major sections
- H3 for subsections within H2
- NEVER skip levels (no H1 → H3)
- Include relevant keywords naturally in headings

### Semantic HTML
- <nav> for navigation
- <main> for primary content
- <article> for blog posts and encyclopaedia entries
- <section> for content sections
- <aside> for sidebars
- <footer> for page footer
- Use <header> within <article> for article headers

### Image Optimization
- ALWAYS use Next.js <Image> component (lazy loading, WebP conversion)
- ALWAYS include descriptive alt text:
  - Deity images: "Lord Shiva meditating on Mount Kailash with crescent moon"
  - Temple photos: "Somnath Temple exterior view, Gujarat, India"
  - Yoga poses: "Woman performing Vrikshasana (Tree Pose) yoga asana"
  - Product images: "Bhagavad Gita hardcover book with gold embossing"
- Use meaningful file names: "shiva-meditating-kailash.webp" NOT "img_001.webp"
- Specify width and height attributes to prevent layout shift

## Schema.org Structured Data

### Mantra/Stotra Pages
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Hanuman Chalisa — Complete Text with Meaning",
  "inLanguage": ["en", "hi", "sa"],
  "about": { "@type": "Thing", "name": "Hanuman Chalisa" },
  "author": { "@type": "Organization", "name": "Eternal Raga" },
  "publisher": { "@type": "Organization", "name": "Eternal Raga" },
  "datePublished": "2026-01-01",
  "video": {
    "@type": "VideoObject",
    "name": "Hanuman Chalisa Chanting",
    "thumbnailUrl": "...",
    "uploadDate": "...",
    "embedUrl": "https://youtube.com/embed/..."
  }
}
```

### Shop Product Pages
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Bhagavad Gita — Complete Edition",
  "description": "...",
  "image": "...",
  "offers": {
    "@type": "Offer",
    "price": "24.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "124"
  }
}
```

### Blog Articles
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "...",
  "datePublished": "...",
  "dateModified": "...",
  "author": { "@type": "Person", "name": "Amrita" },
  "image": "..."
}
```

### Breadcrumbs
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://eternalraga.com/en/" },
    { "@type": "ListItem", "position": 2, "name": "Mantras & Stotrams", "item": "https://eternalraga.com/en/mantras/" },
    { "@type": "ListItem", "position": 3, "name": "Hanuman Chalisa" }
  ]
}
```

## URL Rules
- All lowercase, hyphens between words: /mantras/hanuman-chalisa (NOT /Mantras/Hanuman_Chalisa)
- No trailing slashes
- Descriptive slugs with primary keyword: /mantras/108-names-of-shiva
- Language prefix first: /en/mantras/... or /hi/mantras/...
- Keep URLs under 75 characters where possible

## Internal Linking (CRITICAL for SEO)
- Every mantra page links to: related mantras, parent deity hub, related temples
- Every deity hub links to: all associated mantras, temples, 108 names, shop products
- Every blog post links to: relevant mantra pages, deity hubs, encyclopaedia articles
- Every encyclopaedia article links to: related articles in same collection, deity hubs
- Footer has permanent links to top content
- NEVER create orphan pages (pages with no internal links pointing to them)

## Sitemap & Technical
- Auto-generate sitemap.xml with all page URLs (both /en/ and /hi/ versions)
- Submit to Google Search Console
- robots.txt: allow all crawling, point to sitemap
- Page load speed: target < 2.5s LCP (Largest Contentful Paint)
- Lazy-load YouTube embeds (use lite-youtube-embed)
- Lazy-load images below the fold
- Preload critical fonts (Noto Sans Devanagari, Georgia)

## Content Rules for SEO
- Every mantra/stotra page MUST have unique "Modern Context" section (NRI life connection)
- This is the primary SEO differentiator — no competitor does this
- Minimum 300 words of original text per page (beyond the scripture text itself)
- Blog posts: minimum 800 words, optimized for one primary keyword
- Encyclopaedia articles: minimum 500 words per article
- Update dates in Schema.org when content is revised
