import axios from "axios";
import { PRODUCT_ACTION_TYPES } from "./productTypes";

export const fetchProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_ACTION_TYPES.PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({ type: PRODUCT_ACTION_TYPES.PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_ACTION_TYPES.PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
