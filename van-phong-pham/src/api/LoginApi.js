import axiosInstance from '~/api/axiosInstance';
import { toast } from 'react-toastify';

export const loginUser = async (data) => {
    try {
        let url =`/auth/login`;
        console.log('Đang gửi:', data);
        const response = await axiosInstance.post(url, data);
        toast.success('Đăng nhập thành công!');
        return response.data;
    } catch (error) {
        console.log('Lỗi đăng nhập:', error);
        throw error.response?.data || { message: 'Đăng nhập thất bại' };
    }
};