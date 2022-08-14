import { PRODUCT_ACTION_TYPES } from "./productTypes";

export const productReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_ACTION_TYPES.PRODUCT_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_ACTION_TYPES.PRODUCT_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_ACTION_TYPES.PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
