import CartItemModel from '~/models/CartItemModel';
import axiosInstance, { SERVER_URL_BASE } from './axiosInstance';
import { toast } from 'react-toastify';

export const getCart = async () => {
    try {
        const response = await axiosInstance.get(`/cart`);
        return response.data.result;
    } catch (error) {
        console.error('Lỗi lấy giỏ hàng:', error);
        toast.error('Không thể tải giỏ hàng');
        throw error.response?.data.result || { message: 'Lỗi lấy giỏ hàng' };
    }
};

export const addToCart = async (productDetailId, quantity) => {
    const response = await axiosInstance.post('/cart/add', {
        productDetailId,
        quantity,
    });
    return response.data.result;
};

export const updateCartItemQuantity = async (productDetailId, quantity) => {
    try {
        const response = await axiosInstance.put(`/cart/update`, {
            productDetailId,
            quantity,
        });
        toast.success('Cập nhật số lượng thành công');
        return response.data.result || null;
    } catch (error) {
        console.error('Lỗi cập nhật số lượng:', error);
        toast.error('Cập nhật số lượng thất bại');
        throw error.response?.data.result || { message: 'Lỗi cập nhật giỏ hàng' };
    }
};

export const removeCartItem = async (productDetailId) => {
    try {
        const response = await axiosInstance.delete(`/cart/remove/${productDetailId}`);
        toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
        return response.data.result || null;
    } catch (error) {
        console.error('Lỗi xóa sản phẩm:', error);
        toast.error('Xóa sản phẩm thất bại');
        throw error.response?.data.result || { message: 'Lỗi xóa sản phẩm' };
    }
};

export async function getCartByIds({
    ids,
}) {
    console.log("get cartitem by ids api ids: " +ids);
    ids = ids.join(',');
    let url = `/cart/checkout`;
    const params = { ids };

    console.log(JSON.stringify(params,null,2));

    const response = await axiosInstance.get(url, { params });

    const data = response.data;

        console.log("response.data result" +JSON.stringify(data.result,null,2));



    const cartItems = data.result.map(
        (item) =>
            new CartItemModel(
                item.id,
                item.productDetailId,
                `${SERVER_URL_BASE}/${item.imageUrl}`,
                item.productName,
                item.brandName,
                item.initPrice,
                item.price,
                item.quantity,
                item.discount,
            ),
    );

    console.log(JSON.stringify(cartItems,null,2));

    return cartItems;
}

