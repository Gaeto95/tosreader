import React from 'react';
import { Send, FileText, Loader2 } from 'lucide-react';
import type { DocumentType, Theme } from '../types';

interface InputPanelProps {
  inputText: string;
  setInputText: (text: string) => void;
  documentType: DocumentType;
  setDocumentType: (type: DocumentType) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  theme: Theme;
}

const documentTypes = [
  { value: 'tos', label: 'Terms of Service' },
  { value: 'privacy', label: 'Privacy Policy' },
  { value: 'eula', label: 'End User License Agreement' },
  { value: 'cookie', label: 'Cookie Policy' },
  { value: 'other', label: 'Other Legal Document' },
];

export function InputPanel({
  inputText,
  setInputText,
  documentType,
  setDocumentType,
  onAnalyze,
  isAnalyzing,
  theme
}: InputPanelProps) {
  const cardClass = theme === 'dark' 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-200';
  
  const inputClass = theme === 'dark'
    ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400'
    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500';

  return (
    <div className={`${cardClass} border rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl`}>
      <div className="flex items-center mb-6">
        <FileText className="w-6 h-6 mr-3 text-blue-500" />
        <h2 className="text-2xl font-semibold">Analyze Legal Document</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-3">
            Document Type
          </label>
          <select
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value as DocumentType)}
            className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${inputClass}`}
          >
            {documentTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-3">
            Document Text
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste the Terms of Service or Privacy Policy here..."
            className={`w-full h-64 px-4 py-3 border rounded-xl resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono text-sm leading-relaxed ${inputClass}`}
          />
          <div className="flex justify-between mt-2 text-sm opacity-60">
            <span>{inputText.length} characters</span>
            <span>{inputText.split(/\s+/).filter(w => w.length > 0).length} words</span>
          </div>
        </div>
        
        <button
          onClick={onAnalyze}
          disabled={!inputText.trim() || isAnalyzing}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold 
                   transition-all duration-200 hover:from-blue-700 hover:to-purple-700 
                   focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:scale-[0.98]
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                   shadow-lg hover:shadow-xl flex items-center justify-center group"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 mr-3 animate-spin" />
              Analyzing Document...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
              Analyze Terms
            </>
          )}
        </button>
      </div>
    </div>
  );
}