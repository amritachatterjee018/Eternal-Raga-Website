# Eternal Raga Website — MailerLite Email Integration Rules

## Overview
MailerLite captures email subscribers from the website. The website has MORE
email touchpoints than the app because every page is a potential conversion point.

## MailerLite Groups
- "Eternal Raga Website Subscribers" → general newsletter signups
- "Book Buyers" → shop customers
- "Scripture Notifications" → users who signed up for Coming Soon alerts
- "Eternal Raga App Users" → shared with mobile app (same group)

## Website Email Capture Touchpoints

### 1. Footer Newsletter (EVERY page)
- "Get Daily Mantras in Your Inbox · दैनिक मंत्र प्राप्त करें"
- Single email field + "Subscribe" gold button
- Add to: "Eternal Raga Website Subscribers" group
- Tag: "source_website_footer"

### 2. Coming Soon Scripture Pages (Vedas, Upanishads, Puranas, Epics)
- "Be the first to know when we launch [Scripture Name]"
- Email field + "Notify Me · सूचित करें" button
- Add to: "Scripture Notifications" group
- Tag: "notify_[scripture_name]" (e.g., "notify_vedas", "notify_upanishads")

### 3. 108 Names PDF Lead Magnet
- "Download Printable PDF · प्रिंट करने योग्य PDF डाउनलोड करें"
- Email field + "Get Free PDF" button
- Add to: "Eternal Raga Website Subscribers" group
- Tag: "lead_magnet_108_names_[deity]" (e.g., "lead_magnet_108_names_shiva")
- Trigger: MailerLite automation sends PDF download link email

### 4. Blog Article Bottom CTA
- "Enjoyed this article? Get weekly spiritual insights."
- Email field + "Subscribe" button
- Add to: "Eternal Raga Website Subscribers" group
- Tag: "source_blog_[article_slug]"

### 5. Shop Purchase
- Checkout page checkbox: "Send me new book and product updates"
- Add to: "Book Buyers" group
- Tag: "source_shop_purchase"

### 6. Exit Intent Popup (desktop only, after 30 seconds)
- "Before you go — get a free Daily Mantra guide"
- Email field + "Get Free Guide" button
- Add to: "Eternal Raga Website Subscribers" group
- Tag: "lead_magnet_daily_mantra_guide"
- Show once per visitor (use cookie/localStorage)

## Custom Fields (same as app)
- favorite_deity (string)
- source (string: "website_footer", "lead_magnet", "coming_soon", "shop", "blog")
- signup_date (date)

## Implementation
- Use MailerLite JavaScript API or embedded forms
- For custom forms: POST to MailerLite REST API via Next.js API route
- NEVER expose MailerLite API key in client-side code
- Use Next.js API routes (/api/subscribe) as proxy
- Rate limit form submissions to prevent abuse
- Show success message: "✓ Check your inbox! · अपना इनबॉक्स देखें!"
- Show error message with retry option

## Privacy & Compliance
- Checkbox for consent on all forms (pre-checked OK for newsletter, unchecked for marketing)
- Link to Privacy Policy below every form
- MailerLite handles unsubscribe and GDPR compliance
- Cookie consent banner for exit intent popup tracking
