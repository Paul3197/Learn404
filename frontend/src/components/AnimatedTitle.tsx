// components/AnimatedTitle.tsx
import { motion } from 'framer-motion';
import React from 'react';

const AnimatedTitle: React.FC<{ text: string; className?: string; }> = ({ text }) => {
  return (
    <h2 className="text-3xl md:text-5xl font-bold text-center text-pink-600 mt-15 " >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{
            y: [0, -6, 0, 6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.1, // cada letra inicia con un pequeño retraso
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </h2>
  );
};

export default AnimatedTitle;
