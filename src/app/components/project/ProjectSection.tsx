"use client"

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { projects, Project } from '../../lib/data/projects';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const ProjectSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current!.offsetLeft);
    setScrollLeft(scrollRef.current!.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current!.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    scrollRef.current!.scrollLeft = scrollLeft - walk;
  };

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
  };

  const mainCardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
  };

  const projectCardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  return (
    <section id='projects' className="bg-transparent z-30 py-20 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
      >
        <h2 className="text-4xl font-extrabold text-[#64FFDA] mb-12 text-center">
          Featured Projects
        </h2>
        
        <div className="relative bg-[#112240] rounded-lg overflow-hidden shadow-2xl mb-16" style={{ height: '600px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProject.id}
              variants={mainCardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0"
            >
              <Image
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-3xl font-bold mb-2">{selectedProject.title}</h3>
                <p className="text-lg mb-4">{selectedProject.shortDescription}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-[#64FFDA] text-[#0A192F] px-2 py-1 rounded-md text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#64FFDA] text-[#0A192F] px-4 py-2 rounded-md font-medium hover:bg-opacity-80 transition-colors"
                    onClick={() => openProjectDetails(selectedProject)}
                  >
                    View Details
                  </motion.button>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#8892B0] text-white px-4 py-2 rounded-md font-medium hover:bg-opacity-80 transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <h3 className="text-2xl font-bold text-[#64FFDA] mb-6">All Projects</h3>
        <div className="relative overflow-hidden">
          <motion.div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <motion.div className="flex space-x-6">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  className="flex-shrink-0 w-72 bg-[#1D3461] rounded-lg overflow-hidden shadow-md cursor-pointer"
                  variants={projectCardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  onClick={() => openProjectDetails(project)}
                >
                  <div className="relative h-40">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-[#64FFDA] mb-2">{project.title}</h3>
                    <p className="text-[#8892B0] mb-4 line-clamp-2">{project.shortDescription}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-[#0A192F] to-transparent pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-4 bg-gradient-to-l from-[#0A192F] to-transparent pointer-events-none" />
        </div>
      </motion.div>

      <AnimatePresence>
        {isDetailOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsDetailOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#112240] rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 text-[#64FFDA]"
                onClick={() => setIsDetailOpen(false)}
              >
                <X size={24} />
              </motion.button>
              <h2 className="text-3xl font-bold text-[#64FFDA] mb-4">{selectedProject.title}</h2>
              <Image
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                width={600}
                height={300}
                objectFit="cover"
                className="rounded-lg mb-4"
              />
              <p className="text-[#8892B0] mb-4">{selectedProject.longDescription}</p>
              <h3 className="text-xl font-bold text-[#64FFDA] mb-2">Technologies Used</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-[#233554] text-[#64FFDA] px-2 py-1 rounded-md text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-bold text-[#64FFDA] mb-2">Project Story</h3>
              <p className="text-[#8892B0] mb-4">{selectedProject.story}</p>
              <h3 className="text-xl font-bold text-[#64FFDA] mb-2">Challenges Faced</h3>
              <p className="text-[#8892B0] mb-4">{selectedProject.challenges}</p>
              <div className="flex justify-between mt-6">
                <a
                  href={selectedProject.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#64FFDA] text-[#0A192F] px-4 py-2 rounded-md font-medium hover:bg-opacity-80 transition-colors"
                >
                  View Live Project
                </a>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#8892B0] text-white px-4 py-2 rounded-md font-medium hover:bg-opacity-80 transition-colors"
                >
                  View on GitHub
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectSection;