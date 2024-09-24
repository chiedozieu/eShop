import axios from "axios";
import { server } from "../../server";
import { useParams } from "react-router-dom";

export const getShopInfo = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getShopInfoRequest",
    });
    const { id } = useParams();
    const { data } = await axios.get(`${server}/shop/get-shop-info/${id}`);
    console.log('redux-actions: id, data', id, data)

    dispatch({
      type: "getShopInfoSuccess",
      payload: data.shop,
    });
  } catch (error) {
    dispatch({
      type: "getShopInfoFailure",
      // payload: error.response.data.message,
    });
  }
};
