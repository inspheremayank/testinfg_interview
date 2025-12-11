import { motion } from 'motion/react';

/**
 * ONE-LINER BARRIER BREAKER
 * Centered impactful statement with neon accents
 */

export function OneLinerSection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, var(--bg) 0%, rgba(59, 130, 246, 0.03) 50%, var(--bg) 100%)'
        }}
      />

      {/* Subtle Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.2), transparent 70%)'
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Top Line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-px w-32 mx-auto mb-12"
          style={{
            background: 'linear-gradient(90deg, transparent, #22d3ee, transparent)',
            boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)'
          }}
        />

        {/* One-Liner Text */}
        <motion.p
          className="text-3xl lg:text-4xl xl:text-5xl leading-relaxed"
          style={{
            color: 'rgba(255, 255, 255, 0.92)',
            maxWidth: '900px',
            margin: '0 auto'
          }}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ 
            duration: 0.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          We align your{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 600
            }}
          >
            audience
          </span>
          ,{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 600
            }}
          >
            message
          </span>
          , and{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #10b981, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 600
            }}
          >
            systems
          </span>{' '}
          — so your next campaign is{' '}
          <span style={{ fontStyle: 'italic', color: 'rgba(255, 255, 255, 0.6)' }}>
            never
          </span>{' '}
          a shot in the dark.
        </motion.p>

        {/* Bottom Line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="h-px w-32 mx-auto mt-12"
          style={{
            background: 'linear-gradient(90deg, transparent, #22d3ee, transparent)',
            boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)'
          }}
        />

        {/* Floating Accent Dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: 'rgba(34, 211, 238, 0.6)',
              boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)',
              left: `${20 + i * 12}%`,
              top: `${30 + (i % 2) * 40}%`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3
            }}
          />
        ))}
      </div>
    </section>
  );
}
