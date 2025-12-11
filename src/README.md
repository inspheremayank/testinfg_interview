# One Media Works - Landing Page

A dark-theme, neon glassmorphism landing page built with **React**, **Tailwind CSS**, **SCSS Modules**, and **GSAP animations**.

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn
- Modern browser with ES6+ support

### Installation

```bash
# Clone the repository
git clone [your-repo-url]
cd one-media-works

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
/src
  /animations       # GSAP timeline functions
  /assets          # Images, icons, SVGs
  /components      # React components (modular)
  /data            # Static content (JSON)
  /styles          # Global CSS and Tailwind
  /tokens          # Design tokens (CSS vars, JS, Tailwind config)
  /utils           # Helper functions
  main.jsx         # App entry point
  App.jsx          # Main app component
```

## 🎨 Customizing the Design

### 1. **Changing Brand Colors**

Edit `/src/tokens/tokens.css` and modify these variables:

```css
:root {
  --bg: #0B0E12;                    /* Main background */
  --primary: #3b82f6;               /* Primary blue */
  --neon: #22d3ee;                  /* Neon cyan accent */
  --accent-purple: #a855f7;         /* Purple accent */
  --accent-pink: #ec4899;           /* Pink accent */
  --text-primary: rgba(255, 255, 255, 0.98);
}
```

These changes will automatically propagate throughout the entire app.

### 2. **Changing Spacing**

Spacing values live in `/src/tokens/tokens.css`:

```css
:root {
  --space-xs: 0.5rem;
  --space-sm: 0.75rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  /* ...more spacing values */
  
  --section-padding-y: 8rem;        /* Vertical section padding */
  --section-padding-y-mobile: 4rem; /* Mobile section padding */
}
```

### 3. **Changing Motion Timings**

Animation durations and easings are in `/src/tokens/tokens.css`:

```css
:root {
  --motion-duration-fast: 0.2s;
  --motion-duration-normal: 0.3s;
  --motion-duration-slow: 0.6s;
  
  --motion-ease-power3-out: cubic-bezier(0.22, 1, 0.36, 1);
  --motion-ease-back-out: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

For GSAP-specific timing adjustments, see `/src/animations/animations.js`.

### 4. **Changing Typography**

Font sizes, weights, and line-heights are in `/src/tokens/tokens.css`:

```css
:root {
  --text-base: 1rem;
  --text-xl: 1.25rem;
  --text-5xl: 3rem;
  
  --font-normal: 400;
  --font-bold: 700;
  
  --leading-tight: 1.1;
  --leading-normal: 1.5;
}
```

## ⚡ Animation System

All animations are centralized in `/src/animations/animations.js` using **GSAP**.

### Animation Hooks

Components expose animation hooks via CSS classes:

- `.js-splash` - Splash screen container
- `.js-splash-logo` - Logo to animate
- `.js-hero-headline` - Hero headline
- `.js-hero-cta` - Hero CTA button
- `.js-services-card` - Service cards (stagger)
- `.js-testimonials-track` - Testimonials scrolling track
- `.js-fade-up` - Generic scroll-triggered fade-up

### Using Animations in Components

```jsx
import { useEffect } from 'react';
import { initHero } from '../animations/animations';

function HeroSection() {
  useEffect(() => {
    const cleanup = initHero();
    return cleanup; // Clean up on unmount
  }, []);

  return (
    <div className="js-hero">
      <h1 className="js-hero-headline">Make Growth Feel Inevitable.</h1>
      {/* ... */}
    </div>
  );
}
```

### Customizing Animation Timings

Open `/src/animations/animations.js` and modify the timeline:

```javascript
// Example: Slow down hero headline animation
timeline.fromTo(
  '.js-hero-headline',
  { y: 40, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: getDuration(1.2), // ← Change from 0.8 to 1.2
  }
);
```

### Available Animation Functions

| Function | Description |
|----------|-------------|
| `initSplash(onComplete)` | Splash screen animation |
| `initHero()` | Hero section entrance |
| `initServices()` | Services 3D stagger reveal |
| `initTestimonials(selector, options)` | Testimonials marquee with drag |
| `initTrustedMarquee(selector)` | Infinite brand marquee |
| `animateFAQItem(item, isOpen)` | FAQ accordion toggle |
| `initScrollAnimations()` | Generic scroll-triggered fades |

## ♿ Accessibility

### Reduced Motion Support

The app automatically respects `prefers-reduced-motion`:

- All animations duration reduced to 0.01s
- Autoplay marquees are disabled
- Parallax effects are minimal

This is handled in:
- `/src/tokens/tokens.css` (CSS)
- `/src/utils/dom.js` (JS detection)
- `/src/animations/animations.js` (GSAP animations)

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Skip links available (add via header component)
- ARIA labels on carousel controls
- Focus management for modals/accordions

### Testing Reduced Motion

**Chrome DevTools:**
1. Open DevTools → Rendering
2. Check "Emulate CSS media prefers-reduced-motion"

**macOS System Settings:**
System Preferences → Accessibility → Display → Reduce motion

## 📦 Component Architecture

### Component Pattern

Each component follows this structure:

```
/ComponentName
  ComponentName.jsx       # React component
  ComponentName.module.scss # Scoped styles
```

### Using SCSS Modules

```jsx
import styles from './Hero.module.scss';

function Hero() {
  return <div className={styles.hero}>...</div>;
}
```

### Importing Tokens in SCSS

```scss
/* Import tokens at the top of your SCSS file */
@import '../../tokens/tokens.css';

.hero {
  background: var(--bg);
  padding: var(--section-padding-y) var(--section-padding-x);
  color: var(--text-primary);
}
```

## 🔧 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS 4** - Utility-first CSS
- **SCSS Modules** - Component-scoped styles
- **GSAP 3** - Professional animations
- **Framer Motion** - React animation library (optional)
- **Lucide React** - Icon library

## 📊 Content Management

All content lives in `/src/data/content.json` for easy editing:

```json
{
  "hero": {
    "headline": "Make Growth Feel Inevitable.",
    "subheadline": "Precision targeting. AI-driven performance...",
    "cta": {
      "text": "Start Your Growth Plan",
      "href": "#contact"
    }
  }
}
```

Import and use in components:

```jsx
import content from '../data/content.json';

function Hero() {
  return <h1>{content.hero.headline}</h1>;
}
```

## 🎯 Performance Optimization

- **Code splitting** - Dynamic imports for heavy components
- **Image optimization** - Lazy loading, responsive images
- **CSS purging** - Tailwind removes unused styles in production
- **GPU acceleration** - All animations use `transform` and `opacity`
- **Debounced scroll handlers** - Prevents performance bottlenecks

## 🐛 Debugging

### Animation Issues

1. Check console for GSAP warnings
2. Verify animation hook classes are present (`.js-*`)
3. Test with `prefersReducedMotion` disabled
4. Check ScrollTrigger markers: `ScrollTrigger.config({ markers: true })`

### Styling Issues

1. Verify token imports in SCSS modules
2. Check Tailwind purge configuration
3. Inspect computed styles in DevTools
4. Ensure CSS module imports use `.module.scss` extension

## 📝 License

[Your License Here]

## 🤝 Contributing

[Your Contributing Guidelines]

---

**Questions?** See `/design-to-code.md` for Figma → code mapping details.
