"use client"

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Footer, HeroSection } from './components';
import AboutSection from './components/about';
import DynamicTechStackShowcase from './components/components/InteractiveTechStack';
import ProjectSection from './components/project/ProjectSection';
import ContactSection from './components/contact';
import SplashScreen from './components/splash/SplashScreen';

const MainPage: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scrolling when splash screen is shown
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showSplash]);

  const handleSplashFinish = () => {
    setShowSplash(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onFinish={handleSplashFinish} />
        )}
      </AnimatePresence>
      <motion.div 
        className="relative z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 4 }}
      >
        <div ref={heroRef}>
          <HeroSection />
        </div>
        <DynamicTechStackShowcase />
        <AboutSection />
        <ProjectSection />
        <ContactSection />
        <Footer />
      </motion.div>
    </>
  );
};

export default MainPage;