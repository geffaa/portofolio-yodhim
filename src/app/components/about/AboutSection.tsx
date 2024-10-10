"use client"

import React, { Suspense, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from '../3DModel';

const skills = [
  { name: 'React', level: 90 },
  { name: 'Node.js', level: 85 },
  { name: 'TypeScript', level: 80 },
  { name: 'Python', level: 75 },
  { name: 'SQL', level: 85 },
];

const achievements = [
  { number: '50+', description: 'Projects Completed' },
  { number: '10+', description: 'Happy Clients' },
  { number: '5+', description: 'Years Experience' },
];

const CameraAdjuster = () => {
    const { camera } = useThree();
  
    useEffect(() => {
      // Adjust camera to be higher and look down
      camera.position.set(0, 3, 6); // Posisi kamera lebih tinggi
      camera.lookAt(0, 1, 0); // Arahkan kamera ke pusat model
      camera.updateProjectionMatrix();
    }, [camera]);
  
    return null;
  };
  
  const AboutSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerHeight, setContainerHeight] = useState(0);
  
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
      <section id="about" className="min-h-screen bg-gradient-to-b from-[#172A45] to-[#0D0C1B] text-white py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-8 text-center text-[#64FFDA]"
          >
            About Me
          </motion.h2>
          <div ref={containerRef} className="flex flex-col md:flex-row items-stretch justify-center space-y-8 md:space-y-0 md:space-x-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:w-1/3 h-full" 
              style={{ minHeight: '600px', height: `${containerHeight}px` }}
            >
              <Canvas style={{ width: '100%', height: '150%' }}>
                <Suspense fallback={null}>
                  {/* Adjusting the lighting to be brighter and softer */}
                  <ambientLight intensity={1} /> {/* Increase ambient light */}
                  <directionalLight 
                    position={[5, 10, 5]} 
                    intensity={1.5} 
                    castShadow 
                  /> {/* Add directional light from above */}
                  <hemisphereLight 
                    color={'#ffffff'} 
                    groundColor={'#444444'} 
                    intensity={1} 
                  /> {/* Extra light for top-down effect */}
                  <spotLight 
                    position={[10, 15, 10]} 
                    angle={0.25} 
                    penumbra={1} 
                    intensity={2} 
                  />
                  <Model url="/model/model2.glb" />
                  <OrbitControls 
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 3}
                  />
                  <CameraAdjuster />
                </Suspense>
              </Canvas>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="md:w-2/3"
            >
              <p className="text-lg mb-4">
                Hello! I'm Yodhimas Geffananda, a passionate developer with a keen interest in creating innovative solutions through code. My journey in the world of programming began [your background], and since then, I've been constantly learning and evolving in this ever-changing field.
              </p>
              <p className="text-lg mb-4">
                My expertise includes [your skills], and I'm always excited to take on new challenges that push my boundaries and allow me to grow as a developer.
              </p>
              <p className="text-lg mb-6">
                When I'm not coding, you can find me [your hobbies or interests]. I believe in the power of technology to make a positive impact, and I'm committed to contributing to that vision through my work.
              </p>
              
              <h3 className="text-2xl font-semibold mb-4 text-[#64FFDA]">Skills</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {skills.map((skill) => (
                  <div key={skill.name} className="bg-[#0A192F] p-3 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div className="bg-[#64FFDA] h-2.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
  
              <h3 className="text-2xl font-semibold mb-4 text-[#64FFDA]">Achievements</h3>
              <div className="flex justify-between mb-6">
                {achievements.map((achievement) => (
                  <div key={achievement.description} className="text-center">
                    <div className="text-3xl font-bold text-[#64FFDA]">{achievement.number}</div>
                    <div className="text-sm">{achievement.description}</div>
                  </div>
                ))}
              </div>
  
              <h3 className="text-2xl font-semibold mb-4 text-[#64FFDA]">Certifications</h3>
              <ul className="list-disc list-inside mb-6">
                <li>Certified React Developer</li>
                <li>AWS Certified Solutions Architect</li>
                <li>Google Analytics Individual Qualification</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    );
  };

export default AboutSection;