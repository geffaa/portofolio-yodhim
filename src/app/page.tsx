"use client"

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Footer, HeroSection, ProfessionalTechStackShowcase } from './components';
import AboutSection from './components/about';
import ProjectSection from './components/project/ProjectSection';
import ContactSection from './components/contact';
import SplashScreen from './components/splash/SplashScreen';

const SPLASH_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

const MainPage: React.FC = () => {
  const [showSplash, setShowSplash] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lastSplashTime = localStorage.getItem('lastSplashTime');
      const currentTime = new Date().getTime();

      if (!lastSplashTime || currentTime - Number(lastSplashTime) > SPLASH_INTERVAL) {
        setShowSplash(true);
        localStorage.setItem('lastSplashTime', currentTime.toString());
      } else {
        setShowSplash(false);
        setContentLoaded(true);
      }
    }
  }, []);

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showSplash]);

  const handleSplashFinish = () => {
    setShowSplash(false);
    setContentLoaded(true);
    
    window.scrollTo(0, 0);
    if (heroRef.current) {
      heroRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  };

  useEffect(() => {
    if (contentLoaded && mainContentRef.current) {
      mainContentRef.current.style.height = 'auto';
      mainContentRef.current.style.overflow = 'visible';
      
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
  }, [contentLoaded]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen onFinish={handleSplashFinish} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {contentLoaded && (
          <motion.div 
            ref={mainContentRef}
            className="relative z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div ref={heroRef}>
              <HeroSection />
            </div>
            <ProfessionalTechStackShowcase />
            <AboutSection />
            <ProjectSection />
            <ContactSection />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MainPage;