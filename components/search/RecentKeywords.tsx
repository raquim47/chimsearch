import styles from './RecentKeywords.module.css';

const RecentSearches = () => {
  return (
    <div className={styles.keywords}>
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
    </div>
  );
};

export default RecentSearches;
