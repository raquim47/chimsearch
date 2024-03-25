import { useState, useEffect } from 'react';

const RECENT_KEYWORDS_LS_KEY = 'recentKeywords';

const useRecentKeywords = () => {
  const [keywords, setKeywords] = useState<string[]>([]);
  
  const getRecentKeywords = (): string[] => {
    if (typeof window === 'undefined') {
      return [];
    }
    const keywordsJSON = localStorage.getItem(RECENT_KEYWORDS_LS_KEY);
    return keywordsJSON ? JSON.parse(keywordsJSON) : [];
  };

  useEffect(() => {
    setKeywords(getRecentKeywords());
  }, []);

  const addKeyword = (keyword: string) => {
    const updatedKeywords = [
      keyword,
      ...keywords.filter((k) => k !== keyword),
    ].slice(0, 10);
    localStorage.setItem(
      RECENT_KEYWORDS_LS_KEY,
      JSON.stringify(updatedKeywords)
    );
    setKeywords(updatedKeywords);
  };
  
  const deleteKeyword = (keywordToDelete: string) => {
    const updatedKeywords = keywords.filter(
      (keyword) => keyword !== keywordToDelete
    );
    localStorage.setItem(
      RECENT_KEYWORDS_LS_KEY,
      JSON.stringify(updatedKeywords)
    );
    setKeywords(updatedKeywords);
  };

  return { keywords, addKeyword, deleteKeyword };
};

export default useRecentKeywords;
