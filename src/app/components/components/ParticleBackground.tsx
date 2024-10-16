"use client"

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from "three";
import { useScroll } from './ScrollContent';

const ParticleBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollY = useScroll();
  const [currentSection, setCurrentSection] = useState(0);

  const animate = useCallback((
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    particleSystem: THREE.Points,
    particleGeometry: THREE.BufferGeometry,
    lineGeometry: THREE.BufferGeometry,
    lineMesh: THREE.LineSegments,
    colorPalettes: THREE.Color[][],
    prevScrollY: React.MutableRefObject<number>,
    time: React.MutableRefObject<number>
  ) => {
    const animateFrame = () => {
      requestAnimationFrame(animateFrame);

      time.current += 0.001;

      const scrollFactor = 0.01;
      particleSystem.position.y = -scrollY * scrollFactor;

      const positions = particleGeometry.attributes.position.array as Float32Array;
      const colors = particleGeometry.attributes.color.array as Float32Array;
      const linePositions = [];
      const maxDistance = 0.6;

      // Determine current section based on scroll position
      const newSection = Math.floor(scrollY / (window.innerHeight * 0.8));
      if (newSection !== currentSection) {
        setCurrentSection(newSection);
      }

      for (let i = 0; i < positions.length; i += 3) {
        const particleY = positions[i + 1] + particleSystem.position.y;
        const viewportIndex = Math.floor(-particleY / 10);

        if (viewportIndex >= 0 && viewportIndex < 5) {
          // Animate particles in the current viewport
          positions[i] += Math.sin(time.current + i) * 0.001;
          positions[i + 1] += Math.cos(time.current + i * 1.1) * 0.001;
          positions[i + 2] += Math.sin(time.current + i * 0.5) * 0.001;

          // Transition colors based on current section
          const targetColor = colorPalettes[currentSection % colorPalettes.length][Math.floor(i / 3) % 4];
          colors[i] += (targetColor.r - colors[i]) * 0.05;
          colors[i + 1] += (targetColor.g - colors[i + 1]) * 0.05;
          colors[i + 2] += (targetColor.b - colors[i + 2]) * 0.05;

          // Create connections
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
        } else {
          // Reset particles below the viewport
          createParticle(positions, colors, i / 3, (viewportIndex + 1) * 10, currentSection % colorPalettes.length, colorPalettes);
        }
      }

      particleGeometry.attributes.position.needsUpdate = true;
      particleGeometry.attributes.color.needsUpdate = true;
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      lineMesh.position.y = particleSystem.position.y;

      renderer.render(scene, camera);

      prevScrollY.current = scrollY;
    };

    animateFrame();
  }, [scrollY, currentSection]);

  useEffect(() => {
    if (!mountRef.current) return;
  
    const mountElement = mountRef.current;
  
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

    mountElement.appendChild(renderer.domElement);

    // Particle system setup
    const particleCount = 1500;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPalettes = [
      [new THREE.Color("#cbfff3"), new THREE.Color("#8892B0"), new THREE.Color("#CCD6F6"), new THREE.Color("#64FFDA")],
      [new THREE.Color("#FFD700"), new THREE.Color("#FFA500"), new THREE.Color("#FF4500"), new THREE.Color("#FF6347")],
      [new THREE.Color("#4B0082"), new THREE.Color("#8A2BE2"), new THREE.Color("#9370DB"), new THREE.Color("#E6E6FA")],
      [new THREE.Color("#006400"), new THREE.Color("#228B22"), new THREE.Color("#32CD32"), new THREE.Color("#90EE90")]
    ];

    for (let i = 0; i < particleCount; i++) {
      createParticle(positions, colors, i, Math.floor(i / 300) * 10 - 15, 0, colorPalettes);
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Line system setup
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x64FFDA,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
    });
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    camera.position.z = 5;

    const prevScrollY = { current: 0 };
    const time = { current: 0 };

    animate(scene, camera, renderer, particleSystem, particleGeometry, lineGeometry, lineMesh, colorPalettes, prevScrollY, time);

    const handleResize = () => {
      updateSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountElement.removeChild(renderer.domElement);
    };
  }, [animate]);

  return <div ref={mountRef} className="fixed inset-0 z-10 pointer-events-none" />;
};

const createParticle = (
  positions: Float32Array,
  colors: Float32Array,
  index: number,
  yOffset: number,
  paletteIndex: number,
  colorPalettes: THREE.Color[][]
) => {
  const spread = 15;
  positions[index * 3] = (Math.random() - 0.5) * spread;
  positions[index * 3 + 1] = yOffset + (Math.random() - 0.5) * 5;
  positions[index * 3 + 2] = (Math.random() - 0.5) * spread;

  const colorPalette = colorPalettes[paletteIndex];
  const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
  colors[index * 3] = color.r;
  colors[index * 3 + 1] = color.g;
  colors[index * 3 + 2] = color.b;
};

export default ParticleBackground;