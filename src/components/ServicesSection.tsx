import { motion, useMotionValue, useSpring } from 'motion/react';
import { Target, MessageSquare, Zap, LineChart } from 'lucide-react';
import { useRef, useEffect } from 'react';

/**
 * SERVICES SECTION - 3D Layered Card Reveal
 * 
 * Motion Spec (matching services.mp4):
 * - Trigger: section top hits 78% viewport
 * - Cards: staggered diagonal reveal with 3D transform
 * - Initial: y:40px, z:-60px, scale:0.94, rotateX:8deg, opacity:0
 * - Final: y:0, z:0, scale:1, rotateX:0, opacity:1
 * - Stagger: 0.08s per card
 * - Duration: 0.56s per card, ease: power3.out
 * - Connectors: strokeDashoffset 120% → 0, duration: 0.6s, ease: expo.out
 * - Hover: scale 1.04, translateY -6px, accent glow, 180-220ms
 * - Pointer parallax: rotateY ±6°, translateZ up to 18px
 * 
 * GSAP equivalent:
 * gsap.timeline({ scrollTrigger: { trigger: '.services', start: 'top 78%' }})
 *   .from('.svc-card', {y:40, z:-60, scale:0.94, rotateX:8, opacity:0, duration:0.56, ease:'power3.out', stagger:0.08})
 *   .fromTo('.svc-connector', {strokeDashoffset:'120%'}, {strokeDashoffset:0, opacity:1, duration:0.6, ease:'expo.out'}, '-=0.42')
 */

