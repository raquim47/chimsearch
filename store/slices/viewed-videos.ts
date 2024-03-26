import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const VIEWED_VIDEOS = 'viewedVideos';

interface ViewedVideoI {
  videoId: string;
  keyword: string;
  year: number;
}

interface ViewedVideosI {
  viewedVideos: ViewedVideoI[];
}

const loadInitialState = (): ViewedVideoI[] => {
  if (typeof window === 'undefined') {
    return []; 
  }
  
  const viewedVideosJson = localStorage.getItem(VIEWED_VIDEOS);
  return viewedVideosJson ? JSON.parse(viewedVideosJson) : [];
};

const initialState: ViewedVideosI = {
  viewedVideos: loadInitialState(),
};

const viewedVideosSlice = createSlice({
  name: VIEWED_VIDEOS,
  initialState,
  reducers: {
    addViewedVideo: (state, action: PayloadAction<ViewedVideoI>) => {
      const updatedViewedVideos = [action.payload, ...state.viewedVideos].slice(0, 3);
      state.viewedVideos = updatedViewedVideos;
      localStorage.setItem(VIEWED_VIDEOS, JSON.stringify(updatedViewedVideos));
    },
  },
});

export const { addViewedVideo } = viewedVideosSlice.actions;
export default viewedVideosSlice.reducer;