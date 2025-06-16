import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onClickCTA?: () => void;
}

const Hero: React.FC<HeroProps> = ({
  title = 'Lab 404',
  subtitle = 'Descubre nuestra exclusiva colección de productos',
  ctaText = 'Explorar ahora',
  onClickCTA,
}) => {
  return (
    <section className="bg-[#FFFFFF] min-h-screen flex items-center justify-center py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Título principal con transición */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold text-[#F28B82] mb-6"
        >
          {title}
        </motion.h1>

        {/* Subtítulo secundario con transición suave */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 mb-8"
        >
          {subtitle}
        </motion.p>

        {/* Botón con interacción dinámica y transición */}
        <motion.button
          initial={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={onClickCTA}
          className="bg-[#F28B82] text-[#FFFFFF] font-semibold py-3 px-8 rounded-xl shadow-lg hover:bg-[#FFAAA6] transition-colors duration-300"
        >
          {ctaText}
        </motion.button>

        {/* Sección informativa o testimonial */}
        <div className="mt-10 bg-[#F8D7DA] py-6 px-4 rounded-lg shadow-sm">
          <p className="text-[#333333] italic">
            Explora las últimas tendencias y encuentra tu próximo producto favorito.
          </p>
        </div>
      </div>

      {/* Detalle decorativo minimalista */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-current text-[#FFAAA6]"
        >
          <path d="M0,160L1440,32L1440,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;