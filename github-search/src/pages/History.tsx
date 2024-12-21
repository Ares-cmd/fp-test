import React from 'react';
import { UserCard } from '../components/UserCard';
import { useGitHub } from '../context/github-context';

export default function History() {
  const { searchHistory, clearHistory } = useGitHub();

  return (
    <div className="container max-w-2xl mx-auto p-4">      
      <div className="space-y-6">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-semibold tracking-tight">Your Search History</h1>
        </div>

        {searchHistory.length === 0 ? (
          <p className="text-center text-gray-500">No search history yet</p>
        ) : (
          <div className="space-y-4">
            <table class="table-auto w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-2 text-center">Search Term</th>
                  <th className="px-4 py-2 text-center">Search Results</th>
                </tr>
              </thead>
              <tbody>
                {searchHistory.map((item, index) => (
                  <tr key={index} className="space-y-2 border-b-2 border-b-gray-100">
                    <td className="px-4 py-2 text-center">{item.term}</td>
                    <td className="px-4 py-2 text-center">{item.result ? (
                    <UserCard 
                      login={item.result.login} 
                      avatar_url={item.result.avatar_url} 
                    />
                  ) : (
                    <p className="text-sm text-grey-500">Search result not found</p>
                  )}</td>
                  </tr>
              ))}
              </tbody>
            </table>
            <div class="flex justify-center">
              <button class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700" onClick={clearHistory}>
              Clear Search History
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

