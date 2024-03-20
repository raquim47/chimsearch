import RecentKeywords from '@/components/search/RecentKeywords';
import SearchForm from '@/components/search/SearchForm';
import SearchResults from '@/components/search/SearchResults';
import TrendKeywords from '@/components/search/TrendKeywords';
import styles from './page.module.css';

const RootPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>원본 박물관 검색기</h1>
          <SearchForm />
        </header>
        <section className={styles['border-bottom']}>
          <h2 className="sr-only">최근 키워드</h2>
          <RecentKeywords />
        </section>
        {/* <TrendKeywords /> */}
        <SearchResults />
      </main>
      <aside className={styles.aside}>사이드바</aside>
    </div>
  );
};

export default RootPage;
