# Eternal Raga Website — Scripture & Devotional Content Rules
# Content schemas shared between mobile app and website.
# The website displays the SAME content as the app but in richer text format.

## Content Reuse: App ↔ Website Mapping

The 10-layer JSON schema from the mobile app maps to website sections:

| Layer | App Usage                  | Website Page Section                    |
|-------|----------------------------|-----------------------------------------|
| 1     | Sanskrit (Devanagari)      | Verse text — Sanskrit tab               |
| 2     | IAST Transliteration       | Verse text — Transliteration tab        |
| 3     | Hindi meaning              | Verse text — Hindi Meaning tab          |
| 4     | English meaning            | Verse text — English Meaning tab        |
| 5     | Word-by-word               | Expandable "Detailed Analysis" section  |
| 6     | Pronunciation guide        | "How to Recite" accordion               |
| 7     | Historical context         | Introduction / background section       |
| 8     | Philosophical analysis     | Commentary section                      |
| 9     | Modern context             | "In Modern Life" section (SEO key!)     |
| 10    | NRI application            | Part of "In Modern Life" section        |

Layers 9-10 are the website's PRIMARY SEO differentiator. No competitor
provides modern NRI context for traditional scripture content. EVERY mantra
page MUST have this section with at least 200 words of original content.

---

## Bhagavad Gita

### Data Sources (same as app, priority order)
1. BhagavadGitaAPI.in (Primary — API key via RapidAPI)
2. TheAum.org API (Backup — no auth)
3. Vedic Scriptures JSON (GitHub — for static generation)

### Website-Specific: Static Generation
- Pre-render all 700 verses as static pages at build time (Next.js SSG)
- URL: /en/scriptures/bhagavad-gita/chapter-2/verse-47
- Each verse page: unique title tag, meta description, Schema.org Article markup
- Chapter pages: list all verses with first line preview

### Verse Display (Website)
4 independent toggle buttons (not tabs):
1. Sanskrit (संस्कृत) — Devanagari, Noto Sans Devanagari, 20px, #1B0A3C
2. Transliteration (लिप्यन्तरण) — Roman/IAST, Georgia italic, 15px, #666666
3. Hindi Meaning (हिंदी अर्थ) — Noto Sans Devanagari, 16px, #A07424
4. English Meaning (अंग्रेजी अर्थ) — Inter, 16px, #333333

Commentary: expandable accordion below verse, gold left border

---

## Mantra/Stotra Content Structure

### Individual Mantra Page Data
```json
{
  "slug": "hanuman-chalisa",
  "title_en": "Hanuman Chalisa",
  "title_hi": "हनुमान चालीसा",
  "type": "chalisa",
  "deity": "hanuman",
  "verse_count": 43,
  "estimated_duration": "8 min",
  "best_time": "Tuesday morning, or anytime for courage",
  "benefits_en": "Protection, courage, devotion to Ram",
  "benefits_hi": "सुरक्षा, साहस, राम भक्ति",
  "youtube_video_id": "YOUTUBE_ID_HERE",
  "verses": [
    {
      "verse_number": 1,
      "sanskrit": "श्रीगुरु चरन सरोज रज, निज मनु मुकुरु सुधारि।",
      "transliteration": "śrī guru carana saroja raja, nija manu mukuru sudhāri",
      "meaning_hi": "गुरु के चरण कमलों की धूल से अपने मन रूपी दर्पण को पवित्र करके",
      "meaning_en": "Cleansing the mirror of my mind with the dust of the lotus feet of the Guru"
    }
  ],
  "how_to_recite": "...",
  "modern_context_en": "For NRI devotees facing career uncertainty or visa anxiety, the Hanuman Chalisa offers...",
  "modern_context_hi": "...",
  "historical_context": "...",
  "related_mantras": ["bajrang-baan", "hanuman-aarti", "108-names-of-hanuman"]
}
```

### 108 Names Page Data
```json
{
  "slug": "108-names-of-shiva",
  "deity": "shiva",
  "title_en": "108 Names of Lord Shiva with Meaning",
  "title_hi": "शिव के 108 नाम अर्थ सहित",
  "youtube_video_id": "YOUTUBE_ID_HERE",
  "pdf_download_url": "/downloads/108-names-shiva.pdf",
  "names": [
    {
      "number": 1,
      "sanskrit": "शिव",
      "transliteration": "Śiva",
      "meaning_en": "The Auspicious One",
      "significance": "Primary name, representing inherent goodness"
    }
  ]
}
```

---

## Transliteration Standards (Same as App)

Use IAST (International Alphabet of Sanskrit Transliteration):
- ā ī ū ṛ ṝ ḷ ḹ (long vowels)
- ṅ ñ ṇ ṃ ḥ (nasals and visarga)
- ś ṣ (sibilants)
- ṭ ḍ ṇ (retroflex)
- Example: "karmaṇy evādhikāras te" NOT "karmany evadhikaraste"

## Font Requirements
- Sanskrit/Hindi: ALWAYS use Noto Sans Devanagari loaded via Google Fonts
- Transliteration: Georgia with IAST diacritics
- NEVER rely on system Devanagari fonts
- Test conjuncts on build: क्ष त्र ज्ञ श्र द्ध

## Content Accuracy Rules
- Deity names: EXACT spellings (Shiva शिव, Krishna कृष्ण, etc.)
- Sanskrit: proper Unicode Devanagari — NEVER transliterated Latin as Hindi
- All spiritual content: respectful and authentic
- When in doubt: flag for human review rather than guessing
- Temple names: verified against official sources

## Content Files Location
- Source: C:\Users\night\Projects\eternal_raga_content\
- Scripture JSONs: scripture\chalisas\, scripture\stotrams\, etc.
- Same content serves: mobile app, website, YouTube, podcast
- Website reads from /data directory in the Next.js project
