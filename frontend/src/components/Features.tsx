// src/components/Features.tsx
import React, { useState, useEffect } from 'react'
import { motion, type Variants } from 'framer-motion'

// 1) Definición de las características a mostrar en los círculos
const features = [
  { title: 'Responsive', desc: 'Se adapta a cualquier pantalla.' },
  { title: 'Animaciones', desc: 'Interacciones suaves con Framer Motion.' },
  { title: 'Integración AWS', desc: 'Deploy en S3, CloudFront y Cognito.' },
  { title: 'Modularidad', desc: 'Componentes reutilizables y mantenibles.' },
  { title: 'Ultra rápido', desc: 'Rendimiento optimizado con Vite.' },
  { title: 'Dark Mode', desc: 'Cambio de tema oscuro y claro.' },
  { title: 'Accesibilidad', desc: 'Cumple WCAG y ARIA.' },
  { title: 'SEO Friendly', desc: 'Optimizado para buscadores.' },
  { title: 'TypeScript', desc: 'Tipos seguros y autocompletado.' },
  { title: 'Testing', desc: 'Configuración con Jest y React Testing Library.' },
]

// 2) Variantes para animación del contenedor (stagger de hijos)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.2 },
  },
}

// 3) Variantes para animación continua de rotación de los círculos
const floatVariants: Variants = {
  animate: {
    rotate: 360,
    transition: { repeat: Infinity, duration: 20, ease: 'linear' },
  },
}

const Features: React.FC = () => {
  // 4) Estado para controlar el índice de inicio de la vista de características
  const [start, setStart] = useState(0)
  const total = features.length

  // 5) Estado para detectar si la pantalla es menor a 430px
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 430 : true
  )

  // 6) Efecto para actualizar isMobile al redimensionar la ventana
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 430)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // 7) Seleccionar 4 características a mostrar a partir del índice 'start'
  const slice = Array.from({ length: 4 }, (_, i) => features[(start + i) % total])

  // 8) Mover al siguiente conjunto de características
  const handleNext = () => setStart((prev) => (prev + 4) % total)

  // 9) Clases condicionales basadas en el tamaño de pantalla
  const titleClass = isMobile
    ? 'text-3xl font-bold mb-12'                         // estilo original en mobile
    : 'text-3xl font-bold mb-12 transform translate-y-30' // estilo modificado en desktop

  const floatWrapperClass = isMobile
    ? 'absolute inset-0'                                  // estilo original en mobile
    : 'absolute inset-0 transform translate-y-10'         // estilo modificado en desktop

  // 9.1) Clases condicionales para el botón en desktop
  const buttonClass = isMobile
    ? 'w-28 h-28 bg-[#F28B82] text-white rounded-full shadow-lg flex items-center justify-center font-semibold'
    : 'w-28 h-28 bg-[#F28B82] text-white rounded-full shadow-lg flex items-center justify-center font-semibold transform translate-y-10'

  return (
    <motion.section
      id="características"
      className="relative w-screen h-screen flex flex-col items-center justify-center bg-white overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 10) Onda SVG animada: se mueve horizontalmente */}
      <motion.div
        className="absolute bottom-0 w-full overflow-hidden leading-[0]"
        animate={{ x: ['0%', '-10%', '0%'] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
      >
        <svg className="relative block w-full" viewBox="0 0 1440 320">
          <path
            d="M0,128L48,138.7C96,149,192,171,288,154.7C384,139,480,85,576,96C672,107,768,181,864,186.7C960,192,1056,128,1152,106.7C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="#F5F5F5"
          />
        </svg>
      </motion.div>

      {/* 11) Título de la sección */}
      <h2 className={titleClass}>Características</h2>

      {/* 12) Contenedor de los círculos y el botón */}
      <div
        className="relative mt-16"
        style={{
          '--circle-size': 'clamp(9rem, 15vw, 12rem)',
          '--orbit-radius': 'clamp(8rem, 20vw, 10rem)',
          width: 'calc(2 * var(--orbit-radius) + var(--circle-size))',
          height: 'calc(2 * var(--orbit-radius) + var(--circle-size))',
        } as React.CSSProperties}
      >
        {/* 13) Círculos flotantes con animación */}
        <motion.div className={floatWrapperClass} variants={floatVariants} animate="animate">
          {slice.map((feat, idx) => (
            <motion.div
              key={idx}
              className="absolute rounded-full bg-[#F8D7DA] flex items-center justify-center shadow-lg"
              style={{
                width: 'var(--circle-size)',
                height: 'var(--circle-size)',
                top: '50%',
                left: '50%',
                marginTop: `calc(-1 * var(--circle-size) / 2 + var(--orbit-radius) * cos(${(idx / 4) * 2 * Math.PI}rad))`,
                marginLeft: `calc(-1 * var(--circle-size) / 2 + var(--orbit-radius) * sin(${(idx / 4) * 2 * Math.PI}rad))`,
              }}
            >
              {/* 14) Contenido de cada círculo */}
              <div className="text-center px-4">
                <h3 className="font-semibold">{feat.title}</h3>
                <p className="text-sm">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 15) Botón "Siguiente" siempre centrado con clase condicional */}
        <motion.div className="absolute inset-0 flex items-center justify-center">
          <motion.button
            onClick={handleNext}
            className={buttonClass}
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Siguiente
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Features
