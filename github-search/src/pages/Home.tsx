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
    <div className="container max-w-2xl mx-auto p-4">
      <NavBar />
      
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Search GitHub User</h1>
          <p className="text-sm text-gray-500">
            Enter a GitHub username to search for their profile
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">Username</label>
            <div className="flex space-x-2">
              <input
                id="search"
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter GitHub username"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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

