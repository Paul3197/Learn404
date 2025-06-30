// frontend/src/components/FeatureVideoModal.tsx

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface FeatureVideoModalProps {
  open: boolean;          // Controla si se muestra el modal
  onClose: () => void;    // Función para cerrarlo
}

/**
 * Carga dinámicamente el video correcto.
 * ➤ mobile: vertical
 * ➤ desktop: horizontal
 * Usamos `import()` para que Vite lo procese como asset.
 */
const getVideoSrc = async (): Promise<string> => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    || window.innerWidth < 600;

  const mod = isMobile
    ? await import('../assets/video-features/cambio-de-idioma-vertical.mp4')
    : await import('../assets/video-features/cambio-de-idioma-horizontal.mp4');

  return mod.default; // Vite exporta la URL en `default`
};

const FeatureVideoModal: React.FC<FeatureVideoModalProps> = ({ open, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Al abrir el modal, carga y reproduce el video
  useEffect(() => {
    if (!open || !videoRef.current) return;
    
    // Carga el archivo dinámicamente
    getVideoSrc().then(src => {
      const vid = videoRef.current!;
      vid.src = src;        // Asigna la ruta
      vid.currentTime = 0;  // Reinicia el video
      vid.play().catch(() => {
        // El autoplay puede fallar si no ha habido interacción
      });
    });
  }, [open]);

  // Permite cerrar el modal presionando ESC
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  // Cierra al hacer clic fuera del video
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
<AnimatePresence>
  {open && (
    <motion.div
      /* Overlay oscuro que cubre toda la pantalla */
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={handleOverlayClick}  /* Cierra modal si el usuario hace clic fuera del video */

      /* Estados para animaciones de entrada/salida */
      initial={{ opacity: 0 }}        /* Comienza totalmente transparente */
      animate={{ opacity: 1 }}        /* Se desvanece a fondo semitransparente */
      exit={{ opacity: 0, transition: { duration: 0.2 } }}  
      /* Al cerrar, se desvanece de nuevo en 0.2s */
    >
      <motion.div
        /* Contenedor del video (centrado) */
        className="relative w-full max-w-[90vw] max-h-[80vh] flex items-end"

        /* Define estado inicial antes de aparecer */
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        /* Estado final al mostrarse */
        animate={{ scale: 1, opacity: 1, y: 0 }}

        /* Animación de salida al cerrar */
        exit={{ scale: 0.9, opacity: 0, y: 50, transition: { duration: 0.2 } }}

        /* Transición tipo spring para efecto orgánico */
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
        /* stiffness: fuerza del resorte; damping: frena el rebote */ 
      >
        {/* Botón “×” para cerrar el modal manualmente */}
        <button
          onClick={onClose}
          aria-label="Cerrar video"
          className="
            absolute top-2 right-2 z-10
            bg-black/50 text-white rounded-full
            w-8 h-8 flex items-center justify-center
            hover:bg-black/80 transition
          "
        >
          &times;
        </button>

        {/* Reproductor de video */}
        <video
          ref={videoRef}
          controls
          className="rounded-xl w-[80vw] max-h-[70vh] bg-black shadow-lg"
        />
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

  );
};

export default FeatureVideoModal;
