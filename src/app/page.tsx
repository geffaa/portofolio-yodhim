import React from 'react';
import { HeroSection, Navbar } from './components';
import AboutSection from './components/about';

const MainPage: React.FC = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
    </div>
  );
};

export default MainPage;