// src/components/SplashScreen.tsx
import React, { useEffect, useState } from 'react';
import loaderGif from '../assets/loader.gif';  // ← IMPORTA AQUÍ

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const command = 'npm run dev';
  const [typed, setTyped] = useState('');
  const [stage, setStage] = useState<'typing' | 'loading'>('typing');

  useEffect(() => {
    if (stage !== 'typing') return;
    let i = 0;
    const iv = setInterval(() => {
      const char = command[i];
      if (char !== undefined) {
        setTyped(prev => prev + char);
      }
      i++;
      if (i === command.length) {
        clearInterval(iv);
        setStage('loading');
      }
    }, 100);
    return () => clearInterval(iv);
  }, [stage, command]);

  useEffect(() => {
    if (stage !== 'loading') return;
    const to = setTimeout(onFinish, 2000);
    return () => clearTimeout(to);
  }, [stage, onFinish]);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <h1 className="font-mono text-red-400 text-lg mb-4">
        {typed}
        {stage === 'typing' && <span className="blink">|</span>}
      </h1>
      {stage === 'loading' && (
        // USA loaderGif, no ruta estática
        <img src={loaderGif} alt="Cargando..." className="w-16 h-16" />
      )}
    </div>
  );
};

export default SplashScreen;
