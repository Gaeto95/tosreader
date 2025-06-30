import React from 'react';
import { TrendingUp, Award, AlertCircle } from 'lucide-react';
import type { AnalysisResult, Theme } from '../types';

interface TransparencyTabProps {
  result: AnalysisResult;
  theme: Theme;
}

export function TransparencyTab({ result, theme }: TransparencyTabProps) {
  const { transparencyScore, scoreJustification } = result;
  
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-500';
    if (score >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const getScoreBackground = (score: number) => {
    if (score >= 70) return 'from-green-500 to-emerald-500';
    if (score >= 40) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-rose-500';
  };
  
  const getScoreLabel = (score: number) => {
    if (score >= 70) return 'Good Transparency';
    if (score >= 40) return 'Fair Transparency';
    return 'Poor Transparency';
  };

  // Calculate circle circumference for progress animation
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (transparencyScore / 100) * circumference;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="relative inline-block mb-6">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className={`stop-color-${getScoreBackground(transparencyScore).split(' ')[0].replace('from-', '')}`} />
                <stop offset="100%" className={`stop-color-${getScoreBackground(transparencyScore).split(' ')[1].replace('to-', '')}`} />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(transparencyScore)}`}>
                {transparencyScore}%
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Transparency
              </div>
            </div>
          </div>
        </div>
        
        <h3 className="text-2xl font-semibold mb-2">
          {getScoreLabel(transparencyScore)}
        </h3>
        
        <div className="flex items-center justify-center mb-6">
          {transparencyScore >= 70 ? (
            <Award className="w-5 h-5 text-green-500 mr-2" />
          ) : transparencyScore >= 40 ? (
            <TrendingUp className="w-5 h-5 text-yellow-500 mr-2" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          )}
          <span className="text-gray-600 dark:text-gray-400">
            Based on clarity, fairness, and user rights
          </span>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
        <h4 className="font-semibold mb-3 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Score Breakdown
        </h4>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {scoreJustification}
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {result.redFlags.filter(f => f.severity <= 2).length}
          </div>
          <div className="text-sm text-green-700 dark:text-green-300">
            Low Risk Issues
          </div>
        </div>
        
        <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {result.redFlags.filter(f => f.severity === 3).length}
          </div>
          <div className="text-sm text-yellow-700 dark:text-yellow-300">
            Moderate Risk Issues
          </div>
        </div>
        
        <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {result.redFlags.filter(f => f.severity >= 4).length}
          </div>
          <div className="text-sm text-red-700 dark:text-red-300">
            High Risk Issues
          </div>
        </div>
      </div>
      
      {transparencyScore < 40 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h5 className="font-medium text-red-800 dark:text-red-200 mb-1">
                Low Transparency Warning
              </h5>
              <p className="text-red-700 dark:text-red-300 text-sm">
                This document has a transparency score below 40%, indicating significant concerns 
                about clarity and user rights. Consider seeking legal advice before agreeing to these terms.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}