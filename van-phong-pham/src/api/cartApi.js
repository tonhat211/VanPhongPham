import axiosInstance from './axiosInstance';
import { toast } from 'react-toastify';

export const getCart = async () => {
    try {
        const response = await axiosInstance.get(`/cart`);
        return response.data;
    } catch (error) {
        console.error('Lỗi lấy giỏ hàng:', error);
        toast.error('Không thể tải giỏ hàng');
        throw error.response?.data || { message: 'Lỗi lấy giỏ hàng' };
    }
};

export const updateCartItemQuantity = async (productDetailId, quantity) => {
    try {
        const response = await axiosInstance.put(`/cart/update`, {
            productDetailId,
            quantity,
        });
        toast.success('Cập nhật số lượng thành công');
        return response.data;
    } catch (error) {
        console.error('Lỗi cập nhật số lượng:', error);
        toast.error('Cập nhật số lượng thất bại');
        throw error.response?.data || { message: 'Lỗi cập nhật giỏ hàng' };
    }
};

export const removeCartItem = async (productDetailId) => {
    try {
        const response = await axiosInstance.delete(`/cart/remove/${productDetailId}`);
        toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
        return response.data;
    } catch (error) {
        console.error('Lỗi xóa sản phẩm:', error);
        toast.error('Xóa sản phẩm thất bại');
        throw error.response?.data || { message: 'Lỗi xóa sản phẩm' };
    }
};
