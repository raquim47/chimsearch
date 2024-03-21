'use client';

import { useRouter } from 'next/navigation';
import styles from './TrendKeywords.module.css';

const TrendKeywords = () => {
  const router = useRouter();
  const handleClickKeyword = (keyword: string) => {
    router.push(`/search/?keyword=${keyword}`);
  };
  return (
    <section className={styles['trend-keywords']}>
      <h2>인기 키워드</h2>
      <ul>
        <li onClick={() => handleClickKeyword('철면수심')}>
          <p>철면수심</p>
          <span className={styles.searches}>1000 searches</span>
        </li>
        <li>
          <p>독깨팔</p>
          <span className={styles.searches}>1000 searches</span>
        </li>
        <li>
          <p>위험한자식 이병건</p>
          <span className={styles.searches}>1000 searches</span>
        </li>
        <li>
          <p>단군</p>
          <span className={styles.searches}>1000 searches</span>
        </li>
        <li>
          <p>단군</p>
          <span className={styles.searches}>1000 searches</span>
        </li>
      </ul>
    </section>
  );
};

export default TrendKeywords;
