# Engineering Handoff Documentation
## One Media Works - Neon Glassmorphism Landing Page

---

## Quick Reference

**Project**: One Media Works Landing Page  
**Framework**: React + TypeScript  
**Animation Libraries**: Framer Motion 11.x (primary), GSAP 3.x (alternative)  
**Design System**: Neon Glassmorphism Dark Theme  
**Deployment**: Production-ready with accessibility features

---

## 📋 Complete Layer Naming Map

### Global Structure
```
/App.tsx (root component)
├── <SplashScreen />          → .splash-overlay, .splash-logo
├── <Header />                → header (fixed navigation)
├── <HeroSection />           → section (parallax hero)
├── <AlignOptimiseGrowSection /> → section (3 pillars)
├── <ServicesSection />       → .services (3D cards) ⭐
├── <ReviewsSection />        → .test-marquee (carousel) ⭐
├── <TrustedBySection />      → section (logo marquee)
├── <CTASection />            → section (call-to-action)
└── <FAQSection />            → section (accordion)
```

### Services Section (3D Layered Cards) ⭐

**Container Hierarchy**:
```html
<section class="services">
  <div class="services-container" style="perspective: 1200px">
    <!-- SVG Connectors -->
    <svg>
      <path class="svc-connector-1" /> <!-- Card 1 → 2 -->
      <path class="svc-connector-2" /> <!-- Card 2 → 3 -->
      <path class="svc-connector-3" /> <!-- Card 3 → 4 -->
    </svg>
    
    <!-- Service Cards -->
    <div class="svc-card-1">
      <div class="svc-icon-1">ICP Identification</div>
      <h3>Know who to reach.</h3>
    </div>
    
    <div class="svc-card-2">
      <div class="svc-icon-2">Persona Building</div>
      <h3>Speak like they expect.</h3>
    </div>
    
    <div class="svc-card-3">
      <div class="svc-icon-3">AI Performance</div>
      <h3>Automate & optimise.</h3>
    </div>
    
    <div class="svc-card-4">
      <div class="svc-icon-4">360 Analytics</div>
      <h3>Measure what matters.</h3>
    </div>
  </div>
</section>
```

**CSS Selectors for Targeting**:
- `.services` - Section container, scroll trigger target
- `.services-container` - 3D perspective wrapper
- `.svc-card-1` through `.svc-card-4` - Individual service cards
- `.svc-connector-1` through `.svc-connector-3` - SVG connector paths
- `.svc-icon-{n}` - Icon containers within cards

**Data Attributes**:
```html
<section class="services" data-scroll-trigger="78vh">
  <div class="svc-card-1" 
       data-delay="0" 
       data-gradient="linear-gradient(135deg, #3b82f6, #22d3ee)">
  </div>
  <div class="svc-card-2" 
       data-delay="0.08" 
       data-gradient="linear-gradient(135deg, #a855f7, #ec4899)">
  </div>
  <!-- ... -->
</section>
```

### Testimonials Section (Draggable Carousel) ⭐

**Container Hierarchy**:
```html
<section class="testimonials">
  <div class="test-marquee" 
       onMouseEnter={pauseAutoplay}
       onMouseLeave={resumeAutoplay}
       tabIndex="0">
    
    <!-- Navigation Arrows -->
    <button class="test-nav-left" aria-label="Previous testimonial">
      <ChevronLeft />
    </button>
    <button class="test-nav-right" aria-label="Next testimonial">
      <ChevronRight />
    </button>
    
    <!-- Gradient Masks -->
    <div class="test-mask-left"></div>
    <div class="test-mask-right"></div>
    
    <!-- Draggable Inner Container -->
    <div class="test-marquee-inner" draggable="true">
      <!-- Original Set -->
      <div class="test-card-1" data-original-index="0">
        <img class="test-photo-1" />
        <h4 class="test-name-1">Sarah Chen</h4>
        <p class="test-company-1">TechFlow Inc.</p>
        <p class="test-quote-1">"..."</p>
      </div>
      
      <div class="test-card-2" data-original-index="1">
        <!-- ... -->
      </div>
      
      <!-- Duplicated Sets for Infinite Loop -->
      <div class="test-card-6" data-original-index="0" data-duplicate="1">
        <!-- Same as test-card-1 -->
      </div>
      
      <!-- ... -->
    </div>
    
    <!-- Progress Dots -->
    <div class="test-dots">
      <button class="test-dot-1 active" aria-label="Go to testimonial 1"></button>
      <button class="test-dot-2" aria-label="Go to testimonial 2"></button>
      <!-- ... -->
    </div>
  </div>
</section>
```

