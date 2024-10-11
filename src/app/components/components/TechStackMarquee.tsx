"use client"

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import StackIcon from 'tech-stack-icons';

const TechStackMarquee: React.FC = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [marqueeWidth, setMarqueeWidth] = useState(0);
  const isInView = useInView(containerRef, { once: false, amount: 0.5 });
  const controls = useAnimation();

  const icons = [
    "reactjs", "nextjs", "android", "bootstrap5", "css3", "flutter", "html5",
    "java", "js", "kotlin", "laravel", "mongodb", "mysql", "nodejs", "nuxtjs",
    "php", "postgresql", "tailwindcss", "typescript", "vuejs"
  ];

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  useEffect(() => {
    if (marqueeRef.current) {
      setMarqueeWidth(marqueeRef.current.scrollWidth / 2);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const marqueeVariants = {
    animate: {
      x: [-marqueeWidth, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 50,
          ease: "linear",
        },
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
        duration: 0.5
      }
    },
  };

  const tooltipVariants = {
    initial: { opacity: 0, y: 10, scale: 0.8 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      }
    },
    exit: {
      opacity: 0,
      y: 10,
      scale: 0.8,
      transition: {
        duration: 0.2,
      }
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className="w-full overflow-hidden py-12 bg-[#172A45]"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <motion.div
        ref={marqueeRef}
        className="flex space-x-20"
        variants={marqueeVariants}
        animate="animate"
        style={{ paddingLeft: "100%" }}
      >
        {icons.concat(icons).map((icon, index) => (
          <motion.div
            key={index}
            className="relative flex flex-col items-center"
            variants={iconVariants}
            whileHover="hover"
            onHoverStart={() => setHoveredIcon(icon)}
            onHoverEnd={() => setHoveredIcon(null)}
            style={{ originX: 0.5, originY: 0.5 }}
          >
            <motion.div
              className="rounded-full bg-white bg-opacity-10 p-6 shadow-lg cursor-pointer mb-4"
              whileHover={{
                boxShadow: "0 0 25px 8px rgba(255,255,255,0.3)",
                background: "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2))"
              }}
            >
              <StackIcon name={icon} className="h-16 w-16 text-white" />
            </motion.div>
            <AnimatePresence>
              {hoveredIcon === icon && (
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-25 text-white px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap"
                  variants={tooltipVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {icon}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TechStackMarquee;