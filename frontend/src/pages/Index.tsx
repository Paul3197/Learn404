import React, { useState } from 'react';
import SplashScreen from '../components/SplashScreen';
// import Navbar from '../components/Navbar;'
import Hero from '../components/Hero';
import AnimatedTitle from '../components/AnimatedTitle';
import OrbitButtons from '../components/OrbitButtons'

const Index: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />
  }

  return (
    <>
      <Hero onClickCTA={() => console.log('CTA clicked')} />
      <AnimatedTitle text='Caracteristicas' />
        <div className="relative w-screen h-screen flex flex-col justify-center items-center mb-[-15]" >
          <OrbitButtons />
        </div>
    </>
  );
};

export default Index;