# Motion Specifications - One Media Works Landing Page
## Neon Glassmorphism Theme

---

## Design Tokens

```css
/* Color Palette */
--bg: #0B0E12
--glass-bg: rgba(255, 255, 255, 0.04)
--glass-blur: 14px
--primary-deep: #1e40af
--primary-light: #3b82f6
--neon: #22d3ee
--muted-text: rgba(255, 255, 255, 0.72)

/* Shadow & Glow */
--accent-glow: 0 8px 30px rgba(34, 211, 238, 0.18), 0 2px 8px rgba(34, 211, 238, 0.12)
```

---

## Splash Screen Animation

### Timeline Overview
- **Total Duration:** 1.6s
- **Cleanup:** Remove overlay from DOM at 1.6s

### Detailed Timeline

| Element | Initial State | Animation | Duration | Delay | Easing |
|---------|--------------|-----------|----------|-------|--------|
| `.splash-overlay` | `y: 0, opacity: 1` | Exit to `y: -100vh` | 0.4s | 1.05s | `power2.inOut` / `cubic-bezier(0.76, 0, 0.24, 1)` |
| `.splash-logo` | `scale: 0.88, opacity: 0` | Scale to `1.03`, opacity to `1` | 0.45s | 0s | `expo.out` / `cubic-bezier(0.22, 1, 0.36, 1)` |
| `.splash-logo` | `scale: 1.03` | Settle to `scale: 1.00` | 0.6s | 0.45s | `sine.out` |
| Glow effect | - | Bloom shadow | 0.45s | 0s | `ease-out` |
| Page underneath | `opacity: 0.85, scale: 0.995` | Reveal `opacity: 1, scale: 1` | 0.4s | 1.05s | `easeInOut` |

### GSAP Implementation

```javascript
const splashTimeline = gsap.timeline();

splashTimeline
  // Logo entrance
  .fromTo('.splash-logo', 
    { scale: 0.88, opacity: 0 }, 
    { scale: 1.03, opacity: 1, duration: 0.45, ease: "expo.out" }
  )
  // Logo settle
  .to('.splash-logo', 
    { scale: 1.00, duration: 0.6, ease: "sine.out" }
  )
  // Overlay slide up
  .to('.splash-overlay', 
    { y: "-100vh", duration: 0.4, ease: "power2.inOut" }, 
    "+=0.0"
  )
  // Page reveal
  .fromTo('.page-content',
    { opacity: 0.85, scale: 0.995 },
    { opacity: 1, scale: 1, duration: 0.4, ease: "power2.inOut" },
    "-=0.4"
  );
```

### Framer Motion Implementation

```jsx
<AnimatePresence mode="wait">
  {showSplash && (
    <motion.div
      className="splash-overlay"
      initial={{ y: 0 }}
      exit={{ 
        y: '-100vh',
        transition: { 
          duration: 0.4, 
          delay: 1.05,
          ease: [0.76, 0, 0.24, 1]
        }
      }}
    >
      <motion.img
        className="splash-logo"
        src="/logo.svg"
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ 
          scale: [0.88, 1.03, 1.00],
          opacity: [0, 1, 1]
        }}
        transition={{
          duration: 1.05,
          times: [0, 0.43, 1],
          ease: [0.22, 1, 0.36, 1]
        }}
      />
    </motion.div>
  )}
</AnimatePresence>

<motion.div
  className="page-content"
  initial={{ opacity: 0.85, scale: 0.995 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.4, ease: 'easeInOut' }}
>
  {/* Page content */}
</motion.div>
```

---

## Hero Section - Post-Splash Entrance

### Timeline Sequence

| Element | Property | From | To | Duration | Delay | Easing |
|---------|----------|------|----|---------| ------|--------|
| `.hero-headline` | y, opacity | `18px, 0` | `0px, 1` | 0.55s | 0.05s | `power3.out` |
| `.hero-subtext` | y, opacity | `18px, 0` | `0px, 1` | 0.45s | 0.13s | `power3.out` |
| `.hero-cta` | scale, opacity | `0.9, 0` | `1, 1` | 0.42s | 0.21s | `back.out(1.2)` |
| `.card-1` | y, opacity | `28px, 0` | `0px, 1` | 0.6s | 0.27s | `power3.out` |
| `.card-2` | y, opacity | `28px, 0` | `0px, 1` | 0.6s | 0.33s | `power3.out` |
| `.card-3` | y, opacity | `28px, 0` | `0px, 1` | 0.6s | 0.39s | `power3.out` |

### Parallax Effect
- **Factor:** 0.12x scroll speed
- **Applies to:** All floating hero cards
- **Implementation:** `translateY: scrollProgress * 0.12`

### CTA Button Hover
- **Scale:** `1 → 1.04 → 1`
- **Duration:** 220ms
- **Shadow:** Add `var(--accent-glow)`

