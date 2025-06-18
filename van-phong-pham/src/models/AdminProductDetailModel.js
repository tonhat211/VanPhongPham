class AdminProductDetailModel {
    constructor(id, name, label, avgRating, totalReview, totalRemainQty, totalSoldQty, thumbnailUrl, thumbnailId,
        description, categoryCode, subCategoryCode, brandCode, status,
        classifications, images
    ) {
        this.id = id;
        this.name = name;
        this.label = label;
        this.avgRating = avgRating;
        this.totalReview = totalReview;
        this.totalRemainQty = totalRemainQty;
        this.totalSoldQty = totalSoldQty;
        this.thumbnailUrl = thumbnailUrl;
        this.thumbnailId = thumbnailId;
        this.description = description;
        this.categoryCode = categoryCode;
        this.subCategoryCode = subCategoryCode;
        this.brandCode = brandCode;
        this.status = status;
        this.classifications = classifications;
        this.images = images;
    }

    static Detail = class {
        constructor(id, title, initPrice, price, qty, isDeleted, soldQty, product, discount) {
            this.id = id;
            this.title = title;
            this.initPrice = initPrice;
            this.price = price;
            this.qty = qty;
            this.isDeleted = isDeleted;
            this.soldQty = soldQty;
            this.product = product;
            this.discount = discount;
        }
    };

    static Image = class {
        constructor(id,url) {
            this.id = id;
            this.url = url;
        }
    };

}

export default AdminProductDetailModel;

// {
//     "id": 1,
//     "name": "Bút gel Quick Dry Thiên Long GEL-066 - Premium Tip - Vật liệu tái chế",
//     "label": "new",
//     "avgRating": 4.5,
//     "totalReview": 4,
//     "totalRemainQty": 100,
//     "totalSoldQty": 100,
//     "thumbnailUrl": "images/thumbnails/product-1.webp",
//     "thumbnailId": 1,
//     "description": "[\n    {\n        \"type\": \"image\",\n        \"alt\": \"Ảnh sản phẩm\",\n        \"images\": [\n            { \"url\": \"https://product.hstatic.net/1000230347/product/artboard_10_copy_1cfbd17069234cf5bc0ec5d0fd406069.jpg\", \"alt\": \"Ảnh 1 sản phẩm\" },\n            { \"url\": \"https://product.hstatic.net/1000230347/product/artboard_12_fbc96e34731b4aa09e00fa91e8492043.jpg\", \"alt\": \"Ảnh 2 sản phẩm\" },\n            { \"url\": \"https://product.hstatic.net/1000230347/product/artboard_11-2_5bf0b18e76a741649bfd1a528d125f3a.jpg\", \"alt\": \"Ảnh 3 sản phẩm\" }\n        ]\n    },\n    {\n        \"type\": \"text\",\n        \"content\": \"Bút lông bảng Whiteboard Marker Liquid Thiên Long được sản xuất theo chuẩn an toàn quốc tế...\"\n    },\n    {\n        \"type\": \"list\",\n        \"label\": \"TÍNH NĂNG SẢN PHẨM\",\n        \"items\": [\n            \"Thiết kế thông minh, dễ dàng cố định trên mặt phẳng.\",\n            \"Bề rộng nét viết 2.5mm tạo nét chữ rõ nét, dễ đọc.\",\n            \"Làm bằng vật liệu acrylic kết hợp đầu bút dạng bullet giúp êm tay khi viết.\",\n            \"Mực ra đều, màu sắc tươi sáng, nhanh khô và dễ dàng xóa sạch.\",\n            \"Có thể sử dụng trên bảng trắng, thủy tinh và những bề mặt nhẵn bóng.\"\n        ]\n    },\n    {\n        \"type\": \"text\",\n        \"label\": \"Cải tiến:\",\n        \"content\": \"Công nghệ Fast Copying ứng dụng trong IK Copy đã được kiểm chứng và tin dùng bởi chất lượng vận hành đồng bộ, không kẹt giấy.\"\n    }\n]",
//     "categoryCode": "but-viet",
//     "subCategoryCode": "bst-but-hoshi",
//     "brandCode": "thien-long",
//     "status": null,
//     "productDetails": [
//         {
//             "id": 1,
//             "title": "10 cái",
//             "initPrice": 100000.0,
//             "price": 90000.0,
//             "qty": 100,
//             "isDeleted": 0,
//             "soldQty": 0,
//             "product": null,
//             "discount": 10
//         },
//         {
//             "id": 2,
//             "title": "20 cái",
//             "initPrice": 200000.0,
//             "price": 110000.0,
//             "qty": 100,
//             "isDeleted": 0,
//             "soldQty": 0,
//             "product": null,
//             "discount": 45
//         }
//     ],
//     "images": [
//         {
//             "id": 16,
//             "url": "images/products/product-detail-1.webp",
//             "alt": null,
//             "products": null
//         },
//         {
//             "id": 17,
//             "url": "images/products/product-detail-2.webp",
//             "alt": null,
//             "products": null
//         }
//     ]
// }