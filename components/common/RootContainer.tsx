import RecentKeywords from '../search/RecentKeywords';
import Header from './Header';
import styles from './RootContainer.module.css';
import SideBar from './SideBar';

const RootContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <main className={styles.main}>
          <RecentKeywords />
          {children}
        </main>
        <SideBar/>
      </div>
    </div>
  );
};

export default RootContainer;
