import React, { useState } from 'react';
import { AlertTriangle, Eye, EyeOff, Info, Zap } from 'lucide-react';
import type { AnalysisResult, RedFlag, Theme } from '../types';

interface RedFlagsTabProps {
  result: AnalysisResult;
  originalText: string;
  theme: Theme;
}

const severityColors = {
  1: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
  2: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
  3: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800',
  4: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
  5: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
};

const severityLabels = {
  1: 'Low Risk',
  2: 'Moderate Risk',
  3: 'High Risk',
  4: 'Very High Risk',
  5: 'Critical Risk',
};

export function RedFlagsTab({ result, originalText, theme }: RedFlagsTabProps) {
  const [showHighlights, setShowHighlights] = useState(true);
  const [selectedFlag, setSelectedFlag] = useState<string | null>(null);

  const highlightText = (text: string, flags: RedFlag[]) => {
    if (!showHighlights) return text;
    
    let highlightedText = text;
    const sortedFlags = [...flags].sort((a, b) => b.startIndex - a.startIndex);
    
    sortedFlags.forEach((flag) => {
      const before = highlightedText.substring(0, flag.startIndex);
      const flagText = highlightedText.substring(flag.startIndex, flag.endIndex);
      const after = highlightedText.substring(flag.endIndex);
      
      const severityClass = flag.severity >= 4 ? 'bg-red-200 dark:bg-red-900/40' : 'bg-yellow-200 dark:bg-yellow-900/40';
      
      highlightedText = `${before}<mark class="${severityClass} px-1 rounded cursor-pointer" data-flag-id="${flag.id}">${flagText}</mark>${after}`;
    });
    
    return highlightedText;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
          Identified Red Flags ({result.redFlags.length})
        </h3>
        <button
          onClick={() => setShowHighlights(!showHighlights)}
          className="flex items-center px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 
                   rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {showHighlights ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
          {showHighlights ? 'Hide' : 'Show'} Highlights
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700 dark:text-gray-300">Red Flags Found</h4>
          {result.redFlags.map((flag) => (
            <div
              key={flag.id}
              className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 
                         hover:shadow-md ${
                selectedFlag === flag.id 
                  ? 'ring-2 ring-blue-500 ring-opacity-50' 
                  : ''
              } ${severityColors[flag.severity]}`}
              onClick={() => setSelectedFlag(selectedFlag === flag.id ? null : flag.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <h5 className="font-medium">{flag.title}</h5>
                <div className="flex items-center text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  {flag.confidence}%
                </div>
              </div>
              
              <p className="text-sm mb-2 opacity-90">{flag.description}</p>
              
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">{severityLabels[flag.severity]}</span>
                <span>{flag.type}</span>
              </div>
              
              {selectedFlag === flag.id && (
                <div className="mt-3 pt-3 border-t border-opacity-20 border-current">
                  <div className="flex items-start text-xs">
                    <Info className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="opacity-80">{flag.whyItMatters}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {result.redFlags.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No significant red flags detected in this document.</p>
            </div>
          )}
        </div>
        
        <div>
          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-4">
            Original Document {showHighlights && '(Highlighted)'}
          </h4>
          <div 
            className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl h-96 overflow-y-auto 
                       text-sm font-mono leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: highlightText(originalText, result.redFlags)
            }}
          />
        </div>
      </div>
    </div>
  );
}