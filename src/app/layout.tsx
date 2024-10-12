"use client"

import React, { useState, useEffect } from 'react';
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from './components'
import SmoothScroll from './components/components/SmoothScroll'
import CursorCometTrailEffect from './components/components/CursorCometTrail'
import ParticleBackground from './components/components/ParticleBackground'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showNavbar, setShowNavbar] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setShowNavbar(pathname === '/');
  }, [pathname]);

  return (
    <html lang="id">
      <body className={`${inter.className} relative`}>
        <div className="fixed inset-0 z-10">
          <ParticleBackground />
        </div>
        <div className="relative z-20">
          {showNavbar && <Navbar />}
          <SmoothScroll />
          <CursorCometTrailEffect />
          {children}
        </div>
      </body>
    </html>
  )
}