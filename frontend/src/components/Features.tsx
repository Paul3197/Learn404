// Features.tsx
import React, { useState, useEffect } from 'react';
import OrbitCircle from './OrbitCircle';
import type { Feature } from './featuresData';
import NextButton from './NextButton';
// Aquí importas tu array de características (cada una con title y desc)
import { features } from './featuresData';

const PAGE_SIZE = 4;      // Cuántos círculos mostrar por “página”
const ORBIT_RADIUS = 120; // Radio de la órbita (px)
const CIRCLE_SIZE = 140;   // Diámetro de cada círculo (px)

const Features: React.FC = () => {
  // --- Estado para paginación ---
  // 'start' es el índice inicial dentro de 'features' para el slice actual
  const [start, setStart] = useState(0);

  // --- Estado para responsive ---
  // 'isMobile' será true si la pantalla es menor a 1100px
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 1100
  );

  // Efecto que escucha cambios de tamaño de ventana y actualiza 'isMobile'
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1100);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Slice de features que muestra solamente PAGE_SIZE elementos
  const currentFeatures = features.slice(
    start,
    start + PAGE_SIZE
  );

  // Avanza al siguiente grupo de PAGE_SIZE; vuelve a 0 al llegar al final
  const handleNext = () => {
    setStart(prev => {
      const next = prev + PAGE_SIZE;
      return next >= features.length ? 0 : next;
    });
  };

  // Callback cuando un OrbitCircle es clickeado
  const handleSelect = (feat: Feature) => {
    // Aquí podrías disparar tu animación o mostrar un modal, por ejemplo
    console.log('Feature seleccionada:', feat.title);
  };

  return (
    <section>
      {/* Título principal */}
      <h2
        style={{
        fontSize: isMobile ? '1.75rem' : '2.5rem',
        textAlign: 'center',
        color: 'var(--accent-color)',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        margin: '1.5rem 0',
        fontFamily: 'inherit',
        textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
        }}
      >
      Características
      </h2>

      {/* Onda SVG decorativa */}
      <div className="wave-container">
        {/* INSERTA AQUÍ TU SVG */}
      </div>

      {/* Contenedor de los círculos en posición relativa */}
      <div
        style={{
          position: 'relative',
          width: isMobile ? '100vw' : '600px',
          height: isMobile ? '100vw' : '600px',
          margin: '0 auto',
        }}
      >
        {currentFeatures.map((feat, idx) => (
          <OrbitCircle
            key={feat.title}
            feat={feat}
            idx={idx}
            total={currentFeatures.length}
            radius={ORBIT_RADIUS}
            size={CIRCLE_SIZE}
            isMobile={isMobile}
            onSelect={handleSelect}
          />
        ))}

        {/* Botón central para ir a la siguiente “página” de features */}
        <NextButton onNext={handleNext} isMobile={isMobile} />
      </div>
    </section>
  );
};

export default Features;
