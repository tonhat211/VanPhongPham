import axiosInstance from '~/api/axiosInstance';
import { toast } from 'react-toastify';

export const logoutUser = async (token) => {
    try {
        const response = await axiosInstance.post('/auth/logout', { token });
        toast.success('Đăng xuất thành công!');
        return response.data.result;
    } catch (error) {
        console.error('Lỗi đăng xuất:', error);
        toast.error('Đăng xuất thất bại');
        throw error;
    }
};