'use client';

import { TrendKeywordI } from '@/service/server-actions';
import { useRouter } from 'next/navigation';
import styles from './TrendKeywords.module.css';

const TrendKeywords = ({
  trendKeywords,
}: {
  trendKeywords: TrendKeywordI[];
}) => {
  const router = useRouter();

  const handleClickKeyword = (keyword: string) => {
    router.push(`/videos/?keyword=${keyword}`);
  };
  return (
    <ul className={styles['trend-keywords']}>
      {trendKeywords.map((item) => (
        <li key={item._id} onClick={() => handleClickKeyword(item.keyword)}>
          <p>{item.keyword}</p>
          <span className={styles.searches}>{item.count} searches</span>
        </li>
      ))}
    </ul>
  );
};

export default TrendKeywords;
