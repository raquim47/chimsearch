'use client';

import styles from './VideoDetail.module.css';
import ReactPlayer from 'react-player';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetVideoDetail } from '@/hooks/videos';
import {
  formatDateToShort,
  formatTextHighlight,
  formatTimeToSeconds,
  formatViewCount,
} from '@/utils/formatters';
import LoadingSpinner from '../common/LoadingSpinner';
import { useViewedVideos } from '@/hooks/videos';

const VideoDetail = ({ videoId }: { videoId: string }) => {
  const youtubeRef = useRef<any>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const year = searchParams.get('year') || '2024';
  const { addViewedVideo } = useViewedVideos();
  const [youtubeOnReady, setYoutubeOnReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const { data: video, isError } = useGetVideoDetail({
    videoId,
    keyword,
    year,
    enabled: !!keyword || !!year,
  });

  const seekTo = (seconds: number) => {
    if (youtubeRef.current) {
      youtubeRef.current.seekTo(seconds);
      setPlaying(true);
    }
  };

  const handleYoutubeOnReady = () => {
    setYoutubeOnReady(true);
    if (playerRef.current) {
      playerRef.current.style.display = 'block';
    }
  };

  useEffect(() => {
    if (video && video.keywordCount) {
      addViewedVideo({
        videoId,
        keyword,
        year,
        duration: video.duration,
        title: video.title,
        thumbnails: video.thumbnails,
      });
    }
  }, [video]);
  return (
    <div className={styles.container}>
      <div className={styles.state}>
        {!keyword && <p>검색어가 유효하지 않습니다.</p>}
        {keyword && !youtubeOnReady && !isError && <LoadingSpinner />}
        {keyword && isError && <p>데이터를 불러올 수 없습니다.</p>}
      </div>
      {video && (
        <>
          <section className={styles.left}>
            <div className={styles.player} ref={playerRef}>
              <div className={styles['player-ratio-box']}>
                <ReactPlayer
                  ref={youtubeRef}
                  width="100%"
                  height="100%"
                  url={`https://www.youtube-nocookie.com/watch?v=${video.videoId}`}
                  playing={playing}
                  onPause={() => setPlaying(false)}
                  controls={true}
                  onReady={handleYoutubeOnReady}
                />
              </div>
            </div>
            {youtubeOnReady && (
              <div className={styles.info}>
                <h3>{video.title}</h3>
                {video.viewCount && video.publishedAt && (
                  <p>
                    조회수 {formatViewCount(video.viewCount)}회 •{' '}
                    {formatDateToShort(video.publishedAt)}
                  </p>
                )}
              </div>
            )}
          </section>
          <section className={styles.right}>
            {youtubeOnReady && (
              <div className={styles.timeline}>
                <div className={styles.timeline__title}>
                  <h4>타임라인</h4>
                  <small>
                    <span className={styles.keyword}>
                      &quot;{keyword}&quot;{" "}
                    </span>
                    <span> • {video.keywordCount}회</span>
                  </small>
                </div>
                <ul>
                  {video.timestamps &&
                    video.timestamps.map(({ time, text }) => (
                      <li key={time}>
                        <p>
                          <button
                            onClick={() => seekTo(formatTimeToSeconds(time))}
                            aria-label={`${time} 재생 버튼`}
                          >
                            {time}
                          </button>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: formatTextHighlight(text, keyword),
                            }}
                          ></span>
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default VideoDetail;
