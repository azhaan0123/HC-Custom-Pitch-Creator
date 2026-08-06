'use client';

import React from 'react';

export const WebsiteHeader: React.FC = () => {
  return (
    <div className="bg-[#1C1C1E] text-white px-4 py-2.5 flex items-center justify-between shadow-lg z-50">
      <div className="flex items-center space-x-3">
        <div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-md">
          HC
        </div>
        <span className="text-sm font-semibold tracking-tight">HealthCompiler</span>
      </div>
      <nav className="hidden md:flex items-center space-x-5 text-xs font-medium text-white/70">
        <a href="#" className="hover:text-white transition-colors">Home</a>
        <a href="#" className="hover:text-white transition-colors">Solutions</a>
        <a href="#" className="hover:text-white transition-colors text-white">Pitch Builder</a>
        <a href="#" className="hover:text-white transition-colors">Contact</a>
      </nav>
    </div>
  );
};
