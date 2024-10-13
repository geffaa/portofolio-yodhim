import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SubtleWaveAnimation = () => (
  <div className="absolute inset-x-0 bottom-0 z-10">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#333f52" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#333f52" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#333f52" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <motion.path
        fill="url(#waveGradient)"
        initial={{
          d: "M0,160 C320,300,420,300,740,200 C1060,100,1180,100,1440,160 V320 H0 Z"
        }}
        animate={{
          d: [
            "M0,160 C320,300,420,300,740,200 C1060,100,1180,100,1440,160 V320 H0 Z",
            "M0,200 C320,100,420,100,740,200 C1060,300,1180,300,1440,200 V320 H0 Z",
            "M0,160 C320,220,420,220,740,200 C1060,180,1180,180,1440,160 V320 H0 Z",
            "M0,200 C320,100,420,100,740,200 C1060,300,1180,300,1440,200 V320 H0 Z",
            "M0,160 C320,300,420,300,740,200 C1060,100,1180,100,1440,160 V320 H0 Z"
          ]
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "easeInOut"
        }}
      />
    </svg>
  </div>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    // Fungsi untuk mengambil jumlah pengunjung dari API
    const fetchVisitorCount = async () => {
      try {
        // Ganti URL ini dengan endpoint API Anda yang sebenarnya
        const response = await fetch('/api/visitor-count');
        const data = await response.json();
        setVisitorCount(data.count);
      } catch (error) {
        console.error('Error fetching visitor count:', error);
      }
    };

    fetchVisitorCount();
  }, []);

  return (
    <motion.footer 
      className="relative bg-transparent z-30 text-[#8892B0] py-8 px-4 mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SubtleWaveAnimation />
      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        <motion.p 
          className="text-center mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          © {currentYear} Yodhimas. All rights reserved.
        </motion.p>
        <motion.p 
          className="text-center text-sm mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Designed and built with passion and a lot of <span role="img" aria-label="coffee">☕</span>
        </motion.p>
        {visitorCount !== null && (
          <motion.p
            className="text-center text-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Total Visitors: {' '}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {visitorCount}
            </motion.span>
          </motion.p>
        )}
      </div>
    </motion.footer>
  );
};

export default Footer;