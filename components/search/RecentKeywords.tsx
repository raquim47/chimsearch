'use client';

import useRecentKeywords from '@/hooks/useRecentKeywords';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import styles from './RecentKeywords.module.css';

const RecentKeywords = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const keywordFromParams = searchParams.get('keyword');
  const { keywords, addKeyword, deleteKeyword } = useRecentKeywords();

  const handleClickKeyword = (keyword: string) => {
    router.push(`/videos/?keyword=${keyword}`);
  };

  const handleClickDeleteBtn = (
    e: React.MouseEvent<HTMLSpanElement>,
    keyword: string
  ) => {
    e.stopPropagation();
    deleteKeyword(keyword);
  };

  useEffect(() => {
    if (pathName === '/videos' && keywordFromParams) {
      addKeyword(keywordFromParams);
    }
  }, [pathName, keywordFromParams]);

  return (
    <>
      {keywords.length > 0 && (
        <section className={styles['recent-keywords']}>
          <h2 className="sr-only">최근 키워드</h2>
          <ul>
            {keywords.map((keyword) => (
              <li key={keyword} onClick={() => handleClickKeyword(keyword)}>
                {keyword}
                <button
                  onClick={(e) => handleClickDeleteBtn(e, keyword)}
                  role="button"
                  aria-label="키워드 삭제"
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};

export default RecentKeywords;
