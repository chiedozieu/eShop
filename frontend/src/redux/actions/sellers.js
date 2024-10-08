import axios from "axios";
import { server } from "../../server";

// get all sellers admin

export const getAllSellers = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "getAllSellerRequest",
      });
      const { data } = await axios.get(`${server}/shop/admin-all-sellers`, {
        withCredentials: true,
      });
      dispatch({
        type: "getAllSellerSuccess",
        payload: data.sellers,
      });
    } catch (error) {
      dispatch({
        type: "getAllSellerFailure",
        payload: error.response.data.message,
      });
    }
  };
};
