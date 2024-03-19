'use client';
import { useState } from 'react';

const SearchComponent = () => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch(
        `/api/search?keyword=${encodeURIComponent(keyword)}`
      );

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const searchResults = await response.json();
      setResults(searchResults);
    } catch (e) {
      setError(e);
      console.error('Error during search:', e);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(results)
  return (
    <div>
      <input
        type="text"
        placeholder="Search for a keyword..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleSearch} disabled={isLoading}>
        Search
      </button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error occurred: {error.message}</p>}
      <div>
        {results.map((result) => (
          <div key={result._id}>
            <p>Video ID: {result.videoId}</p>
            <p>Keyword count: {result.count}</p>
            <p>Timestamps: {result.timestamps.map(item => <span>{item.time} </span>)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
