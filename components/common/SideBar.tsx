import { InfoIcon } from '@/utils/icons';
import styles from './SideBar.module.css';
import TrendKeywords from './TrendKeywords';
import { getTrendKeywords } from '@/service/server-actions';

const SideBar = async () => {
  const trendKeywords = await getTrendKeywords();
  return (
    <aside className={styles.sidebar}>
      <div className={`${styles.card} ${styles.info}`}>
        <h3>
          <InfoIcon />
          Notice
        </h3>
        <p>
          • '원본 박물관 탐색기'는 유튜브 자동생성 자막에 의존합니다. 검색
          결과가 정확하지 않을 수 있습니다.
        </p>
        <p>• 2024, 2023, 2022 자료까지 업데이트됐습니다.</p>
      </div>
      {trendKeywords.length > 0 && (
        <div className={`${styles.card}`}>
          <h3>인기 키워드</h3>
          <TrendKeywords trendKeywords={trendKeywords} />
        </div>
      )}
    </aside>
  );
};

export default SideBar;