**CSS Selectors for Targeting**:
- `.test-marquee` - Outer viewport container (overflow hidden)
- `.test-marquee-inner` - Draggable sliding container (translateX)
- `.test-card-{n}` - Individual testimonial cards
- `.test-photo-{n}` - Circular profile photos
- `.test-nav-left`, `.test-nav-right` - Navigation buttons
- `.test-dots` - Progress indicator container
- `.test-dot-{n}` - Individual dots
- `.test-mask-left`, `.test-mask-right` - Gradient edge masks

**State Classes**:
```css
.test-card.active { /* Center card - scale 1.03 */ }
.test-card.neighbor { /* Adjacent cards - scale 0.98 */ }
.test-card.distant { /* Other cards - scale 0.96 */ }
.test-dot.active { /* Active progress dot */ }
```

---

## 🎬 Animation Implementation Checklists

### Services Section - Implementation Checklist

**HTML/React Setup**:
- [ ] Wrap section in container with `perspective: 1200px`
- [ ] Add `transform-style: preserve-3d` to all `.svc-card` elements
- [ ] Include SVG layer for connectors with proper viewBox
- [ ] Set up pointer event listeners on desktop (min-width: 1024px)

**GSAP Timeline**:
```javascript
// ✅ Required: ScrollTrigger registration
gsap.registerPlugin(ScrollTrigger);

// ✅ Required: 3D card entrance
gsap.from('.svc-card', {
  y: 40,
  z: -60,              // ⚠️ Must include for 3D effect
  scale: 0.94,
  rotateX: 8,          // ⚠️ Requires preserve-3d
  opacity: 0,
  duration: 0.56,
  ease: 'power3.out',
  stagger: 0.08,
  force3D: true,       // ⚠️ GPU acceleration
  scrollTrigger: {
    trigger: '.services',
    start: 'top 78%'
  }
});

// ✅ Required: Connector stroke animation
gsap.fromTo('.svc-connector', 
  { strokeDashoffset: '120%', opacity: 0 },
  { strokeDashoffset: 0, opacity: 1, duration: 0.6, ease: 'expo.out' },
  '-=0.42'  // ⚠️ Overlap timing is critical
);

// ✅ Optional but recommended: Hover interactions
document.querySelectorAll('.svc-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, { scale: 1.04, y: -6, duration: 0.2, ease: 'back.out(1.1)' });
  });
});

// ✅ Optional: Pointer parallax (desktop only)
if (window.matchMedia('(min-width: 1024px)').matches) {
  // Implement mouse tracking logic
}
```

**Framer Motion Alternative**:
```tsx
<motion.div
  className="svc-card-1"
  style={{ transformStyle: 'preserve-3d' }}  // ⚠️ Required
  initial={{ y: 40, z: -60, scale: 0.94, rotateX: 8, opacity: 0 }}
  whileInView={{ y: 0, z: 0, scale: 1, rotateX: 0, opacity: 1 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.56, delay: 0, ease: [0.22, 1, 0.36, 1] }}
/>
```

**Testing Checklist**:
- [ ] Cards stagger in sequence (0.08s apart)
- [ ] Connectors draw in sync with middle cards
- [ ] Hover lifts card and shows glow
- [ ] Parallax responds to mouse movement (desktop)
- [ ] Mobile version shows simplified entrance
- [ ] Reduced motion disables 3D transforms

---

### Testimonials Section - Implementation Checklist

**HTML/React Setup**:
- [ ] Duplicate testimonial content 2-3 times for infinite loop
- [ ] Set `.test-marquee` overflow to `hidden`
- [ ] Make `.test-marquee-inner` draggable via library
- [ ] Add gradient masks on left/right edges
- [ ] Include keyboard event listeners for arrows

