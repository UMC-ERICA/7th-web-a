import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import modalReducer from "../features/modal/mordalSlice"

export default configureStore({
  reducer: {
    cart: cartReducer,
    // modal: modalReducer,
  },
});