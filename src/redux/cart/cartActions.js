import {
  addtoCart,
  apideleteCartItem,
  apiUpdateCartItemQuantity,
  deleteCart,
  getCart,
} from "../../configs/apiCalls";

const setCartLoading = () => {
  return {
    type: "CART_LOADING",
  };
};

const setCartError = () => {
  return {
    type: "CART_ERROR",
  };
};

export const setCartSuccess = (payload) => {
  return {
    type: "CART_SUCCESS",
    payload,
  };
};

export const changeCartItemQuantity = (payload) => {
  return async (dispatch) => {
    try {
      const { status, message } = await apiUpdateCartItemQuantity(payload);

      if (status == false) {
        throw new Error(message);
      }

      dispatch({
        type: "CART_ITEM_QUANTITY",
        payload,
      });
    } catch (error) {
      console.error(error.message);
      dispatch(setCartError());
    }
  };
};

export const deleteItem = (payload) => {
  return async (dispatch) => {
    try {
      const { status } = await apideleteCartItem(payload);

      if (status == false) {
        throw new Error("delete failed");
      }

      dispatch({
        type: "CART_DELETE_ITEM",
        payload,
      });
    } catch (error) {
      console.error(error.message);
      dispatch(setCartError());
    }
  };
};

export const emptyCart = () => {
  return async (dispatch) => {
    try {
      const { status } = await deleteCart();

      if (status) {
        dispatch({
          type: "CART_EMPTY",
        });
      }
    } catch (error) {
      // console.log(error.message);
    }
  };
};

export const fillCart = () => {
  return async (dispatch) => {
    try {
      dispatch(setCartLoading());
      const { data, status, message } = await getCart();

      if (status == false) {
        throw new Error(message);
      }

      dispatch(setCartSuccess(data));
    } catch (error) {
      console.error(error.message);
      dispatch(setCartError());
    }
  };
};

export const addToCartAction = (payload) => {
  return async (dispatch, getState) => {
    try {
      const { cart } = getState();

      const { products } = cart;

      let checkProduct = products.some(
        (e) => e.title == payload.title && e.variant == payload.variant
      );

      let productArray = [];

      if (checkProduct) {
        let updated = products.map((e) =>
          e.title == payload.title && e.variant == payload.variant ? payload : e
        );

        productArray = updated;
      } else {
        productArray = [...products, payload];
      }

      const { status, message } = await addtoCart(productArray);

      if (status == false) {
        throw new Error(message);
      }

      dispatch(setCartSuccess(productArray));
    } catch (error) {
      console.error(error.message);
      dispatch(setCartError());
    }
  };
};
