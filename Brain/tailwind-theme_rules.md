# Eternal Raga Website — Tailwind Theme Configuration
# This maps the Eternal Raga design tokens to Tailwind CSS.
# Copy the tailwind.config section below into your tailwind.config.ts file.

## Tailwind Config Extension

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary
        'deep-purple': '#1B0A3C',
        'purple-mid': '#2D1654',
        'gold': '#C8962E',
        'bright-gold': '#F5C518',
        'dark-gold': '#A07424',
        'muted-gold': '#8B7355',

        // Backgrounds
        'warm-bg': '#FFF8F0',
        'cream-bg': '#FFF8E7',

        // Text
        'dark-text': '#333333',
        'muted-text': '#666666',
        'cream-text': '#B8A88A',

        // Accents
        'gold-border': 'rgba(200, 150, 46, 0.2)',
        'gold-border-hover': 'rgba(200, 150, 46, 0.4)',

        // Badges
        'physical-blue': '#5B8DBE',
        'digital-green': '#81C784',
      },
      fontFamily: {
        'brand': ['Georgia', 'serif'],
        'body': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'hindi': ['"Noto Sans Devanagari"', 'sans-serif'],
      },
      fontSize: {
        'h1': ['36px', { lineHeight: '1.3', fontWeight: '700' }],
        'h1-hi': ['24px', { lineHeight: '1.4', fontWeight: '400' }],
        'h2': ['28px', { lineHeight: '1.3', fontWeight: '700' }],
        'h3': ['22px', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.7', fontWeight: '400' }],
        'sanskrit': ['20px', { lineHeight: '2.0', fontWeight: '400' }],
        'iast': ['15px', { lineHeight: '1.6', fontWeight: '400' }],
        'nav': ['14px', { lineHeight: '1.0', fontWeight: '500' }],
        'caption': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'footer': ['14px', { lineHeight: '1.6', fontWeight: '400' }],
      },
      maxWidth: {
        'content': '1200px',
        'verse': '800px',
        'narrow': '600px',
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'pill': '20px',
        'circle': '9999px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.1)',
        'nav': '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      spacing: {
        'section': '80px',
        'section-sm': '40px',
      },
      animation: {
        'fade-in': 'fadeIn 500ms ease-in-out',
        'slide-up': 'slideUp 500ms ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

## Deity Data (for content pages)

These deity names and spellings are the source of truth.
Same data as theme_final.json from the mobile app.

| slug       | English    | Hindi      | Color Accent | Color Name     | Symbolism                              |
|------------|------------|------------|--------------|----------------|----------------------------------------|
| shiva      | Shiva      | शिव        | #87CEEB      | Ice Blue       | Kailash snow, Ganga, third-eye energy  |
| krishna    | Krishna    | कृष्ण      | #4169E1      | Royal Blue     | Peacock feather, dark-skinned Shyam    |
| ganesh     | Ganesh     | गणेश       | #FF6347      | Vermillion Red | Sindoor applied in worship             |
| durga      | Durga      | दुर्गा      | #DC143C      | Crimson        | Red saree, shakti power                |
| ram        | Ram        | राम        | #FFD700      | Saffron Gold   | Royal dharmic saffron robes            |
| lakshmi    | Lakshmi    | लक्ष्मी     | #FF69B4      | Rose Pink      | Pink lotus, feminine prosperity        |
| hanuman    | Hanuman    | हनुमान     | #FF8C00      | Deep Orange    | Sindoor-covered body, saffron devotion |
| saraswati  | Saraswati  | सरस्वती    | #F0F0F0      | Pearl White    | White saree, white swan, purity        |
| vishnu     | Vishnu     | विष्णु     | #1E90FF      | Ocean Blue     | Ksheer Sagar, blue skin                |
| kali       | Kali       | काली       | #4B0082      | Deep Indigo    | Dark night, cosmic void                |
| kartikeya  | Kartikeya  | कार्तिकेय  | #009688      | Peacock Teal   | Peacock vahana, emerald spear          |

## Deity Color Token Map

Canonical color tokens — source of truth for all deity-specific UI (tabs, cards, accents).

```typescript
// Use inline style={{ color: deityColors[id] }} when Tailwind JIT can't resolve dynamic classes
export const deityColors: Record<string, string> = {
  shiva:      '#87CEEB', // Ice Blue
  krishna:    '#4169E1', // Royal Blue
  ganesh:     '#FF6347', // Vermillion Red
  durga:      '#DC143C', // Crimson
  ram:        '#FFD700', // Saffron Gold
  lakshmi:    '#FF69B4', // Rose Pink
  hanuman:    '#FF8C00', // Deep Orange
  saraswati:  '#F0F0F0', // Pearl White
  vishnu:     '#1E90FF', // Ocean Blue
  kali:       '#4B0082', // Deep Indigo
  kartikeya:  '#009688', // Peacock Teal
};

// Dark text needed on light-background deity colors (ram: gold, saraswati: white)
export const deityDarkText: Record<string, boolean> = {
  ram:       true,
  saraswati: true,
};
```


## Content Type Labels

| English   | Hindi      | Slug      |
|-----------|------------|-----------|
| Bhajan    | भजन       | bhajan    |
| Aarti     | आरती       | aarti     |
| Chalisa   | चालीसा     | chalisa   |
| Ashtakam  | अष्टकम्    | ashtakam  |
| Stotram   | स्तोत्रम्   | stotram   |
| Kirtan    | कीर्तन     | kirtan    |
| Mantra    | मंत्र      | mantra    |
| Dhun      | धुन        | dhun      |
| Suktam    | सूक्तम्    | suktam    |
| Kavach    | कवच        | kavach    |

## Temple Categories

| English        | Hindi         | Slug           | Count |
|----------------|---------------|----------------|-------|
| Jyotirlinga    | ज्योतिर्लिंग   | jyotirlinga    | 12    |
| Shakti Peeth   | शक्तिपीठ      | shakti-peeth   | 51    |
| Vishnu/Krishna | विष्णु/कृष्ण  | vishnu-krishna | 15    |
| Ashtavinayak   | अष्टविनायक    | ashtavinayak   | 8     |
| Char Dham      | चार धाम       | char-dham      | 4     |
