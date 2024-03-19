import styles from './RecentKeywords.module.css';

const RecentSearches = () => {
  return (
    <ul className={styles['recent-keywords']}>
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
  );
};

export default RecentSearches;