---

## Scroll-Triggered Sections (Global Pattern)

### Activation Threshold
- **Start:** Section top reaches 80% from viewport top
- **Amount:** 0.2-0.3 (20-30% visible)

### Standard Animation Pattern

| Element Type | Property | From | To | Duration | Stagger | Easing |
|--------------|----------|------|----|---------| --------|--------|
| Headline | y, opacity | `24px, 0` | `0px, 1` | 0.5s | - | `power3.out` |
| Supporting copy | y, opacity | `24px, 0` | `0px, 1` | 0.5s | 0.06s | `power3.out` |
| Cards/Items | scale, opacity | `0.96, 0` | `1, 1` | 0.48-0.6s | 0.07-0.12s | `power3.out` |

### GSAP ScrollTrigger Template

```javascript
gsap.utils.toArray('.section').forEach(section => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
  
  tl.from(section.querySelector('.headline'), {
    y: 24,
    opacity: 0,
    duration: 0.5,
    ease: "power3.out"
  });
  
  tl.from(section.querySelectorAll('.card'), {
    y: 22,
    opacity: 0,
    stagger: 0.08,
    duration: 0.5,
    ease: "power3.out"
  }, "-=0.36");
});
```

### Framer Motion Template

```jsx
<motion.h2
  initial={{ y: 24, opacity: 0 }}
  whileInView={{ y: 0, opacity: 1 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
/>

<motion.div
  initial={{ scale: 0.96, opacity: 0 }}
  whileInView={{ scale: 1, opacity: 1 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ 
    duration: 0.48,
    staggerChildren: 0.08
  }}
>
  {items.map((item, i) => (
    <motion.div key={i} variants={cardVariants} />
  ))}
</motion.div>
```

---

## Problem Section - De-scatter Animation

### Specifications
- **Pattern:** Scattered elements align into grid
- **Initial:** Random positions (±300px x, ±200px y), random rotation (0-360°)
- **Final:** Aligned grid positions, 0° rotation
- **Duration:** 0.72s
- **Stagger:** 0.04s per element
- **Easing:** `elastic.out(1, 0.6)` / Spring with damping: 12, stiffness: 100

### Bullet Entry
- **X offset:** -18px → 0px
- **Opacity:** 0 → 1
- **Stagger:** 0.08s
- **Duration:** 0.5s

---

## Solution Section - Snap-into-Alignment

### Alignment Boxes
- **Initial:** Scattered (x: ±120px, y: ±60px, rotate: ±45°)
- **Final:** Aligned (x: 0, y: 0, rotate: 0)
- **Duration:** 0.72s
- **Stagger:** 0.06s
- **Easing:** Spring (damping: 12, stiffness: 100)
- **Flash effect:** Neon rim bloom (0.12s) on completion

```javascript
// GSAP
gsap.from('.alignment-box', {
  x: (i) => (i - 1) * 120 + (Math.random() - 0.5) * 60,
  y: (i) => (Math.random() - 0.5) * 60,
  rotation: (i) => Math.random() * 90 - 45,
  opacity: 0,
  duration: 0.72,
  stagger: 0.06,
  ease: "elastic.out(0.8, 0.48)",
  scrollTrigger: {
    trigger: '.solution-section',
    start: "top 80%"
  }
});
```

---

## Benefit Cards

### Entry Animation
- **Y offset:** 22px → 0
- **Opacity:** 0 → 1
- **Stagger:** 0.07s
- **Duration:** 0.5s

### Hover State
- **Scale:** 1 → 1.03
- **Tilt:** `rotateX: 2deg, rotateY: 2deg`
- **Transform origin:** center
- **Duration:** 180ms
- **Shadow:** Add `var(--accent-glow)`

### Icon Float Animation (Continuous)
- **Y movement:** -6px → 0 → -6px
- **Duration:** 0.9s
- **Repeat:** Infinite
- **Easing:** ease-in-out

```css
@keyframes float {
  0%, 100% { transform: translateY(-6px); }
  50% { transform: translateY(0px); }
}

.benefit-icon {
  animation: float 0.9s ease-in-out infinite;
}
```

---

## Social Proof Section

### Logo Entry
- **Y offset:** 20px → 0
- **Opacity:** 0 → 1
- **Duration:** 0.46s
- **Stagger:** 0.08s (horizontal)

### Testimonial Cards
- **Scale:** 0.96 → 1
- **Opacity:** 0 → 1
- **Duration:** 0.48s
- **Stagger:** 0.08s

### Stars Animation
- **Initial:** `scale: 0, rotate: -180deg, opacity: 0`
- **Final:** `scale: 1, rotate: 0, opacity: 1`
- **Type:** Spring (stiffness: 200)
- **Duration:** 0.4s
- **Stagger:** 0.04s per star

