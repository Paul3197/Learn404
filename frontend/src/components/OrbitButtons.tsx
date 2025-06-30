// OrbitButtons.tsx
// -------------------------------------------------------
// Componente que dibuja cuatro botones orbitando en torno a
// un botón central. Cada “órbita” muestra grupos de 4
// elementos de la constante `features`. Al pulsar el botón
// central se avanza al siguiente grupo y si el botón es
// "Internacionalización" muestra el modal de video.
// -------------------------------------------------------

import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import NextButton from './NextButton';
import { features } from './featuresData'; // 16 elementos { title, desc }
import FeatureVideoModal from './FeatureVideoModal';

// Tipado de cada elemento de features
interface Feature {
  title: string;
  desc: string;
}

// Cálculo del tamaño máximo de los botones
const getButtonSize = () => Math.min(window.innerWidth * 0.23, 200);

// ===========================================================
// Componente principal
// ===========================================================
const OrbitButtons: React.FC = () => {
  // Radio de la órbita (igual al tamaño del botón => círculos tangentes)
  const [radius, setRadius]         = useState<number>(getButtonSize());
  // Ángulo base en grados (animación continua)
  const [angle, setAngle]           = useState<number>(0);
  // Pausar / reanudar órbita cuando un botón se “hoverea”
  const [paused, setPaused]         = useState<boolean>(false);
  // Índice del elemento de features que es el primero del grupo actual
  const [groupStart, setGroupStart] = useState<number>(0);
  // Breakpoint para pantallas pequeñas (< 350 px)
  const [isSmallScreen, setIsSmall] = useState<boolean>(window.innerWidth < 350);

  // Estado para mostrar/ocultar el modal de video
  const [showVideo, setShowVideo] = useState(false);

  // ---------------------------------------------------------
  //  Actualiza radio y breakpoint cuando la ventana cambia
  // ---------------------------------------------------------
  useEffect(() => {
    const handleResize = () => {
      setRadius(getButtonSize());
      setIsSmall(window.innerWidth < 350);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ---------------------------------------------------------
  //  Animación de rotación continua (~60 FPS => 16 ms)
  // ---------------------------------------------------------
  useEffect(() => {
    if (paused) return;                       // Detener si está en hover
    const id = setInterval(() => setAngle(a => a + 1), 16);
    return () => clearInterval(id);           // Limpieza al desmontar
  }, [paused]);

  // ---------------------------------------------------------
  //  Calcula la posición (x, y) de un botón según índice
  // ---------------------------------------------------------
  const getPosition = useCallback(
    (index: number) => {
      // Cada botón se separa 90 ° ⇒ cuatro botones equidistantes
      const rad = ((angle + index * 90) * Math.PI) / 180;
      return {
        x: radius * Math.cos(rad),
        y: radius * Math.sin(rad),
      };
    },
    [angle, radius]
  );

  // ---------------------------------------------------------
  //  Avanzar al siguiente grupo de 4 elementos
  // ---------------------------------------------------------
  const handleNext = () => {
    setGroupStart(prev => (prev + 4) % features.length);
  };

  // ========================================================
  //  Render
  // ========================================================
  return (
    <>
      {/* Botones que orbitan */}
      {Array.from({ length: 4 }).map((_, i) => {
        // Elemento actual del array (cíclico)
        const feature: Feature = features[(groupStart + i) % features.length];
        // Pre-calcular posición para no recomputar dentro del hijo
        const pos = getPosition(i);

        // Si el botón es Internacionalización, al hacer click muestra el modal
        const isInternacionalizacion = feature.title === "Internacionalización";
        const handleClick = () => {
          if (isInternacionalizacion) setShowVideo(true);
        };

        return (
          <OrbitingButton
            key={i}
            feature={feature}
            pos={pos}
            size={getButtonSize()}
            isSmallScreen={isSmallScreen}
            // Delegamos el control de pausa al hijo
            onPause={() => setPaused(true)}
            onResume={() => setPaused(false)}
            onClick={isInternacionalizacion ? handleClick : undefined}
          />
        );
      })}

      {/* Botón central que cambia el grupo */}
      <NextButton onClick={handleNext} />

      {/* Modal para video de internacionalización */}
      <FeatureVideoModal open={showVideo} onClose={() => setShowVideo(false)} />
    </>
  );
};

// ===========================================================
//  Componente hijo: botón individual que orbita
// ===========================================================
interface OrbitingButtonProps {
  feature: Feature;                 // Datos (title + desc)
  pos: { x: number; y: number };    // Coordenadas animadas
  size: number;                     // Tamaño en px
  isSmallScreen: boolean;           // Breakpoint para descripción
  onPause: () => void;              // Pausa global
  onResume: () => void;             // Resume global
  onClick?: () => void;             // Nuevo: acción al hacer click (opcional)
}

const OrbitingButton: React.FC<OrbitingButtonProps> = ({
  feature,
  pos,
  size,
  isSmallScreen,
  onPause,
  onResume,
  onClick,
}) => {
  const titleFontSize = size * 0.13;   // 13% del diámetro del botón
  const descFontSize  = size * 0.08;   // 08% del diámetro del botón
  // Estados locales para efectos visuales
  const [isHovered, setHovered] = useState(false);
  const [isPressed, setPressed] = useState(false);

  // ---- Handlers de mouse ---------------------------------
  const handleMouseEnter = () => {
    setHovered(true);
    onPause();                 // Pausa órbita global
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setPressed(false);
    onResume();                // Reanuda órbita
  };

  const handleMouseDown = () => setPressed(true);
  const handleMouseUp   = () => setPressed(false);

  // ---- Determinar clase de fondo según estado -------------
  let bgClass = 'bg-[#FFAAA6]';
  if (isPressed)      bgClass = 'bg-[#F8D7DA]';
  else if (isHovered) bgClass = 'bg-[#F28B82]';

  // ---- Render del botón ----------------------------------
  return (
    <motion.button
      // Posición animada con spring
      animate={pos}
      transition={{ type: 'spring', stiffness: 100, damping: 10 }}
      // Eventos de interacción
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={onClick}
      // Estilos comunes
      className={`
        absolute
        flex flex-col items-center justify-center text-center
        rounded-full shadow-md text-white hover:cursor-pointer
        ${bgClass}
      `}
      style={{
        width: size,            // mismo ancho y alto
        height: size,
        // Garantiza que el texto se mantenga dentro
        padding: '0.5rem',
      }}
    >
      {/* Título (siempre visible), con tamaño dinámico y salto de línea automático */}
      <span
        className="
          font-semibold 
          leading-snug 
          break-words
          overflow-wrap-anywhere
        "
        style={{
          fontSize: `${titleFontSize}px`,
          margin: '2px',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
        }}
      >
        {feature.title}
      </span>

      {/* Descripción sólo en pantallas anchas, con tamaño dinámico */}
      {!isSmallScreen && (
        <span
          className='leading-tight'
          style={{ fontSize: `${descFontSize}px` }}
        >
          {feature.desc}
        </span>
      )}
    </motion.button>
  );
};

export default OrbitButtons;
