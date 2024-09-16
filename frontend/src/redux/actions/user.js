import axios from "axios";
import { server } from "../../server";

// load user

export const loadUser = () => {
  
  return async (dispatch) => {
    try {
      dispatch({
        type: "loadUserRequest",
      });
      const { data } = await axios.get(`${server}/user/get-user`, {
        withCredentials: true,
      });
      dispatch({
        type: "loadUserSuccess",
        payload: data.user,
       
      });
    } catch (error) {
      dispatch({
        type: "loadUserFailure",
        payload: error.response.data.message,
      });
    }
  };
};


// load seller

export const loadSeller = () => {
  
  return async (dispatch) => {
    try {
      dispatch({
        type: "loadSellerRequest",
      });
      const { data } = await axios.get(`${server}/shop/getSeller`, {
        withCredentials: true,
      });
      dispatch({
        type: "loadSellerSuccess",
        payload: data.seller,
       
      });
    } catch (error) {
      dispatch({
        type: "loadSellerFailure",
        payload: error.response.data.message,
      });
    }
  };
};


// Update User Information 

export const updateUserInformation = (name,phoneNumber,password) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });
      const { data } = await axios.put(`${server}/user/update-user-info`, {
        name,
        phoneNumber,
        password,
      }
      ,{
        withCredentials: true,
      })
      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
       
      });
    } catch (error) {
      dispatch({
        type: "updateUserInfoFailure",
        payload: error.response.data.message,
      });
    }
  }
};

export const clearErrors = () => {
  return { type: "clearErrors" };
};