**GSAP + Draggable Setup**:
```javascript
// ✅ Required: Draggable plugin
gsap.registerPlugin(Draggable);

// ✅ Required: Autoplay timeline
const cardWidth = 380;
const speed = 35; // px/s
const autoplayTween = gsap.to('.test-marquee-inner', {
  x: '-=1900',  // Adjust based on total width
  duration: 1900 / speed,
  ease: 'none',
  repeat: -1
});

// ✅ Required: Pause on hover
document.querySelector('.test-marquee').addEventListener('mouseenter', () => {
  autoplayTween.pause();
});

document.querySelector('.test-marquee').addEventListener('mouseleave', () => {
  autoplayTween.play();
});

// ✅ Required: Draggable with snap
Draggable.create('.test-marquee-inner', {
  type: 'x',
  edgeResistance: 0.1,
  inertia: true,
  onDragEnd() {
    const currentX = gsap.getProperty('.test-marquee-inner', 'x');
    const nearestIndex = Math.round(-currentX / cardWidth);
    
    gsap.to('.test-marquee-inner', {
      x: -nearestIndex * cardWidth,
      duration: 0.6,
      ease: 'power4.out'
    });
    
    updateActiveCard(nearestIndex);
  }
});

// ✅ Required: Update card scaling based on position
function updateActiveCard(index) {
  document.querySelectorAll('.test-card').forEach((card, i) => {
    const distance = Math.abs(i - index);
    const scale = distance === 0 ? 1.03 : distance === 1 ? 0.98 : 0.96;
    gsap.to(card, { scale, duration: 0.36, ease: 'power2.out' });
  });
}

// ✅ Required: Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') navigateToCard(currentIndex - 1);
  if (e.key === 'ArrowRight') navigateToCard(currentIndex + 1);
});
```

**Framer Motion Alternative**:
```tsx
const [currentIndex, setCurrentIndex] = useState(0);
const [isPaused, setIsPaused] = useState(false);
const controls = useAnimation();

// Autoplay effect
useEffect(() => {
  if (!isPaused) {
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }
}, [isPaused]);

// Sync animation with index
useEffect(() => {
  controls.start({
    x: -currentIndex * 380,
    transition: { type: 'spring', stiffness: 200, damping: 28 }
  });
}, [currentIndex, controls]);

<motion.div
  className="test-marquee-inner"
  drag="x"
  dragConstraints={{ left: -maxX, right: 0 }}
  dragElastic={0.1}
  onDragEnd={(e, info) => handleDragEnd(info)}
  animate={controls}
/>
```

**Testing Checklist**:
- [ ] Autoplay scrolls smoothly at ~35px/s
- [ ] Hover pauses autoplay
- [ ] Drag works with momentum/inertia
- [ ] Snaps to nearest card center on release
- [ ] Center card scales to 1.03 with glow
- [ ] Arrow keys navigate left/right
- [ ] Progress dots update correctly
- [ ] Seamless loop with no visual jump
- [ ] Reduced motion disables autoplay

---

## 🎨 Design Tokens & CSS Variables

### Color System
```css
:root {
  /* Base */
  --bg: #0B0E12;
  --glass-bg: rgba(255, 255, 255, 0.04);
  --glass-blur: 14px;
  
  /* Neon Palette (from logo) */
  --primary-deep: #1e40af;    /* Deep blue */
  --primary-light: #3b82f6;   /* Light blue */
  --neon: #22d3ee;            /* Neon cyan */
  --neon-pink: #ec4899;       /* Accent pink */
  --neon-purple: #a855f7;     /* Accent purple */
  --neon-green: #10b981;      /* Accent green */
  
  /* Typography */
  --muted-text: rgba(255, 255, 255, 0.72);
  
  /* Effects */
  --accent-glow: 0 8px 30px rgba(34, 211, 238, 0.18), 0 2px 8px rgba(34, 211, 238, 0.12);
}
```

### Motion Tokens
```css
:root {
  /* Services Section */
  --svc-stagger: 0.08s;
  --svc-duration: 0.56s;
  --svc-connector-duration: 0.6s;
  --svc-hover-duration: 0.2s;
  --svc-parallax-max: 6deg;
  --svc-z-max: 18px;
  
  /* Testimonials Section */
  --test-card-width: 380px;
  --test-speed: 35; /* px/s */
  --test-snap-duration: 0.6s;
  --test-scale-active: 1.03;
  --test-scale-neighbor: 0.98;
  --test-scale-default: 0.96;
}
```

### Gradient Presets
```css
.gradient-blue-cyan {
  background: linear-gradient(135deg, #3b82f6, #22d3ee);
}

.gradient-purple-pink {
  background: linear-gradient(135deg, #a855f7, #ec4899);
}

.gradient-orange-red {
  background: linear-gradient(135deg, #f59e0b, #ef4444);
}

.gradient-green-cyan {
  background: linear-gradient(135deg, #10b981, #22d3ee);
}
```

