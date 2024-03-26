import { useState, useEffect } from 'react';

const RECENT_KEYWORDS = 'recentKeywords';

const useRecentKeywords = () => {
  const [keywords, setKeywords] = useState<string[]>([]);

  const getRecentKeywords = (): string[] => {
    const keywordsJSON = localStorage.getItem(RECENT_KEYWORDS);
    return keywordsJSON ? JSON.parse(keywordsJSON) : [];
  };

  useEffect(() => {
    setKeywords(getRecentKeywords());
  }, []);

  const addKeyword = (keyword: string) => {
    setKeywords((currentKeywords) => {
      const filteredKeywords = currentKeywords.filter((k) => k !== keyword);
      const updatedKeywords = [keyword, ...filteredKeywords].slice(0, 8);

      localStorage.setItem(
        RECENT_KEYWORDS,
        JSON.stringify(updatedKeywords)
      );

      return updatedKeywords;
    });
  };

  const deleteKeyword = (keywordToDelete: string) => {
    setKeywords((currentKeywords) => {
      const updatedKeywords = currentKeywords.filter(
        (keyword) => keyword !== keywordToDelete
      );

      localStorage.setItem(
        RECENT_KEYWORDS,
        JSON.stringify(updatedKeywords)
      );

      return updatedKeywords;
    });
  };

  return { keywords, addKeyword, deleteKeyword };
};

export default useRecentKeywords;
