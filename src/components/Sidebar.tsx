import React, { useState } from 'react';
import { HelpCircle, TrendingUp, Shuffle, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { sampleTerms } from '../services/analysisService';
import type { Theme } from '../types';

interface SidebarProps {
  theme: Theme;
  onLoadSample?: (text: string) => void;
}

const mostAnalyzed = [
  { name: 'Discord', count: '2.3M', risk: 'Moderate', color: 'text-yellow-500' },
  { name: 'TikTok', count: '1.8M', risk: 'High', color: 'text-red-500' },
  { name: 'Instagram', count: '1.5M', risk: 'High', color: 'text-red-500' },
  { name: 'WhatsApp', count: '1.2M', risk: 'Moderate', color: 'text-yellow-500' },
  { name: 'Spotify', count: '890K', risk: 'Low', color: 'text-green-500' },
  { name: 'Netflix', count: '756K', risk: 'Low', color: 'text-green-500' },
];

const faqItems = [
  {
    question: "What do these red flags mean?",
    answer: "Red flags are problematic clauses in legal documents that could limit your rights or create unexpected obligations. We categorize them by risk level and explain why each matters."
  },
  {
    question: "How accurate is the AI analysis?",
    answer: "Our AI analysis uses GPT-4 to provide detailed insights, but it's designed for educational purposes. For important legal decisions, always consult with a qualified attorney."
  },
  {
    question: "Can I analyze any legal document?",
    answer: "Yes! Our tool works with Terms of Service, Privacy Policies, EULAs, Cookie Policies, and other legal agreements. The AI adapts its analysis based on document type."
  },
  {
    question: "What's the Transparency Score?",
    answer: "The Transparency Score rates how clearly a document explains its terms, protects user rights, and avoids misleading language. Higher scores indicate more user-friendly documents."
  }
];

export function Sidebar({ theme, onLoadSample }: SidebarProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  const cardClass = theme === 'dark' 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-200';

  const handleRandomTerms = () => {
    const sampleKeys = Object.keys(sampleTerms) as Array<keyof typeof sampleTerms>;
    const randomKey = sampleKeys[Math.floor(Math.random() * sampleKeys.length)];
    const randomTermsText = sampleTerms[randomKey];
    
    if (onLoadSample) {
      onLoadSample(randomTermsText);
    }
  };

  return (
    <div className="space-y-6">
      {/* Most Analyzed Services */}
      <div className={`${cardClass} border rounded-2xl p-6 shadow-lg`}>
        <div className="flex items-center mb-4">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
          <h3 className="font-semibold">Most Analyzed Services</h3>
        </div>
        
        <div className="space-y-3">
          {mostAnalyzed.map((service, index) => (
            <div key={service.name} className="flex items-center justify-between group hover:bg-gray-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors">
              <div className="flex items-center">
                <span className="text-sm font-mono text-gray-400 w-6">
                  #{index + 1}
                </span>
                <span className="font-medium ml-2">{service.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">{service.count}</span>
                <span className={`text-xs font-medium ${service.color}`}>
                  {service.risk}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={handleRandomTerms}
          className="w-full mt-4 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 hover:scale-105"
        >
          <Shuffle className="w-4 h-4 mr-2" />
          Try Random Terms
        </button>
      </div>
      
      {/* FAQ Section */}
      <div className={`${cardClass} border rounded-2xl p-6 shadow-lg`}>
        <div className="flex items-center mb-4">
          <HelpCircle className="w-5 h-5 mr-2 text-green-500" />
          <h3 className="font-semibold">Frequently Asked Questions</h3>
        </div>
        
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-3 last:pb-0">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full text-left flex items-center justify-between py-2 hover:text-blue-500 transition-colors"
              >
                <span className="font-medium text-sm">{item.question}</span>
                {expandedFaq === index ? (
                  <ChevronUp className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                )}
              </button>
              
              {expandedFaq === index && (
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <a
            href="#"
            className="flex items-center text-sm text-blue-500 hover:text-blue-600 transition-colors"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Full Legal Guide
          </a>
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
        <p className="text-xs text-yellow-800 dark:text-yellow-200">
          <strong>Disclaimer:</strong> This tool provides educational analysis only and does not constitute legal advice. 
          For important legal decisions, consult with a qualified attorney.
        </p>
      </div>
    </div>
  );
}