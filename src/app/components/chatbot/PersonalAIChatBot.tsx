'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const personalDataset = {
  greetings: [
    "Hi there! I'm Yodhi's AI assistant. Feel free to ask me anything about his skills, projects, or experiences!",
    "Hello! I'm here to share information about Yodhi. What would you like to know?",
    "Welcome! I'm an AI trained to answer questions about Yodhi. How can I assist you today?"
  ],
  skills: [
    "Yodhi is proficient in full-stack development, with expertise in React, Node.js, and Python. He's also skilled in AI and machine learning.",
    "As a developer, Yodhi excels in both front-end and back-end technologies. He's particularly strong in creating responsive web applications and implementing complex algorithms.",
    "Yodhi's technical skills include web development, mobile app creation, and data analysis. He's always eager to learn and apply new technologies to solve problems."
  ],
  projects: [
    "One of Yodhi's recent projects was an AI-powered financial analysis tool. He used React for the front-end and TensorFlow.js for the AI components.",
    "Yodhi developed a real-time collaboration platform for remote teams. It utilized WebSockets for instant communication and React for a responsive UI.",
    "A notable project in Yodhi's portfolio is an e-learning platform with adaptive learning features. He built it using Next.js for the frontend and Node.js for the backend."
  ],
  experience: [
    "Yodhi has 5 years of professional experience in software development. He's worked with startups and established tech companies on various challenging projects.",
    "In his career, Yodhi has led development teams and mentored junior developers. This showcases both his technical expertise and leadership skills.",
    "Yodhi's experience spans from developing enterprise-level applications to creating innovative solutions for small businesses. He's adaptable to different project scales and requirements."
  ],
  education: [
    "Yodhi holds a Bachelor's degree in Computer Science from the University of Indonesia. He graduated with honors, focusing on AI and software engineering.",
    "Alongside his formal education, Yodhi is committed to continuous learning. He regularly takes online courses and attends tech conferences to stay updated with the latest trends.",
    "Yodhi has several certifications in advanced web development and AI from platforms like Coursera and Udacity. This demonstrates his commitment to expanding his knowledge base."
  ],
  interests: [
    "Beyond coding, Yodhi is passionate about open-source contribution. He regularly participates in hackathons and contributes to community projects.",
    "Yodhi enjoys exploring new technologies in his free time. He often experiments with IoT projects, combining hardware and software solutions.",
    "As a tech enthusiast, Yodhi writes a blog sharing insights on emerging technologies and development best practices. He enjoys engaging with the tech community through his writing."
  ],
  workPhilosophy: [
    "Yodhi believes in writing clean, maintainable code. He follows best practices like Test-Driven Development (TDD) and continuous integration in his projects.",
    "Collaboration and knowledge sharing are key aspects of Yodhi's work philosophy. He enjoys working in diverse teams and believes in the power of collective problem-solving.",
    "Yodhi approaches each project with a user-centric mindset. He focuses on creating intuitive and efficient solutions that address real user needs."
  ],
  availability: [
    "Yodhi is currently open to new opportunities, especially those involving cutting-edge technologies in web development and AI.",
    "For project collaborations or job opportunities, the best way to reach Yodhi is through his professional email: yodhimas02@gmail.com.",
    "Yodhi is available for both full-time positions and freelance projects. He's particularly interested in roles that challenge him to grow and innovate."
  ],
  hobbies: [
    "When not coding, Yodhi enjoys outdoor photography. He finds it a great way to balance his tech-focused work life.",
    "Yodhi is an avid reader of science fiction and tech novels. He believes this fuels his creativity in problem-solving.",
    "To stay active, Yodhi practices yoga and goes hiking. He finds these activities help him maintain a clear mind for coding challenges."
  ],
  achievements: [
    "In 2022, Yodhi won the Best Innovation Award at a national hackathon for his AI-driven healthcare solution.",
    "Yodhi's article on 'The Future of AI in Web Development' was featured in a prominent tech magazine last year.",
    "Recently, an open-source library Yodhi developed for React components reached 1000 stars on GitHub, showcasing its popularity in the dev community."
  ],
  default: [
    "That's an interesting question about Yodhi! While I don't have specific information on that, I'd be happy to tell you about his skills or projects instead.",
    "Great query! I'm not sure about that specific detail, but I can share information about Yodhi's work experience or technical skills if you're interested.",
    "Hmm, I don't have that particular information about Yodhi. But I'd be glad to talk about his recent projects or his approach to software development. What would you like to know?"
  ]
};

