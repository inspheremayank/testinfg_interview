import { motion } from 'motion/react';

/**
 * TRUSTED BY - Brand Marquee
 * 
 * Features:
 * - Infinite loop
 * - Neon glow on hover
 * - Smooth easing, 2025-modern feel
 * - Touch drag on mobile
 */

export function TrustedBySection() {
  const brands = [
    'TechVision', 'GrowthWorks', 'ScaleUp', 'Innovate', 'CloudSync',
    'DataFlow', 'NextWave', 'Velocity', 'PulseMedia', 'Vertex'
  ];

  // Duplicate for seamless loop
  const allBrands = [...brands, ...brands];

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, var(--bg) 0%, rgba(34, 211, 238, 0.02) 50%, var(--bg) 100%)'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 
            className="text-3xl mb-2"
            style={{ color: 'rgba(255, 255, 255, 0.95)' }}
          >
            Trusted By
          </h3>
          <p 
            className="text-sm"
            style={{ color: 'var(--muted-text)' }}
          >
            Leading brands who trust us to accelerate their growth
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div 
          className="relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          {/* Infinite Scrolling Marquee */}
          <motion.div
            className="flex gap-12"
            animate={{
              x: [0, -50 * brands.length * 10]
            }}
            transition={{
              x: {
                duration: 40,
                repeat: Infinity,
                ease: 'linear'
              }
            }}
          >
            {allBrands.map((brand, index) => (
              <motion.div
                key={index}
                className="relative group flex-shrink-0"
                whileHover={{
                  scale: 1.08,
                  transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
                }}
              >
                {/* Glass Logo Card */}
                <div 
                  className="w-44 h-24 rounded-xl flex items-center justify-center overflow-hidden"
                  style={{
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <span 
                    className="text-lg tracking-widest transition-all duration-300"
                    style={{
                      color: 'rgba(255, 255, 255, 0.4)',
                      fontWeight: 600
                    }}
                  >
                    {brand}
                  </span>

                  {/* Inner Glow */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(34, 211, 238, 0.1), transparent 70%)'
                    }}
                  />
                </div>

                {/* Neon Edge Glow on Hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    border: '1px solid rgba(34, 211, 238, 0.4)',
                    boxShadow: '0 0 24px rgba(34, 211, 238, 0.3), inset 0 0 20px rgba(34, 211, 238, 0.1)'
                  }}
                />

                {/* Hover Shine Pass */}
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)'
                  }}
                  whileHover={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 0.8,
                    ease: 'easeInOut'
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Gradient Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          className="h-[1px] w-full mx-auto mt-12 origin-center"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(34, 211, 238, 0.4) 50%, transparent 100%)'
          }}
        />
      </div>
    </section>
  );
}
