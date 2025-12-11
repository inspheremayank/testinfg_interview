# Design to Code Mapping

This document explains how the Figma design layers map to code components and where to make visual tweaks.

## 🎨 Figma → Component Mapping

| Figma Layer/Frame | Code Component | File Location |
|-------------------|----------------|---------------|
| **Splash Screen** | `<Splash />` | `/src/components/Splash/Splash.jsx` |
| **Hero Section** | `<Hero />` | `/src/components/Hero/Hero.jsx` |
| **One-Liner Barrier** | `<OneLiner />` | `/src/components/OneLiner/OneLiner.jsx` |
| **Three Moves (Align/Optimise/Grow)** | `<ThreeMoves />` | `/src/components/ThreeMoves/ThreeMoves.jsx` |
| **Services Grid** | `<ServicesGrid />` + `<ServiceCard />` | `/src/components/Services/` |
| **Testimonials** | `<TestimonialsMarquee />` | `/src/components/Testimonials/` |
| **Trusted By** | `<TrustedMarquee />` | `/src/components/Trusted/` |
| **Final CTA** | `<FinalCTA />` | `/src/components/CTA/` |
| **FAQ** | `<FAQ />` | `/src/components/FAQ/` |

## 🔍 Visual Design Reference

### Colors

All colors from the Figma file are stored in `/src/tokens/tokens.css`:

```css
--bg: #0B0E12              /* Deep blue background */
--glass-bg: rgba(255, 255, 255, 0.04)  /* Frosted glass panels */
--neon: #22d3ee            /* Cyan neon accent */
--primary: #3b82f6         /* Blue gradient start */
```

**To change brand color:**
1. Open `/src/tokens/tokens.css`
2. Update `--primary` and `--neon` variables
3. All gradients and glows update automatically

### Spacing

Spacing follows an 8px base grid:

```css
--space-xs: 0.5rem   /* 8px */
--space-sm: 0.75rem  /* 12px */
--space-md: 1rem     /* 16px */
--space-lg: 1.5rem   /* 24px */
--space-xl: 2rem     /* 32px */
--space-2xl: 3rem    /* 48px */
```

**Section vertical padding:**
- Desktop: `--section-padding-y: 8rem` (128px)
- Mobile: `--section-padding-y-mobile: 4rem` (64px)

### Typography

| Figma Text Style | CSS Variable | Tailwind Class |
|------------------|--------------|----------------|
| Hero Headline (96px) | `--text-8xl` | `text-8xl` |
| Section Title (60px) | `--text-6xl` | `text-6xl` |
| Subheading (24px) | `--text-2xl` | `text-2xl` |
| Body (16px) | `--text-base` | `text-base` |
| Caption (14px) | `--text-sm` | `text-sm` |

### Glass Morphism Effect

The signature frosted glass panels use:

```css
background: var(--glass-bg);              /* rgba(255,255,255,0.04) */
backdrop-filter: blur(var(--glass-blur)); /* 14px */
border: 1px solid var(--glass-border);    /* rgba(255,255,255,0.05) */
box-shadow: var(--shadow-glass);          /* Inset highlight */
```

**To adjust glass intensity:**
- Change `--glass-bg` opacity (0.04 → 0.08 for stronger)
- Change `--glass-blur` (14px → 20px for more blur)

### Neon Glow Effect

Applied to accents, edges, and hover states:

```css
box-shadow: var(--glow-primary);  /* 0 0 20px rgba(34, 211, 238, 0.3) */
```

**Color-specific glows:**
- `--glow-primary` (cyan)
- `--glow-purple` (purple)
- `--glow-pink` (pink)
- `--glow-green` (green)

## 🎬 Motion Design

### Animation Timing Reference

| Animation Type | Duration | Easing | Token Variable |
|---------------|----------|--------|----------------|
| Instant feedback | 0.1s | `ease-out` | `--motion-duration-instant` |
| Fast transitions | 0.2s | `power3.out` | `--motion-duration-fast` |
| Standard entrance | 0.6s | `power3.out` | `--motion-duration-slower` |
| Slow reveal | 0.8s | `expo.out` | `--motion-duration-slowest` |

### Signature Animations

**Splash Screen (2.2s total):**
1. 0-0.8s: Logo scale (0.88 → 1.03 → 1)
2. 0.8-1.6s: Glow pulse spreads
3. 1.6-2.2s: Slide up exit

**Services 3D Stagger:**
- Each card enters with `y: 40`, `z: -60`, `rotateX: 8`
- Stagger delay: `0.05s` per card
- Creates layered depth effect

**Testimonials Marquee:**
- Autoplay: 4s interval
- Snap speed: 0.8s
- Center card scales to `1.03`
- Neighbors scale to `0.98`

### Where Animations Live

All animation logic is in `/src/animations/animations.js`.

