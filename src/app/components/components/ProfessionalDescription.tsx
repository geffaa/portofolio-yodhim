import React, { useRef } from 'react';
import { motion, MotionValue, useInView } from 'framer-motion';

interface ProfessionalDescriptionProps {
  yText: MotionValue<number>;
  renderSkills: () => JSX.Element;
}

const ProfessionalDescription: React.FC<ProfessionalDescriptionProps> = ({ yText, renderSkills }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Variants for card animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.5 }
    },
  };

  return (
    <motion.div
      ref={ref}
      className="space-y-6 p-6 md:p-10"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Kartu pertama */}
      <motion.div
        variants={itemVariants}
        className="bg-[#0A192F] p-6 rounded-lg shadow-lg"
      >
        <h3 className="text-2xl font-bold mb-4 text-[#64FFDA]">Professional Summary</h3>
        <p className="text-base leading-relaxed">
          I'm <span className="font-semibold text-[#64FFDA]">Yodhimas Geffananda</span>, a <span className="font-semibold text-[#64FFDA]">Software Engineering</span> student at Gadjah Mada University. Passionate about <span className="font-semibold text-[#64FFDA]">fullstack development</span>, I create <span className="font-semibold">innovative, user-centric digital solutions</span> with lasting impact.
        </p>
      </motion.div>

      {/* Kartu kedua */}
      <motion.div
        variants={itemVariants}
        className="bg-[#0A192F] p-6 rounded-lg shadow-lg"
      >
        <h3 className="text-2xl font-bold mb-4 text-[#64FFDA]">Technical Skills</h3>
        {renderSkills()}
      </motion.div>
    </motion.div>
  );
};

export default ProfessionalDescription;