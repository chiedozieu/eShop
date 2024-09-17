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

export const updateUserInformation = (name, phoneNumber, password) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });
      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          name,
          phoneNumber,
          password,
        },
        {
          withCredentials: true,
        }
      );
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
  };
};

// Update User addresses

export const updateUserAddress = (
  selectedState,
  selectedCity,
  address1,
  address2,
  addressType
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "updateUserAddressRequest",
      });
      const { data } = await axios.put(
        `${server}/user/update-user-addresses`,
        {
          selectedState,
          selectedCity,
          address1,
          address2,
          addressType,
        },
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: "updateUserAddressSuccess",
        payload: {
          successMessage: "Address successfully updated",
          user: data.user,
        },
      });
    } catch (error) {
      dispatch({
        type: "updateUserAddressFailure",
        payload: error.response.data.message,
      });
    }
  };
};

// delete user address

export const deleteUserAddress = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "deleteUserAddressRequest",
      });
      const { data } = await axios.delete(
        `${server}/user/delete-user-address/${id}`,

        {
          withCredentials: true,
        }
      );
      dispatch({
        type: "deleteUserAddressSuccess",
        payload: {
          successMessage: 'Address deleted successfully',
          user: data.user,
        }
      });
    } catch (error) { 
      dispatch({
        type: "deleteUserAddressFailure",
        payload: error.response.data.message,
      });
    }
  };
};

export const clearErrors = () => {
  return { type: "clearErrors" };
};
export const clearMessages = () => {
  return { type: "clearMessages" };
};
