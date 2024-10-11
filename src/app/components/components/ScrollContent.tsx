"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

const ScrollContext = createContext(0);

export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ScrollContext.Provider value={scrollY}>
      {children}
    </ScrollContext.Provider>
  );
};