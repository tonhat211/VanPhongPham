import OrderItemModel from '~/models/OrderItemModel';
import axiosInstance, { SERVER_URL_BASE } from './axiosInstance';

import images from '~/assets/images';
import OrderModel from '~/models/OrderModel';
import ProductDetailModel from '~/models/ProductDetailModel';
import ProductModel from '~/models/ProductModel';
import AddressModel from '~/models/AddressModel';
import AddressItemModel from '~/models/AreaModel';
import AreaModel from '~/models/AreaModel';
import Area from '~/models/Area';

// {
//   "userId": 1,
//   "cartIds": [1, 2],
//   "receiverInfo": "Nguyen Van A, 123 Đường ABC, Quận 1, TP.HCM, 0909123456",
//   "shippingFee": 20000,
//   "voucherCode": null,
//   "note": "Giao giờ hành chính"
// }

const CACHE_TTL = 24 * 60 * 60 * 1000;

export async function addAddress({ name, phone, province, ward, detail, isDefault }) {
    console.log('Add address');
    const userStr = localStorage.getItem('user'); // hoặc dữ liệu bạn đang dùng
    const user = JSON.parse(userStr);
    const userId = user.id;

    let url = `/addresses/add`;

    const params = { userId, name, phone, province, ward, detail, isDefault };

    const response = await axiosInstance.post(url, params);

    const data = response.data;

    const addresses = data.addresses.map(
        (item) =>
            new AddressModel(item.id, item.name, item.phone, item.province, item.ward, item.detail, item.isDefault),
    );
    const areas = data.areas.map((item) => new AreaModel(item.id, item.name, item.code));
    data.addresses = addresses;
    data.areas = areas;
    return data;
}

export async function getAddress() {
    console.log('getAddress');
    const userStr = localStorage.getItem('user');
    const user = JSON.parse(userStr);
    const userId = user.id;
    let url = `/addresses/user`;
    const params = { userId };

    const response = await axiosInstance.post(url, params);

    const data = response.data;

    const addresses = data.addresses.map(
        (item) =>
            new AddressModel(item.id, item.name, item.phone, item.province, item.ward, item.detail, item.isDefault),
    );
    const areas = data.areas.map((item) => new AreaModel(item.id, item.name, item.code));

    // console.log('addresses: ' + JSON.stringify(addresses,null,2));
    return { addresses, areas };
}

export async function editAddress({ id, name, phone, province, ward, detail, isDefault }) {
    console.log('edit Address');
    const userStr = localStorage.getItem('user'); // hoặc dữ liệu bạn đang dùng
    const user = JSON.parse(userStr);
    const userId = user.id;

    let url = `/addresses/update`;

    const params = { userId, id, name, phone, province, ward, detail, isDefault };

    const response = await axiosInstance.post(url, params);

    const data = response.data;
    const addresses = data.addresses.map(
        (item) =>
            new AddressModel(item.id, item.name, item.phone, item.province, item.ward, item.detail, item.isDefault),
    );
    const areas = data.areas.map((item) => new AreaModel(item.id, item.name, item.code));
    data.addresses = addresses;
    data.areas = areas;
    return data;
}

export async function deleteAddress({ id }) {
    console.log('delete Address');
    const userStr = localStorage.getItem('user'); // hoặc dữ liệu bạn đang dùng
    const user = JSON.parse(userStr);
    const userId = user.id;

    let url = `/addresses/delete`;

    const params = { userId, id };

    const response = await axiosInstance.post(url, params);

    const data = response.data;

    return data;
}

export async function getProvince() {
    console.log('get province');

    let url = `/addresses/provinces`;

    const response = await axiosInstance.get(url);

    const data = response.data;
    const provinces = data.map((item) => new AreaModel(item.id, item.name, item.code, item.children));
    return provinces;
}

export async function getWard({ provinceCode }) {
    console.log('get ward');

    let url = `/addresses/wards`;
    const params = { provinceCode };

    const response = await axiosInstance.get(url, { params });

    const data = response.data;
    const wards = data.map((item) => new AreaModel(item.id, item.name, item.code));
    return wards;
}

const CACHE_AREAS = 'areas';
export const CACHE_AREAMAP = "area_map"
export async function getAreas() {
    console.log('get areas');
    const AreasRaw = localStorage.getItem(CACHE_AREAS);
    const AreaMapraw = localStorage.getItem(CACHE_AREAMAP);
    if (AreasRaw && AreaMapraw) {
        const { data, ts } = JSON.parse(AreasRaw);
        if (Date.now() - ts < CACHE_TTL) return data;
    }

    let url = `/addresses/areas`;

    const response = await axiosInstance.get(url);

    const data = response.data;
    const success = data.success;
    let provinces;
    const areaMap = new Map();
    if (success) {
        provinces = data.provinces.map((item) => {
            const children = item.children.map((ward) => {
                areaMap.set(ward.code, ward.name);
                return new AreaModel(ward.id, ward.name, ward.code)});
            areaMap.set(item.code, item.name);
            return new AreaModel(item.id, item.name, item.code, children);
        });
    }
    // console.log("Areas: " + JSON.stringify(provinces,null,2));
    localStorage.setItem(CACHE_AREAS, JSON.stringify({ data: provinces, ts: Date.now() }));  // luu cache cua areas
    const mapObj = Object.fromEntries(areaMap);
    localStorage.setItem(CACHE_AREAMAP, JSON.stringify({  data: mapObj }));  // luu cache cua areaMap

    return provinces;
}
