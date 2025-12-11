import { motion } from 'motion/react';
import logoUrl from '../assets/omw-logo-blue.svg'; // adjust path from Header.tsx location
/**
 * SPLASH SCREEN - Luxury Futuristic Animation
 * 
 * Timeline:
 * 0-0.8s: Logo fade + scale in (0.88 → 1.03)
 * 0.8-1.6s: Neon glow pulse spreads outward
 * 1.6-2.2s: Entire splash slides upward to reveal page
 */

export function SplashScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0B0E12 0%, #1a1d2e 50%, #0B0E12 100%)'
      }}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      exit={{ 
        y: '-100%',
        transition: { 
          duration: 0.6, 
          delay: 1.6,
          ease: [0.76, 0, 0.24, 1] // power4.out
        }
      }}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 60%)',
            'radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.2), transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 60%)'
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Center Logo Container */}
      <div className="relative z-10">
        {/* Outer Glow Ring */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ 
            scale: [0.5, 2, 3],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 1.6,
            delay: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.4), rgba(59, 130, 246, 0.2), transparent)',
            width: '400px',
            height: '400px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />

        {/* Logo */}
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ 
            scale: [0.88, 1.03, 1],
            opacity: [0, 1, 1]
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1], // power3.out
            times: [0, 0.7, 1]
          }}
          className="relative"
        >
          {/* Placeholder Logo - Replace with actual logo */}
          <div 
            className="relative w-48 h-48 rounded-2xl flex items-center justify-center overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(34, 211, 238, 0.1))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(34, 211, 238, 0.2)'
            }}
          >
            {/* Logo Text */}
             <motion.a
                        href="#"
                        className="flex items-center gap-3 group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className="w-32 h-32 rounded-xl flex items-center justify-center relative overflow-hidden bg-transparent"
                          animate={{ rotate: [0, 1, -1, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <img
                            src={logoUrl}    // ← your logo path
                            alt="Company Logo"
                            className="w-32 h-32 "
                          />
                        </motion.div>
                      </motion.a>

            {/* Neon Edge Glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(34, 211, 238, 0.3), inset 0 0 20px rgba(34, 211, 238, 0.1)',
                  '0 0 40px rgba(34, 211, 238, 0.6), inset 0 0 30px rgba(34, 211, 238, 0.2)',
                  '0 0 20px rgba(34, 211, 238, 0.3), inset 0 0 20px rgba(34, 211, 238, 0.1)'
                ]
              }}
              transition={{
                duration: 2,
                delay: 0.8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </div>

          {/* Rotating Particles */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
                  boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)',
                  left: '50%',
                  top: '50%',
                  transformOrigin: '0 0'
                }}
                animate={{
                  x: Math.cos((i / 8) * Math.PI * 2) * 100,
                  y: Math.sin((i / 8) * Math.PI * 2) * 100,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  delay: 0.8 + i * 0.1,
                  repeat: Infinity,
                  ease: 'easeOut'
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Shine Line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0] }}
        transition={{
          duration: 1.2,
          delay: 0.5,
          ease: 'easeOut'
        }}
        style={{
          background: 'linear-gradient(90deg, transparent, #22d3ee, transparent)',
          boxShadow: '0 0 20px rgba(34, 211, 238, 0.8)'
        }}
      />
    </motion.div>
  );
}
