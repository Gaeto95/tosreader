import React from 'react';
import { Download, Copy, Share2, CheckCircle } from 'lucide-react';
import type { AnalysisResult, Theme } from '../types';

interface ExportPanelProps {
  result: AnalysisResult;
  theme: Theme;
}

export function ExportPanel({ result, theme }: ExportPanelProps) {
  const [copied, setCopied] = React.useState<string | null>(null);

  const handleCopy = async (type: 'summary' | 'url') => {
    try {
      if (type === 'summary') {
        const summaryText = [
          '📋 Terms Analysis Summary:',
          ...result.summary.map((point, i) => `${i + 1}. ${point}`),
          '',
          `🚩 Red Flags Found: ${result.redFlags.length}`,
          `📊 Transparency Score: ${result.transparencyScore}%`,
          '',
          '⚠️ This analysis is for educational purposes only and does not constitute legal advice.',
          '🔗 Analyzed with Terms TL;DR'
        ].join('\n');
        
        await navigator.clipboard.writeText(summaryText);
      } else {
        // In a real app, this would be the shareable URL
        await navigator.clipboard.writeText(window.location.href);
      }
      
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handlePDFExport = () => {
    // In a real app, this would generate and download a PDF
    alert('PDF export would be implemented with a library like jsPDF or Puppeteer');
  };

  const handleShare = () => {
    const tweetText = `🚨 Just analyzed some terms & conditions! Transparency Score: ${result.transparencyScore}% 

Found ${result.redFlags.length} red flags including ${result.redFlags.filter(f => f.severity >= 4).length} high-risk issues.

Know what you're signing with Terms TL;DR! #TermsAndConditions #Privacy`;
    
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank');
  };

  const buttonClass = theme === 'dark'
    ? 'bg-gray-700 hover:bg-gray-600 text-white'
    : 'bg-gray-100 hover:bg-gray-200 text-gray-700';

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-700 dark:text-gray-300">
        Export & Share Results
      </h4>
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handlePDFExport}
          className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 
                     hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${buttonClass}`}
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </button>
        
        <button
          onClick={() => handleCopy('summary')}
          className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 
                     hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${buttonClass}`}
        >
          {copied === 'summary' ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Summary
            </>
          )}
        </button>
        
        <button
          onClick={handleShare}
          className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white 
                   rounded-lg transition-all duration-200 hover:scale-105 
                   focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share on Twitter
        </button>
        
        <button
          onClick={() => handleCopy('url')}
          className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 
                     hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${buttonClass}`}
        >
          {copied === 'url' ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 mr-2" />
              Copy Link
            </>
          )}
        </button>
      </div>
      
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
        💡 Share your analysis to help others understand what they're signing. 
        All exports include a disclaimer that this is for educational purposes only.
      </p>
    </div>
  );
}