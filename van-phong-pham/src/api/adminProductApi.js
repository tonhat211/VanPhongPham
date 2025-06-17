import AdminProductDetailModel from '~/models/AdminProductDetailModel';
import axiosInstance, { SERVER_URL_BASE } from './axiosInstance';

import images from '~/assets/images';
import AdminProductModel from '~/models/AdminProductModel';
import ProductDetailModel from '~/models/ProductDetailModel';
import ProductModel from '~/models/ProductModel';
import { toast } from 'react-toastify';

export async function getAdminProductsAllCategory({ sortBy = 'price', direction = 'asc', page = 0, size = 20 }) {
    console.log('getAdminProducts All Category');
    let url = `/admin/products`;
    const params = { page, size, sortBy, direction };
    // console.log(JSON.stringify(params,null,2));

    const response = await axiosInstance.get(url, { params });

    const data = response.data;

    const products = data.content.map(
        (item) =>
            new AdminProductModel(
                item.id,
                item.name,
                item.categoryCode,
                item.categoryTitle,
                item.brandCode,
                item.brandName,
                item.soldQty,
                `${SERVER_URL_BASE}/${item.thumbnail}`,
            ),
    );

    return {
        content: products,
        pageInfo: {
            page: data.pageable.pageNumber,
            size: data.pageable.pageSize,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            first: data.first,
            last: data.last,
        },
    };
}

export async function getAdminProductsByCategory({
    category,
    sortBy = 'price',
    direction = 'asc',
    page = 0,
    size = 20,
}) {
    console.log('getAdminProductsByCategory');
    let url = `/admin/products/${category}`;
    const params = { page, size, sortBy, direction };
    // console.log(JSON.stringify(params,null,2));

    const response = await axiosInstance.get(url, { params });

    const data = response.data;

    const products = data.content.map(
        (item) =>
            new AdminProductModel(
                item.id,
                item.name,
                item.categoryCode,
                item.categoryTitle,
                item.brandCode,
                item.brandName,
                item.soldQty,
                `${SERVER_URL_BASE}/${item.thumbnail}`,
            ),
    );

    return {
        content: products,
        pageInfo: {
            page: data.pageable.pageNumber,
            size: data.pageable.pageSize,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            first: data.first,
            last: data.last,
        },
    };
}

export async function getAdminProductDetails({ id }) {
    console.log('getAdminProductDetails');
    let url = `/admin/products/detail/${id}`;
    const response = await axiosInstance.get(url);
    const data = response.data;

    const classifications = data.productDetails.map(
        (item) =>
            new AdminProductDetailModel.Detail(
                item.id,
                item.title,
                item.initPrice,
                item.price,
                item.qty,
                item.isDeleted,
                item.soldQty,
                item.product,
                item.discount,
            ),
    );
    const images = data.images.map(
        (item) => new AdminProductDetailModel.Image(item.id, `${SERVER_URL_BASE}/${item.name}`),
    );

    const product = new AdminProductDetailModel(
        data.id,
        data.name,
        data.label,
        data.avgRating,
        data.totalReview,
        data.totalRemainQty,
        data.totalSoldQty,
        `${SERVER_URL_BASE}/${data.thumbnailUrl}`,
        data.thumbnailId,
        data.description,
        data.categoryCode,
        data.subCategoryCode,
        data.brandCode,
        data.status,
        classifications,
        images,
    );

    // console.log(JSON.stringify(product),null);

    return product;
}

export async function updateBaseProduct({
    id,
    name,
    label,
    description,
    categoryCode,
    subCategoryCode,
    brandCode,
    status,
    thumbnailId = -1,
}) {
    console.log('updateBaseProduct');
    let url = `/admin/products/edit/base`;
    const params = { id, name, label, description, categoryCode, subCategoryCode, brandCode, status, thumbnailId };
    const response = await axiosInstance.post(url, params);
    const data = response.data;

    const classifications = data.productDetails.map(
        (item) =>
            new AdminProductDetailModel.Detail(
                item.id,
                item.title,
                item.initPrice,
                item.price,
                item.qty,
                item.isDeleted,
                item.soldQty,
                item.product,
                item.discount,
            ),
    );
    const images = data.images.map(
        (item) => new AdminProductDetailModel.Image(item.id, `${SERVER_URL_BASE}/${item.url}`),
    );

    const product = new AdminProductDetailModel(
        data.id,
        data.name,
        data.label,
        data.avgRating,
        data.totalReview,
        data.totalRemainQty,
        data.totalSoldQty,
        `${SERVER_URL_BASE}/${data.thumbnailUrl}`,
        data.thumbnailId,
        data.description,
        data.categoryCode,
        data.subCategoryCode,
        data.brandCode,
        data.status,
        classifications,
        images,
    );

    // console.log(JSON.stringify(product),null);

    return product;
}

export async function updateClassification({
   id, initPrice, price, title,qty 
}) {
    console.log('updateBaseProduct');
    let url = `/admin/products/edit/details`;
    const params = { id, initPrice, price, title,qty };
    const response = await axiosInstance.post(url, params);
    const success = response.data.success;
    const data = response.data.classification;
    const classification = new AdminProductDetailModel.Detail(
                data.id,
                data.title,
                data.initPrice,
                data.price,
                data.qty,
               
            )
    return {
        success, classification
    };
}
