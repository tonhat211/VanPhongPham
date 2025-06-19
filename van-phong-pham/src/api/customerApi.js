import axiosInstance from './axiosInstance';

export const getAll = async () => {
    try {
        const response = await axiosInstance.get('/admin/custom/all');
        return response.data.result;
    } catch (error) {
        throw error.response?.data.result || { message: 'Lỗi khi tải danh sách khách hàng' };
    }
};

export const updateStatus = async (id, status) => {
    try {
        const response = await axiosInstance.put('/admin/custom/update-status', {
            id,
            status
        });
        return response.data.result;
    } catch (error) {
        throw error.response?.data.result || { message: 'Lỗi khi cập nhật trạng thái' };
    }
};

