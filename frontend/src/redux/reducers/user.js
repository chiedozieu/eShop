import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("loadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("loadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("loadUserFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    // Update user information

    .addCase("updateUserInfoRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateUserInfoSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("updateUserInfoFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })


    // Update user addresses 

    .addCase("updateUserAddressRequest", (state) => {
      state.addressLoading = true;
    })
    .addCase("updateUserAddressSuccess", (state, action) => {
      state.addressLoading = false; 
      state.successMessage = action.payload.successMessage
      state.user = action.payload.user;
    })
    .addCase("updateUserAddressFailure", (state, action) => {
      state.addressLoading  = false;
      state.error = action.payload;
    })

    // delete user address

    .addCase("deleteUserAddressRequest", (state) => {
      state.addressLoading = true;
    })
    .addCase("deleteUserAddressSuccess", (state, action) => {
      state.addressLoading = false;
      state.successMessage = action.payload.successMessage
      state.user = action.payload.user;
    })  
    .addCase("deleteUserAddressFailure", (state, action) => {
      state.addressLoading  = false; 
      state.error = action.payload;
    })



    .addCase("clearErrors", (state) => {
      state.error = null;
      state.loading = false;
    })

    .addCase("clearMessages", (state) => {
      state.successMessage = null;
      state.loading = false;
    });
});
