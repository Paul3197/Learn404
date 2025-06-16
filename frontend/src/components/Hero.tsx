// src/components/Hero.tsx
import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onClickCTA?: () => void;
}

// Variants para animaciones
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren' as const,
      staggerChildren: 0.3
    } as const
  }
} as const as Variants;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100
    } as const
  }
} as const as Variants;

const Hero: React.FC<HeroProps> = ({
  title = 'Lab 404',
  subtitle = 'Descubre nuestra colección de productos',
  ctaText = 'Explorar ahora',
  onClickCTA
}) => {
  return (
    <motion.section
      className="relative w-screen h-screen flex flex-col justify-center items-center bg-white px-6 text-center overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4"
        variants={itemVariants}
      >
        {title}
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl text-gray-700 mb-8"
        variants={itemVariants}
      >
        {subtitle}
      </motion.p>

      {ctaText && (
        <motion.button
          className="bg-[#F28B82] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#F8B0A6] transition"
          onClick={onClickCTA}
          variants={itemVariants}
        >
          {ctaText}
        </motion.button>
      )}

      {/* Ola decorativa */}
      <motion.div
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        variants={itemVariants}
      >
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-current text-[#FFAAA6]"
        >
          <path d="M0,160L1440,32L1440,320L0,320Z" />
        </svg>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
