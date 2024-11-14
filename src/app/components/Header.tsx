'use client'
import React from 'react';
import Link from 'next/link';
// import '../styles/globals.css';
function Header() {
  return (
    <div className="bg-purple-500 h-20 flex items-center justify-between px-8 shadow-md">
      <div className="text-white text-xl font-semibold">הלוגו שלי</div>
      <div className="space-x-4">
        <Link href="/" className="text-white hover:text-purple-200 transition-colors">לינק 1</Link>
        <Link href="/page2" className="text-white hover:text-purple-200 transition-colors">לינק 2</Link>
      </div>
    </div>
  );
}

export default Header;
