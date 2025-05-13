import axios from 'axios';

import images from '~/assets/images';
import ProductModel from '~/models/ProductModel';

const API_BASE = 'http://localhost:8080/api/v1';
const SERVER_URL_BASE = 'http://localhost:8080';

// localhost:8080/api/v1/product/category/but-viet?sub=bst-but-hoshi&sortBy=price&direction=asc&page=0&size=10
export async function getProductsByCategory({
    category,
    sub,
    sortBy = 'price',
    direction = 'asc',
    page = 0,
    size = 1,
}) {
    console.log('getProductsByCategory');
    const url = new URL(`${API_BASE}/product/${category}`);
    const params = { sub, sortBy, direction, page, size };

    Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
            url.searchParams.append(key, params[key]);
        }
    });

    // console.log(JSON.stringify(url, null, 2))

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // nếu dùng HttpOnly cookie
    });

    if (!response.ok) {
        throw new Error('Không thể tải sản phẩm');
    }
    console.log('getProductsByCategory: ok');
    const data = await response.json();

    // console.log('data: ', JSON.stringify(data, null, 2));

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
                item.soldQty
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


