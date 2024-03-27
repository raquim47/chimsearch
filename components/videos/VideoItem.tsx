'use client';

import { Video } from '@/hooks/videos';
import styles from './VideoItem.module.css';
import {
  formatDateFromNow,
  formatDuration,
  formatViewCount,
} from '@/utils/formatters';
import { YoutubeIcon } from '@/utils/icons';
import Image from 'next/image';
import Link from 'next/link';

const VideoItem = ({
  video,
  keyword,
  year,
}: {
  video: Video;
  keyword: string;
  year: string;
}) => {
  const handleClickYoutubeLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank');
  };

  return (
    <div key={video.videoId}>
      <Link
        className={styles.item}
        href={
          video.keywordCount
            ? `/videos/${video.videoId}/?keyword=${keyword}&year=${year}`
            : `/viewed-video/${video.videoId}/?keyword=${keyword}&year=${year}`
        }
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
          <span className={styles.time}>{formatDuration(video.duration)}</span>
        </div>
        <div className={styles.item__info}>
          <section>
            <h3>{video.title}</h3>
            {video.viewCount && video.publishedAt && (
              <p className={styles.desc}>
                조회수 {formatViewCount(video.viewCount)}회 •{' '}
                {formatDateFromNow(video.publishedAt)} 전
              </p>
            )}
          </section>
          <section className={styles['item__info-bottom']}>
            <div className={styles.item__mentions}>
              {video.keywordCount ? (
                <>
                  <strong>{video.keywordCount}</strong>
                  <small>Mentions</small>
                </>
              ) : (
                <small>{keyword}</small>
              )}
            </div>
            <button
              onClick={handleClickYoutubeLink}
              className={styles['item__youtube-link']}
              aria-label="유튜브 바로가기"
            >
              <YoutubeIcon />
            </button>
          </section>
        </div>
      </Link>
    </div>
  );
};

export default VideoItem;
