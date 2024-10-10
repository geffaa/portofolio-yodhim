"use client"

import React, { useEffect, useRef } from 'react';
import * as THREE from "three";
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    const updateSize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 175; // Reduced count for better performance
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    const colors = [
      new THREE.Color("#cbfff3"),
      new THREE.Color("#8892B0"),
      new THREE.Color("#CCD6F6"),
    ];

    for (let i = 0; i < particlesCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = Math.random() * 4 + 1;
      
      posArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i * 3 + 2] = radius * Math.cos(phi);

      const color = colors[Math.floor(Math.random() * colors.length)];
      colorArray[i * 3] = color.r;
      colorArray[i * 3 + 1] = color.g;
      colorArray[i * 3 + 2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      vertexColors: true,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lines
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x64FFDA, 
      transparent: true, 
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
    });
    const lineGeometry = new THREE.BufferGeometry();
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    camera.position.z = 5;

    let time = 0;

    const animate = () => {
      requestAnimationFrame(animate);

      time += 0.005;
      particlesMesh.rotation.y = time * 0.1;
      
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      const linePositions = [];
      const maxDistance = 1;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(time + i) * 0.001;
        positions[i + 1] += Math.cos(time + i * 1.1) * 0.001;
        positions[i + 2] += Math.sin(time + i * 0.5) * 0.001;

        for (let j = i + 3; j < positions.length; j += 3) {
          const dx = positions[i] - positions[j];
          const dy = positions[i + 1] - positions[j + 1];
          const dz = positions[i + 2] - positions[j + 2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < maxDistance) {
            linePositions.push(positions[i], positions[i + 1], positions[i + 2]);
            linePositions.push(positions[j], positions[j + 1], positions[j + 2]);
          }
        }
      }

      particlesGeometry.attributes.position.needsUpdate = true;
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

      renderer.render(scene, camera);
    };

    animate();

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      updateSize();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section>
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-[#0D0C1B] to-[#172A45]">
      <div ref={mountRef} className="absolute inset-0" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10 flex items-center justify-center w-full h-full text-white"
      >
        <div className="text-center px-4">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-xl md:text-2xl mb-2 text-[#64FFDA]"
          >
            Hi, I'm
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
          >
            YODHIMAS GEFFANANDA
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="text-2xl md:text-3xl lg:text-5xl font-light tracking-widest mb-8 text-[#b0b6ca]"
          >
            INNOVATING THROUGH CODE
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="bg-transparent border-2 border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA] hover:text-[#0D0C1B] font-bold py-2 px-6 rounded transition duration-300"
          >
            View My Projects
          </motion.button>
        </div>
      </motion.div>
    </div>
    </section>
  );
};


export default HeroSection;