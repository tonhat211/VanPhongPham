import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addToCart, getCart, removeCartItem, updateCartItemQuantity } from '~/api/cartApi';
import { SERVER_URL_BASE } from '~/api/axiosInstance';

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    const data = await getCart();
    return data.items.map(item => ({
        ...item,
        imageUrl: SERVER_URL_BASE+"/"+ item.imageUrl
    }));
});

export const addCartItem = createAsyncThunk('cart/addItem', async ({ productDetailId, quantity }) => {
    await addToCart(productDetailId, quantity);
    return { productDetailId, quantity };
});

export const updateCartItem = createAsyncThunk('cart/updateItem', async ({ productDetailId, quantity }) => {
    await updateCartItemQuantity(productDetailId, quantity);
    return { productDetailId, quantity };
});

export const removeCartItemById = createAsyncThunk('cart/removeItem', async (productDetailId) => {
    await removeCartItem(productDetailId);
    return productDetailId;
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addCartItem.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.productDetailId !== action.payload);

            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                const { productDetailId, quantity } = action.payload;
                const item = state.items.find((item) => item.productDetailId === productDetailId);
                if (item) item.quantity = quantity;
            })
            .addCase(removeCartItemById.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.productDetailId !== action.payload);
            });
    },
});

export default cartSlice.reducer;
