// src/components/Hero.tsx
import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onClickCTA?: () => void;
}

// Variants para animaciones de carga en secuencia
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren' as const,
      staggerChildren: 0.3,
    } as const,
  },
} as const as Variants;

// Variants para items que entran con elevación y opacidad
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
    } as const,
  },
} as const as Variants;

// Variants para elementos flotantes en bucle
const floatVariants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      repeat: Infinity,
      repeatType: 'loop' as const,
      duration: 4,
      ease: 'easeInOut',
    },
  },
} as const as Variants;

const Hero: React.FC<HeroProps> = ({
  title = 'Learn 404',
  subtitle = '¡Domina las ultimas tecnologias aqui!',
  ctaText = 'Empezar ahora',
  onClickCTA,
}) => {
  return (
    <motion.section
      className="relative w-screen h-screen flex flex-col justify-center items-center bg-white px-6 text-center overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Círculos decorativos flotantes */}
      <motion.div
        className="absolute top-10 left-10 w-24 h-24 rounded-full bg-[#F8D7DA] opacity-50"
        variants={floatVariants}
        animate="animate"
      />
      <motion.div
        className="absolute top-20 right-16 w-32 h-32 rounded-full bg-[#FFAAA6] opacity-40"
        variants={floatVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-[#F28B82] opacity-60"
        variants={floatVariants}
        animate="animate"
      />

      {/* Título con efecto hover */}
      <motion.h1
        className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
      >
        {title}
      </motion.h1>

      {/* Subtítulo con ligero desplazamiento */}
      <motion.p
        className="text-lg sm:text-xl text-gray-700 mb-8"
        variants={itemVariants}
        whileHover={{ x: 10 }}
      >
        {subtitle}
      </motion.p>

      {/* Botón CTA con animaciones de hover y tap */}
      {ctaText && (
        <motion.button
          className="bg-[#F28B82] text-white font-semibold py-3 px-6 rounded-lg"
          onClick={onClickCTA}
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {ctaText}
        </motion.button>
      )}

      {/* Ola decorativa con movimiento ondulatorio */}
      <motion.div
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        animate={{ y: [10, 0, 10] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
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
