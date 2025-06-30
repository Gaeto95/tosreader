import React from 'react';
import { Scale, Zap, ExternalLink } from 'lucide-react';

export function Header() {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-teal-500/20 backdrop-blur-sm"></div>
      
      <div className="relative container mx-auto px-4 py-12">
        {/* Bolt.new link in top left */}
        <div className="absolute top-4 left-4">
          <a
            href="https://bolt.new"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-white/80 hover:text-white transition-colors group"
          >
            <img 
              src="/bolt-logo.png" 
              alt="Bolt.new" 
              className="w-36 h-36 group-hover:scale-110 transition-transform"
            />
          </a>
        </div>

        <div className="text-center text-white">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm mr-4">
              <Scale className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Terms TL;DR
            </h1>
            <Zap className="w-6 h-6 ml-2 text-yellow-300" />
          </div>
          
          <p className="text-xl md:text-2xl font-light mb-2 opacity-90">
            Read What You're Really Signing
          </p>
          
          <p className="text-lg opacity-75 max-w-2xl mx-auto">
            Get instant, AI-powered breakdowns of Terms of Service and Privacy Policies. 
            Know your rights before you click "I agree."
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </header>
  );
}