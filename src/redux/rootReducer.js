import { combineReducers } from "redux";
import { CartReducer } from "./cart/cartReducer";
import { ProductReducer } from "./product/productReducer";
import { UserReducer } from "./user/userReducer";

export const RootReducer = combineReducers({
  products: ProductReducer,
  user: UserReducer,
  cart: CartReducer,
});
