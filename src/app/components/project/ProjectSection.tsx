"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '../../lib/data/projects';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredProjects = projects.slice(0, 3);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProjects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + featuredProjects.length) % featuredProjects.length);
  };

  const projectCardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } }
  };

  return (
    <section id="projects" className="relative w-full min-h-screen bg-transparent text-white overflow-hidden py-20">
      <motion.div 
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-extrabold text-[#64FFDA] mb-12 text-center">
          Featured Projects
        </h2>
        
        <div className="relative bg-[#112240] rounded-lg overflow-hidden shadow-2xl mb-16" style={{ height: '600px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={featuredProjects[currentIndex].id}
              variants={projectCardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0"
            >
              <Image
                src={featuredProjects[currentIndex].imageUrl}
                alt={featuredProjects[currentIndex].title}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-3xl font-bold mb-2">{featuredProjects[currentIndex].title}</h3>
                <p className="text-lg mb-4">{featuredProjects[currentIndex].shortDescription}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredProjects[currentIndex].technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-[#64FFDA] text-[#0A192F] px-2 py-1 rounded-md text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Link href={`/projects/${featuredProjects[currentIndex].id}`} className="inline-block bg-[#64FFDA] text-[#0A192F] px-4 py-2 rounded-md font-medium hover:bg-opacity-80 transition-colors">
                  View Details
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <NavigationButton direction="left" onClick={prevProject} />
          <NavigationButton direction="right" onClick={nextProject} />
        </div>

        <div className="text-center">
          <a href="/projects" className="inline-block bg-[#64FFDA] text-[#0A192F] px-6 py-3 rounded-md font-semibold hover:bg-opacity-80 transition-colors">
            View All Projects
          </a>
        </div>
      </motion.div>
    </section>
  );
};

interface NavigationButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ direction, onClick }) => (
  <motion.button
    className={`absolute ${direction === 'left' ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 p-2 rounded-full`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
  >
    {direction === 'left' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
  </motion.button>
);

export default ProjectSection;