"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const timelineData = [
  {
    id: 1,
    title: "Early Years",
    date: "1990-1995",
    description: "Born and raised in a small town, showing early interest in technology.",
    image: "/assets/Dummy.jpg"
  },
  {
    id: 2,
    title: "School Days",
    date: "1995-2008",
    description: "Excelled in mathematics and science, participated in coding competitions.",
    image: "/assets/Dummy.jpg"
  },
  {
    id: 3,
    title: "University",
    date: "2008-2012",
    description: "Studied Computer Science, focused on AI and Machine Learning.",
    image: "/assets/Dummy.jpg"
  },
  {
    id: 4,
    title: "First Job",
    date: "2012-2016",
    description: "Worked as a junior developer at a tech startup, gained valuable experience.",
    image: "/assets/Dummy.jpg"
  },
  {
    id: 5,
    title: "Current Role",
    date: "2016-Present",
    description: "Senior Software Engineer specializing in full-stack development and cloud architecture.",
    image: "/assets/Dummy.jpg"
  }
];

const InteractiveTimelineGame = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex >= timelineData.length) newIndex = 0;
      if (newIndex < 0) newIndex = timelineData.length - 1;
      return newIndex;
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") paginate(-1);
      if (event.key === "ArrowRight") paginate(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (!frameRef.current) return;
    const { clientX, clientY } = event;
    const { left, top, width, height } = frameRef.current.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    frameRef.current.style.setProperty('--x', `${x * 100}%`);
    frameRef.current.style.setProperty('--y', `${y * 100}%`);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
    }),
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-[#0A192F] to-[#112240] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
            }}
            className="absolute w-4/5 h-4/5 bg-[#233554] rounded-lg shadow-2xl overflow-hidden"
            ref={frameRef}
            onMouseMove={handleMouseMove}
          >
            <div className="relative w-full h-full group">
              <img
                src={timelineData[currentIndex].image}
                alt={timelineData[currentIndex].title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-700 ease-out opacity-0 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full transition-transform duration-700 ease-out group-hover:translate-y-0">
                <h2 className="text-3xl font-bold mb-2">{timelineData[currentIndex].title}</h2>
                <p className="text-xl mb-4">{timelineData[currentIndex].date}</p>
                <p className="text-lg">{timelineData[currentIndex].description}</p>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.28)_10%,transparent_80%)]" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#64FFDA] text-[#0A192F] p-2 rounded-full z-10"
        onClick={() => paginate(-1)}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#64FFDA] text-[#0A192F] p-2 rounded-full z-10"
        onClick={() => paginate(1)}
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {timelineData.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-[#64FFDA]" : "bg-[#8892B0]"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded z-10">
        <p>Use arrow keys or buttons to navigate</p>
      </div>
    </div>
  );
};

export default InteractiveTimelineGame;