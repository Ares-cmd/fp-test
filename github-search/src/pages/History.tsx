import React from 'react';
import { NavBar } from '../components/NavBar';
import { UserCard } from '../components/UserCard';
import { useGitHub } from '../context/github-context';

export default function History() {
  const { searchHistory, clearHistory } = useGitHub();

  return (
    <div className="container max-w-lg mx-auto p-4">      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Your Search History</h1>
          {searchHistory.length > 0 && (
            <button 
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              onClick={clearHistory}
            >
              Clear Search History
            </button>
          )}
        </div>

        {searchHistory.length === 0 ? (
          <p className="text-center text-gray-500">No search history yet</p>
        ) : (
          <div className="space-y-4">
            {searchHistory.map((item, index) => (
              <div key={index} className="space-y-2">
                <p className="text-sm text-gray-500">
                  Search Term: {item.term}
                </p>
                {item.result ? (
                  <UserCard 
                    login={item.result.login} 
                    avatar_url={item.result.avatar_url} 
                  />
                ) : (
                  <p className="text-sm text-red-500">Search result not found</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

