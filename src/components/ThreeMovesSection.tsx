import { motion } from 'motion/react';
import { Target, Zap, TrendingUp } from 'lucide-react';

/**
 * THE THREE MOVES - ALIGN • OPTIMISE • GROW
 * Three frosted neon-glass cards with snap-in animation
 * Neon edge flashes, micro-bounce, parallax responsiveness
 */

export function ThreeMovesSection() {
  const moves = [
    {
      id: 1,
      icon: Target,
      title: 'ALIGN',
      description: 'Pinpoint your ideal buyer. Stop shouting into the void.',
      gradient: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
      glowColor: 'rgba(59, 130, 246, 0.3)'
    },
    {
      id: 2,
      icon: Zap,
      title: 'OPTIMISE',
      description: 'Autopilot campaigns. Smarter budgets. Less waste.',
      gradient: 'linear-gradient(135deg, #a855f7, #ec4899)',
      glowColor: 'rgba(168, 85, 247, 0.3)'
    },
    {
      id: 3,
      icon: TrendingUp,
      title: 'GROW',
      description: 'Unified revenue engine. Sales + Marketing = one force.',
      gradient: 'linear-gradient(135deg, #10b981, #22d3ee)',
      glowColor: 'rgba(16, 185, 129, 0.3)'
    }
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{ background: 'var(--bg)' }}
      />

      {/* Animated Background Gradient */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[140px]"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15), rgba(59, 130, 246, 0.1), transparent 70%)'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-20"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 
            className="text-5xl lg:text-6xl mb-4"
            style={{ color: 'rgba(255, 255, 255, 0.95)' }}
          >
            The Three Moves
          </h2>
          <div className="flex items-center justify-center gap-4 text-xl" style={{ color: 'var(--muted-text)' }}>
            <span>ALIGN</span>
            <motion.div 
              className="w-2 h-2 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
                boxShadow: '0 0 10px rgba(34, 211, 238, 0.6)'
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            <span>OPTIMISE</span>
            <motion.div 
              className="w-2 h-2 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                boxShadow: '0 0 10px rgba(236, 72, 153, 0.6)'
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5
              }}
            />
            <span>GROW</span>
          </div>
        </motion.div>

        {/* Three Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {moves.map((move, index) => (
            <motion.div
              key={move.id}
              className="relative group"
              initial={{ 
                scale: 0.9,
                opacity: 0,
                y: 50
              }}
              whileInView={{ 
                scale: 1,
                opacity: 1,
                y: 0
              }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {/* Glass Card with Snap-In + Micro-Bounce */}
              <motion.div
                className="relative p-8 rounded-2xl overflow-hidden h-full"
                style={{
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(var(--glass-blur))',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: `0 8px 32px ${move.glowColor}, inset 0 1px 0 0 rgba(255, 255, 255, 0.1)`
                }}
                whileInView={{
                  scale: [1, 1.02, 1]
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.15 + 0.6,
                  ease: [0.34, 1.56, 0.64, 1] // back.out
                }}
                whileHover={{
                  scale: 1.03,
                  rotateY: 2,
                  rotateX: 2,
                  transition: { duration: 0.3 }
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Icon */}
                <motion.div
                  className="relative w-16 h-16 rounded-xl flex items-center justify-center mb-6 overflow-hidden"
                  style={{
                    background: move.gradient,
                    boxShadow: `0 8px 30px ${move.glowColor}`
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  <move.icon className="w-8 h-8 text-white relative z-10" />
                  
                  {/* Icon Glow Pulse */}
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.5
                    }}
                    className="absolute inset-0 rounded-xl blur-lg"
                    style={{ background: move.gradient }}
                  />
                </motion.div>

                {/* Title */}
                <motion.h3
                  className="text-3xl mb-4 tracking-wider"
                  style={{
                    background: move.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: `drop-shadow(0 0 12px ${move.glowColor})`
                  }}
                >
                  {move.title}
                </motion.h3>

                {/* Description */}
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  {move.description}
                </p>

                {/* Neon Edge Flash - Animated Border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileInView={{
                    boxShadow: [
                      `0 0 0 0 ${move.glowColor}`,
                      `0 0 30px 2px ${move.glowColor}`,
                      `0 0 0 0 ${move.glowColor}`
                    ]
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.2,
                    delay: index * 0.15 + 0.4,
                    ease: 'easeInOut'
                  }}
                />

                {/* Bottom Neon Line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.15 + 0.5,
                    duration: 0.8,
                    ease: 'easeOut'
                  }}
                  className="absolute bottom-0 left-0 h-[2px] origin-left"
                  style={{
                    width: '100%',
                    background: move.gradient,
                    filter: `drop-shadow(0 0 8px ${move.glowColor})`
                  }}
                />

                {/* Inner Radial Glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 20% 20%, ${move.glowColor.replace('0.3', '0.08')}, transparent 70%)`
                  }}
                />

                {/* Parallax Floating Effect */}
                <motion.div
                  className="absolute top-4 right-4 w-20 h-20 rounded-full blur-2xl pointer-events-none"
                  style={{
                    background: move.gradient,
                    opacity: 0.2
                  }}
                  animate={{
                    y: [0, -15, 0],
                    x: [0, 10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.5
                  }}
                />
              </motion.div>

              {/* Hover Glow Halo */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 rounded-2xl blur-2xl -z-10"
                style={{
                  background: `radial-gradient(circle, ${move.glowColor}, transparent 70%)`
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Connecting Lines Between Cards (Desktop) */}
        <svg 
          className="absolute top-1/2 left-0 w-full h-2 pointer-events-none hidden lg:block"
          style={{ transform: 'translateY(-50%)' }}
        >
          <motion.line
            x1="20%"
            y1="50%"
            x2="45%"
            y2="50%"
            stroke="url(#gradient1)"
            strokeWidth="2"
            strokeDasharray="8 4"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
          />
          <motion.line
            x1="55%"
            y1="50%"
            x2="80%"
            y2="50%"
            stroke="url(#gradient2)"
            strokeWidth="2"
            strokeDasharray="8 4"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
          />
          
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
              <stop offset="100%" stopColor="rgba(168, 85, 247, 0.6)" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0.6)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0.6)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
