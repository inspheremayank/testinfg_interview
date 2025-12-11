import { motion } from 'motion/react';
import { 
  Share2, Video, Megaphone, Users, 
  Layout, Settings, Sparkles, BarChart3,
  FileText, Mail, Calendar, Target as TargetIcon
} from 'lucide-react';

/**
 * SERVICES GRID - Minimal + Premium
 * 8-10 neon glass cards in responsive grid
 * 3D stagger entrance, tilt/lift on hover, neon rim glow
 * Connectors animate with stroke-dash reveal
 */

export function ServicesGridSection() {
  const services = [
    // B2C Services
    {
      id: 1,
      category: 'B2C',
      title: 'Social Ads',
      subtitle: 'short-form that converts',
      icon: Share2,
      gradient: 'linear-gradient(135deg, #ec4899, #f97316)',
      glowColor: 'rgba(236, 72, 153, 0.3)'
    },
    {
      id: 2,
      category: 'B2C',
      title: 'Video Production',
      subtitle: 'snackable, cinematic content',
      icon: Video,
      gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      glowColor: 'rgba(245, 158, 11, 0.3)'
    },
    {
      id: 3,
      category: 'B2C',
      title: 'Outdoor & Transit',
      subtitle: 'bold mass visibility',
      icon: Megaphone,
      gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
      glowColor: 'rgba(139, 92, 246, 0.3)'
    },
    {
      id: 4,
      category: 'B2C',
      title: 'Influencers',
      subtitle: 'strategic matchmaking',
      icon: Users,
      gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
      glowColor: 'rgba(6, 182, 212, 0.3)'
    },
    // MarTech
    {
      id: 5,
      category: 'MarTech',
      title: 'Landing Pages',
      subtitle: 'instant conversion funnels',
      icon: Layout,
      gradient: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
      glowColor: 'rgba(59, 130, 246, 0.3)'
    },
    {
      id: 6,
      category: 'MarTech',
      title: 'CRM + Automations',
      subtitle: 'follow-ups that close',
      icon: Settings,
      gradient: 'linear-gradient(135deg, #a855f7, #ec4899)',
      glowColor: 'rgba(168, 85, 247, 0.3)'
    },
    {
      id: 7,
      category: 'MarTech',
      title: 'AI Funnels',
      subtitle: 'intent-driven flows',
      icon: Sparkles,
      gradient: 'linear-gradient(135deg, #10b981, #22d3ee)',
      glowColor: 'rgba(16, 185, 129, 0.3)'
    },
    {
      id: 8,
      category: 'MarTech',
      title: 'Analytics',
      subtitle: 'clear numbers, clear moves',
      icon: BarChart3,
      gradient: 'linear-gradient(135deg, #06b6d4, #10b981)',
      glowColor: 'rgba(6, 182, 212, 0.3)'
    },
    // B2B
    {
      id: 9,
      category: 'B2B',
      title: 'Lead Magnets',
      subtitle: 'webinars, playbooks',
      icon: FileText,
      gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      glowColor: 'rgba(59, 130, 246, 0.3)'
    },
    {
      id: 10,
      category: 'B2B',
      title: 'Nurture Streams',
      subtitle: 'multi-touch cadence',
      icon: Mail,
      gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
      glowColor: 'rgba(236, 72, 153, 0.3)'
    },
    {
      id: 11,
      category: 'B2B',
      title: 'Meeting Automation',
      subtitle: 'no missed demos',
      icon: Calendar,
      gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
      glowColor: 'rgba(16, 185, 129, 0.3)'
    },
    {
      id: 12,
      category: 'B2B',
      title: 'Retargeting',
      subtitle: 'bring buyers back',
      icon: TargetIcon,
      gradient: 'linear-gradient(135deg, #f59e0b, #ec4899)',
      glowColor: 'rgba(245, 158, 11, 0.3)'
    }
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, var(--bg) 0%, rgba(59, 130, 246, 0.02) 50%, var(--bg) 100%)'
        }}
      />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
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
            What We Do
          </h2>
          <p 
            className="text-xl"
            style={{ color: 'var(--muted-text)' }}
          >
            Minimal services. Maximum impact.
          </p>
        </motion.div>

        {/* Services Grid - 3D Stagger */}
        <div 
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          style={{ perspective: '1000px' }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="relative group"
              initial={{
                opacity: 0,
                y: 40,
                z: -60,
                scale: 0.94,
                rotateX: 8
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                z: 0,
                scale: 1,
                rotateX: 0
              }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.56,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1]
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glass Card */}
              <motion.div
                className="relative p-6 rounded-xl overflow-hidden h-full cursor-pointer"
                style={{
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(var(--glass-blur))',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
                  minHeight: '180px'
                }}
                whileHover={{
                  scale: 1.04,
                  y: -6,
                  rotateY: 3,
                  rotateX: 3,
                  transition: {
                    duration: 0.25,
                    ease: [0.34, 1.56, 0.64, 1]
                  }
                }}
              >
                {/* Category Badge */}
                <motion.div
                  className="absolute top-3 right-3 px-2 py-1 rounded text-xs"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'rgba(255, 255, 255, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  {service.category}
                </motion.div>

                {/* Icon */}
                <motion.div
                  className="relative w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    background: service.gradient,
                    boxShadow: `0 6px 24px ${service.glowColor}`
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -8, 8, 0],
                    transition: { duration: 0.4 }
                  }}
                >
                  <service.icon className="w-6 h-6 text-white" />
                  
                  {/* Icon Pulse */}
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.2
                    }}
                    className="absolute inset-0 rounded-lg blur-lg"
                    style={{ background: service.gradient }}
                  />
                </motion.div>

                {/* Title */}
                <h3
                  className="text-xl mb-2"
                  style={{ color: 'rgba(255, 255, 255, 0.95)' }}
                >
                  {service.title}
                </h3>

                {/* Subtitle (hover reveal) */}
                <motion.p
                  className="text-sm"
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontStyle: 'italic'
                  }}
                  initial={{ opacity: 0.5 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {service.subtitle}
                </motion.p>

                {/* Neon Bottom Edge */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.05 + 0.3,
                    duration: 0.6,
                    ease: 'easeOut'
                  }}
                  className="absolute bottom-0 left-0 h-[2px] origin-left"
                  style={{
                    width: '100%',
                    background: service.gradient,
                    filter: `drop-shadow(0 0 6px ${service.glowColor})`
                  }}
                />

                {/* Inner Radial Glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 80% 20%, ${service.glowColor.replace('0.3', '0.06')}, transparent 60%)`
                  }}
                />

                {/* Hover Neon Rim */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    border: `1px solid ${service.glowColor.replace('0.3', '0.5')}`,
                    boxShadow: `0 0 20px ${service.glowColor}, inset 0 0 20px ${service.glowColor.replace('0.3', '0.1')}`
                  }}
                  transition={{ duration: 0.25 }}
                />
              </motion.div>

              {/* Hover Glow Halo */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 rounded-xl blur-xl -z-10"
                style={{
                  background: `radial-gradient(circle, ${service.glowColor}, transparent 70%)`
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Connecting Paths (Decorative) */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20 hidden xl:block"
          style={{ zIndex: 0 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.path
              key={i}
              d={`M ${20 + i * 10}% ${30 + (i % 3) * 20}% Q ${40 + i * 8}% ${40 + (i % 2) * 15}%, ${60 + i * 5}% ${50 + (i % 3) * 10}%`}
              fill="none"
              stroke="url(#serviceGradient)"
              strokeWidth="1"
              strokeDasharray="4 8"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                ease: 'easeOut'
              }}
            />
          ))}
          
          <defs>
            <linearGradient id="serviceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
              <stop offset="50%" stopColor="rgba(168, 85, 247, 0.4)" />
              <stop offset="100%" stopColor="rgba(34, 211, 238, 0.4)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
