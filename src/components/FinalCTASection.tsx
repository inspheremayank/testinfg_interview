import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * FINAL CTA - Floating Neon-Glass Block
 * 
 * Features:
 * - Floating neon-glass design with subtle glow
 * - Magnetic button hover
 * - Soft particle drift
 * - Bold, confident rhythm
 */

export function FinalCTASection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{ background: 'var(--bg)' }}
      />

      {/* Animated Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-1/2 left-1/3 w-[700px] h-[700px] rounded-full blur-[120px]"
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
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}
        className="absolute top-1/3 right-1/3 w-[800px] h-[800px] rounded-full blur-[140px]"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.25), transparent 70%)'
        }}
      />

      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: 'rgba(34, 211, 238, 0.6)',
            boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)',
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut'
          }}
        />
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Floating Glass Block */}
        <motion.div
          className="relative p-12 lg:p-16 rounded-3xl overflow-hidden"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 60px rgba(34, 211, 238, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
          }}
          initial={{ y: 60, opacity: 0, scale: 0.95 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
          whileHover={{
            y: -8,
            transition: { duration: 0.4, ease: 'easeOut' }
          }}
        >
          {/* Inner Radial Glow */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.1), transparent 70%)'
            }}
          />

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Icon */}
            <motion.div
              className="flex justify-center mb-6"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
                  boxShadow: '0 8px 30px rgba(34, 211, 238, 0.4)'
                }}
              >
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h2
              className="text-5xl lg:text-6xl mb-6"
              style={{ color: 'rgba(255, 255, 255, 0.98)' }}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              Ready to make growth{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                inevitable
              </span>
              ?
            </motion.h2>

            {/* CTA Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="mb-6"
            >
              <motion.button
                className="group relative px-12 py-6 rounded-xl text-xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
                  color: '#ffffff',
                  border: 'none',
                  boxShadow: '0 12px 50px rgba(34, 211, 238, 0.4)'
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 20px 60px rgba(34, 211, 238, 0.6)',
                  transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Magnetic Shine Effect */}
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
                    repeatDelay: 2,
                    ease: 'easeInOut'
                  }}
                />

                <span className="relative z-10 flex items-center gap-3 justify-center">
                  Start Your Growth Plan
                  <motion.span
                    animate={{ x: [0, 6, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>

            {/* Subtext */}
            <motion.p
              className="text-lg"
              style={{ color: 'var(--muted-text)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.6,
                ease: 'easeOut'
              }}
            >
              15-minute call → instant clarity.
            </motion.p>
          </div>

          {/* Neon Border Pulse */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(34, 211, 238, 0)',
                '0 0 40px 4px rgba(34, 211, 238, 0.4)',
                '0 0 0 0 rgba(34, 211, 238, 0)'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          {/* Corner Accents */}
          <div 
            className="absolute top-0 left-0 w-20 h-20"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), transparent)',
              borderRadius: '24px 0 0 0'
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-20 h-20"
            style={{
              background: 'linear-gradient(315deg, rgba(34, 211, 238, 0.3), transparent)',
              borderRadius: '0 0 24px 0'
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
