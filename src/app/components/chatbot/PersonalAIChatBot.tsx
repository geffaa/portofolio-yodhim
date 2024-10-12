import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface DatasetEntry {
  patterns: string[];
  responses: string[];
}

const personalDataset: { [key: string]: DatasetEntry } = {
  greetings: {
    patterns: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'howdy', 'what\s up'],
    responses: [
      "Hi there! Im Yodhim AI assistant. Feel free to ask me anything about his skills, projects, or experiences!",
      "Hello! Im here to share information about Yodhim. What would you like to know?",
      "Welcome! Im an AI trained to answer questions about Yodhim. How can I assist you today?",
      "Greetings! Id be happy to tell you all about Yodhim. What aspect of his professional life interests you?"
    ]
  },
  skills: {
    patterns: ['skill', 'able to', 'capable', 'proficient', 'expertise', 'technology', 'tech stack', 'programming languages', 'frameworks'],
    responses: [
      "Yodhim is proficient in full-stack development, with expertise in React, Node.js, and Python. He is also skilled in AI and machine learning.",
      "As a developer, Yodhim excels in both front-end and back-end technologies. He is particularly strong in creating responsive web applications and implementing complex algorithms.",
      "Yodhim technical skills include web development, mobile app creation, and data analysis. He is always eager to learn and apply new technologies to solve problems.",
      "In terms of programming languages, Yodhim is fluent in JavaScript, TypeScript, Python, and Java. He is also familiar with C++ and Rust for systems programming.",
      "Yodhim expertise extends to cloud technologies like AWS and Azure, as well as containerization with Docker and Kubernetes."
    ]
  },
  projects: {
    patterns: ['project', 'portfolio', 'work', 'developed', 'created', 'built', 'application', 'software'],
    responses: [
      "One of Yodhim recent projects was an AI-powered financial analysis tool. He used React for the front-end and TensorFlow.js for the AI components.",
      "Yodhim developed a real-time collaboration platform for remote teams. It utilized WebSockets for instant communication and React for a responsive UI.",
      "A notable project in Yodhim portfolio is an e-learning platform with adaptive learning features. He built it using Next.js for the frontend and Node.js for the backend.",
      "Yodhim created a blockchain-based supply chain management system, showcasing his ability to work with emerging technologies.",
      "One of Yodhim passion projects is an open-source library for data visualization, which has gained popularity in the developer community."
    ]
  },
  experience: {
    patterns: ['experience', 'background', 'history', 'career', 'professional', 'work history', 'job', 'position'],
    responses: [
      "Yodhim has 5 years of professional experience in software development. He is worked with startups and established tech companies on various challenging projects.",
      "In his career, Yodhim has led development teams and mentored junior developers. This showcases both his technical expertise and leadership skills.",
      "Yodhim experience spans from developing enterprise-level applications to creating innovative solutions for small businesses. He is adaptable to different project scales and requirements.",
      "Before specializing in software development, Yodhim worked as a data analyst, giving him a unique perspective on data-driven development.",
      "Yodhim has experience working in agile environments and is certified as a Scrum Master, enhancing his project management skills."
    ]
  },
  education: {
    patterns: ['education', 'study', 'degree', 'university', 'college', 'academic', 'learning', 'qualification'],
    responses: [
      "Yodhim holds a Bachelor's degree in Computer Science from the University of Indonesia. He graduated with honors, focusing on AI and software engineering.",
      "Alongside his formal education, Yodhim is committed to continuous learning. He regularly takes online courses and attends tech conferences to stay updated with the latest trends.",
      "Yodhim has several certifications in advanced web development and AI from platforms like Coursera and Udacity. This demonstrates his commitment to expanding his knowledge base.",
      "During his university years, Yodhim participated in numerous hackathons and coding competitions, often securing top positions.",
      "Yodhim educational background also includes a minor in Business Administration, giving him insights into the business aspects of software development."
    ]
  },
  interests: {
    patterns: ['interest', 'passion', 'hobby', 'enjoy', 'like', 'love', 'fascinated', 'curious'],
    responses: [
      "Beyond coding, Yodhim is passionate about open-source contribution. He regularly participates in hackathons and contributes to community projects.",
      "Yodhim enjoys exploring new technologies in his free time. He often experiments with IoT projects, combining hardware and software solutions.",
      "As a tech enthusiast, Yodhim writes a blog sharing insights on emerging technologies and development best practices. He enjoys engaging with the tech community through his writing.",
      "Yodhim is particularly interested in the intersection of AI and ethics. He often participates in discussions and workshops on responsible AI development.",
      "Outside of tech, Yodhim is an avid nature photographer. He finds that this hobby helps him maintain a creative balance with his technical work."
    ]
  },
  workPhilosophy: {
    patterns: ['philosophy', 'approach', 'methodology', 'principle', 'belief', 'work style', 'values'],
    responses: [
      "Yodhim believes in writing clean, maintainable code. He follows best practices like Test-Driven Development (TDD) and continuous integration in his projects.",
      "Collaboration and knowledge sharing are key aspects of Yodhim work philosophy. He enjoys working in diverse teams and believes in the power of collective problem-solving.",
      "Yodhim approaches each project with a user-centric mindset. He focuses on creating intuitive and efficient solutions that address real user needs.",
      "Continuous learning is a core principle for Yodhim. He dedicates time each week to exploring new technologies and methodologies to improve his craft.",
      "Yodhim values transparency and open communication in his work. He believes that clear, honest dialogue leads to better outcomes and stronger team relationships."
    ]
  },
  availability: {
    patterns: ['available', 'hire', 'opportunity', 'job', 'position', 'work', 'employ', 'recruit'],
    responses: [
      "Yodhim is currently open to new opportunities, especially those involving cutting-edge technologies in web development and AI.",
      "For project collaborations or job opportunities, the best way to reach Yodhim is through his professional email: Yodhimmas02@gmail.com.",
      "Yodhim is available for both full-time positions and freelance projects. He is particularly interested in roles that challenge him to grow and innovate.",
      "While Yodhim is open to remote work, He is also willing to relocate for the right opportunity that aligns with his career goals.",
      "Yodhim is actively seeking roles where he can leverage his full-stack development skills and contribute to innovative projects in AI and machine learning."
    ]
  },
  achievements: {
    patterns: ['achievement', 'award', 'recognition', 'accomplish', 'success', 'win', 'honor'],
    responses: [
      "In 2022, Yodhim won the Best Innovation Award at a national hackathon for his AI-driven healthcare solution.",
      "Yodhim article on 'The Future of AI in Web Development' was featured in a prominent tech magazine last year.",
      "Recently, an open-source library Yodhim developed for React components reached 1000 stars on GitHub, showcasing its popularity in the dev community.",
      "Yodhim was recognized as a 'Rising Star in Tech' by a leading industry publication, highlighting his contributions to innovative software solutions.",
      "One of Yodhim machine learning projects was selected for presentation at an international AI conference, marking a significant achievement in his career."
    ]
  },
  strengths: {
    patterns: ['strength', 'strong point', 'forte', 'excel', 'best at', 'specialize'],
    responses: [
      "Yodhim greatest strength is his ability to bridge the gap between complex technical concepts and practical, user-friendly solutions.",
      "Problem-solving is where Yodhim truly shines. He has a knack for breaking down complex issues into manageable components and finding innovative solutions.",
      "Yodhim excels in quickly adapting to new technologies and frameworks, allowing him to stay at the forefront of the ever-evolving tech landscape.",
      "One of Yodhim key strengths is his ability to communicate technical concepts clearly to both technical and non-technical stakeholders.",
      "Yodhim strength lies in his holistic approach to development, considering not just the code, but also user experience, scalability, and long-term maintenance."
    ]
  },
  futureGoals: {
    patterns: ['goal', 'aspiration', 'aim', 'future', 'plan', 'ambition', 'objective'],
    responses: [
      "Yodhim aspires to lead a team developing cutting-edge AI applications that can make a positive impact on society.",
      "One of Yodhim main goals is to contribute to the field of ethical AI, ensuring that AI technologies are developed and used responsibly.",
      "Yodhim aims to further specialize in cloud-native architectures and hopes to become a recognized expert in building scalable, distributed systems.",
      "In the future, Yodhim plans to mentor and teach aspiring developers, sharing his knowledge and experience with the next generation of tech professionals.",
      "Yodhim long-term goal is to found a tech startup that focuses on using AI and web technologies to address global environmental challenges."
    ]
  },
  default: {
    patterns: [],
    responses: [
      "Thats an interesting question about Yodhim! While I dont have specific information on that, Id be happy to tell you about his skills or projects instead.",
      "Great query! Im not sure about that specific detail, but I can share information about Yodhim work experience or technical skills if you are interested.",
      "Hmm, I dont have that particular information about Yodhim. But Id be glad to talk about his recent projects or his approach to software development. What would you like to know?",
      "While I dont have an exact answer for that, I can tell you about Yodhim educational background or his future career goals. Would either of those interest you?",
      "That's a unique question! Although I dont have that specific information, I could share some of Yodhim notable achievements or his work philosophy. Which would you prefer?"
    ]
  }
};

