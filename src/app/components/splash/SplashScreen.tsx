import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onFinish: () => void;
}

const words = [
  "WELCOME",
  "TO MY WORLD",
  "OF INNOVATION",
  "AND CODE"
];

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1);
      } else {
        setIsFinishing(true);
        setTimeout(onFinish, 3000); // Increased time for final animation
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentWordIndex, onFinish]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles: Array<{x: number, y: number, radius: number, color: string, velocity: {x: number, y: number}}> = [];
    const particleCount = Math.min(100, Math.floor(window.innerWidth / 10));

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
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;

        if (particle.x < 0 || particle.x > canvas.width) particle.velocity.x *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.velocity.y *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

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

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0C1B] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isFinishing && (
            <motion.div
              key={currentWordIndex}
              className="absolute text-[#64FFDA] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-center"
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.5, y: -50 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                duration: 0.5
              }}
            >
              {words[currentWordIndex]}
            </motion.div>
          )}
        </AnimatePresence>
        {isFinishing && (
          <FinalAnimation />
        )}
      </div>
    </motion.div>
  );
};

const FinalAnimation: React.FC = () => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 border-t-4 border-r-4 border-[#64FFDA] rounded-full"
        initial={{ rotate: 0, scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          rotate: { duration: 1.5, ease: "linear", repeat: Infinity },
          scale: { duration: 0.5, ease: "easeOut" }
        }}
      />
    </motion.div>
  );
};

export default SplashScreen;