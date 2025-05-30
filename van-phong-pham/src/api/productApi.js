import axiosInstance, { SERVER_URL_BASE } from './axiosInstance';

import images from '~/assets/images';
import ProductDetailModel from '~/models/ProductDetailModel';
import ProductModel from '~/models/ProductModel';

// localhost:8080/api/v1/product/category/but-viet?sub=bst-but-hoshi&sortBy=price&direction=asc&page=0&size=10

export async function getProductsByCategory({
    category,
    sub,
    brands,
    priceRange,
    sortBy = 'price',
    direction = 'asc',
    page = 0,
    size = 5,
}) {
    let url = `/products/${category}`;
    if (!category) url = '/products';
    const params = { sub, brands, priceRange, sortBy, direction, page, size };

    const response = await axiosInstance.get(url, { params });

    const data = response.data;

    const products = data.content.map(
        (item) =>
            new ProductModel(
                item.id,
                item.name,
                item.label,
                `${SERVER_URL_BASE}/${item.thumbnail}`,
                item.price,
                item.initPrice,
                item.avgRating,
                item.totalReview,
                item.discount,
                item.soldQty,
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

export async function getProductDetail({ id }) {
    console.log('getProductDetail: ' + id);
    const url = `/products/detail/${id}`;
    const response = await axiosInstance.get(url);
    const data = response.data;

    const details = data.productDetails.map(
        (item) =>
            new ProductDetailModel.Detail(item.id, item.title, item.initPrice, item.price, item.qty, item.discount),
    );

    const images = data.images.map((item) => new ProductDetailModel.Image(`${SERVER_URL_BASE}/${item}`));

    const reviews = data.reviews.map(
        (item) =>
            new ProductDetailModel.Review(
                item.id,
                item.user.id,
                item.user.name,
                item.rating,
                item.content,
                item.productDetail,
            ),
    );

    const productDetail = new ProductDetailModel(
        data.id,
        data.name,
        data.label,
        data.brand,
        data.avgRating,
        data.totalReview,
        data.soldQty,
        data.description,
        details,
        images,
        reviews,
    );

    // console.log(JSON.stringify(productDetail,null,2));

    return productDetail;
}

export async function getProductsByKeyword({
    keyword,
    sortBy = 'price',
    direction = 'asc',
    page = 0,
    size = 5,
    priceRange,
}) {
    console.log("getProductsByKeyword: " + keyword);
    let url = `/products/search`;
    const params = { keyword, priceRange, sortBy, direction, page, size };

    const response = await axiosInstance.get(url, { params });

    const data = response.data;

    const products = data.content.map(
        (item) =>
            new ProductModel(
                item.id,
                item.name,
                item.label,
                `${SERVER_URL_BASE}/${item.thumbnail}`,
                item.price,
                item.initPrice,
                item.avgRating,
                item.totalReview,
                item.discount,
                item.soldQty,
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
