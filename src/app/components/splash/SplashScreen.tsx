"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onFinish: () => void;
}

const words = [
  "WELCOME!",
  "YODHIMAS PORTFOLIO",
  "ANALYTICAL, INNOVATIVE, RESILIENT",
  "ENJOY!"
];

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1);
      } else {
        setTimeout(onFinish, 2000);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [currentWordIndex, onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0C1B] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatedBackground />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWordIndex}
          className="absolute text-[#64FFDA] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-center whitespace-nowrap"
          initial={{ opacity: 0, x: '-100%', y: '100%' }}
          animate={{ opacity: 1, x: '0%', y: '0%' }}
          exit={{ opacity: 0, x: '100%', y: '-100%' }}
          transition={{ 
            type: "spring", 
            stiffness: 70,
            damping: 20,
            duration: 0.7
          }}
        >
          {words[currentWordIndex]}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const AnimatedBackground: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="absolute inset-0 opacity-20">
      {Array.from({ length: 20 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute bg-[#64FFDA] rounded-full"
          style={{
            width: Math.random() * 20 + 5,
            height: Math.random() * 20 + 5,
          }}
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            scale: 0,
          }}
          animate={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

export default SplashScreen;