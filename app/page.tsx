import RecentKeywords from '@/components/search/RecentKeywords';
import SearchForm from '@/components/search/SearchForm';
import styles from './page.module.css';

const RootPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>원본 박물관 검색기</h1>
          <SearchForm />
        </header>
        <RecentKeywords/>
      </main>
      <aside className={styles.aside}>사이드바</aside>
    </div>
  );
};

export default RootPage;
