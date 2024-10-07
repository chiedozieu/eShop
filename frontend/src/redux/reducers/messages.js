
// store/messagesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { server } from '../../server';

// New thunk that doesn't depend on conversations array
export const fetchTotalUnseenCount = createAsyncThunk(
  'messages/fetchTotalUnseenCount',
  async (userId) => {
    try {
      const response = await axios.get(
        `${server}/message/get-total-unseen/${userId}`,
        {
          withCredentials: true,
        }
      );
      return response.data.totalUnseen;
    } catch (error) {
      throw error;
    }
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    totalUnseenCount: 0,
    loading: false,
    error: null,
    initialized: false, // New flag to track if we've loaded the initial count
  },
  reducers: {
    updateTotalUnseenCount: (state, action) => {
      state.totalUnseenCount = action.payload;
    },
    decrementUnseenCount: (state, action) => {
      const decrementBy = action.payload;
      state.totalUnseenCount = Math.max(0, state.totalUnseenCount - decrementBy);
    },
    incrementUnseenCount: (state) => {
      state.totalUnseenCount += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalUnseenCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTotalUnseenCount.fulfilled, (state, action) => {
        state.loading = false;
        state.totalUnseenCount = action.payload;
        state.error = null;
        state.initialized = true;
      })
      .addCase(fetchTotalUnseenCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.initialized = true;
      });
  },
});

export const {
  updateTotalUnseenCount,
  decrementUnseenCount,
  incrementUnseenCount,
} = messagesSlice.actions;

export default messagesSlice.reducer;