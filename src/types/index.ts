export type DocumentType = 'tos' | 'privacy' | 'eula' | 'cookie' | 'other';

export interface RedFlag {
  id: string;
  type: string;
  severity: 1 | 2 | 3 | 4 | 5;
  title: string;
  description: string;
  confidence: number;
  startIndex: number;
  endIndex: number;
  whyItMatters: string;
}

export interface AnalysisResult {
  summary: string[];
  redFlags: RedFlag[];
  transparencyScore: number;
  scoreJustification: string;
  consumerWarning?: string;
  analyzedAt: Date;
}

export type Theme = 'light' | 'dark';