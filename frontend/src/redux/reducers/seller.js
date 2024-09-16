import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  // isSeller: false,
  // seller: null
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("loadSellerRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("loadSellerSuccess", (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
    })
    .addCase("loadSellerFailure", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
      state.isLoading = false;
    });
});
 