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
  }, [quotes.length]);

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
    { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/yodhimas-geffananda', href: 'https://linkedin.com/in/yodhimas-geffananda' },
    { icon: Github, label: 'GitHub', value: 'github.com/geffaa', href: 'https://github.com/geffaa' },
    { icon: Phone, label: 'WhatsApp', value: '+6285869566961', href: 'https://wa.me/6285869566961' }
  ];

  return (
    <section id='contact' className="bg-transparent z-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto relative z-50">
        <motion.h2 
          className="text-4xl font-bold text-[#CCD6F6] mb-12 text-center"
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
            <p className="text-[#8892B0] mb-8 text-lg text-justify">
              I&apos;m always excited to connect with fellow developers, potential clients, and tech enthusiasts. Whether you have a question, want to collaborate, or just want to say hi, feel free to reach out through any of these channels:
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