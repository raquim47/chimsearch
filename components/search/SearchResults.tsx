'use client';

import styles from './SearchResults.module.css';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { YoutubeIcon } from '@/utils/icons';
import { useSearchParams } from 'next/navigation';
import { useSearchVideos } from '@/hooks/useSearchVideos';
import { useEffect } from 'react';
import {
  formatDuration,
  formatPublishedAt,
  formatViewCount,
} from '@/utils/formatters';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const year = searchParams.get('year') || '2024';
  const { ref, inView } = useInView();
  const isKeywordValid = !!keyword && keyword.length >= 2;

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useSearchVideos({ keyword, year, enabled: isKeywordValid });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  if (!keyword || keyword.length < 2) {
    return (
      <p className={styles.error}>
        유효하지 않은 키워드입니다.
        <br />두 글자 이상의 단어 또는 문장을 입력해주세요.
      </p>
    );
  }

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (isError) {
    return <p className={styles.error}>에러</p>;
  }
  const hasVideos = data?.pages?.some((page) => page.length > 0);
  if (!hasVideos) {
    return <p className={styles.error}>검색결과가 없습니다.</p>;
  }
  return (
    <section className={styles['search-results']}>
      <h2>
        "{keyword}" 검색 결과 ({year}년)
      </h2>
      <ul>
        {data?.pages.flat().map((video) => (
          <li key={video.videoId} className={styles.item}>
            <div className={styles.item__images}>
              <Image src={video.thumbnails} alt={video.title} fill={true} />
              <span className={styles.time}>
                {formatDuration(video.duration)}
              </span>
            </div>
            <div className={styles.item__info}>
              <section>
                <h3>{video.title}</h3>
                <p className={styles.desc}>
                  조회수 {formatViewCount(video.viewCount)}회 •{' '}
                  {formatPublishedAt(video.publishedAt)} 전
                </p>
              </section>
              <section className={styles['item__info-bottom']}>
                <div className={styles.item__mentions}>
                  <strong>{video.keywordCount}</strong>
                  <small>Mentions</small>
                </div>
                <a
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['item__youtube-link']}
                >
                  <YoutubeIcon />
                </a>
              </section>
            </div>
          </li>
        ))}
      </ul>
      {!isLoading && (
        <div ref={hasNextPage ? ref : undefined} style={{ height: '20px' }} />
      )}
    </section>
  );
};

export default SearchResults;
