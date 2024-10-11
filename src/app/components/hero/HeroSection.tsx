"use client"

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yHi = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yName = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const ySlogan = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yButton = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section id='hero' ref={containerRef}>
      <div className="relative w-screen h-screen overflow-hidden bg-transparent z-30">
        <div className="relative z-10 flex items-center justify-center w-full h-full text-white">
          <div className="text-center px-4">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              style={{ y: yHi }}
              className="text-xl md:text-2xl mb-2 text-[#64FFDA]"
            >
              Hi, I'm
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              style={{ y: yName }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
            >
              YODHIMAS GEFFANANDA
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              style={{ y: ySlogan }}
              className="text-2xl md:text-3xl lg:text-5xl font-light tracking-widest mb-8 text-[#b0b6ca]"
            >
              INNOVATING THROUGH CODE
            </motion.p>
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              style={{ y: yButton }}
              className="bg-transparent border-2 border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA] hover:text-[#0D0C1B] font-bold py-2 px-6 rounded transition duration-300"
            >
              View My Projects
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;