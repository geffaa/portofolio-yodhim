import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const TimelineGame = dynamic(() => import('@/app/components/components/TimelineGame'), { ssr: false });

export default function TimelineGamePage() {
  return (
    <div className="relative">
      <TimelineGame />
      <Link href="/" className="absolute top-4 left-4 bg-[#64FFDA] text-[#0A192F] px-4 py-2 rounded-md">
        Back to Home
      </Link>
    </div>
  );
}