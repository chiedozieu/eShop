import axios from "axios";
import { server } from "../../server";

// create product

export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "productCreateRequest",
    });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/product/create-product`,
      newForm,
      config
    );
    dispatch({
      type: "productCreateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "productCreateFailure",
      payload: error.response.data.message,
    });
  }
};

// get all shop products

export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });

  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailure",
      payload: error.response.data.message,
    });
  }
};


// delete shop product

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`, {
        withCredentials: true
      });
    
    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });

  } catch (error) { 
    dispatch({
      type: "deleteProductFailure",
      payload: error.response.data.message,
    });
  }
};

// get all shop products site

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(
      `${server}/product/get-all-products`, {withCredentials: true} 
    );
    
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });

  } catch (error) {
    dispatch({
      type: "getAllProductsFailure",
      payload: error.response.data.message,
    });
  }
};




