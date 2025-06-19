import axiosInstance from './axiosInstance';

export const getAll = async () => {
    try {
        const response = await axiosInstance.get('/admin/employee/all');
        return response.data.result;
    } catch (error) {
        throw error.response?.data.result || { message: 'Lỗi khi tải danh sách' };
    }
};

export const updateAction = async (id, action, value) => {
    try {
        const response = await axiosInstance.put('/admin/employee/update-action', {
            id,
            action,
            value
        });
        return response.data.result;
    } catch (error) {
        throw error.response?.data.result || { message: 'Lỗi khi cập nhật trạng thái' };
    }
};

