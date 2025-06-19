import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAll, updateStatus } from '~/api/customerApi';

export const fetchCustomers = createAsyncThunk('customer/fetchAll', async () => {
    const data = await getAll();
    return data;
});

export const changeCustomerStatus = createAsyncThunk('customer/changeStatus', async ({ id, status }) => {
    await updateStatus(id, status);
    return { id, status };
});

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        list: [],
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(changeCustomerStatus.fulfilled, (state, action) => {
                const { id, status } = action.payload;
                const customer = state.list.find((cus) => cus.id === id);
                if (customer) {
                    customer.status = status;
                }
            });
    },
});

export default customerSlice.reducer;
