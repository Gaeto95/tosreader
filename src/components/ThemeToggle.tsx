import React from 'react';
import { Sun, Moon } from 'lucide-react';
import type { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 
                 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-gray-700" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-400" />
      )}
    </button>
  );
}