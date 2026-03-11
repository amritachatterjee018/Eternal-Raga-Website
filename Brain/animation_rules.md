# Eternal Raga Website — Animation Rules v2.0
# CSS transitions, scroll-driven animations, and interactive effects.
# Sacred, gentle, not flashy. UPDATED: March 2026

## General Principles
- All animations use CSS transitions, keyframes, or scroll-driven animations
- Default easing: ease-in-out (buttons), cubic-bezier(0.4,0,0.2,1) (navigation pill)
- Respect prefers-reduced-motion: disable animations when user prefers reduced motion
- Animations enhance understanding, never distract from sacred content
- NEVER: bouncing, elastic, confetti, screen shake, rapid flashing

## Scroll-Driven Animations (CSS — No JavaScript Libraries)
Reference: CodePen pimskie/OPMQVjP

```css
@keyframes slide-up-fade {
  from { opacity: 0; transform: translateY(30px) rotate(1deg); }
  to { opacity: 1; transform: translateY(0) rotate(0); }
}

.animate-on-scroll {
  animation: slide-up-fade linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}
```

### Where to Apply
- Home page deity cards: stagger by 100ms each
- Daily Mantra card: scale(0.95) → scale(1.0) + fade
- Eternal Gyan article cards: stagger slide-up 150ms between cards
- Shop product cards: slide up with subtle rotation
- Mantra verse cards: fade-in + slide-up on scroll (meditative unfolding effect)
- Section headings: fade in + translateY(10px → 0)
- Footer layers: reveal sequentially on scroll

### Rules
- Duration: 500-700ms per animation, ease-out
- Max translateY: 30px. Max rotation: 3 degrees.
- Trigger ONCE only (animation-fill-mode: both, not re-animate on scroll up)
- Stagger children: 100ms between siblings

## Navigation Pill Indicator
Reference: CodePen oathanrex/MYeaRay

- Gold gradient pill slides via translateX
- Transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1), width 300ms
- Subtle gold glow shadow: 0 0 20px rgba(200,150,46,0.3)
- ResizeObserver recalculates position on window resize

## Deity Tab Bar Active Indicator
Reference: CodePen fyildiz1974/RNRwEjr

- Gold bottom border slides between tabs (300ms ease-out)
- Content area: crossfade between deity cards (300ms)
- Arrow buttons: fade in/out based on scroll position

## Footer Bottom Bar Shimmer
- Large outlined "ETERNAL RAGA" text
- @keyframes shimmer: gold gradient highlight moves left→right over 8 seconds, repeats
- Subtle parallax: text moves slower than footer on scroll (background-attachment or transform)

## Hero Carousel
- Auto-advance: 5 seconds per slide
- Transition: crossfade 500ms
- Pause on hover and on focus
- Dot indicators: active dot transitions to gold 200ms
- Disable auto-advance when prefers-reduced-motion

## Interactive Elements

### Buttons
| State    | Effect                                          | Duration |
|----------|-------------------------------------------------|----------|
| Hover    | translateY(-2px), shadow deepens                | 200ms    |
| Click    | translateY(1px), shadow reduces                 | 100ms    |
| Focus    | gold ring outline 2px offset 2px                | instant  |

### Cards
| State    | Effect                                          | Duration |
|----------|-------------------------------------------------|----------|
| Hover    | translateY(-4px), shadow deepens, border gold   | 200ms    |
| Click    | scale(0.98)                                     | 100ms    |

### Filter Pills
| State    | Effect                                          | Duration |
|----------|-------------------------------------------------|----------|
| Active   | gold #C8962E filled, white text, inner shadow   | 200ms    |
| Inactive | white bg, gold border, gold text                | -        |
| Hover    | gold bg 10% opacity, slight lift (-1px)         | 200ms    |

### Scripture Layer Toggles
- ON: gold filled pill with white text + subtle glow
- OFF: cream bg, gold border, gold text
- Transition: background fills left→right over 200ms

### Social Media Icons (Footer)
- 48px size, gold border circle
- Hover: circle fills gold, icon turns white, scale 1.1x, 200ms
- Focus: gold ring outline

### Footer Links
- Hover: cream → white, gold underline slides in from left, 200ms

### Newsletter Input
- Focus: gold border glows brighter (box-shadow: 0 0 8px rgba(200,150,46,0.4))

## Page Load
- Nav bar: immediate (no animation, always visible)
- Hero: fade in 300ms on load
- Below-fold content: scroll-driven fade-in

## Reduced Motion Fallback
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  /* Carousel: show static first slide, no auto-advance */
  /* Scroll animations: show content immediately, no triggers */
  /* Footer shimmer: static outlined text, no animation */
}
```