---

## CTA Section

### Entry
- **Scale:** 0.98 → 1
- **Opacity:** 0 → 1
- **Duration:** 0.36s
- **Shadow increase:** Animate to `var(--accent-glow)`

### Button Hover - Ripple Effect
- **Scale:** 0 → 2
- **Opacity:** 0.6 → 0
- **Duration:** 520ms
- **Origin:** Center
- **Pattern:** Radial gradient expansion

```jsx
// Framer Motion Ripple
<motion.div
  className="ripple"
  initial={{ scale: 0, opacity: 0.6 }}
  whileHover={{ 
    scale: 2, 
    opacity: 0,
    transition: { duration: 0.52 }
  }}
  style={{
    background: 'radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%)'
  }}
/>
```

---

## FAQ Accordion

### Open/Close Animation
- **Height:** 0 → auto (or vice versa)
- **Duration:** 300-420ms
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (smooth ease)
- **Opacity:** Fade content 0 → 1 with 100ms delay

### Chevron Rotation
- **Angle:** 0° → 180°
- **Type:** Spring
- **Stiffness:** 200
- **Damping:** 20

### Active Neon Edge
- **Left border:** 1px gradient line
- **Fade in:** 240ms
- **Colors:** `linear-gradient(180deg, #3b82f6, #22d3ee)`
- **Glow:** `0 0 10px rgba(34, 211, 238, 0.6)`

---

## Performance Guidelines

### GPU Acceleration
- Use `transform` and `opacity` only (avoid layout properties)
- Apply `will-change: transform` sparingly
- Remove `will-change` after animation completes

### Animation Limits
- Keep durations between 350-650ms for initial reveals
- Avoid >700ms for entrance animations
- Limit simultaneous animated elements to 15-20

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Easing Reference

| Name | Cubic Bezier | GSAP Equivalent |
|------|--------------|-----------------|
| power3.out | `cubic-bezier(0.22, 1, 0.36, 1)` | `power3.out` |
| power2.inOut | `cubic-bezier(0.76, 0, 0.24, 1)` | `power2.inOut` |
| expo.out | `cubic-bezier(0.19, 1, 0.22, 1)` | `expo.out` |
| back.out(1.2) | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `back.out(1.2)` |
| elastic.out | Spring equivalent | `elastic.out(0.8, 0.48)` |

---

## Layer Naming Convention

### Splash Screen
- `.splash-overlay` - Full screen container
- `.splash-logo` - Logo element
- `.splash-logo-bg` - Logo background glow

### Hero Section
- `.hero-headline` - Main heading
- `.hero-subtext` - Supporting text
- `.hero-cta` - Primary CTA button
- `.card-1`, `.card-2`, `.card-3` - Floating cards

### Section Structure
- `.section` - Section wrapper
- `.headline` - Section heading
- `.card` - Repeating card elements
- `.glass-panel` - Glassmorphism containers

---

## Export Format (JSON)

```json
{
  "splash": {
    "logoEntrance": {
      "duration": 0.45,
      "delay": 0,
      "easing": "expo.out",
      "properties": {
        "scale": { "from": 0.88, "to": 1.03 },
        "opacity": { "from": 0, "to": 1 }
      }
    },
    "overlayExit": {
      "duration": 0.4,
      "delay": 1.05,
      "easing": "power2.inOut",
      "properties": {
        "y": { "from": 0, "to": "-100vh" }
      }
    }
  },
  "hero": {
    "headline": {
      "duration": 0.55,
      "delay": 0.05,
      "easing": "power3.out",
      "properties": {
        "y": { "from": 18, "to": 0 },
        "opacity": { "from": 0, "to": 1 }
      }
    }
  }
}
```

---

## Mobile Considerations

### Scaled-Back Motion
- Reduce parallax factor to 0.05x
- Decrease backdrop blur to 10px
- Limit floating particles to 10
- Simplify hover states to scale only
- Remove complex 3D transforms

### Breakpoint: 768px
```css
@media (max-width: 768px) {
  :root {
    --glass-blur: 10px;
  }
  
  .parallax-element {
    transform: translateY(calc(var(--scroll) * 0.05));
  }
}
```

---

## Testing Checklist

- [ ] Splash screen completes in 1.6s
- [ ] All scroll triggers fire at 80% viewport
- [ ] Reduced motion preference respected
- [ ] 60fps maintained on mid-tier devices
- [ ] Glass panels have correct blur and transparency
- [ ] Neon glows visible but not overwhelming
- [ ] Hover states respond within 220ms
- [ ] Mobile animations are simplified
- [ ] No layout shifts during animations
- [ ] Particles don't impact performance

---

**Generated:** December 2025  
**Version:** 1.0  
**Framework Support:** GSAP 3.x, Framer Motion 11.x
