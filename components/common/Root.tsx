import RQProvider from '@/components/common/RQProvider';
import { Suspense } from 'react';
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
          <Suspense fallback={null}>
            <RecentKeywords />
          </Suspense>
          <RQProvider>{children}</RQProvider>
        </main>
        <SideBar />
      </div>
    </div>
  );
};

export default Root;
