import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from './components'
import SmoothScroll from './components/components/SmoothScroll'
import CursorCometTrailEffect from './components/components/CursorCometTrail'
import ParticleBackground from './components/components/ParticleBackground'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portofolio Saya',
  description: 'Website portofolio personal saya',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} relative`}>
        <div className="fixed inset-0 z-10">
          <ParticleBackground />
        </div>
        <div className="relative z-20">
          <Navbar />
          <SmoothScroll />
          <CursorCometTrailEffect />
          {children}
        </div>
      </body>
    </html>
  )
}