---

## ♿ Accessibility Requirements

### Keyboard Navigation

**Services Section**:
- Tab through cards in sequence
- Enter/Space to activate (if interactive)
- No keyboard trap

**Testimonials Section**:
- ✅ **REQUIRED**: Left/Right arrow keys navigate
- Tab to focus on carousel container
- Escape to exit carousel focus
- Screen reader announces current card index

```javascript
// Keyboard handler example
document.addEventListener('keydown', (e) => {
  if (document.querySelector('.test-marquee:focus-within')) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      navigatePrevious();
      announceToScreenReader(`Testimonial ${currentIndex} of ${total}`);
    }
  }
});
```

### ARIA Attributes

**Services Cards**:
```html
<div class="svc-card-1" 
     role="article" 
     aria-labelledby="svc-title-1">
  <h3 id="svc-title-1">ICP Identification</h3>
  <p>Know who to reach.</p>
</div>
```

**Testimonials Carousel**:
```html
<div class="test-marquee" 
     role="region" 
     aria-label="Client testimonials"
     aria-live="polite">
  
  <button class="test-nav-left" 
          aria-label="Previous testimonial"
          aria-controls="test-marquee-inner">
    <ChevronLeft aria-hidden="true" />
  </button>
  
  <div class="test-marquee-inner" 
       role="list"
       aria-atomic="false">
    <div class="test-card-1" 
         role="listitem"
         aria-label="Testimonial from Sarah Chen, TechFlow Inc.">
      <!-- Content -->
    </div>
  </div>
  
  <div class="test-dots" role="tablist" aria-label="Testimonial navigation">
    <button role="tab" 
            aria-selected="true" 
            aria-label="View testimonial 1"
            class="test-dot-1 active">
    </button>
  </div>
</div>
```

### Reduced Motion

**CSS**:
```css
@media (prefers-reduced-motion: reduce) {
  .svc-card, .test-card {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
  
  .test-marquee-inner {
    /* Disable autoplay */
    animation: none !important;
  }
  
  .svc-card {
    /* Disable parallax */
    transform: none !important;
  }
}
```

**JavaScript**:
```javascript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  // Disable all autoplay
  autoplayTween?.kill();
  
  // Simplify entrance animations
  gsap.set('.svc-card', { opacity: 1, y: 0, scale: 1 });
  gsap.set('.test-card', { opacity: 1, scale: 1 });
}
```

---

## 📱 Responsive Behavior

### Breakpoints
```css
/* Mobile: < 768px */
/* Tablet: 768px - 1023px */
/* Desktop: ≥ 1024px */
```

### Services Section - Mobile Adaptations
```css
@media (max-width: 1023px) {
  .services-container {
    perspective: none; /* Disable 3D */
  }
  
  .svc-card {
    transform: none !important; /* No parallax */
  }
  
  .svc-connector {
    display: none; /* Hide connectors */
  }
}

@media (max-width: 767px) {
  .svc-card {
    /* Stack vertically */
    width: 100%;
    margin-bottom: 1rem;
  }
}
```

**Mobile Animation**:
- Simplified entrance: `y: 18px → 0`, no 3D transforms
- Stagger reduced to 0.06s
- Optional: Swipeable horizontal scroll

### Testimonials Section - Mobile Adaptations
```css
@media (max-width: 1023px) {
  .test-nav-left,
  .test-nav-right {
    display: none; /* Hide desktop arrows */
  }
  
  .test-card {
    width: 90vw; /* Wider cards on mobile */
    max-width: 340px;
  }
}
```

**Mobile Behavior**:
- Disable autoplay by default (battery saving)
- Enable native touch scroll with snap
- Show "Swipe to browse" hint

---

## ⚡ Performance Optimizations

### GPU Acceleration
```css
.svc-card, .test-card {
  will-change: transform;
  transform: translate3d(0, 0, 0); /* Force GPU layer */
}

/* Remove will-change after animation */
.svc-card.animated, .test-card.animated {
  will-change: auto;
}
```

### Debounce & Throttle

**Pointer Parallax** (Debounce to 16ms / 60fps):
```javascript
let rafId;
const handleMouseMove = (e) => {
  if (rafId) return;
  
  rafId = requestAnimationFrame(() => {
    updateParallax(e);
    rafId = null;
  });
};
```

