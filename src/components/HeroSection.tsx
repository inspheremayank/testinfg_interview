import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight, TrendingUp, Zap, Target } from 'lucide-react';

/**
 * HERO SECTION - Make Growth Feel Inevitable
 * 
 * Features:
 * - Staggered fade-up for text
 * - CTA button bounce-on-hover with magnetic effect
 * - Parallax float for cards
 * - Neon rim pulses on hero UI panels
 * - Floating particles and lens flares
 */

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, 80]);
  const y3 = useTransform(scrollY, [0, 500], [0, 50]);

  const floatingCards = [
    {
      icon: TrendingUp,
      metric: '+42% QoQ',
      label: 'Revenue Growth',
      color: 'rgba(16, 185, 129, 0.3)',
      gradient: 'linear-gradient(135deg, #10b981, #22d3ee)',
      delay: 0
    },
    {
      icon: Zap,
      metric: '3.2x ROAS',
      label: 'Ad Performance',
      color: 'rgba(245, 158, 11, 0.3)',
      gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      delay: 0.1
    },
    {
      icon: Target,
      metric: '94% Accuracy',
      label: 'Targeting Precision',
      color: 'rgba(59, 130, 246, 0.3)',
      gradient: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
      delay: 0.2
    }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0" style={{ background: 'var(--bg)' }}>
        {/* Radial Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent 70%)'
          }}
        />
        
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
          className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] rounded-full blur-[140px]"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.25), transparent 70%)'
          }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: 'rgba(34, 211, 238, 0.6)',
              boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut'
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="gap-24 xl:gap-32 items-center grid lg:grid-cols-2 hero-grid">
          {/* Left: Text Content */}
          <div>
            {/* Headline */}
            <motion.h1
              className="text-6xl lg:text-7xl xl:text-8xl mb-6 tracking-tight"
              style={{ 
                color: 'rgba(255, 255, 255, 0.98)',
                lineHeight: 1.1
              }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              Make Growth Feel{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  position: 'relative'
                }}
              >
                Inevitable
                {/* Neon Underline */}
                <motion.span
                  className="absolute bottom-0 left-0 h-1 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #3b82f6, #22d3ee)',
                    filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))',
                    width: '100%'
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                />
              </span>
              .
            </motion.h1>

            {/* Subhead */}
            <motion.p
              className="text-xl lg:text-2xl mb-10 leading-relaxed"
              style={{ color: 'var(--muted-text)' }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.7, 
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              Precision targeting. AI-driven performance.{' '}
              <span style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                A growth engine built for scale.
              </span>
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <motion.button
                className="group relative px-10 py-5 rounded-xl text-lg overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
                  color: '#ffffff',
                  border: 'none',
                  boxShadow: '0 10px 40px rgba(34, 211, 238, 0.3)'
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 15px 50px rgba(34, 211, 238, 0.5)',
                  transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    transform: 'translateX(-100%)'
                  }}
                  animate={{
                    transform: ['translateX(-100%)', 'translateX(100%)']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: 'easeInOut'
                  }}
                />
                
                <span className="relative z-10 flex items-center gap-3">
                  Start Your Growth Plan
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>
          </div>

          {/* Right: Floating Dashboard Cards */}
          <motion.div 
            className="relative h-[600px] hidden lg:block"
            style={{ y: y3 }}
          >
            {/* Background Dashboard Image */}
            <motion.div
              className="absolute inset-0 rounded-3xl overflow-hidden"
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                alt="Dashboard"
                className="w-full h-full object-cover opacity-20"
              />
              
              {/* Overlay Gradient */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.15), transparent 60%)'
                }}
              />
            </motion.div>

            {/* Floating Metric Cards */}
            {floatingCards.map((card, index) => (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  top: `${20 + index * 25}%`,
                  left: `${10 + index * 15}%`,
                  y: index === 0 ? y1 : index === 1 ? y2 : y3
                }}
                initial={{ 
                  scale: 0.8, 
                  opacity: 0,
                  rotateX: 20
                }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  rotateX: 0
                }}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.7 + card.delay,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  className="relative p-6 rounded-2xl min-w-[220px]"
                  style={{
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(var(--glass-blur))',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: `0 8px 32px ${card.color}, inset 0 1px 0 0 rgba(255, 255, 255, 0.1)`
                  }}
                  animate={{
                    y: [0, -10, 0]
                  }}
                  transition={{
                    duration: 3 + index,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.5
                  }}
                >
                  {/* Icon */}
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{
                      background: card.gradient,
                      boxShadow: `0 4px 20px ${card.color}`
                    }}
                  >
                    <card.icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Metric */}
                  <div 
                    className="text-3xl mb-1"
                    style={{
                      background: card.gradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    {card.metric}
                  </div>

                  {/* Label */}
                  <div 
                    className="text-sm"
                    style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                  >
                    {card.label}
                  </div>

                  {/* Neon Pulse Border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={{
                      boxShadow: [
                        `0 0 0 0 ${card.color}`,
                        `0 0 20px 4px ${card.color}`,
                        `0 0 0 0 ${card.color}`
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.7
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}

            {/* Lens Flare Effect */}
            <motion.div
              className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full blur-3xl pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(34, 211, 238, 0.4), transparent 70%)'
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
          style={{
            border: '2px solid rgba(34, 211, 238, 0.3)',
            boxShadow: '0 0 20px rgba(34, 211, 238, 0.2)'
          }}
        >
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{
              background: 'linear-gradient(180deg, #22d3ee, transparent)'
            }}
            animate={{
              y: [0, 12, 0],
              opacity: [1, 0, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}