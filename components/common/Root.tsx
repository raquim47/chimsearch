import RQProvider from '@/components/common/RQProvider';
import RecentKeywords from '../search/RecentKeywords';
import Header from './Header';
import styles from './Root.module.css';
import SideBar from './SideBar';

const Root = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <main className={styles.main}>
          <RecentKeywords />
          <RQProvider>{children}</RQProvider>
        </main>
        {/* @ts-expect-error Async Server Component */}
        <SideBar />
      </div>
    </div>
  );
};

export default Root;
