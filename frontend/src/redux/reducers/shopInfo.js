import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  shop: null,
};

export const shopInfoReducer = createReducer(initialState, (builder) => {
  builder
  .addCase("getShopInfoRequest", (state) => {
    state.isLoading = true;
  })
  .addCase("getShopInfoSuccess", (state, action) => {
    state.isLoading = false;
    state.shop = action.payload;
    state.success = true;
  })
  .addCase("getShopInfoFailure", (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  })

    .addCase("clearErrors", (state) => {
      state.error = null;
      state.isLoading = false;
    })

});
