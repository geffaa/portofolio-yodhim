"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [text, setText] = useState("YG");
  const fullName = "YODHIMAS GEFFANANDA";
  const [particlesComplete, setParticlesComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 2;
    const interval = setInterval(() => {
      if (currentIndex <= fullName.length) {
        setText(fullName.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setParticlesComplete(true), 2000);
        setTimeout(onFinish, 4000);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0C1B] overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, filter: 'blur(10px)' }} // Efek blur saat exit
        transition={{ duration: 5 }}
      >
        <motion.div
          className="text-[#64FFDA] text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight relative"
          initial={{ scale: 1, y: 0 }}
          animate={{ 
            scale: text.length > 2 ? 1.5 : 1,
            y: text.length > 2 ? -40 : 0
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {text}
          <motion.div
            className="mt-4 text-[#64FFDA] text-xl md:text-2xl lg:text-3xl font-semibold flex items-center justify-center" // Teks "Portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: text.length === fullName.length ? 1 : 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            Portfolio
          </motion.div>
          <AnimatePresence>
            {particlesComplete && (
              <motion.div
                className="absolute inset-0 -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, filter: 'blur(10px)' }} // Blur partikel saat exit
                transition={{ duration: 1.5 }}
              >
                <Particles />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Particles = () => {
  return (
    <div className="absolute inset-0">
      {Array.from({ length: 50 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 bg-[#64FFDA] rounded-full"
          initial={{
            opacity: 0,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 2, 0],
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
      ))}
    </div>
  );
};

export default SplashScreen;
