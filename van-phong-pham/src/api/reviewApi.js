import OrderItemModel from '~/models/OrderItemModel';
import axiosInstance, { SERVER_URL_BASE } from './axiosInstance';

import images from '~/assets/images';
import OrderModel from '~/models/OrderModel';
import ProductDetailModel from '~/models/ProductDetailModel';
import ProductModel from '~/models/ProductModel';

// {
//   "userId": 1,
//   "cartIds": [1, 2],
//   "receiverInfo": "Nguyen Van A, 123 Đường ABC, Quận 1, TP.HCM, 0909123456",
//   "shippingFee": 20000,
//   "voucherCode": null,
//   "note": "Giao giờ hành chính"
// }
export async function addReviews({ orderId, reviewItems }) {
    console.log('Add review');
        console.log("reviewItems: " + JSON.stringify(reviewItems,null,2));

    const userStr = localStorage.getItem('user'); // hoặc dữ liệu bạn đang dùng
    const user = JSON.parse(userStr);
    const userId = user.id;

    let url = `/reviews/add`;

    const params = { userId, orderId, reviewItems };
  console.log("orderId: " + JSON.stringify(orderId,null,2));
    console.log("params: " + JSON.stringify(params,null,2));
    const response = await axiosInstance.post(url, params);

    const data = response.data;

    return data;
}

