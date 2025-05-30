import axiosInstance from '~/api/axiosInstance';
import { toast } from 'react-toastify';

export const loginUser = async (data) => {
    try {
        let url =`/auth/login`;
        console.log('Đang gửi:', data);
        const response = await axiosInstance.post(url, data);
        toast.success('Đăng nhập thành công!');

        const { token, user } = response.data.result;

        // Lưu thông tin vào localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        return { token, user };
    } catch (error) {
        console.log('Lỗi đăng nhập:', error);
        throw error.response?.data.result || { message: 'Đăng nhập thất bại' };
    }
};