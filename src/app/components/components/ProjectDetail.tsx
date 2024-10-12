"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { projects } from '@/app/lib/data/projects';

interface ProjectDetailProps {
  id: string;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ id }) => {
  const project = projects.find(p => p.id === Number(id));

  if (!project) return <div>Project not found</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-transparent min-h-screen py-20 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Link href="/projects" className="inline-flex items-center text-[#64FFDA] hover:underline group">
            <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
            Back to All Projects
          </Link>
        </motion.div>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-[#233554] rounded-lg overflow-hidden shadow-xl"
        >
          <div className="relative h-64 md:h-96">
            <Image src={project.imageUrl} alt={project.title} fill style={{objectFit: "cover"}} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#233554] to-transparent"></div>
          </div>
          <div className="p-8">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-bold text-[#E6F1FF] mb-4"
            >
              {project.title}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-[#8892B0] mb-6"
            >
              {project.longDescription}
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-xl font-bold text-[#64FFDA] mb-2">Technologies Used</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="bg-[#112240] text-[#64FFDA] px-3 py-1 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="text-xl font-bold text-[#64FFDA] mb-2">Project Story</h2>
              <p className="text-[#8892B0] mb-6">{project.story}</p>
            </motion.div>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-xl font-bold text-[#64FFDA] mb-2">Challenges Faced</h2>
              <p className="text-[#8892B0] mb-6">{project.challenges}</p>
            </motion.div>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex justify-between items-center"
            >
              <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-[#64FFDA] text-[#0A192F] px-6 py-3 rounded-md font-semibold hover:bg-opacity-80 transition-colors">
                View Live Project
                <ExternalLink size={18} className="ml-2" />
              </a>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-[#8892B0] text-white px-6 py-3 rounded-md font-semibold hover:bg-opacity-80 transition-colors">
                View on GitHub
                <Github size={18} className="ml-2" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};