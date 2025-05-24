import axiosInstance, { SERVER_URL_BASE } from './axiosInstance';
import { toast } from 'react-toastify';
export const registerUser = async (data) => {
    try {
        let url =`auth/register`;
        console.log('Đang gửi:', data);
        const response = await axiosInstance.post(url, data);
        toast.success('Đăng ký thành công!');
        return response.data;
    } catch (error) {
        console.log('Lỗi đăng ký:', error);
        throw error.response?.data || { message: 'Đăng ký thất bại' };
    }
};