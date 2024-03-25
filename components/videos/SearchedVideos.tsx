'use client';

import styles from './SearchedVideos.module.css';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { YoutubeIcon } from '@/utils/icons';
import { useSearchParams } from 'next/navigation';
import { useSearchVideos } from '@/hooks/useSearchVideos';
import { useEffect } from 'react';
import {
  formatDuration,
  formatDateFromNow,
  formatViewCount,
} from '@/utils/formatters';
import LoadingSpinner from '../common/LoadingSpinner';
import Link from 'next/link';

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
              <li key={video.videoId}>
                <Link
                  className={styles.item}
                  href={`/videos/${video.videoId}/?keyword=${keyword}&year=${year}`}
                  scroll={false}
                >
                  <div className={styles.item__images}>
                    <Image
                      src={video.thumbnails}
                      alt={video.title}
                      fill={true}
                      sizes="auto"
                      priority
                    />
                    <span className={styles.time}>
                      {formatDuration(video.duration)}
                    </span>
                  </div>
                  <div className={styles.item__info}>
                    <section>
                      <h3>{video.title}</h3>
                      <p className={styles.desc}>
                        조회수 {formatViewCount(video.viewCount)}회 •{' '}
                        {formatDateFromNow(video.publishedAt)} 전
                      </p>
                    </section>
                    <section className={styles['item__info-bottom']}>
                      <div className={styles.item__mentions}>
                        <strong>{video.keywordCount}</strong>
                        <small>Mentions</small>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(
                            `https://www.youtube.com/watch?v=${video.videoId}`,
                            '_blank'
                          );
                        }}
                        className={styles['item__youtube-link']}
                        aria-label="유튜브 바로가기"
                      >
                        <YoutubeIcon />
                      </button>
                    </section>
                  </div>
                </Link>
              </li>
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
