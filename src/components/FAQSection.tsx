import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * FAQ SECTION - Neon Accordion
 * 
 * Features:
 * - Smooth accordion expand
 * - Neon edge highlight on active item
 * - Chevron rotation
 * - Minimal, luxury styling
 */

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: 'What industries do you serve?',
      answer: 'D2C, Health, Fintech, SaaS, Retail — we adapt fast.'
    },
    {
      id: 2,
      question: 'Do you manage ad spend?',
      answer: 'Yes, if you want us to — performance included.'
    },
    {
      id: 3,
      question: 'How fast will we see impact?',
      answer: 'Clarity in 2–4 weeks. Momentum compounds after cycles.'
    },
    {
      id: 4,
      question: 'What makes you different?',
      answer: 'We align strategy, tech, and execution. No silos. Just growth.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{ background: 'var(--bg)' }}
      />

      {/* Subtle Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.15, 0.08]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15), transparent 70%)'
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 
            className="text-5xl lg:text-6xl mb-4"
            style={{ color: 'rgba(255, 255, 255, 0.95)' }}
          >
            FAQ
          </h2>
          <p 
            className="text-lg"
            style={{ color: 'var(--muted-text)' }}
          >
            Quick answers to common questions
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.id}
                className="relative"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {/* Accordion Item */}
                <motion.div
                  className="relative overflow-hidden rounded-xl"
                  style={{
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(var(--glass-blur))',
                    border: isOpen
                      ? '1px solid rgba(168, 85, 247, 0.3)'
                      : '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: isOpen
                      ? '0 8px 30px rgba(168, 85, 247, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
                      : 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{
                    scale: 1.01,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 flex items-center justify-between gap-4 text-left"
                    style={{ background: 'transparent', border: 'none' }}
                  >
                    <span 
                      className="text-lg"
                      style={{ 
                        color: isOpen 
                          ? 'rgba(255, 255, 255, 0.95)' 
                          : 'rgba(255, 255, 255, 0.8)'
                      }}
                    >
                      {faq.question}
                    </span>

                    {/* Chevron Icon */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown 
                        className="w-5 h-5"
                        style={{ 
                          color: isOpen 
                            ? 'rgba(168, 85, 247, 0.8)' 
                            : 'rgba(255, 255, 255, 0.5)' 
                        }}
                      />
                    </motion.div>
                  </button>

                  {/* Answer (Animated) */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: 'auto', 
                          opacity: 1 
                        }}
                        exit={{ 
                          height: 0, 
                          opacity: 0 
                        }}
                        transition={{ 
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        className="overflow-hidden"
                      >
                        <div 
                          className="px-6 pb-6 pt-0"
                          style={{
                            color: 'var(--muted-text)',
                            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                          }}
                        >
                          <motion.p
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ 
                              duration: 0.3,
                              delay: 0.1,
                              ease: 'easeOut'
                            }}
                            className="pt-6 text-base"
                          >
                            {faq.answer}
                          </motion.p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Active Neon Left Edge */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="absolute left-0 top-0 bottom-0 w-[3px] origin-top"
                    style={{
                      background: 'linear-gradient(180deg, #a855f7, #ec4899)',
                      filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))'
                    }}
                  />

                  {/* Inner Radial Glow (Active) */}
                  {isOpen && (
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle at 10% 50%, rgba(168, 85, 247, 0.08), transparent 70%)'
                      }}
                    />
                  )}
                </motion.div>

                {/* Hover Glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: isOpen ? 0.6 : 0.3 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-xl blur-xl -z-10"
                  style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2), transparent 70%)'
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