**Components expose hooks via classes:**
- `.js-splash-logo` → Logo to animate
- `.js-hero-headline` → Hero headline
- `.js-services-card` → Service cards
- `.js-testimonials-track` → Testimonials scroller

## 📐 Responsive Breakpoints

| Breakpoint | Value | Tailwind Prefix | Use Case |
|------------|-------|-----------------|----------|
| sm | 640px | `sm:` | Mobile landscape |
| md | 768px | `md:` | Tablets |
| lg | 1024px | `lg:` | Desktop |
| xl | 1280px | `xl:` | Large desktop |
| 2xl | 1536px | `2xl:` | Extra large screens |

### Mobile Adjustments

**What changes on mobile:**
- Hero cards hidden (`lg:block`)
- Section padding reduced (`--section-padding-y-mobile`)
- Font sizes scale down (`text-6xl lg:text-7xl xl:text-8xl`)
- Parallax effects disabled
- Grid columns: 1 col mobile → 3-4 cols desktop

## 🎯 Common Customization Tasks

### 1. Change Hero Headline

**File:** `/src/data/content.json`

```json
{
  "hero": {
    "headline": "Make Growth Feel Inevitable.",
    "subheadline": "Precision targeting. AI-driven performance..."
  }
}
```

### 2. Add a New Service

**File:** `/src/data/content.json`

```json
{
  "services": {
    "items": [
      {
        "id": 13,
        "category": "B2B",
        "title": "SEO Optimization",
        "subtitle": "organic growth at scale",
        "icon": "search"
      }
    ]
  }
}
```

Icons use **Lucide React** - see [lucide.dev](https://lucide.dev) for available icons.

### 3. Adjust Testimonial Autoplay Speed

**File:** `/src/components/Testimonials/TestimonialsMarquee.jsx`

```jsx
useEffect(() => {
  const testimonialControl = initTestimonials('.js-testimonials-container', {
    cardWidth: 380,
    gap: 32,
    autoplaySpeed: 4000, // ← Change this (ms)
    snapSpeed: 0.8,
  });
}, []);
```

### 4. Change Section Background

**File:** Component's `.module.scss` file

```scss
.section {
  background: var(--bg); /* Solid background */
  
  /* OR gradient background */
  background: linear-gradient(
    180deg,
    var(--bg) 0%,
    rgba(59, 130, 246, 0.03) 50%,
    var(--bg) 100%
  );
}
```

### 5. Disable an Animation

**File:** `/src/animations/animations.js`

Comment out the timeline step:

```javascript
export const initHero = () => {
  const timeline = gsap.timeline();

  // timeline.fromTo('.js-hero-headline', {...}); ← Comment out to disable

  return () => timeline.kill();
};
```

## 🔧 Component-Specific Notes

### Splash Screen

- **Duration:** Controlled by timeout in `App.jsx` (2200ms)
- **Logo:** Replace in `/src/components/Splash/Splash.jsx`
- **Particles:** Count controlled by `[...Array(8)]`

### Hero Section

- **Parallax:** Uses `useScroll` and `useTransform` from Framer Motion
- **Floating cards:** Positioned absolutely with `top` and `left` %
- **Dashboard image:** Replace Unsplash URL in component

### Services Grid

- **Grid layout:** `md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- **Card gradients:** Defined in `content.json` per service
- **3D effect:** Uses `transformStyle: 'preserve-3d'`

### Testimonials

- **Card width:** 360px (defined in component)
- **Draggable:** GSAP Draggable plugin required
- **Photos:** Update URLs in `content.json`

### FAQ Accordion

- **Open state:** Managed in component state
- **Animation:** Controlled via `animateFAQItem()` in animations.js
- **Chevron rotation:** 0deg closed, 180deg open

## 🎨 Advanced Styling Tips

### Creating New Gradients

```css
/* In tokens.css */
--gradient-custom: linear-gradient(135deg, #color1, #color2);
```

```jsx
// In component
<div style={{ background: 'var(--gradient-custom)' }}>
```

### Adding New Glow Colors

```css
/* In tokens.css */
--glow-custom: 0 0 20px rgba(YOUR_RGB, 0.3);
```

```scss
// In SCSS module
.card:hover {
  box-shadow: var(--glow-custom);
}
```

### Particle Effects

Particles are created with:

```jsx
{[...Array(20)].map((_, i) => (
  <motion.div
    key={i}
    className="absolute w-1 h-1 rounded-full"
    style={{
      background: 'rgba(34, 211, 238, 0.6)',
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }}
    animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
    transition={{ duration: 5, repeat: Infinity }}
  />
))}
```

Adjust particle count by changing `Array(20)` number.

## 📚 Additional Resources

- **Tailwind Docs:** https://tailwindcss.com
- **GSAP Docs:** https://greensock.com/docs/
- **Framer Motion:** https://www.framer.com/motion/
- **Lucide Icons:** https://lucide.dev

---

**Need help?** Check `/README.md` for setup instructions and common issues.
