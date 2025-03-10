import {createSlice} from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const cartSlice = createSlice({
    name: 'cart',
  initialState: {
    items: JSON.parse(localStorage.getItem('cartItems')) || [],
  },
  reducers: {
    addToCart: (state, action) => {
        const existingItem = state.items.find(item => item.sid === action.payload.sid);
        if (existingItem) {
          existingItem.quantity += action.payload.quantity;
          toast.success(` đã cập nhật vào giỏ hàng!`);
        } else {
          state.items.push(action.payload);
          toast.success(` đã thêm vào cart!`);
        }
        localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
        const { id, quantity } = action.payload;
        const item = state.items.find(item => item.sid === id);
        if (item) {
          item.quantity = quantity;
          toast.success(` đã cập nhật vào giỏ hàng!`);
        }
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      },
    removefromCart: (state, action) => {
        const p = action.payload
        console.log(p);
      const updatedItems = state.items.filter(item => item.sid !== p);
      state.items = updatedItems;
      toast.info(` xóa khỏi giỏ hàng!`);

      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      toast.info(`đã xóa hết giỏ hàng!`);
      localStorage.removeItem('cartItems');
    },
  },
})
export const { addToCart,updateQuantity, removefromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
