import React, { useState } from 'react';
import SplashScreen from '../components/SplashScreen';
import Hero from '../components/Hero';

const Index: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <Hero onClickCTA={() => console.log('CTA clicked')} />
      )}
    </>
  );
};

export default Index;