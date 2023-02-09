const initial = {
  products: [],
  isLoading: false,
  isError: false,
  filters: {},
};

export const ProductReducer = (state = initial, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true };
    case "ERROR":
      return { ...state, isLoading: false, isError: true };
    case "SUCCESS":
      return {
        ...state,
        products: action.payload,
        isLoading: false,
        isError: false,
      };
    case "SET_FILTER":
      return {
        ...state,
        filters: action.payload,
      };
    default:
      return state;
  }
};
