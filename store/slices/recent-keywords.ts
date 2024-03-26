import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const RECENT_KEYWORDS = 'recentKeywords';

const loadInitialState = (): string[] => {
  if (typeof window === 'undefined') {
    return []; 
  }

  const savedKeywords = localStorage.getItem(RECENT_KEYWORDS);
  return savedKeywords ? JSON.parse(savedKeywords) : [];
};

const initialState = loadInitialState();

const keywordsSlice = createSlice({
  name: RECENT_KEYWORDS,
  initialState,
  reducers: {
    setKeywords: (state, action: PayloadAction<string[]>) => {
      return [...action.payload];
    },
    addKeyword: (state, action: PayloadAction<string>) => {
      state = [
        action.payload,
        ...state.filter((k) => k !== action.payload),
      ].slice(0, 8);
      localStorage.setItem(RECENT_KEYWORDS, JSON.stringify(state));
    },
    deleteKeyword: (state, action: PayloadAction<string>) => {
      state = state.filter((keyword) => keyword !== action.payload);
      localStorage.setItem(RECENT_KEYWORDS, JSON.stringify(state));
    },
  },
});

export const { addKeyword, deleteKeyword } = keywordsSlice.actions;
export default keywordsSlice.reducer;
