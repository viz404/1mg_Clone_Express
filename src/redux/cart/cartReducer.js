const initial = {
  products: [],
  isLoading: false,
  isError: false,
};

export const CartReducer = (state = initial, action) => {
  switch (action.type) {
    case "CART_LOADING":
      return { ...state, isLoading: true };
    case "CART_ERROR":
      return { ...state, isLoading: false, isError: true };
    case "CART_SUCCESS":
      return {
        ...state,
        products: action.payload,
        isLoading: false,
        isError: false,
      };
    case "CART_ITEM_QUANTITY":
      let modifiedProducts = state.products.map((e) => {
        if (
          e.product_id == action.payload.product_id &&
          e.variant == action.payload.variant &&
          e.quantity + action.payload.quantity >= 1
        ) {
          e.quantity += action.payload.quantity;
        }
        return e;
      });
      return {
        ...state,
        products: [...modifiedProducts],
      };
    case "CART_DELETE_ITEM":
      let deletedProducts = state.products.filter((e) => {
        if (e.product_id != action.payload.product_id) {
          return e;
        } else {
          if (e.variant != action.payload.variant) {
            return e;
          }
        }
      });
      return {
        ...state,
        products: deletedProducts,
      };
    case "CART_EMPTY":
      return {
        ...state,
        products: [],
      };
    default:
      return state;
  }
};
