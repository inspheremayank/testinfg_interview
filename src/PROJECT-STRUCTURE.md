# Project Structure - One Media Works Landing Page

## 📁 Complete Folder Structure

```
one-media-works-landing/
├── public/
│   ├── index.html
│   └── favicon.svg
│
├── src/
│   ├── animations/
│   │   └── animations.js          # GSAP timeline functions
│   │
│   ├── assets/
│   │   ├── icons/                 # SVG icons
│   │   └── images/                # Image assets
│   │
│   ├── components/
│   │   ├── Splash/
│   │   │   ├── Splash.jsx
│   │   │   └── Splash.module.scss
│   │   │
│   │   ├── Hero/
│   │   │   ├── Hero.jsx
│   │   │   └── Hero.module.scss
│   │   │
│   │   ├── OneLiner/
│   │   │   ├── OneLiner.jsx
│   │   │   └── OneLiner.module.scss
│   │   │
│   │   ├── ThreeMoves/
│   │   │   ├── ThreeMoves.jsx
│   │   │   └── ThreeMoves.module.scss
│   │   │
│   │   ├── Services/
│   │   │   ├── ServicesGrid.jsx
│   │   │   ├── ServicesGrid.module.scss
│   │   │   ├── ServiceCard.jsx
│   │   │   └── ServiceCard.module.scss
│   │   │
│   │   ├── Testimonials/
│   │   │   ├── TestimonialsMarquee.jsx
│   │   │   └── Testimonials.module.scss
│   │   │
│   │   ├── Trusted/
│   │   │   ├── TrustedMarquee.jsx
│   │   │   └── Trusted.module.scss
│   │   │
│   │   ├── CTA/
│   │   │   ├── FinalCTA.jsx
│   │   │   └── CTA.module.scss
│   │   │
│   │   └── FAQ/
│   │       ├── FAQ.jsx
│   │       └── FAQ.module.scss
│   │
│   ├── data/
│   │   └── content.json           # All page content
│   │
│   ├── styles/
│   │   ├── globals.css            # Global styles
│   │   └── tailwind.css           # Tailwind imports
│   │
│   ├── tokens/
│   │   ├── tokens.css             # CSS variables
│   │   ├── tokens.js              # JS token exports
│   │   └── tailwind.config.js     # Tailwind token mapping
│   │
│   ├── utils/
│   │   └── dom.js                 # DOM helper functions
│   │
│   ├── App.jsx                    # Main app component
│   └── main.jsx                   # Entry point
│
├── .eslintrc.cjs                  # ESLint configuration
├── .prettierrc                    # Prettier configuration
├── package.json                   # Dependencies
├── vite.config.js                 # Vite configuration
├── README.md                      # Setup instructions
├── design-to-code.md              # Figma mapping guide
└── PROJECT-STRUCTURE.md           # This file
```

## 🎯 Architecture Principles

### 1. **Separation of Concerns**

- **Components**: UI markup and structure only
- **Animations**: GSAP logic separated in `/animations/`
- **Styles**: SCSS modules scoped per component
- **Data**: Content in `/data/content.json`
- **Tokens**: Design values centralized in `/tokens/`

### 2. **Animation Hook Pattern**

Components expose CSS classes prefixed with `.js-*` for animation targeting:

```jsx
// Component
<div className="js-hero-headline">Make Growth Feel Inevitable</div>

// Animation
gsap.fromTo('.js-hero-headline', { y: 40, opacity: 0 }, { y: 0, opacity: 1 });
```

**Benefits:**
- Decoupled animation logic from React
- Easy to debug and modify timings
- Works with any animation library
- Clean component code

### 3. **Token-Based Design System**

All design values come from tokens:

```scss
// Component SCSS
.card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-glass);
}
```

**Tokens live in:**
- `/src/tokens/tokens.css` - CSS variables
- `/src/tokens/tokens.js` - JavaScript exports
- `/src/tokens/tailwind.config.js` - Tailwind mapping

### 4. **Data-Driven Components**

Content is separated from code:

```jsx
import content from '@data/content.json';

function Hero() {
  return <h1>{content.hero.headline}</h1>;
}
```

**Benefits:**
- Easy content updates
- No code changes for copy edits
- Supports i18n in future
- Clear content structure

## 🔧 Component Pattern

Every component follows this structure:

```
/ComponentName/
  ComponentName.jsx       # React component
  ComponentName.module.scss # Scoped styles
```

### Component Template

```jsx
/**
 * COMPONENT NAME
 * 
 * Brief description of what this component does.
 * 
 * Animation hooks:
 * - .js-component-name - Main container
 * - .js-component-element - Specific element
 * 
 * Props:
 * - prop1: Description
 * - prop2: Description
 */

import { useEffect } from 'react';
import { motion } from 'motion/react';
import { initComponent } from '@animations/animations';
import styles from './ComponentName.module.scss';
import content from '@data/content.json';

export function ComponentName({ prop1, prop2 }) {
  useEffect(() => {
    const cleanup = initComponent();
    return cleanup;
  }, []);

  return (
    <section className={`${styles.section} js-component-name`}>
      {/* Component content */}
    </section>
  );
}

export default ComponentName;
```

