import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { Sidebar } from './components/Sidebar';
import { ThemeToggle } from './components/ThemeToggle';
import { useTheme } from './hooks/useTheme';
import { analyzeDocument } from './services/analysisService';
import type { AnalysisResult, DocumentType } from './types';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [inputText, setInputText] = useState('');
  const [documentType, setDocumentType] = useState<DocumentType>('tos');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const result = await analyzeDocument(inputText, documentType);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      setError(error instanceof Error ? error.message : 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLoadSample = (sampleText: string) => {
    setInputText(sampleText);
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
    }`}>
      <Header />
      
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <div className="flex items-center">
              <div className="text-red-600 dark:text-red-400">
                <strong>Error:</strong> {error}
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3 space-y-8">
            <InputPanel
              inputText={inputText}
              setInputText={setInputText}
              documentType={documentType}
              setDocumentType={setDocumentType}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              theme={theme}
            />
            
            {analysisResult && (
              <OutputPanel 
                result={analysisResult} 
                originalText={inputText}
                theme={theme}
              />
            )}
          </div>
          
          <div className="xl:col-span-1">
            <Sidebar theme={theme} onLoadSample={handleLoadSample} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;