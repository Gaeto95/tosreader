import React, { useState } from 'react';
import { SummaryTab } from './SummaryTab';
import { RedFlagsTab } from './RedFlagsTab';
import { TransparencyTab } from './TransparencyTab';
import { ExportPanel } from './ExportPanel';
import type { AnalysisResult, Theme } from '../types';

interface OutputPanelProps {
  result: AnalysisResult;
  originalText: string;
  theme: Theme;
}

const tabs = [
  { id: 'summary', label: 'Summary', icon: '✅' },
  { id: 'red-flags', label: 'Red Flags', icon: '🚩' },
  { id: 'transparency', label: 'Transparency Score', icon: '📊' },
];

export function OutputPanel({ result, originalText, theme }: OutputPanelProps) {
  const [activeTab, setActiveTab] = useState('summary');
  
  const cardClass = theme === 'dark' 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-200';

  return (
    <div className={`${cardClass} border rounded-2xl shadow-lg overflow-hidden transition-all duration-300`}>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition-all duration-200 border-b-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-transparent hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-8">
        {activeTab === 'summary' && <SummaryTab result={result} theme={theme} />}
        {activeTab === 'red-flags' && <RedFlagsTab result={result} originalText={originalText} theme={theme} />}
        {activeTab === 'transparency' && <TransparencyTab result={result} theme={theme} />}
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 p-6">
        <ExportPanel result={result} theme={theme} />
      </div>
    </div>
  );
}