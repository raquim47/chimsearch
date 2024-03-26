'use client';

import styles from './SearchedVideos.module.css';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation';
import { useSearchVideos } from '@/hooks/videos';
import { useEffect } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import VideoItem from './VideoItem';

const SearchedVideos = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const year = searchParams.get('year') || '2024';
  const { ref, inView } = useInView();

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useSearchVideos({ keyword, year, enabled: !!keyword });

  const noVideos = data?.pages[0]?.videos.length === 0;
  const totalKeywordCount = data?.pages[0]?.totalKeywordCount || 0;

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <section className={styles['searched-videos']}>
      <h2>
        "{keyword}" 검색 결과{' '}
        <small>
          ({year}년{!isLoading && ` • 총 ${totalKeywordCount}번`})
        </small>
      </h2>
      {!keyword && <p className={styles.error}>유효하지 않은 키워드입니다.</p>}
      {isError && <p className={styles.error}>데이터를 불러올 수 없습니다.</p>}
      {noVideos && <p className={styles.error}>검색 결과가 없습니다.</p>}
      {isLoading && <LoadingSpinner />}
      {!isLoading && !isError && data && (
        <ul>
          {data?.pages
            .flatMap((page) => page.videos)
            .map((video) => (
              <VideoItem key={video.videoId} video={video} keyword={keyword} year={year} />
            ))}
        </ul>
      )}
      {!isLoading && hasNextPage && (
        <div ref={hasNextPage ? ref : undefined} style={{ height: '20px' }}>
          <LoadingSpinner />
        </div>
      )}
    </section>
  );
};

export default SearchedVideos;