**Autoplay Optimization**:
```javascript
// Use CSS transform instead of JS interval when possible
const autoplayAnimation = marqueeInner.animate([
  { transform: 'translateX(0)' },
  { transform: `translateX(-${totalWidth}px)` }
], {
  duration: totalWidth / speed * 1000,
  iterations: Infinity,
  easing: 'linear'
});

// Pause/play via Web Animations API
marquee.addEventListener('mouseenter', () => autoplayAnimation.pause());
marquee.addEventListener('mouseleave', () => autoplayAnimation.play());
```

### Lazy Loading
```javascript
// Only initialize animations when section is near viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      initializeServicesAnimation();
      observer.unobserve(entry.target);
    }
  });
}, { rootMargin: '200px' });

observer.observe(document.querySelector('.services'));
```

---

## 🧪 Testing Scenarios

### Services Section Tests

| Test | Expected Behavior | Pass/Fail |
|------|-------------------|-----------|
| Scroll to 78% viewport | Cards stagger in with 3D transform | ⬜ |
| Cards appear sequentially | 0.08s delay between each | ⬜ |
| Connectors draw in | Stroke animates after 2nd card starts | ⬜ |
| Hover on card | Scale 1.04, lift -6px, show glow | ⬜ |
| Mouse move (desktop) | Cards rotate ±6° with parallax | ⬜ |
| Mobile view | No 3D, simplified entrance | ⬜ |
| Reduced motion | Instant appearance, no transforms | ⬜ |

### Testimonials Section Tests

| Test | Expected Behavior | Pass/Fail |
|------|-------------------|-----------|
| Page load | Autoplay starts scrolling left | ⬜ |
| Hover on carousel | Autoplay pauses | ⬜ |
| Mouse leave | Autoplay resumes | ⬜ |
| Drag left | Carousel moves with cursor | ⬜ |
| Release drag | Snaps to nearest card center | ⬜ |
| Center card | Scale 1.03 with neon glow | ⬜ |
| Arrow left key | Navigate to previous card | ⬜ |
| Arrow right key | Navigate to next card | ⬜ |
| Progress dot click | Jump to corresponding card | ⬜ |
| Infinite loop | No visual jump at loop point | ⬜ |
| Mobile swipe | Native scroll with snap points | ⬜ |
| Reduced motion | No autoplay, manual nav only | ⬜ |

---

## 📦 Deliverables Checklist

### Code Files
- [x] `/components/ServicesSection.tsx` - Framer Motion implementation
- [x] `/components/ReviewsSection.tsx` - Framer Motion implementation
- [x] `/SERVICES_TESTIMONIALS_MOTION_SPECS.md` - Detailed motion specs
- [x] `/ENGINEERING_HANDOFF.md` - This document
- [ ] `/gsap-implementations/services-gsap.js` - GSAP alternative (optional)
- [ ] `/gsap-implementations/testimonials-gsap.js` - GSAP alternative (optional)

### Documentation
- [x] Layer naming convention
- [x] Animation timeline breakdowns
- [x] GSAP code snippets
- [x] Framer Motion code snippets
- [x] Accessibility requirements
- [x] Performance guidelines
- [x] Testing checklists

### Design Assets
- [x] Motion token CSS variables
- [x] Gradient presets
- [x] Glassmorphism styles
- [ ] Figma prototype file (if requested)
- [ ] Motion spec video recordings (if requested)

---

## 🚀 Deployment Notes

### Environment Setup
```bash
# Required dependencies
npm install framer-motion lucide-react

# Optional (if using GSAP)
npm install gsap
```

### Build Configuration
```javascript
// next.config.js or vite.config.js
export default {
  optimizeDeps: {
    include: ['framer-motion']
  }
}
```

### Production Optimizations
- Enable tree-shaking for Framer Motion
- Lazy load GSAP plugins only when needed
- Minify CSS custom properties
- Use production build of React

---

## 📞 Support & Questions

**Technical Lead**: One Media Works Dev Team  
**Motion Designer**: [Name]  
**QA Contact**: [Name]  

**Recommended Tools**:
- Chrome DevTools Performance tab
- Lighthouse accessibility audit
- React DevTools Profiler
- GSAP DevTools (if using GSAP)

---

**Document Version**: 1.0  
**Last Updated**: December 2025  
**Status**: ✅ Ready for Implementation
