import React, { useState, useEffect } from 'react';
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

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0C1B] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
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
        <BackgroundAnimation />
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
      <motion.div
        className="absolute text-[#64FFDA] text-xl sm:text-2xl md:text-3xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Loading...
      </motion.div>
    </motion.div>
  );
};

const BackgroundAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 bg-[#64FFDA] rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: [null, window.innerHeight + 10],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default SplashScreen;