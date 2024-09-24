import { createSlice } from '@reduxjs/toolkit';

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    shopReviews: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    
    setShopReviews: (state, action) => {
      state.shopReviews = action.payload;
      state.isLoading = false;
      state.error = null;
    }, 
    setReviewsLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setReviewsError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setReviewsLoading, setShopReviews, setReviewsError } = reviewSlice.actions;
export default reviewSlice.reducer;