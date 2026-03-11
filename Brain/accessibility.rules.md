# Eternal Raga Website — Accessibility Rules (WCAG 2.1 AA)

## Keyboard Navigation
- All interactive elements must be reachable via Tab key
- Visible focus indicator: 2px gold #C8962E outline on focused elements
- Skip-to-content link as first focusable element on every page
- Escape key closes modals, drawers, and dropdown menus
- Enter/Space activates buttons and links
- Arrow keys navigate within dropdown menus and carousels

## Color & Contrast
- Body text (#333333) on white: 12.6:1 contrast ratio ✓
- Hindi text (#A07424) on white: 4.6:1 ✓ (AA for normal text)
- Gold (#C8962E) on white: 3.9:1 — use ONLY for large text (18px+) or decorative
- White text on deep purple (#1B0A3C): 16.5:1 ✓
- Gold on deep purple: 5.2:1 ✓
- Never convey information by color alone — always pair with text labels or icons

## Images & Media
- ALL images: descriptive alt text
  - Deity art: "Lord Shiva meditating in lotus position with crescent moon and Ganga"
  - Temple photos: "Somnath Jyotirlinga Temple exterior, Prabhas Patan, Gujarat"
  - Yoga poses: "Vrikshasana (Tree Pose) — standing balance posture on one leg"
  - Product images: "Bhagavad Gita hardcover book, green leather binding with gold text"
  - Decorative images: alt="" (empty alt, not missing alt)
- YouTube embeds: include title attribute describing the video content
- SVG icons: aria-label or aria-hidden="true" if decorative

## Semantic HTML
- Use proper heading hierarchy (H1 → H2 → H3, never skip)
- Use <nav> with aria-label="Main navigation" for nav bar
- Use <main> for primary content area
- Use <article> for blog posts and standalone content
- Lists use <ul>/<ol>/<li>, not styled divs
- Tables use <thead>, <th scope="col">, <td> — not divs styled as tables
- Forms use <label> associated with <input> via htmlFor

## Bilingual Content
- Set lang attribute on page: <html lang="en"> or <html lang="hi">
- For inline Hindi text on English pages: <span lang="hi">हिंदी पाठ</span>
- For Sanskrit: <span lang="sa">संस्कृत पाठ</span>
- Screen readers will switch pronunciation engine based on lang attribute

## Interactive Elements
- Minimum touch/click target: 44x44px
- Buttons: clear, descriptive text (not just "Click here")
- Links: descriptive text (not just "Read more" — use "Read more about Hanuman Chalisa")
- Carousel: pause button, keyboard arrow navigation, dot indicators with aria-labels
- Toggle buttons: aria-pressed="true/false" state
- Accordion sections: aria-expanded="true/false"
- Search: aria-label="Search mantras, scriptures, and deities"

## Forms (Newsletter, Shop, Contact)
- Every input has a visible <label>
- Error messages: red text + icon, associated with input via aria-describedby
- Required fields: marked with asterisk + aria-required="true"
- Form submission: announce success/error via aria-live="polite" region

## Motion & Animation
- Respect prefers-reduced-motion media query
- @media (prefers-reduced-motion: reduce) — disable auto-scrolling carousel, fade transitions
- No flashing content (3 flashes per second max)
- Carousel: auto-advance pauses on hover AND on focus

## Page Structure
- Every page has: skip link → nav → breadcrumb → main (with H1) → footer
- Breadcrumbs: use <nav aria-label="Breadcrumb"> with <ol>
- Current page in breadcrumb: aria-current="page"
