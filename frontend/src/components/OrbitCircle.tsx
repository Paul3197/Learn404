import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { Feature } from './featuresData';

export interface OrbitCircleProps {
  feat: Feature;
  idx: number;
  total: number;
  radius: number;
  size: number;
  isMobile: boolean;
  onSelect: (feat: Feature) => void;
}

const counterVariants: Variants = {
  animate: {
    rotate: -360,
    transition: { repeat: Infinity, duration: 20, ease: 'linear' },
  },
};

const OrbitCircle: React.FC<OrbitCircleProps> = ({
  feat,
  idx,
  total,
  radius,
  size,
  isMobile,
  onSelect,
}) => {
  const adjustedRadius = radius;
  const adjustedSize = size;
  const angle = (idx / total) * Math.PI * 2;
  const x = Math.cos(angle) * adjustedRadius;
  const y = Math.sin(angle) * adjustedRadius;
  const bounce = adjustedSize * (isMobile ? 0.1 : 0.15);

  return (
<motion.button
  initial={{ opacity: 0, scale: 0.8, y: 0 }}
  animate={{ opacity: 1, scale: 1, y: -bounce }}
  transition={{
    type: 'spring',
    stiffness: 100,
    damping: 10,
    repeat: Infinity,
    repeatType: 'reverse',
    duration: isMobile ? 4 : 6,
  }}
  whileHover={{ scale: 1.1, y: -bounce / 2 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => onSelect(feat)}
  style={{
    position: 'absolute',
    top: `calc(50% + ${y}px - ${adjustedSize / 2}px)`,
    left: `calc(50% + ${x}px - ${adjustedSize / 2}px)`,
    width: adjustedSize,
    height: adjustedSize,
    borderRadius: '50%',
    // Usamos el mismo rojo claro elegante de Hero
    border: '2px solid #F28B82',
    // Gradiente entre rosa pastel suave y rojo coral suave
    background: 'linear-gradient(135deg, #F8D7DA, #FFAAA6)',
    // Texto en gris oscuro (text-gray-900)
    color: '#111827',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem',
    cursor: 'pointer',
    overflow: 'hidden',
  }}
>
      <motion.div
        variants={counterVariants}
        animate="animate"
        style={{ width: '90%', height: '90%' }}
      >
        <h4
          style={{
            fontSize: `${adjustedSize * 0.10}px`,
            lineHeight: 2,
            margin: 0,
            textAlign: 'center',
            padding: '2px 5px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
          }}
        >
          {feat.title}
        </h4>
        <p
          style={{
            fontSize: `${adjustedSize * 0.07}px`,
            margin: '4px',
            textAlign: 'center',
            padding: '4px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
          }}
        >
          {feat.desc}
        </p>
      </motion.div>
    </motion.button>
  );
};

export default OrbitCircle;