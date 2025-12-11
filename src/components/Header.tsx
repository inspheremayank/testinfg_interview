import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoUrl from '../assets/omw-logo-blue.svg';

/**
 * HEADER NAVIGATION - Premium Glassmorphic Navbar
 * 
 * Features:
 * - Glassmorphism design with backdrop blur
 * - Sticky header with scroll effects
 * - Mobile responsive with hamburger menu
 * - Neon cyan accent highlights
 * - Smooth animations
 */

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Transform for scroll effects
  const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 1]);
  const headerBlur = useTransform(scrollY, [0, 100], [10, 20]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Process', href: '#process' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' }
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{ opacity: headerOpacity }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.nav
        className="max-w-7xl mx-auto rounded-2xl overflow-hidden relative"
        style={{
          background: isScrolled
            ? 'rgba(11, 14, 18, 0.8)'
            : 'rgba(255, 255, 255, 0.04)',
          backdropFilter: `blur(${isScrolled ? '20px' : '14px'})`,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: isScrolled
            ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)'
            : '0 4px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)'
        }}
        animate={{ scale: isScrolled ? 1 : 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Top neon edge glow */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.5), transparent)'
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="flex items-center justify-between px-6 py-4">

          
          <motion.a
            href="#"
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="w-16 h-16 rounded-xl flex items-center justify-center relative overflow-hidden bg-transparent"
              animate={{ rotate: [0, 1, -1, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <img
                src={logoUrl}    // ← your logo path
                alt="Company Logo"
                className="w-16 h-16 "
              />
            </motion.div>
          </motion.a>
          {/* CTA Button - Desktop */}
          <motion.button
            className="hidden lg:flex items-center gap-2 px-6 py-3 rounded-xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
              color: '#ffffff',
              border: 'none',
              boxShadow: '0 4px 20px rgba(34, 211, 238, 0.3)'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3 }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 6px 30px rgba(34, 211, 238, 0.5)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                transform: 'translateX(-100%)'
              }}
              animate={{
                transform: ['translateX(-100%)', 'translateX(100%)']
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <span className="relative z-10">Get Started</span>
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-lg"
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden border-t"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.08)',
              background: 'rgba(11, 14, 18, 0.95)',
              backdropFilter: 'blur(20px)'
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="py-3 px-4 rounded-lg"
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.button
                className="mt-2 py-4 px-6 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
                  color: '#ffffff',
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(34, 211, 238, 0.4)'
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.nav>
    </motion.header>
  );
}
