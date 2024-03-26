'use client';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import recentKeywordsSlice from './slices/recent-keywords';
import viewedVideosSlice from './slices/viewed-videos';

const store = configureStore({
  reducer: {
    recentKeywords: recentKeywordsSlice,
    viewedVideos: viewedVideosSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const RTKProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default RTKProvider;
