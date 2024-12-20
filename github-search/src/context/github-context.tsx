import React, { createContext, useContext, useEffect, useState } from 'react';

interface SearchHistory {
  term: string;
  result: {
    login?: string;
    avatar_url?: string;
  } | null;
  timestamp: number;
}

interface GitHubContextType {
  searchHistory: SearchHistory[];
  addToHistory: (term: string, result: any) => void;
  clearHistory: () => void;
}

const GitHubContext = createContext<GitHubContextType | undefined>(undefined);

export function GitHubProvider({ children }: { children: React.ReactNode }) {
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('github-search-history');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addToHistory = (term: string, result: any) => {
    const newHistory = [
      {
        term,
        result: result || null,
        timestamp: Date.now(),
      },
      ...searchHistory,
    ];
    setSearchHistory(newHistory);
    localStorage.setItem('github-search-history', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('github-search-history');
  };

  return (
    <GitHubContext.Provider value={{ searchHistory, addToHistory, clearHistory }}>
      {children}
    </GitHubContext.Provider>
  );
}

export function useGitHub() {
  const context = useContext(GitHubContext);
  if (context === undefined) {
    throw new Error('useGitHub must be used within a GitHubProvider');
  }
  return context;
}

