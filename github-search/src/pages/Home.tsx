import React, { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { UserCard } from '../components/UserCard';
import { useGitHub } from '../context/github-context';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addToHistory } = useGitHub();

  const handleSearch = async () => {
    if (!searchTerm) return;

    setIsLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/${searchTerm}`);
      const data = await response.json();
      
      if (response.ok) {
        setSearchResult(data);
        addToHistory(searchTerm, data);
      } else {
        setSearchResult(null);
        addToHistory(searchTerm, null);
      }
    } catch (error) {
      console.error('Error searching GitHub user:', error);
      setSearchResult(null);
      addToHistory(searchTerm, null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-lg mx-auto p-4">      
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Search GitHub User</h1>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="space-y-4">
              <input
                id="search"
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm  sm:text-sm"
                placeholder="Enter GitHub username"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white text-center bg-emerald-600 hover:bg-emerald-700"
                onClick={handleSearch} 
                disabled={isLoading || !searchTerm}
              >
                {isLoading ? (
                  "Searching..."
                ) : (
                  <>
                    Search
                  </>
                )}
              </button>
            </div>
          </div>

          {searchResult && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Search Results</h2>
              <UserCard 
                login={searchResult.login} 
                avatar_url={searchResult.avatar_url} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

