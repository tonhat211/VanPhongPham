import axiosInstance, { SERVER_URL_BASE } from './axiosInstance';
import { toast } from 'react-toastify';

export const updateUserInfo = async (data) => {
    try {
        const response = await axiosInstance.put(`/user/update`, data);
        toast.success('Thông tin đã được cập nhật!');
        return response.data.result || null;
    } catch (error) {
        console.error('Lỗi cập nhật thông tin:', error);
        toast.error('Cập nhật thông tin thất bại');
        throw error.response?.data.result || { message: 'Lỗi cập nhật thông tin' };
    }
};
