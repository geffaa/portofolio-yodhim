import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from './components'
import SmoothScroll from './components/SmoothScroll'
import CursorCometTrailEffect from './components/CursorCometTrail'

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
      <body className={inter.className}>
        <Navbar />
        <SmoothScroll />
        <CursorCometTrailEffect />
        {children}
      </body>
    </html>
  )
}