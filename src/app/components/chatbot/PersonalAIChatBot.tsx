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
    patterns: ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening", "howdy", "whats up", "hola", "bonjour", "ciao"],
    responses: [
      "Hello! Im Yodhims AI assistant. Id be delighted to share information about his professional journey, skills, or personal life. What would you like to know?",
      "Hi there! Its great to meet you. Im here to discuss all things Yodhim - from his tech expertise to his personal interests. What aspect of his life intrigues you the most?",
      "Greetings! Im an AI trained to provide insights into Yodhims world. Whether its his coding prowess or his relationship with Maritza, Im here to help. Whats on your mind?",
      "Welcome! Im excited to chat about Yodhim. His life is quite fascinating - from his software development career to his love story with Maritza. Where shall we start?"
    ]
  },
  skills: {
    patterns: ["skill", "able to", "capable", "proficient", "expertise", "technology", "tech stack", "programming languages", "frameworks", "tools", "competencies"],
    responses: [
      "Yodhim is a versatile full-stack developer with expertise in React, Node.js, and Python. His proficiency extends to AI and machine learning, making him a well-rounded technologist.",
      "As a developer, Yodhim excels in both front-end and back-end technologies. Hes particularly adept at creating responsive web applications and implementing complex algorithms. His skills in React and Node.js are especially noteworthy.",
      "Yodhims technical repertoire includes web development, mobile app creation, and data analysis. Hes always exploring new technologies, recently delving into cloud architectures and serverless computing.",
      "In the realm of programming languages, Yodhim is fluent in JavaScript, TypeScript, Python, and Java. Hes also familiar with C++ and Rust, showcasing his versatility across different programming paradigms.",
      "Yodhims expertise extends to cloud technologies like AWS and Azure, as well as containerization with Docker and Kubernetes. Hes also skilled in CI/CD practices, ensuring smooth deployment pipelines."
    ]
  },
  projects: {
    patterns: ["project", "portfolio", "work", "developed", "created", "built", "application", "software", "product", "development"],
    responses: [
      "One of Yodhims recent projects was an AI-powered financial analysis tool. He leveraged React for the front-end and TensorFlow.js for the AI components, demonstrating his ability to integrate cutting-edge technologies.",
      "Yodhim developed a real-time collaboration platform for remote teams, utilizing WebSockets for instant communication and React for a responsive UI. This project showcased his skills in creating seamless, real-time web applications.",
      "A standout project in Yodhims portfolio is an adaptive e-learning platform. Built with Next.js for the frontend and Node.js for the backend, it features personalized learning paths powered by machine learning algorithms.",
      "Yodhim created a blockchain-based supply chain management system, highlighting his proficiency in working with emerging technologies. This project combined his expertise in distributed systems and secure transaction processing.",
      "One of Yodhims passion projects is an open-source library for data visualization, which has gained significant traction in the developer community. It demonstrates both his technical skills and his commitment to contributing to the wider tech ecosystem."
    ]
  },
  experience: {
    patterns: ["experience", "background", "history", "career", "professional", "work history", "job", "position", "industry"],
    responses: [
      "Yodhim has amassed 5 years of rich experience in software development, working with both startups and established tech companies. This diverse background has exposed him to a wide range of technologies and development methodologies.",
      "Throughout his career, Yodhim has taken on leadership roles, leading development teams and mentoring junior developers. This experience has honed both his technical expertise and his ability to guide and inspire others in the field.",
      "Yodhims professional journey spans from developing enterprise-level applications to creating innovative solutions for small businesses. This range of experience has made him adaptable to different project scales and requirements.",
      "Before specializing in software development, Yodhim worked as a data analyst. This background gives him a unique perspective on data-driven development, allowing him to create more insightful and efficient software solutions.",
      "Yodhim has extensive experience working in agile environments and is certified as a Scrum Master. This enhances his project management skills and allows him to effectively lead teams in fast-paced, iterative development cycles."
    ]
  },
  education: {
    patterns: ["education", "study", "degree", "university", "college", "academic", "learning", "qualification", "course", "training"],
    responses: [
      "Yodhim holds a Bachelors degree in Computer Science from the University of Indonesia, where he graduated with honors. His academic focus was on AI and software engineering, laying a strong foundation for his career.",
      "Continuous learning is a core part of Yodhims ethos. He regularly engages in online courses and attends tech conferences to stay at the forefront of industry trends and emerging technologies.",
      "Yodhim has earned several certifications in advanced web development and AI from platforms like Coursera and Udacity. These credentials underscore his commitment to expanding his knowledge base and staying current in his field.",
      "During his university years, Yodhim was an active participant in hackathons and coding competitions, often securing top positions. These experiences honed his problem-solving skills and ability to work under pressure.",
      "In addition to his technical education, Yodhim completed a minor in Business Administration. This interdisciplinary approach gives him valuable insights into the business aspects of software development, enhancing his ability to create solutions that align with business goals."
    ]
  },
  interests: {
    patterns: ["interest", "passion", "hobby", "enjoy", "like", "love", "fascinated", "curious", "leisure", "free time"],
    responses: [
      "Beyond his professional life, Yodhim is deeply passionate about open-source contribution. He regularly participates in hackathons and contributes to community projects, believing in the power of collaborative innovation.",
      "In his free time, Yodhim enjoys exploring new technologies, often experimenting with IoT projects that combine hardware and software solutions. This hobby keeps him at the cutting edge of tech trends.",
      "As a tech enthusiast, Yodhim maintains a blog where he shares insights on emerging technologies and development best practices. He finds great satisfaction in engaging with the tech community through his writing.",
      "Yodhim has a keen interest in the intersection of AI and ethics. He frequently participates in discussions and workshops on responsible AI development, reflecting his commitment to the ethical use of technology.",
      "Outside of the tech world, Yodhim is an avid nature photographer. He finds that this creative pursuit helps him maintain a balanced perspective, often drawing inspiration from nature for his technical work."
    ]
  },
  workPhilosophy: {
    patterns: ["philosophy", "approach", "methodology", "principle", "belief", "work style", "values", "ethics", "mindset"],
    responses: [
      "Yodhim strongly believes in writing clean, maintainable code. He adheres to best practices like Test-Driven Development (TDD) and continuous integration, ensuring the long-term quality and scalability of his projects.",
      "Collaboration and knowledge sharing are cornerstones of Yodhims work philosophy. He thrives in diverse teams and believes that collective problem-solving leads to the most innovative and robust solutions.",
      "User-centric design is at the heart of Yodhims approach to development. He focuses on creating intuitive and efficient solutions that not only meet but anticipate user needs, always keeping the end-user in mind.",
      "Continuous learning is a core principle for Yodhim. He dedicates time each week to exploring new technologies and methodologies, believing that staying current is crucial in the fast-paced world of tech.",
      "Transparency and open communication are values that Yodhim holds dear in his work. He believes that clear, honest dialogue leads to better outcomes, stronger team relationships, and more successful projects overall."
    ]
  },
  availability: {
    patterns: ["available", "hire", "opportunity", "job", "position", "work", "employ", "recruit", "freelance", "contract"],
    responses: [
      "Yodhim is currently open to new opportunities, particularly those involving cutting-edge technologies in web development and AI. Hes excited about roles that allow him to push the boundaries of whats possible in tech.",
      "For project collaborations or job opportunities, the best way to reach Yodhim is through his professional email: Yodhimmas02@gmail.com. Hes always eager to discuss potential projects or roles.",
      "Yodhim is available for both full-time positions and freelance projects. Hes particularly interested in roles that challenge him to grow, innovate, and make a significant impact in the tech world.",
      "While Yodhim is open to remote work, hes also willing to relocate for the right opportunity that aligns with his career goals and allows him to work on groundbreaking projects.",
      "Yodhim is actively seeking roles where he can leverage his full-stack development skills and contribute to innovative projects in AI and machine learning. Hes particularly drawn to companies with a strong vision for the future of technology."
    ]
  },
  achievements: {
    patterns: ["achievement", "award", "recognition", "accomplish", "success", "win", "honor", "accolade", "milestone"],
    responses: [
      "In 2022, Yodhim won the Best Innovation Award at a national hackathon for his AI-driven healthcare solution. This project showcased his ability to apply cutting-edge technology to real-world problems.",
      "Yodhims article on The Future of AI in Web Development was featured in a prominent tech magazine last year, establishing him as a thought leader in the intersection of AI and web technologies.",
      "Recently, an open-source library Yodhim developed for React components reached 1000 stars on GitHub. This milestone highlights the quality and usefulness of his contributions to the developer community.",
      "Yodhim was recognized as a Rising Star in Tech by a leading industry publication, acknowledging his innovative contributions to software development and his potential to shape the future of technology.",
      "One of Yodhims machine learning projects was selected for presentation at an international AI conference, marking a significant achievement in his career and showcasing his expertise on a global stage."
    ]
  },
  strengths: {
    patterns: ["strength", "strong point", "forte", "excel", "best at", "specialize", "talent", "gifted", "skilled"],
    responses: [
      "One of Yodhims greatest strengths is his ability to bridge the gap between complex technical concepts and practical, user-friendly solutions. He excels at translating intricate ideas into accessible applications.",
      "Problem-solving is where Yodhim truly shines. He has a remarkable talent for breaking down complex issues into manageable components and finding innovative, efficient solutions.",
      "Yodhims ability to quickly adapt to new technologies and frameworks is a significant strength. This adaptability allows him to stay at the forefront of the ever-evolving tech landscape and bring cutting-edge solutions to his projects.",
      "A key strength of Yodhims is his ability to communicate technical concepts clearly to both technical and non-technical stakeholders. This skill is invaluable in collaborative environments and client interactions.",
      "Yodhims strength lies in his holistic approach to development. He considers not just the code, but also user experience, scalability, and long-term maintenance, resulting in well-rounded and sustainable solutions."
    ]
  },
  futureGoals: {
    patterns: ["goal", "aspiration", "aim", "future", "plan", "ambition", "objective", "vision", "dream"],
    responses: [
      "Yodhim aspires to lead a team developing cutting-edge AI applications that can make a positive impact on society. He envisions creating technologies that can address global challenges in healthcare, education, and environmental conservation.",
      "One of Yodhims main goals is to contribute significantly to the field of ethical AI. He aims to be at the forefront of ensuring that AI technologies are developed and used responsibly, with a focus on fairness and transparency.",
      "Yodhim aims to further specialize in cloud-native architectures and hopes to become a recognized expert in building scalable, distributed systems. He sees this as crucial for the future of robust, global-scale applications.",
      "In the future, Yodhim plans to take on a more active role in mentoring and teaching aspiring developers. Hes passionate about sharing his knowledge and experience with the next generation of tech professionals.",
      "Yodhims long-term ambition is to found a tech startup that focuses on using AI and web technologies to address global environmental challenges. He believes in the power of technology to create sustainable solutions for our planet."
    ]
  },
  relationship: {
    patterns: ["girlfriend", "partner", "significant other", "maritza", "angel", "relationship", "dating", "love life", "romantic"],
    responses: [
      "Yodhim is in a loving relationship with Maritza Angelina Az Zahra, affectionately known as Angel. They share a deep bond and support each others personal and professional growth.",
      "Maritza Angelina Az Zahra, or Angel as Yodhim calls her, is an important part of Yodhims life. Their relationship is a source of joy and inspiration for him.",
      "Yodhim and his girlfriend, Maritza Angelina Az Zahra (Angel), have a strong partnership. They balance each other well, with Angel providing support for Yodhims tech endeavors.",
      "Angel (Maritza Angelina Az Zahra) plays a significant role in Yodhims life. Their relationship is built on mutual respect, shared values, and a deep understanding of each others passions.",
      "Yodhim finds great happiness in his relationship with Maritza Angelina Az Zahra. Known as Angel, shes a constant source of support and motivation in both his personal and professional life."
    ]
  },
  default: {
    patterns: [],
    responses: [
      "Thats an interesting question about Yodhim! While I dont have specific information on that, Id be happy to tell you about his skills, projects, or even his relationship with Maritza. What would you like to know?",
      "Great query! Im not sure about that specific detail, but I can share information about Yodhims work experience, technical skills, or personal life. What aspect interests you most?",
      "Hmm, I dont have that particular information about Yodhim. But Id be glad to talk about his recent projects, his approach to software development, or his relationship with Angel. What would you like to explore?",
      "While I dont have an exact answer for that, I can tell you about Yodhims educational background, future career goals, or his life with Maritza. Which of these would you like to hear about?",
      "Thats a unique question! Although I dont have that specific information, I could share some of Yodhims notable achievements, his work philosophy, or insights into his personal life. Which would you prefer?"
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
  const chatContainerRef = useRef<HTMLDivElement>(null);

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

  const handleInputFocus = () => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 100);
  };

  return (
    <div className="bg-[#112240] rounded-lg shadow-md overflow-hidden h-[500px] flex flex-col z-50 relative">
      <div className="bg-[#1D3461] p-4">
        <h3 className="text-[#64FFDA] font-semibold flex items-center">
          <Bot className="w-5 h-5 mr-2" /> Yodhim Personal AI Assistant
        </h3>
      </div>
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 text-justify">
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
            onFocus={handleInputFocus}
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