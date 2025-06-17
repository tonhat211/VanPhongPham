import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '~/pages/productCardsPage/cartSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});
