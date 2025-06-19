// NextButton.tsx

import React from 'react';
// Importamos solo el runtime de motion
import { motion } from 'framer-motion';
// Importamos el tipo Variants para TS, pero sin incluirlo en el bundle
import type { Variants } from 'framer-motion';

export interface NextButtonProps {
  onNext: () => void;   // Callback que avanza al siguiente slice de features
  isMobile: boolean;    // Para ajustar tamaño y comportamiento según pantalla
}

// Definimos las variantes de animación (solo para TS)
const buttonVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.5,        // Comienza pequeño y transparente
  },
  animate: {
    opacity: 1,
    scale: 1,          // Finaliza en tamaño normal
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 12,
    },
  },
};

const NextButton: React.FC<NextButtonProps> = ({ onNext, isMobile }) => {
  const size = isMobile ? 60 : 100;
  return (
<motion.button
  variants={buttonVariants}
  initial="initial"
  animate="animate"
  whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(255,255,255,0.5)' }}
  whileTap={{ scale: 0.9 }}
  onClick={onNext}
  style={{
    position: 'absolute',
    top: '38.2%',
    left: '41.7%',
    transform: 'translate(-50%, -50%)',
    width: size,
    height: size,
    borderRadius: '50%',
    border: 'none',
    // Gradiente del rojo coral suave al rojo claro elegante
    background: 'linear-gradient(135deg, #FFAAA6, #F28B82)',
    // Texto blanco puro para buen contraste
    color: '#FFFFFF',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: isMobile ? '1rem' : '1.25rem',
    fontWeight: 600,
    fontFamily: 'inherit',
    // Sutil sombra para dar profundidad
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  }}
>
      Next
    </motion.button>
  );
};


export default NextButton;
