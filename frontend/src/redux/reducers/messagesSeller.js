import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { server } from '../../server';

// New thunk that doesn't depend on conversations array
export const fetchTotalUnseenCountSeller = createAsyncThunk(
  'messages/fetchTotalUnseenCountSeller',
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

const messagesSellerSlice = createSlice({
  name: 'messagesSeller',
  initialState: {
    totalUnseenCountSeller: 0,
    loading: false,
    error: null,
    initialized: false, // New flag to track if we've loaded the initial count
  },
  reducers: {
    updateTotalUnseenCountSeller: (state, action) => {
      state.totalUnseenCountSeller = action.payload;
    },
    decrementUnseenCountSeller: (state, action) => {
      const decrementBy = action.payload;
      state.totalUnseenCountSeller = Math.max(0, state.totalUnseenCountSeller - decrementBy);
    },
    incrementUnseenCountSeller: (state) => {
      state.totalUnseenCountSeller += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalUnseenCountSeller.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTotalUnseenCountSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.totalUnseenCountSeller = action.payload;
        state.error = null;
        state.initialized = true;
      })
      .addCase(fetchTotalUnseenCountSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.initialized = true;
      });
  },
});

export const {
  updateTotalUnseenCountSeller,
  decrementUnseenCountSeller,
  incrementUnseenCountSeller,
} = messagesSellerSlice.actions;

export default messagesSellerSlice.reducer;