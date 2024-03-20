import styles from './RecentKeywords.module.css';

const RecentKeywords = () => {
  return (
    <section className={styles['recent-keywords']}>
      <h2 className="sr-only">최근 키워드</h2>
      <ul>
        <li>
          키워드
          <span role="button" aria-label="키워드 삭제" />
        </li>
        <li>
          키워드
          <span role="button" aria-label="키워드 삭제" />
        </li>
        <li>
          키워드
          <span role="button" aria-label="키워드 삭제" />
        </li>
        <li>
          키워드
          <span role="button" aria-label="키워드 삭제" />
        </li>
      </ul>
    </section>
  );
};

export default RecentKeywords;
