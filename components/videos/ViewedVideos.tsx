'use client';

import styles from './ViewedVideos.module.css';
import useViewedVideos from '@/hooks/viewed-videos';
import VideoItem from './VideoItem';

const ViewedVideos = () => {
  const { viewedVideos } = useViewedVideos();
  return (
    <section className={styles['viewed-videos']}>
      {viewedVideos.length > 0 && (
        <>
          <h2>지난 검색 결과</h2>
          <ul>
            {viewedVideos.map((viewedVideo) => (
              <VideoItem
                key={viewedVideo.videoId}
                video={viewedVideo}
                keyword={viewedVideo.keyword}
                year={viewedVideo.year}
              />
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default ViewedVideos;
