import Image from 'next/image';
import Link from 'next/link';
import SearchForm from '../search/SearchForm';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <h1>
          <Link href="/">침원박 탐색기</Link>
        </h1>
        <SearchForm />
      </div>
      <a
        href="https://www.youtube.com/@ChimChakMan_Data"
        target="_blank"
        className={styles['channel-link']}
      >
        <Image
          src="https://yt3.googleusercontent.com/bwFIQ0k1DdDWLz1tmcMEnNIpCuXHaDmCXZjYEGzv9y4PeaINyf4SKcKBxXDKsnEyXcZL9q7x9gQ=s176-c-k-c0x00ffffff-no-rj"
          width={60}
          height={60}
          alt="원본 박물관 채널 바로가기"
        />
        <h3>
          침착맨 원본 박물관<span>바로가기</span>
        </h3>
      </a>
    </header>
  );
};

export default Header;