const findBestMatch = (input: string): [string, boolean] => {
  const lowercaseInput = input.toLowerCase();
  let bestCategory = 'default';
  let bestScore = 0;
  let isDefaultResponse = true;

  for (const [category, data] of Object.entries(personalDataset)) {
    const score = data.patterns.reduce((acc, pattern) => 
      acc + (lowercaseInput.includes(pattern) ? 1 : 0), 0);
    if (score > bestScore) {
      bestCategory = category;
      bestScore = score;
      isDefaultResponse = false;
    }
  }

  const responses = personalDataset[bestCategory]?.responses || personalDataset.default.responses;
  const response = responses[Math.floor(Math.random() * responses.length)];
  return [response, isDefaultResponse];
};

const PersonalAIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! Im Yodhims AI assistant. Im here to answer your questions about Yodhims skills, projects, experiences, and more. What would you like to know about him?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [learningData, setLearningData] = useState<{ [key: string]: number }>({});
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

    // Simulate processing time and learning
    setTimeout(() => {
      const [response, isDefault] = findBestMatch(input);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);

      // Update learning data
      setLearningData(prev => {
        const words = input.toLowerCase().split(/\s+/);
        const newData = { ...prev };
        words.forEach(word => {
          newData[word] = (newData[word] || 0) + 1;
        });
        return newData;
      });

      if (isDefault) {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: "If youre not sure what to ask, you can inquire about Yodhim skills, recent projects, work experience, or educational background. Feel free to ask anything!" 
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

  // Function to suggest topics based on learning data
  const suggestTopics = () => {
    const sortedWords = Object.entries(learningData)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([word]) => word);
    
    return `Based on our conversation, you might be interested in asking about: ${sortedWords.join(', ')}. What would you like to know more about?`;
  };

  return (
    <div className="bg-[#112240] rounded-lg shadow-md overflow-hidden h-[500px] flex flex-col z-50 relative">
      <div className="bg-[#1D3461] p-4">
        <h3 className="text-[#64FFDA] font-semibold flex items-center">
          <Bot className="w-5 h-5 mr-2" /> Yodhim Personal AI Assistant
        </h3>
      </div>
      <div className="flex-grow overflow-y-auto p-4 text-justify">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`flex items-start ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`rounded-full p-2 ${msg.role === 'user' ? 'bg-[#64FFDA]' : 'bg-[#233554]'} ${msg.role === 'user' ? 'ml-3' : 'mr-3'}`}>
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
              Yodhim AI is thinking...
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
            placeholder="Ask about Yodhim..."
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
        {Object.keys(learningData).length > 0 && (
          <button
            onClick={() => setMessages(prev => [...prev, { role: 'assistant', content: suggestTopics() }])}
            className="mt-2 text-[#64FFDA] text-sm hover:underline"
          >
            Suggest topics
          </button>
        )}
      </div>
    </div>
  );
};

export default PersonalAIChatbot;