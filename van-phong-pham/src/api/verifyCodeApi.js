import axiosInstance, { SERVER_URL_BASE } from './axiosInstance';

export const verifyCode = async ({ email, code }) => {
    try {
    let url =`/verify-code`;
    console.log('Đang gửi:', code);
    const response = await axiosInstance.post(url, { email, code });
    return response.data;
    } catch (error) {
        console.log('Lỗi gửi:', error);
        throw error.response?.data || { message: 'Gửi thất bại' };
    }
};
