import styles from './SideBar.module.css';
import TrendKeywords from './TrendKeywords';
import { getTrendKeywords } from '@/services/server-actions';
import { TrendKeywordI } from '@/utils/types';

export const revalidate = 5;

const SideBar = async () => {
  const trendKeywords = await getTrendKeywords();
  return (
    <aside>
      <div className={styles.sidebar}>
        <div className={`${styles.card} ${styles.info}`}>
          <h3>알림</h3>
          <p>
            • &apos;원본 박물관 탐색기&apos;는 유튜브의 자동 생성 자막에
            기반합니다. 검색 결과는 다소 정확하지 않을 수 있습니다.
          </p>
          <p>• 2024, 2023 자료까지 업데이트 되었습니다.</p>
        </div>
        {trendKeywords && trendKeywords.length > 0 && (
          <div className={`${styles.card}`}>
            <h3>인기 키워드</h3>
            <TrendKeywords trendKeywords={trendKeywords as TrendKeywordI[]} />
          </div>
        )}
      </div>
    </aside>
  );
};

export default SideBar;
