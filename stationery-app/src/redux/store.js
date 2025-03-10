import {configureStore} from "@reduxjs/toolkit";
import cartSlice from "../redux/CartSlice";
 const  store = configureStore({
    reducer:{
        cart:cartSlice
    }
})
export default store;