'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, Linkedin, Github, Phone, Quote, MessageSquare } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import PersonalAIChatbot from '../chatbot/PersonalAIChatBot';

interface ContactCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}


const SubtleWaveAnimation = () => (
  <div className="absolute inset-x-0 bottom-0">
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


const SlidingQuotes = () => {
  const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { text: "Creativity is intelligence having fun.", author: "Albert Einstein" },
    { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
    { text: "The biggest risk is not taking any risk.", author: "Mark Zuckerberg" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Done is better than perfect.", author: "Sheryl Sandberg" }
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 3000); 

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-32 overflow-hidden bg-[#1D2D50] rounded-lg p-6 shadow-lg">
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex items-center h-full"
        >
          <Quote className="text-[#64FFDA] mr-4 flex-shrink-0" size={32} />
          <div>
            <p className="text-[#CCD6F6] italic text-lg">{quotes[currentQuote].text}</p>
            <p className="text-[#64FFDA] text-sm mt-2">- {quotes[currentQuote].author}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const ContactCard: React.FC<ContactCardProps> = ({ icon: Icon, label, value, href }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center p-4 bg-[#233554] rounded-lg shadow-md hover:bg-[#2A4374] transition-all duration-300 group"
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
  >
    <Icon className="w-6 h-6 text-[#64FFDA] mr-4" />
    <div>
      <p className="text-[#64FFDA] font-semibold">{label}</p>
      <p className="text-[#8892B0] group-hover:text-[#CCD6F6] transition-colors">{value}</p>
    </div>
  </motion.a>
);

const ContactSection: React.FC = () => {
  const contacts: ContactCardProps[] = [
    { icon: Mail, label: 'Email', value: 'yodhimas02@gmail.com', href: 'mailto:yodhimas02@gmail.com' },
    { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/yodhimas', href: 'https://linkedin.com/in/yodhimas' },
    { icon: Github, label: 'GitHub', value: 'github.com/yodhimas', href: 'https://github.com/yodhimas' },
    { icon: Phone, label: 'WhatsApp', value: '+62 812-3456-7890', href: 'https://wa.me/6281234567890' }
  ];

  return (
    <section id='contact' className="bg-transparent z-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto relative z-50">
        <motion.h2 
          className="text-4xl font-bold text-[#64FFDA] mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Get In Touch
        </motion.h2>
        
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-[#8892B0] mb-8 text-lg">
              I'm always excited to connect with fellow developers, potential clients, and tech enthusiasts. Whether you have a question, want to collaborate, or just want to say hi, feel free to reach out through any of these channels:
            </p>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {contacts.map((contact) => (
                <ContactCard key={contact.label} {...contact} />
              ))}
            </div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <SlidingQuotes />
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-[#1D2D50] rounded-lg p-6 shadow-lg z-20 relative">
              <h3 className="text-2xl font-semibold text-[#64FFDA] mb-4 flex items-center">
                <MessageSquare className="mr-2" /> Chat with My AI Assistant
              </h3>
              <p className="text-[#8892B0] mb-4">
                Have a quick question or want to discuss a potential project? Try chatting with my AI assistant!
              </p>
              <PersonalAIChatbot />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;