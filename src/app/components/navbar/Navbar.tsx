"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['hero', 'about', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      } else if (window.scrollY < 50) {
        // If we're near the top of the page, set the hero section as active
        setActiveSection('hero');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
    setActiveSection('home');
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: sectionTop, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
    setActiveSection(sectionId);
  };

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  };

  const NavButton: React.FC<{ id: string, text: string }> = ({ id, text }) => (
    <button 
      onClick={() => scrollToSection(id)} 
      className={`text-lg font-medium transition-colors duration-300 ${
        activeSection === id ? 'text-[#64FFDA]' : 'text-[#CCD6F6] hover:text-[#64FFDA]'
      }`}
    >
      {text}
    </button>
  );

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
          <button onClick={scrollToTop} className="text-[#64FFDA] font-bold text-2xl">
            YG
          </button>
          <div className="hidden md:flex space-x-8">
            <NavButton id="hero" text="Home" />
            <NavButton id="about" text="About" />
            <NavButton id="projects" text="Projects" />
            <NavButton id="contact" text="Contact" />
          </div>
          <div className="hidden md:block">
            <a 
              href="/file/CV_Yodhimas-Geffananda.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-transparent border border-[#64FFDA] text-[#64FFDA] px-6 py-2 rounded hover:bg-[#64FFDA] hover:text-[#172A45] transition-colors text-lg font-medium"
            >
              Resume
            </a>
          </div>
          <button 
            className="md:hidden text-[#CCD6F6] focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 right-0 w-64 bg-[#172A45] shadow-lg z-50 md:hidden"
          >
            <div className="flex justify-end p-4">
              <button 
                className="text-[#CCD6F6] focus:outline-none"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col h-full justify-center items-center space-y-12">
              <NavButton id="home" text="Home" />
              <NavButton id="about" text="About" />
              <NavButton id="projects" text="Projects" />
              <NavButton id="contact" text="Contact" />
              <a 
                href="/file/CV_Yodhimas-Geffananda.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-transparent border border-[#64FFDA] text-[#64FFDA] px-6 py-2 rounded hover:bg-[#64FFDA] hover:text-[#172A45] transition-colors text-lg font-medium"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
