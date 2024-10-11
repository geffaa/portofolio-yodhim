"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) {
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: sectionTop, behavior: 'smooth' });
    }
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center ${isScrolled ? 'mt-4' : 'mt-4'}`}>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`transition-all duration-300 ${
          isScrolled 
            ? 'w-11/12 md:w-5/6 lg:w-3/4 xl:w-2/3 bg-[#172A45]/90 shadow-lg rounded-full'
            : 'w-full bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={scrollToTop} className="text-[#64FFDA] font-bold text-xl">
            YG
          </button>
          <div className="hidden md:flex space-x-4">
            <button onClick={scrollToTop} className="text-[#CCD6F6] hover:text-[#64FFDA] transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('#about')} className="text-[#CCD6F6] hover:text-[#64FFDA] transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection('#projects')} className="text-[#CCD6F6] hover:text-[#64FFDA] transition-colors">
              Projects
            </button>
            <button onClick={() => scrollToSection('#contact')} className="text-[#CCD6F6] hover:text-[#64FFDA] transition-colors">
              Contact
            </button>
          </div>
          <div className="hidden md:block">
            <a 
              href="/file/CV_Yodhimas-Geffananda.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-transparent border border-[#64FFDA] text-[#64FFDA] px-4 py-2 rounded hover:bg-[#64FFDA] hover:text-[#172A45] transition-colors"
            >
              Resume
            </a>
          </div>
          <button className="md:hidden text-[#CCD6F6]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;