interface ServiceCard {
  id: number;
  title: string;
  benefit: string;
  icon: typeof Target;
  gradient: string;
  glowColor: string;
}

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  // Smooth spring for parallax
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 25 });

  const services: ServiceCard[] = [
    {
      id: 1,
      title: 'ICP Identification',
      benefit: 'Know who to reach.',
      icon: Target,
      gradient: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
      glowColor: 'rgba(59, 130, 246, 0.4)'
    },
    {
      id: 2,
      title: 'Persona Building',
      benefit: 'Speak like they expect.',
      icon: MessageSquare,
      gradient: 'linear-gradient(135deg, #a855f7, #ec4899)',
      glowColor: 'rgba(168, 85, 247, 0.4)'
    },
    {
      id: 3,
      title: 'AI Performance',
      benefit: 'Automate & optimise.',
      icon: Zap,
      gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      glowColor: 'rgba(245, 158, 11, 0.4)'
    },
    {
      id: 4,
      title: '360 Analytics',
      benefit: 'Measure what matters.',
      icon: LineChart,
      gradient: 'linear-gradient(135deg, #10b981, #22d3ee)',
      glowColor: 'rgba(16, 185, 129, 0.4)'
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  // Connector path data
  const connectorPaths = [
    { id: 1, d: 'M 100 50 Q 200 50 300 100', delay: 0.16 },
    { id: 2, d: 'M 300 100 Q 400 100 500 150', delay: 0.24 },
    { id: 3, d: 'M 500 150 Q 600 150 700 200', delay: 0.32 }
  ];

  return (
    <section className="services relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{ background: 'var(--bg)' }}
      />

      {/* 3D Perspective Container */}
      <div 
        ref={containerRef}
        className="max-w-7xl mx-auto relative z-10"
        style={{ perspective: '1200px' }}
      >
        {/* Section Title */}
        <motion.div
          className="text-center mb-20"
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 
            className="text-5xl lg:text-6xl mb-4"
            style={{ color: 'rgba(255, 255, 255, 0.95)' }}
          >
            Core Services
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="h-1 w-32 mx-auto"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #22d3ee 50%, transparent 100%)',
              filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))'
            }}
          />
        </motion.div>

        {/* 3D Card Stack with Connectors */}
        <div className="relative min-h-[600px] flex items-center justify-center">
          {/* SVG Connectors */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
            viewBox="0 0 800 600"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="connector-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
                <stop offset="50%" stopColor="rgba(168, 85, 247, 0.6)" />
                <stop offset="100%" stopColor="rgba(34, 211, 238, 0.6)" />
              </linearGradient>
            </defs>
            
            {connectorPaths.map((connector) => (
              <motion.path
                key={connector.id}
                className={`svc-connector-${connector.id}`}
                d={connector.d}
                fill="none"
                stroke="url(#connector-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))'
                }}
                initial={{ 
                  pathLength: 0,
                  opacity: 0
                }}
                whileInView={{ 
                  pathLength: 1,
                  opacity: 0.7
                }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  duration: 0.6, 
                  delay: connector.delay,
                  ease: [0.19, 1, 0.22, 1] // expo.out
                }}
              />
            ))}
          </svg>

          {/* Card Stack - Diagonal 3D Layout */}
          <div className="relative w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {services.map((service, index) => {
                // Calculate 3D positioning for diagonal spread
                const xOffset = index * 20;
                const yOffset = index * 15;
                const zOffset = index * -20;

                return (
                  <motion.div
                    key={service.id}
                    className={`svc-card-${service.id} relative group`}
                    style={{
                      transformStyle: 'preserve-3d',
                      zIndex: 10 + (4 - index) // Reverse z-index for stacking
                    }}
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
                      ease: [0.22, 1, 0.36, 1] // power3.out
                    }}
                    whileHover={{ 
                      scale: 1.04,
                      y: -6,
                      transition: { 
                        duration: 0.2,
                        ease: [0.34, 1.56, 0.64, 1] // back.out(1.1)
                      }
                    }}
                  >
                    {/* Glass Card */}
                    <motion.div 
                      className="relative p-8 rounded-2xl overflow-hidden h-full"
                      style={{
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(var(--glass-blur))',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
                        transformStyle: 'preserve-3d'
                      }}
                      animate={{
                        rotateY: smoothX.get() ? (smoothX.get() - 0.5) * 6 : 0,
                        rotateX: smoothY.get() ? -(smoothY.get() - 0.5) * 6 : 0,
                        z: smoothX.get() ? Math.abs(smoothX.get() - 0.5) * 18 : 0
                      }}
                      transition={{ type: 'spring', stiffness: 150, damping: 25 }}
                    >
                      {/* Icon with Neon Glow */}
                      <motion.div 
                        className="relative w-16 h-16 rounded-xl flex items-center justify-center mb-6 overflow-hidden"
                        style={{
                          background: service.gradient,
                          boxShadow: `0 8px 30px ${service.glowColor}`
                        }}
                        whileHover={{
                          scale: 1.1,
                          rotate: [0, -5, 5, 0],
                          transition: { duration: 0.4 }
                        }}
                      >
                        <service.icon className="w-8 h-8 text-white relative z-10" />
                        
                        {/* Pulsing Glow */}
                        <motion.div
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: index * 0.4
                          }}
                          className="absolute inset-0 rounded-xl blur-xl"
                          style={{ background: service.gradient }}
                        />
                      </motion.div>
                      
                      {/* Title */}
                      <h3 
                        className="text-xl mb-3"
                        style={{ color: 'rgba(255, 255, 255, 0.95)' }}
                      >
                        {service.title}
                      </h3>

                      {/* Neon Underline */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: index * 0.08 + 0.3, 
                          duration: 0.5,
                          ease: 'easeOut'
                        }}
                        className="h-[2px] w-16 mb-4 origin-left"
                        style={{
                          background: service.gradient,
                          filter: `drop-shadow(0 0 6px ${service.glowColor})`
                        }}
                      />
                      
                      {/* Benefit */}
                      <p 
                        className="text-sm italic"
                        style={{ color: 'var(--muted-text)' }}
                      >
                        {service.benefit}
                      </p>

                      {/* Inner Radial Glow */}
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at 20% 20%, ${service.glowColor.replace('0.4', '0.08')}, transparent 70%)`
                        }}
                      />
                    </motion.div>

                    {/* Hover Glow Effect */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ 
                        opacity: 1,
                        boxShadow: 'var(--accent-glow)'
                      }}
                      transition={{ duration: 0.18 }}
                      className="absolute inset-0 rounded-2xl blur-xl -z-10"
                      style={{ 
                        background: `radial-gradient(circle, ${service.glowColor}, transparent 70%)` 
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: Swipeable Stack Note */}
        <div className="lg:hidden text-center mt-8 text-sm" style={{ color: 'var(--muted-text)' }}>
          Swipe to explore services
        </div>
      </div>

      {/* Motion Spec Annotation (for handoff) */}
      <div className="hidden" data-motion-specs={JSON.stringify({
        trigger: 'top 78%',
        cardStagger: '0.08s',
        cardDuration: '0.56s',
        cardEasing: 'power3.out',
        connectorDuration: '0.6s',
        connectorEasing: 'expo.out',
        hoverDuration: '0.2s',
        parallaxMax: { rotateY: 6, rotateX: 6, translateZ: 18 }
      })} />
    </section>
  );
}
