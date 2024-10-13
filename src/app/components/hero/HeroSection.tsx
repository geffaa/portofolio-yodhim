"use client"

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yHi = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yName = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const ySlogan = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yButton = useTransform(scrollYProgress, [0, 1], [0, -200]);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    });
  }, [controls]);

  return (
    <section id='hero' ref={containerRef} className="relative w-screen h-screen overflow-hidden bg-transparent">
      <div className="relative z-10 flex items-center justify-center w-full h-full text-white">
        <div className="text-center px-4">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            style={{ y: yHi }}
            className="text-xl md:text-2xl mb-2 text-[#64FFDA]"
          >
            Hi, I&apos;m
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            style={{ y: yName }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
          >
            YODHIMAS GEFFANANDA
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            style={{ y: ySlogan }}
            className="text-2xl md:text-3xl lg:text-5xl font-light tracking-widest mb-8 text-[#b0b6ca]"
          >
            INNOVATING THROUGH CODE
          </motion.p>
          <Link href="/timeline-game" passHref legacyBehavior>
            <motion.a 
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              style={{ y: yButton }}
              className="bg-transparent border-2 border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA] hover:text-[#0D0C1B] font-bold py-2 px-6 rounded transition duration-300 inline-block cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore My Journey
            </motion.a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;