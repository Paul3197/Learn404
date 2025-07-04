// NextButton.tsx
// ---------------
// Este componente React representa el botón central de tu
// órbita de características.  Su responsabilidad es simple:
// mostrar el texto "Mas Características" y cambiar su color de
// fondo cuando el puntero lo presiona o lo mantiene encima.  
// Además, acepta un manejador onClick externo para que la lógica
// de paginación / rotación de características viva en un nivel
// superior.

import React, { useState } from 'react';

//--------------------------------------------------------------
// 1. Interfaz de las propiedades (props) que el componente acepta
//--------------------------------------------------------------
interface NextButtonProps {
  /**
   * Función que se ejecutará cuando el usuario haga clic.
   * La lógica de avanzar a las siguientes características se
   * define fuera de este componente para mantener la separación
   * de responsabilidades.
   */
  onClick: () => void;

  /**
   * Clases Tailwind opcionales que quieras inyectar desde arriba
   * para customizar estilos sin tocar el componente.
   */
  className?: string;
}

//--------------------------------------------------------------
// 2. Componente funcional
//--------------------------------------------------------------
/**
 * Botón central reutilizable y completamente estilizado.
 * - Cambia de color al pasar el ratón (hover) y al presionar.
 * - Mantiene su forma circular y tamaño responsivo.
 * - Permite clases extra a través de la prop `className`.
 */
const NextButton: React.FC<NextButtonProps> = ({ onClick, className = '' }) => {
  //----------------------------------------------------------
  // 2.1. Estado interno para hover y press
  //----------------------------------------------------------
  const [isPressed, setIsPressed] = useState(false);   // ¿Está presionado?
  const [isHovered, setIsHovered] = useState(false);   // ¿Está en hover?

  //----------------------------------------------------------
  // 2.2. Manejadores de eventos de ratón
  //----------------------------------------------------------
  const handleMouseDown = () => setIsPressed(true);     // Presionado → true
  const handleMouseUp = () => setIsPressed(false);      // Suelto → false
  const handleMouseEnter = () => setIsHovered(true);    // Hover → true
  const handleMouseLeave = () => {                     // Sale del botón
    setIsHovered(false);
    setIsPressed(false);   // Reset por si el usuario suelta fuera
  };

  //----------------------------------------------------------
  // 2.3. Lógica que decide el color de fondo (Tailwind bg-*)
  //----------------------------------------------------------
  let bgClass = 'bg-[#FFAAA6]';        // Estado base
  if (isPressed) bgClass = 'bg-[#F8D7DA]';  // Presionado → gris más claro
  else if (isHovered) bgClass = 'bg-[#F28B82]'; // Hover → gris más oscuro

  //----------------------------------------------------------
  // 2.4. Renderizado
  //----------------------------------------------------------
  return (
    <button
      type="button"           /* Buen hábito: especificar el tipo */
      onClick={onClick}        /* Delegamos la acción al padre */
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        /* Posicionamiento absoluto para centrar en la pantalla */
        absolute left-50vw top-50vw 
        /* Flexbox → centra el texto dentro del círculo */
        flex items-center justify-center
        /* Tamaño responsivo: 23% del ancho de la ventana */
        w-[20vw] h-[20vw]
        /* Límite máximo para pantallas grandes */
        max-w-[200px] max-h-[200px]

        /* --- Claves para que el texto NO se salga --- */
        whitespace-normal        /* Permite saltos de línea */
        break-words              /* Rompe palabras largas */
        overflow-hidden          /* Oculta cualquier rebalse minúsculo */
        leading-snug             /* Ajuste vertical del interlineado */
        text-[clamp(0.75rem,3.5vw,1.1rem)] /* Fuente fluida */
        
        /* Estética */
        rounded-full text-gray-800 shadow-md cursor-pointer
        
        /* Transición suave del color de fondo */
        transition-colors duration-200
        
        /* Color dinámico calculado arriba */
        ${bgClass}
        
        /* Clases extra proporcionadas desde fuera */
        ${className}
        
      `}
    >
      {/* Texto visible dentro del botón */}
      Más Características
    </button>
  );
};

export default NextButton;
