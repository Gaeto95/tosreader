import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import type { AnalysisResult, Theme } from '../types';

interface SummaryTabProps {
  result: AnalysisResult;
  theme: Theme;
}

export function SummaryTab({ result, theme }: SummaryTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Plain English Summary</h3>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <CheckCircle2 className="w-4 h-4 mr-1" />
          Analyzed {result.analyzedAt.toLocaleDateString()}
        </div>
      </div>
      
      {result.consumerWarning && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-red-800 dark:text-red-200 mb-1">
                Consumer Warning
              </h4>
              <p className="text-red-700 dark:text-red-300 text-sm">
                {result.consumerWarning}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {result.summary.map((point, index) => (
          <div key={index} className="flex items-start group">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full 
                          flex items-center justify-center mr-4 group-hover:bg-blue-200 
                          dark:group-hover:bg-blue-800/40 transition-colors">
              <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                {index + 1}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed pt-1">
              {point}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
          💡 This summary is AI-generated and simplified for easy understanding. 
          For legal decisions, consult with a qualified attorney.
        </p>
      </div>
    </div>
  );
}