import AdminProductDetailModel from '~/models/AdminProductDetailModel';
import axiosInstance, { SERVER_URL_BASE } from './axiosInstance';

import images from '~/assets/images';
import AdminProductModel from '~/models/AdminProductModel';
import ProductDetailModel from '~/models/ProductDetailModel';
import ProductModel from '~/models/ProductModel';
import { toast } from 'react-toastify';
import { uploadImage, uploadImageList } from './uploadApi';
import OrderModel from '~/models/OrderModel';
import OrderItemModel from '~/models/OrderItemModel';

export async function getAllOrder() {
    console.log('getAllOrder');
    let url = `/admin/orders`;
    const params = {};

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

    let url = `/admin/orders/update/status`;

    const params = { id, status };

    const response = await axiosInstance.post(url, params);

    const data = response.data;
    return data;
}
