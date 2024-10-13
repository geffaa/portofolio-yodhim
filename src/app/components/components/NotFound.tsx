"use client"

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const EpicNotFound = ({ message = "Page Not Found", subMessage = "We're working on something awesome!" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    if (!ctx) return;
    let animationFrameId: number;
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    const particles: { x: number; y: number; radius: number; color: string; velocity: { x: number; y: number } }[] = [];

    // Particle system
    const particleCount = Math.min(100, Math.floor(window.innerWidth / 10)); // Adjust particle count based on screen width
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: `hsl(${Math.random() * 360}, 50%, 50%)`,
        velocity: {
          x: (Math.random() - 0.5) * 3,
          y: (Math.random() - 0.5) * 3
        }
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        if (particle.x < 0 || particle.x > canvas.width) particle.velocity.x *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.velocity.y *= -1;

        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw lines between nearby particles
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const glitchVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      }
    },
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08,
      }
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={glitchVariants}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-4 sm:mb-8 relative"
        >
          <span className="absolute top-0 left-0 -ml-1 sm:-ml-2 text-red-500 opacity-70 animate-glitch-1">404</span>
          <span className="absolute top-0 left-0 -ml-0.5 sm:-ml-1 text-blue-500 opacity-70 animate-glitch-2">404</span>
          404
        </motion.div>
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-center"
        >
          {message.split("").map((char, index) => (
            <motion.span key={`${char}-${index}`} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.div>
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-base sm:text-lg md:text-xl text-gray-400 text-center max-w-md sm:max-w-lg md:max-w-xl"
        >
          {subMessage.split("").map((char, index) => (
            <motion.span key={`${char}-${index}`} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </div>
  );
};

export default EpicNotFound;