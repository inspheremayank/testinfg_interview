# Services & Testimonials Motion Specifications
## One Media Works - Neon Glassmorphism Landing Page

---

## Table of Contents
1. [Services Section - 3D Layered Card Reveal](#services-section)
2. [Testimonials Section - Horizontal Scroll Carousel](#testimonials-section)
3. [GSAP Implementation](#gsap-implementation)
4. [Framer Motion Implementation](#framer-motion-implementation)
5. [Accessibility & Performance](#accessibility--performance)
6. [Layer Naming Convention](#layer-naming-convention)

---

## Services Section - 3D Layered Card Reveal

### Visual Layout
- **Desktop**: 4 cards in diagonal stepped arrangement
- **Mobile**: Single column swipeable stack
- **Cards**: Minimal design with title, benefit, icon
- **Connectors**: Neon gradient paths linking cards

### Motion Choreography

#### Trigger Point
```javascript
scrollTrigger: {
  trigger: '.services',
  start: 'top 78%',
  toggleActions: 'play none none reverse'
}
```

#### Initial States
| Element | Properties |
|---------|-----------|
| `.svc-card` | `y: 40px, z: -60px, scale: 0.94, rotateX: 8deg, opacity: 0` |
| `.svc-connector` | `strokeDashoffset: 120%, opacity: 0` |

#### Animation Timeline

**Master Duration**: 0.9-1.1s per complete run

**Card Entrance (Staggered)**
- **Duration per card**: 0.56s
- **Easing**: `power3.out` / `cubic-bezier(0.22, 1, 0.36, 1)`
- **Stagger delay**: 0.08s
- **Transform sequence**: 
  ```
  from { y: 40, z: -60, scale: 0.94, rotateX: 8, opacity: 0 }
  to   { y: 0,  z: 0,   scale: 1.00, rotateX: 0, opacity: 1 }
  ```

**Connector Motion (Synced with Cards)**
- **Delay**: After 2nd card begins (0.16s)
- **Duration**: 0.6s
- **Easing**: `expo.out` / `cubic-bezier(0.19, 1, 0.22, 1)`
- **Animation**: 
  ```
  strokeDashoffset: 120% → 0%
  opacity: 0 → 1
  ```

#### Hover Interactions

**Per Card Hover**
```css
.svc-card:hover {
  transform: scale(1.04) translateY(-6px);
  box-shadow: var(--accent-glow);
  transition: 180-220ms ease back.out(1.1);
}
```

**Connector Response**
- Adjacent connectors brighten slightly
- `opacity: 0.7 → 1` on connected paths
- Duration: 180ms

#### Pointer Parallax (Desktop Only)

**Micro 3D Movement**
- **Max rotateY**: ±6°
- **Max rotateX**: ±6°
- **Max translateZ**: 18px
- **Smoothing**: Lerp factor 0.12 or Spring (stiffness: 150, damping: 25)
- **Origin**: Card center
- **Implementation**:
  ```javascript
  const offsetX = (mouseX - 0.5) * 6; // degrees
  const offsetY = -(mouseY - 0.5) * 6; // degrees
  const offsetZ = Math.abs(mouseX - 0.5) * 18; // px
  
  card.style.transform = `
    rotateY(${offsetX}deg) 
    rotateX(${offsetY}deg) 
    translateZ(${offsetZ}px)
  `;
  ```

#### 3D Perspective Setup
```css
.services-container {
  perspective: 1200px;
  perspective-origin: center;
}

.svc-card {
  transform-style: preserve-3d;
}
```

#### Exit/Reverse Animation
- **Trigger**: Section leaves viewport
- **Duration**: 0.36s per item (compressed)
- **Stagger**: 0.06s
- **Easing**: `power2.in`

#### Mobile Adaptations
- Disable pointer parallax
- Simplify entrance: `y: 18px, opacity: 0 → y: 0, opacity: 1`
- Stagger: 0.06s
- Enable horizontal swipe for card navigation
- Remove connectors or make them static

---

## Testimonials Section - Horizontal Scroll Carousel

### Visual Layout
- **Container**: Full-width horizontal strip
- **Card Width**: 340px + 40px gap = 380px total
- **Visible Cards**: 1 center + 2 partial neighbors (peek effect)
- **Each Card**: Circular photo, name, company, 1-line quote

### Motion & Interaction Spec

#### Core Features
1. **Autoplay**: Slow scroll left, pause on hover
2. **Draggable**: Horizontal drag with momentum
3. **Snap**: Smooth snap to nearest card center
4. **Keyboard**: Arrow keys for navigation
5. **Infinite Loop**: Seamless with duplicated content

#### Autoplay Configuration
```javascript
const speed = 35; // px per second
const cardWidth = 380; // px
const totalWidth = cards.length * cardWidth;

// Autoplay timeline
const duration = totalWidth / speed; // seconds
```

**Pause Conditions**:
- Mouse hover on `.test-marquee`
- Focus on carousel or cards
- Active drag
- Keyboard navigation

#### Drag Behavior

**Constraints**:
```javascript
dragConstraints: {
  left: -(cards.length - 1) * cardWidth,
  right: 0
}
dragElastic: 0.1
```

**Snap Logic on Release**:
```javascript
const threshold = cardWidth / 3; // 127px

if (dragDistance > threshold) {
  snapTo(currentIndex - 1); // Previous card
} else if (dragDistance < -threshold) {
  snapTo(currentIndex + 1); // Next card
} else {
  snapTo(currentIndex); // Return to current
}
```

**Snap Animation**:
```javascript
{
  duration: 0.6,
  ease: 'power4.out', // cubic-bezier(0.76, 0, 0.24, 1)
  // OR Spring:
  type: 'spring',
  stiffness: 200,
  damping: 28,
  mass: 0.8
}
```

#### Card Scaling (Dynamic Focus)

| State | Scale | Shadow |
|-------|-------|--------|
| **Center (active)** | 1.03 | `0 0 30px rgba(236, 72, 153, 0.4)` |
| **Neighbors (±1)** | 0.98 | `0 0 20px rgba(236, 72, 153, 0.2)` |
| **Others** | 0.96 | `0 0 10px rgba(236, 72, 153, 0.1)` |

**Transition**: 0.36s ease-out

#### Neon Rim Pulse (Center Card Only)
```javascript
.test-card.active .photo-rim {
  animation: neonPulse 2s ease-in-out infinite;
}

@keyframes neonPulse {
  0%, 100% { 
    opacity: 0;
    box-shadow: 0 0 20px rgba(236, 72, 153, 0.8);
  }
  50% { 
    opacity: 0.8;
    box-shadow: 0 0 30px rgba(236, 72, 153, 1);
  }
}
```

#### Keyboard Navigation
```javascript
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    navigateTo(currentIndex - 1);
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    navigateTo(currentIndex + 1);
  }
});
```

**Navigation Animation**: Same as snap (0.6s, power4.out)

#### Infinite Seamless Loop

**Implementation Strategy**:
- Duplicate content 2-3 times: `[...cards, ...cards, ...cards]`
- Start at middle set: `initialIndex = cards.length`
- When reaching end of set, instantly reset to equivalent position
- Example:
  ```javascript
  if (currentIndex >= cards.length * 2) {
    // Jump back to middle set without animation
    setCurrentIndex(cards.length, { immediate: true });
  }
  ```

#### Gradient Edge Masks
```css
.test-marquee::before,
.test-marquee::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 128px;
  z-index: 10;
  pointer-events: none;
}

.test-marquee::before {
  left: 0;
  background: linear-gradient(to right, var(--bg), transparent);
}

.test-marquee::after {
  right: 0;
  background: linear-gradient(to left, var(--bg), transparent);
}
```

#### Progress Indicators (Dots)
- Position below carousel
- One dot per unique card (not duplicates)
- Active dot: 
  - Width: 24px (elongated)
  - Gradient fill: `linear-gradient(135deg, #ec4899, #a855f7)`
  - Glow: `box-shadow: 0 0 10px rgba(236, 72, 153, 0.6)`
- Inactive dots:
  - Width: 8px (circle)
  - Fill: `rgba(255, 255, 255, 0.2)`
- Transition: 0.3s ease

---

## GSAP Implementation

### Services Section - Complete Timeline

```javascript
// Setup 3D perspective
gsap.set('.services-container', { 
  perspective: 1200,
  perspectiveOrigin: 'center center'
});

// Main entrance timeline
const servicesTL = gsap.timeline({
  scrollTrigger: {
    trigger: '.services',
    start: 'top 78%',
    toggleActions: 'play none none reverse',
    // markers: true // Debug only
  }
});

// Card entrance with 3D transform
servicesTL.from('.svc-card', {
  y: 40,
  z: -60,
  scale: 0.94,
  rotateX: 8,
  opacity: 0,
  duration: 0.56,
  ease: 'power3.out',
  stagger: 0.08,
  force3D: true,
  transformPerspective: 1200
});

// Connector animation (synced)
servicesTL.fromTo('.svc-connector', 
  { 
    strokeDashoffset: '120%',
    opacity: 0
  },
  { 
    strokeDashoffset: 0,
    opacity: 1,
    duration: 0.6,
    ease: 'expo.out',
    stagger: 0.08
  },
  '-=0.42' // Overlap with card animation
);

// Hover interaction
document.querySelectorAll('.svc-card').forEach((card, index) => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      scale: 1.04,
      y: -6,
      boxShadow: 'var(--accent-glow)',
      duration: 0.2,
      ease: 'back.out(1.1)'
    });
    
    // Brighten connected connectors
    gsap.to(`.svc-connector-${index}`, {
      opacity: 1,
      duration: 0.18
    });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      scale: 1,
      y: 0,
      boxShadow: 'none',
      duration: 0.2,
      ease: 'power2.out'
    });
    
    gsap.to(`.svc-connector-${index}`, {
      opacity: 0.7,
      duration: 0.18
    });
  });
});

// Pointer parallax (desktop)
if (window.matchMedia('(min-width: 1024px)').matches) {
  const servicesContainer = document.querySelector('.services-container');
  
  servicesContainer.addEventListener('mousemove', (e) => {
    const rect = servicesContainer.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 to 1
    const y = (e.clientY - rect.top) / rect.height; // 0 to 1
    
    document.querySelectorAll('.svc-card').forEach((card) => {
      gsap.to(card, {
        rotateY: (x - 0.5) * 6,
        rotateX: -(y - 0.5) * 6,
        z: Math.abs(x - 0.5) * 18,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: true
      });
    });
  });
  
  servicesContainer.addEventListener('mouseleave', () => {
    gsap.to('.svc-card', {
      rotateY: 0,
      rotateX: 0,
      z: 0,
      duration: 0.6,
      ease: 'power2.out'
    });
  });
}
```

### Testimonials Section - Draggable Marquee

```javascript
// Setup
const marqueeInner = document.querySelector('.test-marquee-inner');
const cards = document.querySelectorAll('.test-card');
const cardWidth = 380; // px (340 card + 40 gap)
const speed = 35; // px/s
let currentIndex = cards.length / 3; // Start at middle set
let autoplayTween;
let isPaused = false;

// Create autoplay tween
function createAutoplay() {
  const totalCards = cards.length;
  const totalWidth = totalCards * cardWidth;
  
  autoplayTween = gsap.to(marqueeInner, {
    x: `-=${totalWidth / 3}`, // Move one set worth
    duration: (totalWidth / 3) / speed,
    ease: 'none',
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
    }
  });
}

// Pause/Play on hover
const marquee = document.querySelector('.test-marquee');

marquee.addEventListener('mouseenter', () => {
  isPaused = true;
  if (autoplayTween) autoplayTween.pause();
});

marquee.addEventListener('mouseleave', () => {
  isPaused = false;
  if (autoplayTween && !draggable.isDragging) autoplayTween.play();
});

// Draggable setup
const draggable = Draggable.create(marqueeInner, {
  type: 'x',
  edgeResistance: 0.1,
  inertia: true,
  snap: {
    x: (endValue) => {
      // Snap to nearest card center
      return Math.round(endValue / cardWidth) * cardWidth;
    }
  },
  onDragStart() {
    if (autoplayTween) autoplayTween.pause();
  },
  onDragEnd() {
    // Calculate nearest card index
    const currentX = gsap.getProperty(marqueeInner, 'x');
    const nearestIndex = Math.round(-currentX / cardWidth);
    currentIndex = nearestIndex;
    
    // Animate to snap position
    gsap.to(marqueeInner, {
      x: -nearestIndex * cardWidth,
      duration: 0.6,
      ease: 'power4.out',
      onComplete: () => {
        if (!isPaused) autoplayTween.play();
      }
    });
    
    updateActiveCard(nearestIndex);
  }
})[0];

// Update active card styling
function updateActiveCard(index) {
  cards.forEach((card, i) => {
    const distance = Math.abs(i - index);
    
    if (distance === 0) {
      // Center card
      gsap.to(card, {
        scale: 1.03,
        boxShadow: '0 0 30px rgba(236, 72, 153, 0.4)',
        duration: 0.36,
        ease: 'power2.out'
      });
    } else if (distance === 1) {
      // Neighbors
      gsap.to(card, {
        scale: 0.98,
        boxShadow: '0 0 20px rgba(236, 72, 153, 0.2)',
        duration: 0.36,
        ease: 'power2.out'
      });
    } else {
      // Others
      gsap.to(card, {
        scale: 0.96,
        boxShadow: '0 0 10px rgba(236, 72, 153, 0.1)',
        duration: 0.36,
        ease: 'power2.out'
      });
    }
  });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    navigateToCard(currentIndex - 1);
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    navigateToCard(currentIndex + 1);
  }
});

function navigateToCard(index) {
  if (autoplayTween) autoplayTween.pause();
  
  currentIndex = Math.max(0, Math.min(cards.length - 1, index));
  
  gsap.to(marqueeInner, {
    x: -currentIndex * cardWidth,
    duration: 0.6,
    ease: 'power4.out',
    onComplete: () => {
      if (!isPaused) autoplayTween.play();
    }
  });
  
  updateActiveCard(currentIndex);
}

// Initialize
createAutoplay();
updateActiveCard(currentIndex);
```

---

## Framer Motion Implementation

### Services Section - React Component

```tsx
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 25 });

  const services = [
    { id: 1, title: 'ICP Identification', benefit: 'Know who to reach.' },
    { id: 2, title: 'Persona Building', benefit: 'Speak like they expect.' },
    { id: 3, title: 'AI Performance', benefit: 'Automate & optimise.' },
    { id: 4, title: '360 Analytics', benefit: 'Measure what matters.' }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
      }
    };

    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    return () => container?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="services" style={{ perspective: '1200px' }}>
      <div ref={containerRef}>
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className={`svc-card-${service.id}`}
            style={{ transformStyle: 'preserve-3d' }}
            initial={{ 
              y: 40,
              z: -60,
              scale: 0.94,
              rotateX: 8,
              opacity: 0
            }}
            whileInView={{ 
              y: 0,
              z: 0,
              scale: 1,
              rotateX: 0,
              opacity: 1
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
              duration: 0.56,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{ 
              scale: 1.04,
              y: -6,
              transition: { 
                duration: 0.2,
                ease: [0.34, 1.56, 0.64, 1]
              }
            }}
            animate={{
              rotateY: smoothX.get() ? (smoothX.get() - 0.5) * 6 : 0,
              rotateX: smoothY.get() ? -(smoothY.get() - 0.5) * 6 : 0,
              z: smoothX.get() ? Math.abs(smoothX.get() - 0.5) * 18 : 0
            }}
          >
            {/* Card content */}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

### Testimonials Section - Draggable Carousel

```tsx
import { motion, useAnimation, PanInfo } from 'framer-motion';
import { useState, useEffect } from 'react';

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();
  
  const testimonials = [/* ... */];
  const allTestimonials = [...testimonials, ...testimonials, ...testimonials];
  const cardWidth = 380;

  // Autoplay
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => {
          const next = prev + 1;
          if (next >= testimonials.length * 2) {
            return testimonials.length;
          }
          return next;
        });
      }, 4000);
      
      return () => clearInterval(interval);
    }
  }, [isPaused, testimonials.length]);

  // Animate to current index
  useEffect(() => {
    controls.start({
      x: -currentIndex * cardWidth,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 28,
        mass: 0.8
      }
    });
  }, [currentIndex, controls]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = cardWidth / 3;
    
    if (info.offset.x > threshold) {
      setCurrentIndex(prev => Math.max(0, prev - 1));
    } else if (info.offset.x < -threshold) {
      setCurrentIndex(prev => Math.min(allTestimonials.length - 1, prev + 1));
    }
  };

  return (
    <section className="test-marquee"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="test-marquee-inner"
        drag="x"
        dragConstraints={{ 
          left: -(allTestimonials.length - 1) * cardWidth,
          right: 0
        }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        animate={controls}
      >
        {allTestimonials.map((testimonial, index) => {
          const isCurrent = index === currentIndex;
          const isNeighbor = Math.abs(index - currentIndex) === 1;
          
          return (
            <motion.div
              key={`${testimonial.id}-${index}`}
              className={`test-card-${index + 1}`}
              animate={{ 
                scale: isCurrent ? 1.03 : isNeighbor ? 0.98 : 0.96
              }}
              transition={{ duration: 0.36 }}
            >
              {/* Card content */}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
```

---

## Accessibility & Performance

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  .services *, .test-marquee * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  /* Disable autoplay */
  .test-marquee-inner {
    animation: none !important;
  }
  
  /* Disable parallax */
  .svc-card {
    transform: none !important;
  }
}
```

### JavaScript Detection
```javascript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  // Disable autoplay
  if (autoplayTween) autoplayTween.kill();
  
  // Disable parallax
  // Use simple fade/slide only
}
```

### GPU Optimization

**Use GPU-accelerated properties only**:
- ✅ `transform: translate3d()`, `scale()`, `rotate()`
- ✅ `opacity`
- ❌ Avoid `width`, `height`, `top`, `left`

**Force 3D acceleration**:
```css
.svc-card, .test-card {
  will-change: transform;
  transform: translate3d(0, 0, 0);
}

/* Remove will-change after animation completes */
.svc-card.animated {
  will-change: auto;
}
```

### Performance Limits
- **Max simultaneous cards**: 20
- **Debounce pointer parallax**: 16ms (60fps)
- **Limit autoplay speed**: 20-50px/s
- **Throttle drag updates**: RequestAnimationFrame

---

## Layer Naming Convention

### Services Section
```
.services (section container)
├── .services-container (3D perspective wrapper)
├── .svc-card-1 (first service card)
├── .svc-card-2 (second service card)
├── .svc-card-3 (third service card)
├── .svc-card-4 (fourth service card)
├── .svc-connector-1 (path between card 1-2)
├── .svc-connector-2 (path between card 2-3)
└── .svc-connector-3 (path between card 3-4)
```

### Testimonials Section
```
.test-marquee (outer viewport container)
├── .test-marquee-inner (draggable sliding container)
│   ├── .test-card-1 (first testimonial)
│   ├── .test-card-2 (second testimonial)
│   ├── .test-card-3 (third testimonial)
│   └── ... (duplicated for loop)
├── .test-nav-left (left arrow button)
├── .test-nav-right (right arrow button)
└── .test-dots (progress indicator container)
    ├── .test-dot-1
    ├── .test-dot-2
    └── ...
```

---

## Motion Tokens (CSS Custom Properties)

```css
:root {
  /* Services */
  --svc-stagger: 0.08s;
  --svc-duration: 0.56s;
  --svc-connector-duration: 0.6s;
  --svc-hover-duration: 0.2s;
  --svc-parallax-max-rotate: 6deg;
  --svc-parallax-max-z: 18px;
  
  /* Testimonials */
  --test-card-width: 380px;
  --test-marquee-speed: 35; /* px/s */
  --test-snap-duration: 0.6s;
  --test-scale-center: 1.03;
  --test-scale-neighbor: 0.98;
  --test-scale-default: 0.96;
  --test-autoplay-interval: 4000ms;
}
```

---

## Export Package for Engineers

### File Structure
```
/motion-specs
├── services-gsap.js (GSAP implementation)
├── services-framer.tsx (Framer Motion component)
├── testimonials-gsap.js (GSAP implementation)
├── testimonials-framer.tsx (Framer Motion component)
├── motion-tokens.css (CSS variables)
└── README.md (this file)
```

### JSON Motion Data
```json
{
  "services": {
    "trigger": "top 78%",
    "cards": {
      "initial": { "y": 40, "z": -60, "scale": 0.94, "rotateX": 8, "opacity": 0 },
      "final": { "y": 0, "z": 0, "scale": 1, "rotateX": 0, "opacity": 1 },
      "duration": 0.56,
      "stagger": 0.08,
      "easing": "power3.out"
    },
    "connectors": {
      "initial": { "strokeDashoffset": "120%", "opacity": 0 },
      "final": { "strokeDashoffset": "0%", "opacity": 1 },
      "duration": 0.6,
      "delay": 0.16,
      "easing": "expo.out"
    },
    "hover": {
      "scale": 1.04,
      "y": -6,
      "duration": 0.2,
      "easing": "back.out(1.1)"
    },
    "parallax": {
      "maxRotateY": 6,
      "maxRotateX": 6,
      "maxTranslateZ": 18,
      "smoothing": 0.12
    }
  },
  "testimonials": {
    "cardWidth": 380,
    "speed": 35,
    "snap": {
      "duration": 0.6,
      "easing": "power4.out"
    },
    "scale": {
      "center": 1.03,
      "neighbor": 0.98,
      "default": 0.96
    },
    "autoplay": {
      "interval": 4000,
      "pauseOnHover": true,
      "pauseOnFocus": true
    },
    "drag": {
      "threshold": 127,
      "elastic": 0.1,
      "inertia": true
    }
  }
}
```

---

**Document Version**: 1.0  
**Last Updated**: December 2025  
**Compatible With**: GSAP 3.x, Framer Motion 11.x  
**Author**: One Media Works Technical Team
