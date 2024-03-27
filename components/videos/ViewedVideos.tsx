'use client';

import styles from './ViewedVideos.module.css';
import { useViewedVideos } from '@/hooks/videos';
import VideoItem from './VideoItem';
import React from 'react';

const ViewedVideos = () => {
  const { viewedVideos, addVideoToState } = useViewedVideos();

  return (
    <section className={styles['viewed-videos']}>
      {viewedVideos.length > 0 && (
        <>
          <h2>지난 검색 결과</h2>
          <ul>
            {viewedVideos.map((viewedVideo) => (
              <li
                key={viewedVideo.videoId}
                onClick={() => addVideoToState(viewedVideo)}
              >
                <VideoItem
                  video={viewedVideo}
                  keyword={viewedVideo.keyword}
                  year={viewedVideo.year}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default ViewedVideos;
