// featuresData.ts

// Definimos y exportamos el tipo Feature de forma centralizada
export interface Feature {
  /** Título breve de la característica */
  title: string;
  /** Descripción corta explicando la característica */
  desc: string;
}

// Array con las 16 características que usará el componente Features
export const features: Feature[] = [
  { title: 'Rendimiento rápido',         desc: 'Carga en menos de 1 segundo' },
  { title: 'Diseño responsivo',          desc: 'Se adapta a móvil, tablet y escritorio' },
  { title: 'Animaciones fluidas',        desc: 'Transiciones suaves con Framer Motion' },
  { title: 'Accesibilidad',              desc: 'Compatibilidad con lectores de pantalla' },
  { title: 'Internacionalización',       desc: 'Soporte fácil para varios idiomas' },
  { title: 'Temas personalizables',      desc: 'Cambio dinámico de colores y estilos' },
  { title: 'Gestión de estado',          desc: 'Centralizada con Zustand' },
  { title: 'Rutas dinámicas',            desc: 'Navegación flexible con React Router' },
  { title: 'Validaciones robustas',      desc: 'Forms seguros con React Hook Form' },
  { title: 'Consumo de APIs',            desc: 'Integración sencilla con Axios' },
  { title: 'Optimización SEO',           desc: 'URLs amigables y meta tags automáticas' },
  { title: 'Seguridad',                  desc: 'Autenticación y protección de rutas' },
  { title: 'Modo oscuro',                desc: 'Alterna entre theme light y dark' },
  { title: 'Modo offline',               desc: 'Funciona sin conexión con Service Worker' },
  { title: 'Componentes reutilizables',  desc: 'Modularidad y mantenibilidad' },
  { title: 'Deploy automatizado',        desc: 'CI/CD con GitHub Actions' },
];
