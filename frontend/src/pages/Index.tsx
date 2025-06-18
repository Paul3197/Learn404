import React, { useState } from 'react';
import SplashScreen from '../components/SplashScreen';
// import Navbar from '../components/Navbar;'
import Hero from '../components/Hero';
import Features from '../components/Features'

const Index: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />
  }

  return (
    <>
      {/* <Navbar /> */}
      <Hero onClickCTA={() => console.log('CTA clicked')} />
      <Features />
    </>
  );
};

export default Index;