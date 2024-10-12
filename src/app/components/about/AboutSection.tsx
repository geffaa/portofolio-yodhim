"use client"

import React, { Suspense, useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from '../components/3DModel';
import useGitHubLanguages from '@/app/hooks/useGithubLanguages';
import ProfessionalDescription from '../components/ProfessionalDescription';
import CameraAdjuster from '../components/CameraAdjuster';

interface ModelWrapperProps {
  scale?: [number, number, number];
}

const ModelWrapper: React.FC<ModelWrapperProps> = ({ scale = [1.5, 1.5, 1.5] }) => (
  <group position={[0, -3, 0]} scale={scale}>
    <Model url="/model/model2.glb" />
  </group>
);

const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const { languages, error, isLoading } = useGitHubLanguages('geffaa');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yModel = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yText = useTransform(scrollYProgress, [0, 1], [50, -50]);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <section id="about" className="min-h-screen bg-transparent z-30 text-white py-20">
      <div ref={containerRef} className="container mx-auto px-4">
        <motion.h2
          style={{ y }}
          className="text-4xl md:text-5xl font-bold mb-8 text-center text-[#E6F1FF]"
        >
          ABOUT ME
        </motion.h2>

        {/* Mobile layout */}
        <div className="md:hidden mb-8">
          <motion.div style={{ y: yModel }} className="w-full">
            <div style={{ height: '200px' }}>
              <Canvas style={{ width: '100%', height: '100%' }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={1} />
                  <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
                  <hemisphereLight color={'#ffffff'} groundColor={'#444444'} intensity={1} />
                  <spotLight position={[10, 15, 10]} angle={0.25} penumbra={1} intensity={2} />
                  <ModelWrapper scale={[1.6, 1.5, 1.6]} />
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 3}
                    autoRotate
                    autoRotateSpeed={0.5}
                  />
                  <CameraAdjuster />
                </Suspense>
              </Canvas>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row items-stretch justify-center space-y-8 md:space-y-0 md:space-x-12">
          <motion.div
            style={{ y: yModel }}
            className="hidden md:block md:w-2/3"
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
          <ProfessionalDescription
            yText={yText}
            languages={languages}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;