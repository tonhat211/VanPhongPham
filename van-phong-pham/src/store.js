import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '~/pages/productCardsPage/cartSlice';
import customReducer from '~/pagesAdmin/Customer/customerSlice';
import employeeReducer from '~/pagesAdmin/Employee/employeeSlice';
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        customer: customReducer,
        employees: employeeReducer,
    },
});