const findBestMatch = (input: string): [string, boolean] => {
  const lowercaseInput = input.toLowerCase();
  let category: keyof typeof personalDataset = 'default';
  let isDefaultResponse = false;

  if (lowercaseInput.includes('hi') || lowercaseInput.includes('hello') || lowercaseInput.includes('hey')) {
    category = 'greetings';
  } else if (lowercaseInput.includes('skill') || lowercaseInput.includes('able to') || lowercaseInput.includes('capable')) {
    category = 'skills';
  } else if (lowercaseInput.includes('project') || lowercaseInput.includes('portfolio') || lowercaseInput.includes('work')) {
    category = 'projects';
  } else if (lowercaseInput.includes('experience') || lowercaseInput.includes('background') || lowercaseInput.includes('history')) {
    category = 'experience';
  } else if (lowercaseInput.includes('study') || lowercaseInput.includes('education') || lowercaseInput.includes('degree')) {
    category = 'education';
  } else if (lowercaseInput.includes('interest') || lowercaseInput.includes('passion')) {
    category = 'interests';
  } else if (lowercaseInput.includes('philosophy') || lowercaseInput.includes('approach') || lowercaseInput.includes('methodology')) {
    category = 'workPhilosophy';
  } else if (lowercaseInput.includes('available') || lowercaseInput.includes('hire') || lowercaseInput.includes('opportunity')) {
    category = 'availability';
  } else if (lowercaseInput.includes('hobby') || lowercaseInput.includes('free time') || lowercaseInput.includes('outside work')) {
    category = 'hobbies';
  } else if (lowercaseInput.includes('achievement') || lowercaseInput.includes('award') || lowercaseInput.includes('recognition')) {
    category = 'achievements';
  } else {
    isDefaultResponse = true;
  }

  const response = personalDataset[category][Math.floor(Math.random() * personalDataset[category].length)];
  return [response, isDefaultResponse];
};

const PersonalAIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I&apos;m Yodhi&apos;s AI assistant. I&apos;m here to answer your questions about Yodhi&apos;s skills, projects, experiences, and more. What would you like to know about him?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = useCallback(async () => {
    if (input.trim() === '') return;

    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsTyping(true);

    // Simulate processing time
    setTimeout(() => {
      const [response, isDefault] = findBestMatch(input);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);

      if (isDefault) {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: "If you&apos;re not sure what to ask, you can inquire about Yodhi&apos;s skills, recent projects, work experience, or educational background. Feel free to ask anything!" 
          }]);
        }, 1000);
      }
      
      inputRef.current?.focus();
    }, 1000);
  }, [input]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  return (
    <div className="bg-[#112240] rounded-lg shadow-md overflow-hidden h-[500px] flex flex-col z-50 relative">
      <div className="bg-[#1D3461] p-4">
        <h3 className="text-[#64FFDA] font-semibold flex items-center">
          <Bot className="w-5 h-5 mr-2" /> Yodhi&apos;s Personal AI Assistant
        </h3>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`flex items-start ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`rounded-full p-2 ${msg.role === 'user' ? 'bg-[#64FFDA]' : 'bg-[#233554]'} mr-2`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                msg.role === 'user' ? 'bg-[#64FFDA] text-[#0A192F]' : 'bg-[#233554] text-[#8892B0]'
              }`}>
                {msg.content}
              </div>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#233554] text-[#8892B0] rounded-lg p-3 max-w-xs animate-pulse">
              Yodhi&apos;s AI is thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-[#233554]">
        <div className="flex z-50">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about Yodhi..."
            className="flex-grow bg-[#233554] text-[#8892B0] p-2 rounded-l-md focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSend}
            className="bg-[#64FFDA] text-[#0A192F] p-2 rounded-r-md hover:bg-opacity-80 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalAIChatbot;