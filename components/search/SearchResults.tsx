import styles from './SearchResults.module.css';
import mockImage from '../../public/mock.jpeg';
import Image from 'next/image';
import { YoutubeIcon } from '@/utils/icons';

const SearchResults = () => {
  return (
    <section className={styles['search-results']}>
      <h2>"키워드" 검색 결과</h2>
      <ul>
        <li className={styles.item}>
          <div className={styles.item__images}>
            <Image src={mockImage} alt="mock" />
            <span className={styles.time}>01:10:29</span>
          </div>
          <div className={styles.item__info}>
            <section>
              <h3>
              2024년 03월 15일 1부 | 불닭볶음면 해외에서만 파는 맛
              </h3>
              <p className={styles.desc}>조회수 19만 • 4시간 전</p>
            </section>
            <section className={styles['item__info-bottom']}>
              <div className={styles.item__mentions}>
                <strong>24</strong>
                <small>Mentions</small>
              </div>
              <a className={styles['item__youtube-link']}>
                <YoutubeIcon/>
              </a>
            </section>
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles.item__images}>
            <Image src={mockImage} alt="mock" />
            <span className={styles.time}>01:10:29</span>
          </div>
          <div className={styles.item__info}>
            <section>
              <h3>
              2024년 03월 15일 1부 | 불닭볶음면 해외에서만 파는 맛 2024년 032024년 03월 15일 1부 | 불닭볶음면 해외에서만 파는 맛 2024년 03
              </h3>
              <p className={styles.desc}>조회수 19만 • 4시간 전</p>
            </section>
            <section className={styles['item__info-bottom']}>
              <div className={styles.item__mentions}>
                <strong>24</strong>
                <small>Mentions</small>
              </div>
              <a className={styles['item__youtube-link']}>
                <YoutubeIcon/>
              </a>
            </section>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default SearchResults;
