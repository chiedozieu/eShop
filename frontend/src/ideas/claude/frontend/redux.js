import { createReducer, createAction } from "@reduxjs/toolkit";

// Actions
export const createProductRequest = createAction("createProductRequest");
export const createProductSuccess = createAction("createProductSuccess");
export const createProductFailure = createAction("createProductFailure");

// Initial state
const initialState = {
  products: [],
  loading: false,
  error: null,
};

// Reducer
export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createProductRequest, (state) => {
      state.loading = true;
    })
    .addCase(createProductSuccess, (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
      state.error = null;
    })
    .addCase(createProductFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

// Thunk action creator
export const createProduct = (productData) => async (dispatch) => {
  dispatch(createProductRequest());
  try {
    const response = await axios.post('/api/create-product', productData);
    dispatch(createProductSuccess(response.data));
  } catch (error) {
    dispatch(createProductFailure(error.message));
  }
};
