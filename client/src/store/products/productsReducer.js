import { PRODUCTS_ACTION_TYPES } from "./productsTypes";

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCTS_ACTION_TYPES.PRODUCTS_REQUEST:
      return { loading: true, products: [] };
    case PRODUCTS_ACTION_TYPES.PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PRODUCTS_ACTION_TYPES.PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCTS_ACTION_TYPES.PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCTS_ACTION_TYPES.PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCTS_ACTION_TYPES.PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCTS_ACTION_TYPES.PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCTS_ACTION_TYPES.PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCTS_ACTION_TYPES.PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCTS_ACTION_TYPES.PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCTS_ACTION_TYPES.PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCTS_ACTION_TYPES.PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCTS_ACTION_TYPES.PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCTS_ACTION_TYPES.PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCTS_ACTION_TYPES.PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCTS_ACTION_TYPES.PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCTS_ACTION_TYPES.PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCTS_ACTION_TYPES.PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCTS_ACTION_TYPES.PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] };
    case PRODUCTS_ACTION_TYPES.PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCTS_ACTION_TYPES.PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
