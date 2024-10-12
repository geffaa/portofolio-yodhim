"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { projects } from '@/app/lib/data/projects';

const AllProjects: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-transparent min-h-screen py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Link href="/" className="inline-flex items-center text-[#64FFDA] hover:underline group">
            <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
            Back to Home
          </Link>
        </motion.div>
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-bold text-[#CCD6F6] mb-12 text-center"
        >
          My Projects
        </motion.h1>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              className="bg-[#233554] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
            >
              <div className="relative h-48 group">
                <Image 
                  src={project.imageUrl} 
                  alt={project.title} 
                  fill 
                  style={{ objectFit: "cover" }} 
                  loading="lazy" // Tambahkan lazy loading
                />
                <div className="absolute inset-0 bg-[#64FFDA] bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link href={`/projects/${project.id}`} className="bg-[#0A192F] text-[#64FFDA] px-4 py-2 rounded-md font-semibold hover:bg-opacity-90 transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h2 className="text-2xl font-bold text-[#E6F1FF] mb-2">{project.title}</h2>
                <p className="text-[#8892B0] mb-4 flex-grow">{project.role}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-[#112240] text-[#64FFDA] px-2 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Link href={`/projects/${project.id}`} className="text-[#64FFDA] hover:underline">
                    Learn more
                  </Link>
                  <div className="flex space-x-4">
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="text-[#CCD6F6] hover:text-[#64FFDA] transition-colors">
                      <ExternalLink size={20} />
                    </a>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[#CCD6F6] hover:text-[#64FFDA] transition-colors">
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AllProjects;