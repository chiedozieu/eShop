import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  product: null,
  products: [],
  allProducts: [],
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("productCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("productCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase("productCreateFailure", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    // get all products of a shop

    .addCase("getAllProductsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.success = true;
    })
    .addCase("getAllProductsShopFailure", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    // delete a shop products by owner

    .addCase("deleteProductRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteProductSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase("deleteProductFailure", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

     // get all products

     .addCase("getAllProductsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsSuccess", (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
      state.success = true;
    })
    .addCase("getAllProductsFailure", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    .addCase("clearErrors", (state) => {
      state.error = null;
    });

});



