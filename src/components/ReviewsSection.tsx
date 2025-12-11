import { motion, useAnimation, PanInfo } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * REVIEWS SECTION - Luxury Slider
 * 
 * Features:
 * - Autoplay slow marquee
 * - Pause on hover
 * - Drag with inertia + snap
 * - Centered testimonial scales to 1.03 with neon glow
 * - Partial next/previous cards visible for depth
 */

export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Martinez',
      company: 'TechVision Inc.',
      quote: 'Aligned our teams. Revenue up 40%.',
      photo: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
    },
    {
      id: 2,
      name: 'Marcus Chen',
      company: 'GrowthWorks',
      quote: 'No more guessing — predictable pipeline now.',
      photo: 'https://images.unsplash.com/photo-1758518727888-ffa196002e59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
    },
    {
      id: 3,
      name: 'Emma Thompson',
      company: 'Velocity Labs',
      quote: 'Creative that actually converts.',
      photo: 'https://images.unsplash.com/photo-1543132220-7bc04a0e790a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
    },
    {
      id: 4,
      name: 'David Park',
      company: 'Scale Digital',
      quote: 'From confusion to clarity in weeks.',
      photo: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
    },
    {
      id: 5,
      name: 'Lisa Rodriguez',
      company: 'Innovate Co.',
      quote: "Best marketing investment we've made.",
      photo: 'https://images.unsplash.com/photo-1758518727888-ffa196002e59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
    }
  ];

  // Triple for seamless loop
  const allTestimonials = [...testimonials, ...testimonials, ...testimonials];
  const cardWidth = 380;

  // Autoplay
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = prev + 1;
          if (next >= testimonials.length * 2) {
            return testimonials.length;
          }
          return next;
        });
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isPaused, testimonials.length]);

  // Animate to current index
  useEffect(() => {
    controls.start({
      x: -currentIndex * cardWidth,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 30,
        mass: 0.8
      }
    });
  }, [currentIndex, controls]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = cardWidth / 3;

    if (info.offset.x > threshold) {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    } else if (info.offset.x < -threshold) {
      setCurrentIndex((prev) => Math.min(allTestimonials.length - 1, prev + 1));
    }
  };

  const navigateLeft = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const navigateRight = () => {
    setCurrentIndex((prev) => Math.min(allTestimonials.length - 1, prev + 1));
  };

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{ background: 'var(--bg)' }}
      />

      {/* Glowing Orb */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[140px]"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15), rgba(168, 85, 247, 0.1), transparent 70%)'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
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
            Real wins, fast.
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="h-1 w-32 mx-auto"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #ec4899 50%, transparent 100%)',
              filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.6))'
            }}
          />
        </motion.div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 -ml-4 hidden lg:block">
            <motion.button
              onClick={navigateLeft}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.8)'
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: '0 0 20px rgba(236, 72, 153, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 -mr-4 hidden lg:block">
            <motion.button
              onClick={navigateRight}
              disabled={currentIndex === allTestimonials.length - 1}
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.8)'
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: '0 0 20px rgba(236, 72, 153, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Gradient Masks for Depth Effect */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, var(--bg), transparent)'
            }}
          />
          <div 
            className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to left, var(--bg), transparent)'
            }}
          />

          {/* Scrolling Inner Container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-8 py-8"
              drag="x"
              dragConstraints={{
                left: -(allTestimonials.length - 1) * cardWidth,
                right: 0
              }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              animate={controls}
              style={{
                cursor: isPaused ? 'grab' : 'default'
              }}
              whileTap={{ cursor: 'grabbing' }}
            >
              {allTestimonials.map((testimonial, index) => {
                const isCurrent = index === currentIndex;
                const isNeighbor = Math.abs(index - currentIndex) === 1;

                return (
                  <motion.div
                    key={`${testimonial.id}-${index}`}
                    className="flex-shrink-0"
                    style={{ width: '360px' }}
                    animate={{
                      scale: isCurrent ? 1.03 : isNeighbor ? 0.98 : 0.96,
                      opacity: isCurrent ? 1 : isNeighbor ? 0.9 : 0.7
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    {/* Glass Card */}
                    <div 
                      className="relative p-8 rounded-2xl h-full overflow-hidden"
                      style={{
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(var(--glass-blur))',
                        border: isCurrent
                          ? '1px solid rgba(236, 72, 153, 0.4)'
                          : '1px solid rgba(255, 255, 255, 0.05)',
                        boxShadow: isCurrent
                          ? '0 12px 40px rgba(236, 72, 153, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
                          : 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
                        transition: 'all 0.4s ease'
                      }}
                    >
                      {/* Profile Photo - Circular with High Contrast */}
                      <div className="flex justify-center mb-6">
                        <motion.div 
                          className="relative w-24 h-24 rounded-full overflow-hidden"
                          style={{
                            border: isCurrent
                              ? '3px solid rgba(236, 72, 153, 0.5)'
                              : '2px solid rgba(236, 72, 153, 0.3)',
                            boxShadow: isCurrent
                              ? '0 0 30px rgba(236, 72, 153, 0.6)'
                              : '0 0 20px rgba(236, 72, 153, 0.3)'
                          }}
                        >
                          <img 
                            src={testimonial.photo}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                            draggable={false}
                          />

                          {/* Soft Glow on Current */}
                          {isCurrent && (
                            <motion.div
                              animate={{
                                opacity: [0, 0.8, 0]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut'
                              }}
                              className="absolute inset-0 rounded-full"
                              style={{
                                border: '3px solid rgba(236, 72, 153, 0.9)',
                                boxShadow: '0 0 25px rgba(236, 72, 153, 0.8)'
                              }}
                            />
                          )}
                        </motion.div>
                      </div>

                      {/* Quote */}
                      <p 
                        className="text-lg mb-6 leading-relaxed text-center min-h-[60px]"
                        style={{ 
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontStyle: 'italic'
                        }}
                      >
                        "{testimonial.quote}"
                      </p>

                      {/* Name & Company */}
                      <div className="text-center">
                        <p 
                          className="text-base mb-1"
                          style={{ color: 'rgba(255, 255, 255, 0.95)' }}
                        >
                          {testimonial.name}
                        </p>
                        <p 
                          className="text-sm"
                          style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                        >
                          {testimonial.company}
                        </p>
                      </div>

                      {/* Inner Radial Glow */}
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: isCurrent
                            ? 'radial-gradient(circle at 50% 30%, rgba(236, 72, 153, 0.12), transparent 70%)'
                            : 'radial-gradient(circle at 50% 30%, rgba(236, 72, 153, 0.06), transparent 70%)'
                        }}
                      />
                    </div>

                    {/* Current Card Glow Halo */}
                    {isCurrent && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 rounded-2xl blur-2xl -z-10"
                        style={{
                          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4), transparent 70%)'
                        }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index + testimonials.length)}
                className="relative rounded-full transition-all duration-300"
                style={{
                  background: Math.floor(currentIndex % testimonials.length) === index
                    ? 'linear-gradient(135deg, #ec4899, #a855f7)'
                    : 'rgba(255, 255, 255, 0.2)',
                  boxShadow: Math.floor(currentIndex % testimonials.length) === index
                    ? '0 0 12px rgba(236, 72, 153, 0.6)'
                    : 'none',
                  width: Math.floor(currentIndex % testimonials.length) === index ? '32px' : '8px',
                  height: '8px'
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Instruction Text */}
        <p 
          className="text-center mt-8 text-sm"
          style={{ color: 'var(--muted-text)' }}
        >
          Drag to scroll • Hover to pause
        </p>
      </div>
    </section>
  );
}