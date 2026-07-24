import React from 'react';
import { NavTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer id="footer-section" className="bg-[#090909] border-t border-white/10 py-12 text-sm text-neutral-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-8 text-center">
        
        {/* Brand Logo */}
        <div 
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="cursor-pointer select-none"
        >
          <span className="font-brand text-4xl text-[#D4AF37] tracking-tight hover:brightness-110 transition-all">
            horbar.
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center items-center gap-8 text-sm font-medium text-neutral-300">
          <button onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#D4AF37] transition-colors">
            Home
          </button>
          <button onClick={() => { setActiveTab('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#D4AF37] transition-colors">
            Shop
          </button>
          <button onClick={() => { setActiveTab('collections'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#D4AF37] transition-colors">
            Collections
          </button>
          <button onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#D4AF37] transition-colors">
            About
          </button>
          <button onClick={() => { setActiveTab('lookbook'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#D4AF37] transition-colors">
            Lookbook
          </button>
        </nav>

        {/* Social Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-neutral-400">
          <a href="#instagram" onClick={(e) => e.preventDefault()} className="hover:text-[#D4AF37] transition-colors">
            Instagram
          </a>
          <a href="#tiktok" onClick={(e) => e.preventDefault()} className="hover:text-[#D4AF37] transition-colors">
            TikTok
          </a>
          <a href="#facebook" onClick={(e) => e.preventDefault()} className="hover:text-[#D4AF37] transition-colors">
            Facebook
          </a>
        </div>

        {/* Copyright Notice */}
        <div className="pt-4 border-t border-white/5 w-full max-w-md text-xs text-neutral-500 font-light">
          © 2025 Horbar. All rights reserved.
        </div>

      </div>
    </footer>
  );
};
