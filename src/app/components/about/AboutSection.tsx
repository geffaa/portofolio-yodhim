"use client"

import React, { Suspense, useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from '../components/3DModel';
import useGitHubLanguages from '@/app/hooks/useGithubLanguages';
import ProfessionalDescription from '../components/ProfessionalDescription';
import { FaGithub } from 'react-icons/fa';

const CameraAdjuster = () => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 2, 4);
    camera.lookAt(0, 1, 0);
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
};

const ModelWrapper = () => {
  return (
    <group position={[0, -3, 0]} scale={[1.5, 1.5, 1.5]}>
      <Model url="/model/model2.glb" />
    </group>
  );
};

const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const { languages } = useGitHubLanguages('geffaa');
  const [error] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  // const yModel = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yText = useTransform(scrollYProgress, [0, 1], [50, -50]);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };

    updateHeight();
    setIsLoading(false);
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const renderSkills = () => {
    if (isLoading) return <p>Loading skills...</p>;
    if (error) return <p>Error loading skills: {error}</p>;
    if (!languages || languages.length === 0) return <p>No language data available</p>;
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {languages.map((lang, index) => (
            <motion.div 
              key={lang.name}
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#0A192F] p-3 rounded-lg"
            >
              <div className="flex justify-between mb-1">
                <span>{lang.name}</span>
                <span>{lang.percentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <motion.div 
                  className="bg-[#64FFDA] h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.percentage}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.a
          href="https://github.com/geffaa"  // Ganti dengan URL profil GitHub Anda
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 bg-[#0A192F] p-3 rounded-lg text-[#64FFDA] hover:bg-[#112240] transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGithub className="text-xl" />
          <span>View GitHub Profile</span>
        </motion.a>
      </div>
    );
  };

  return (
    <section id="about" className="min-h-screen bg-transparent z-30 text-white py-20">
      <div ref={containerRef} className="container mx-auto px-4">
        <motion.h2 
          style={{ y }}
          className="text-4xl md:text-5xl font-bold mb-8 text-center text-[#E6F1FF]"
        >
          ABOUT ME
        </motion.h2>
        <div className="flex flex-col md:flex-row items-stretch justify-center space-y-8 md:space-y-0 md:space-x-12">
          <motion.div 
            style={{ y: yText }}
            className="md:w-2/3"
          >
            <div style={{ minHeight: '700px', height: `${containerHeight}px` }}>
              <Canvas style={{ width: '100%', height: '100%' }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={1} />
                  <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
                  <hemisphereLight color={'#ffffff'} groundColor={'#444444'} intensity={1} />
                  <spotLight position={[10, 15, 10]} angle={0.25} penumbra={1} intensity={2} />
                  <ModelWrapper />
                  <OrbitControls 
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 3}
                  />
                  <CameraAdjuster />
                </Suspense>
              </Canvas>
            </div>
          </motion.div>
          <ProfessionalDescription yText={yText} renderSkills={renderSkills} />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;