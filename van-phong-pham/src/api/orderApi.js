import OrderItemModel from '~/models/OrderItemModel';
import axiosInstance, { SERVER_URL_BASE } from './axiosInstance';

import OrderModel from '~/models/OrderModel';

// {
//   "userId": 1,
//   "cartIds": [1, 2],
//   "receiverInfo": "Nguyen Van A, 123 Đường ABC, Quận 1, TP.HCM, 0909123456",
//   "shippingFee": 20000,
//   "voucherCode": null,
//   "note": "Giao giờ hành chính"
// }
export async function addOrder({ cartIds, receiverInfo, shippingFee, voucherCode, note }) {
    console.log('Add order');
    const userStr = localStorage.getItem('user'); // hoặc dữ liệu bạn đang dùng
    const user = JSON.parse(userStr);
    const userId = user.id;

    let url = `/orders/add`;

    const params = { userId, cartIds, receiverInfo, shippingFee, voucherCode, note };

    const response = await axiosInstance.post(url, params);

    const data = response.data;

    const result = data.success; //true or false
    return result;
}

export async function getOrder() {
    console.log('getOrder');
    const userStr = localStorage.getItem('user');
    const user = JSON.parse(userStr);
    const userId = user.id;
    let url = `/orders/user`;
    const params = {userId};

    // console.log(JSON.stringify(params, null, 2));

    const response = await axiosInstance.post(url,  params );

    const data = response.data;
    // console.log('data:' +JSON.stringify(data,null,2));

    // constructor(id, orderItems, createdAt, updatedAt, initMoney, payedMoney, status)
    const orders = data.map(
        (item) =>
            new OrderModel(
                item.id,
                item.orderItems.map(
                    (orderItem) =>
                        new OrderItemModel(
                            orderItem.id,
                            orderItem.orderId,
                            orderItem.productId,
                            orderItem.productName,
                            orderItem.classificationName,
                            orderItem.qty,
                            `${SERVER_URL_BASE}/${orderItem.thumbnail}`,
                            orderItem.priceUnit,
                        ),
                ),
                item.createdAt,
                item.updatedAt,
                item.initMoney,
                item.payedMoney,
                item.status,
                item.receiverInfo,
            ),
    );
    console.log('orders: ' + JSON.stringify(orders,null,2));
    return orders;
}

export async function updateStatus({ id, status }) {
    console.log('updateStatus order');
    const userStr = localStorage.getItem('user'); // hoặc dữ liệu bạn đang dùng
    const user = JSON.parse(userStr);
    const userId = user.id;

    let url = `/orders/update/status/user`;

    const params = { id, status, userId };

    const response = await axiosInstance.post(url, params);

    const data = response.data;
    return data;
}
