"use client"

import React, { useState, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import StackIcon from 'tech-stack-icons';

const ProfessionalTechStackShowcase: React.FC = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  

  const icons = [
    "reactjs", "nextjs", "android", "bootstrap5", "css3", "flutter", "html5",
    "java", "js", "kotlin", "laravel", "mongodb", "mysql", "nodejs", "nuxtjs",
    "php", "postgresql", "tailwindcss", "typescript", "vuejs"
  ];

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const iconAnimation = {
    rest: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: [0, -10, 10, -10, 10, 0],
      transition: {
        rotate: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 2,
          ease: "linear"
        },
        scale: {
          type: "spring",
          stiffness: 400,
          damping: 10
        }
      }
    }
  };

  return (
    <div ref={ref} className="bg-transparent z-30 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-[#E6F1FF] mb-12 text-center">
          MY TECH STACK
        </h2>
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {icons.map((icon) => (
            <motion.div
              key={icon}
              className="flex flex-col items-center justify-center"
              variants={itemVariants}
            >
              <motion.div
                className="bg-[#112240] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                whileHover="hover"
                animate="rest"
                variants={iconAnimation}
                onHoverStart={() => setHoveredIcon(icon)}
                onHoverEnd={() => setHoveredIcon(null)}
                aria-label={`${icon} icon`}
              >
                <StackIcon name={icon} className="h-12 w-12 text-[#64FFDA]" />
              </motion.div>
              <motion.div
                className="mt-3 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: hoveredIcon === icon ? 1 : 0, y: hoveredIcon === icon ? 0 : -10 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-[#8892B0] font-medium">{icon}</span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProfessionalTechStackShowcase;