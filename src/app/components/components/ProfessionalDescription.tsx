import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

interface ProfessionalDescriptionProps {
  yText: MotionValue<number>;
  languages: { name: string; percentage: number }[];
  isLoading: boolean;
  error: string | null;
}

const ProfessionalDescription: React.FC<ProfessionalDescriptionProps> = ({ yText, languages, isLoading, error }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const Highlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="text-[#64FFDA] font-semibold">{children}</span>
  );

  const renderSkills = () => {
    if (isLoading) return <p className="text-[#8892B0]">Loading skills...</p>;
    if (error) return <p className="text-[#8892B0]">Error loading skills: {error}</p>;
    if (!languages || languages.length === 0) return <p className="text-[#8892B0]">No language data available</p>;
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {languages.map((lang, index) => (
            <motion.div 
              key={lang.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#0A192F] p-3 rounded-lg"
            >
              <div className="flex justify-between mb-1">
                <span className="text-[#CCD6F6]">{lang.name}</span>
                <span className="text-[#64FFDA]">{lang.percentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <motion.div 
                  className="bg-[#64FFDA] h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.percentage}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex space-x-4">
          <motion.a
            href="https://github.com/geffaa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-[#0A192F] p-3 rounded-lg text-[#64FFDA] hover:bg-[#112240] transition-colors duration-300 flex-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub className="text-xl" />
            <span>GitHub Profile</span>
          </motion.a>
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      style={{ y: yText }}
      className="md:w-1/2 space-y-6"
    >
      <motion.div 
        className="bg-[#112240] rounded-lg shadow-lg p-6 border border-[#1E3A8A]"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p 
          className="text-lg leading-relaxed text-[#8892B0] mb-4 text-justify"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          As a <Highlight>fifth-semester Software Engineering student</Highlight> at <Highlight>Universitas Gadjah Mada</Highlight> with a strong <Highlight>GPA of 3.68</Highlight>, I am passionate about creating <Highlight>innovative</Highlight> and <Highlight>efficient solutions</Highlight> to complex challenges. My academic journey, combined with active involvement in organizational activities, has equipped me with a <Highlight>diverse skill set</Highlight> encompassing <Highlight>leadership</Highlight>, <Highlight>teamwork</Highlight>, and <Highlight>technical proficiency</Highlight>.
        </motion.p>
        <motion.p 
          className="text-lg leading-relaxed text-[#8892B0] text-justify"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          I specialize in <Highlight>fullstack</Highlight> and <Highlight>mobile development</Highlight>, with hands-on experience in various programming languages and frameworks. My expertise spans across <Highlight>modern web technologies</Highlight> and <Highlight>mobile platforms</Highlight>. I&apos;m dedicated to crafting <Highlight>user-centric applications</Highlight> that not only meet but exceed expectations, ensuring seamless functionality and an engaging user experience. Continuously improving my skills, I stay updated with <Highlight>industry trends</Highlight> to bring cutting-edge solutions to every project.
        </motion.p>
      </motion.div>

      <motion.div 
        className="bg-[#112240] rounded-lg shadow-lg p-6 border border-[#1E3A8A]"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <h3 className="text-2xl font-semibold mb-4 text-[#CCD6F6]">My Skills</h3>
        {renderSkills()}
      </motion.div>
    </motion.div>
  );
};

export default ProfessionalDescription;