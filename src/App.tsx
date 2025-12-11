import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SplashScreen } from './components/SplashScreen';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { OneLinerSection } from './components/OneLinerSection';
import { ThreeMovesSection } from './components/ThreeMovesSection';
import { ServicesGridSection } from './components/ServicesGridSection';
import { ReviewsSection } from './components/ReviewsSection';
import { TrustedBySection } from './components/TrustedBySection';
import { FinalCTASection } from './components/FinalCTASection';
import { FAQSection } from './components/FAQSection';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Splash timing: logo fade-in + pulse + upward slide = ~2.2s
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen key="splash" />}
      </AnimatePresence>
      
      {!showSplash && (
        <motion.div
          initial={{ opacity: 0.85, scale: 0.995 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Header />
          <HeroSection />
          <OneLinerSection />
          <ThreeMovesSection />
          <ServicesGridSection />
          <ReviewsSection />
          <TrustedBySection />
          <FinalCTASection />
          <FAQSection />
        </motion.div>
      )}
    </div>
  );
}