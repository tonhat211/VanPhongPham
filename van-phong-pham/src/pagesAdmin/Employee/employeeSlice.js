import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getAll, updateAction} from '~/api/employeeApi';

// GET all employees
export const fetchEmployees = createAsyncThunk(
    'employees/fetchAll',
    async (_, thunkAPI) => {
        try {
            const data = await getAll(); // <-- Sử dụng đúng employeeApi.getAll
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.message || 'Lỗi khi tải danh sách nhân viên');
        }
    }
);

// UPDATE employee action (chuyển phòng, đổi chức vụ, nghỉ việc, khôi phục)
export const updateEmployeeAction = createAsyncThunk(
    'employees/updateAction',
    async ({ id, action, value }, thunkAPI) => {
        try {
            await updateAction(id, action, value);
            thunkAPI.dispatch(fetchEmployees());
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.message || 'Lỗi khi cập nhật trạng thái');
        }
    }
);

// SLICE
const employeeSlice = createSlice({
    name: 'employees',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateEmployeeAction.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default employeeSlice.reducer;
