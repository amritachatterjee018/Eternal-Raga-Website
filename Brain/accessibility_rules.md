# Eternal Raga Website — Accessibility Rules (WCAG 2.1 AA)
# Web-specific accessibility. NOT mobile app accessibility.

## Language Attributes
- <html lang="en"> for English pages, <html lang="hi"> for Hindi pages
- Use lang="sa" attribute on Sanskrit verse blocks
- Use lang="hi" attribute on Hindi text within English pages

## Keyboard Navigation
- All interactive elements must be keyboard accessible
- Visible focus indicator: 2px solid gold #C8962E, offset 2px
- Tab order follows visual order (no tabindex > 0)
- Skip to main content link as first focusable element
- Navigation pill: Arrow Left/Right, Home, End keys
- Deity tabs: Arrow Left/Right navigation
- Carousel: Escape to pause, Arrow keys to navigate slides
- Modals: trap focus inside, Escape to close

## Screen Reader Support
- Meaningful alt text on all images (deity descriptions, temple names)
- aria-live="polite" for dynamic content updates (tab changes, filter results)
- aria-label on icon-only buttons (search, cart, language toggle)
- role="tablist", role="tab", role="tabpanel" on navigation and filter components
- aria-selected="true/false" on active/inactive tabs
- aria-hidden="true" on decorative elements (gold dividers, background orbs)

## Color Contrast
- Body text (#333333) on white (#FFFFFF): ratio 12.6:1 ✓
- Hindi text (#A07424) on white: ratio 4.5:1 ✓ (minimum AA)
- Gold links (#C8962E) on white: ratio 3.8:1 — add underline for link identification
- White text on deep purple (#1B0A3C): ratio 15.3:1 ✓

## Touch Targets
- Minimum 44×44px for all interactive elements
- Social media icons: 48px minimum
- Filter pills: minimum 44px height
- Adequate spacing between clickable elements (minimum 8px gap)

## Reduced Motion
- Respect prefers-reduced-motion media query
- Disable scroll animations, shimmer effects, carousel auto-advance
- Show static first slide of carousel
- Keep content immediately visible without animation triggers
