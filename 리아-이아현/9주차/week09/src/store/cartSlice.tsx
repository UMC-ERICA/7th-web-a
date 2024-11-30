import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import rawCartItems from "../constants/cartItems";

interface CartItem {
  id: string;
  title: string;
  singer: string;
  price: number;
  img: string;
  amount: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalPrice: number;
}

const cartItems: CartItem[] = rawCartItems.map((item) => ({
  ...item,
  price: Number(item.price),
}));

const initialState: CartState = {
  items: cartItems,
  totalAmount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.amount += 1;
      }
    },
    decrement: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        if (item.amount > 1) {
          item.amount -= 1;
        } else {
          state.items.splice(itemIndex, 1);
        }
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    calculateTotals: (state) => {
      let totalAmount = 0;
      let totalPrice = 0;

      state.items.forEach((item) => {
        totalAmount += item.amount;
        totalPrice += item.price * item.amount;
      });

      state.totalAmount = totalAmount;
      state.totalPrice = totalPrice;
    },
  },
});

export const { increment, decrement, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
