import React from 'react';
import Hero from './components/Hero'; // Ajuste de ruta: ahora busca Hero.tsx en la misma carpeta

function App() {
  return (
    <Hero
      title="Bienvenido a Lab 404"                          // Prop title obligatorio
      subtitle="Descubre nuestra colección de cursos"       // Opcional
      ctaText="¡Empezar ahora!"                             // Prop ctaText obligatorio
    />
  );
}

export default App;
