'use client';

import YearFilter from './YearFilter';
import styles from './SearchForm.module.css';
import { FormEvent, useEffect, useState } from 'react';
import { YEAR_FILTER_LIST } from '@/utils/constants';
import { useSearchParams, useRouter } from 'next/navigation';

const SearchForm = () => {
  const [year, setYear] = useState(YEAR_FILTER_LIST[0]);
  const searchParams = useSearchParams();
  const keywordFromParams = searchParams.get('keyword') || '';
  const [keyword, setKeyword] = useState(keywordFromParams);
  const router = useRouter();

  const handleChangeFilter = (year: string) => {
    setYear(year);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!keyword) return;
    if (keyword.length < 1) return;
    const sanitizedKeyword = encodeURIComponent(keyword);
    router.push(`/search/?keyword=${sanitizedKeyword}&year=${year}`);
  };

  useEffect(() => {
    setKeyword(keywordFromParams);
  }, [keywordFromParams]);
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        placeholder="키워드 검색"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        autoComplete="on"
        name="keyword"
        type="text"
      />
      <YearFilter onChangeYear={handleChangeFilter} year={year} />
      <button type="submit" aria-label="검색" disabled={!keyword}>
        <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
          <g>
            <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
          </g>
        </svg>
      </button>
    </form>
  );
};

export default SearchForm;