### SCSS Module Template

```scss
/**
 * COMPONENT NAME - Styles
 * 
 * Scoped styles using design tokens.
 */

.section {
  padding: var(--section-padding-y) var(--section-padding-x);
  background: var(--bg);
  color: var(--text-primary);
}

.element {
  font-size: var(--text-xl);
  margin-bottom: var(--space-lg);
}

/* Responsive */
@media (max-width: 768px) {
  .section {
    padding: var(--section-padding-y-mobile) var(--section-padding-x);
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .element {
    animation: none !important;
    transition: none !important;
  }
}
```

## 🎬 Animation System

### GSAP Timeline Structure

```javascript
export const initComponentName = () => {
  const timeline = gsap.timeline({
    defaults: { ease: 'power3.out' }
  });

  timeline.fromTo(
    '.js-element',
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: getDuration(0.6) }
  );

  return () => timeline.kill(); // Cleanup
};
```

### Animation Function Naming

- `init[ComponentName]()` - Initialize component animation
- `animate[Action]()` - Specific action (e.g., `animateFAQItem()`)
- Always return cleanup function
- Use `getDuration()` for reduced motion support

## 📊 Data Structure

### content.json Schema

```json
{
  "sectionName": {
    "title": "Section Title",
    "subtitle": "Section Subtitle",
    "items": [
      {
        "id": 1,
        "property": "value"
      }
    ]
  }
}
```

### Adding New Content

1. Add to `/src/data/content.json`
2. Import in component: `import content from '@data/content.json'`
3. Access: `content.sectionName.property`

## 🎨 Styling Strategy

### Tailwind Usage

Use Tailwind for:
- Layout (flex, grid)
- Spacing utilities (p-*, m-*)
- Responsive breakpoints (lg:*, md:*)
- Display utilities (hidden, block)

```jsx
<div className="flex items-center gap-4 lg:gap-8">
```

### SCSS Modules Usage

Use SCSS modules for:
- Component-specific styles
- Complex selectors
- Pseudo-elements
- Animations/transitions

```scss
.card {
  &:hover {
    &::before {
      opacity: 1;
    }
  }
}
```

### When to Use Inline Styles

Use inline styles for:
- Dynamic gradients from data
- Color values from props
- Calculated positions

```jsx
<div style={{ background: service.gradient }}>
```

## ♿ Accessibility Features

### Implemented

- ✅ Semantic HTML (`<header>`, `<main>`, `<section>`)
- ✅ ARIA labels on interactive elements
- ✅ `prefers-reduced-motion` support
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Alt text on images
- ✅ Color contrast ratios

### Testing Checklist

- [ ] Test with screen reader (NVDA/JAWS)
- [ ] Keyboard-only navigation
- [ ] Reduced motion mode
- [ ] Color contrast (WCAG AA)
- [ ] Focus indicators visible
- [ ] Form labels present

## 🚀 Performance Optimizations

### Implemented

- ✅ Code splitting (vendor, animations)
- ✅ Lazy loading images
- ✅ GPU-accelerated animations
- ✅ Debounced scroll handlers
- ✅ CSS purging in production
- ✅ Tree-shaking unused code

### Build Optimization

```bash
npm run build
```

Output:
- Minified JS/CSS
- Sourcemaps for debugging
- Vendor chunk separation
- Optimized assets

## 📝 Development Workflow

### 1. Start Development Server

```bash
npm install
npm run dev
```

### 2. Make Changes

- **Content**: Edit `/src/data/content.json`
- **Styles**: Edit component `.module.scss` or `/src/tokens/tokens.css`
- **Animations**: Edit `/src/animations/animations.js`
- **Components**: Edit `.jsx` files

### 3. Test Changes

- Check browser at `localhost:5173`
- Test reduced motion
- Test responsive breakpoints
- Check console for errors

### 4. Build for Production

```bash
npm run build
npm run preview
```

## 🔍 Debugging Tips

### Animation Not Working

1. Check element has animation hook class (`.js-*`)
2. Verify GSAP import and registration
3. Check console for GSAP warnings
4. Test with reduced motion disabled
5. Add markers: `ScrollTrigger.config({ markers: true })`

### Styles Not Applying

1. Verify SCSS module import
2. Check token variable exists in `tokens.css`
3. Inspect element in DevTools
4. Check Tailwind purge configuration
5. Clear cache and rebuild

### Component Not Rendering

1. Check console for React errors
2. Verify component import path
3. Check data exists in `content.json`
4. Verify props are passed correctly

## 📚 Additional Documentation

- **README.md** - Setup and customization guide
- **design-to-code.md** - Figma layer mapping
- **tokens.css** - Design token reference
- **animations.js** - Animation function docs

---

**Questions?** Open an issue or check the documentation files listed above.
