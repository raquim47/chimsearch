import { InfoIcon } from '@/utils/icons';
import Image from 'next/image';
import styles from './SideBar.module.css';
import mock from '../../public/mock.jpeg';

const SideBar = () => {
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
      <div className={`${styles.card} ${styles['last-view']}`}>
        <h3>지난 검색 영상</h3>
        <ul>
          <li>
            <Image src={mock} alt="mock" priority/>
            <span className={styles.keyword}>키워드</span>
          </li>
          <li>
            <Image src={mock} alt="mock" priority/>
            <span className={styles.keyword}>키워드</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
