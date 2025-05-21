class ProductDetailModel {
    constructor(id, name, label,brand, avgRating, totalReview, soldQty, description, details, images, reviews) {
        this.id = id;
        this.name = name;
        this.label = label;
        this.brand = brand;
        this.avgRating = avgRating;
        this.totalReview = totalReview;
        this.soldQty = soldQty;
        this.description = description;
        this.details = details;
        this.images = images;
        this.reviews = reviews;
    }

    static Detail = class {
        constructor(id, title, initPrice, price, qty, discount) {
            this.id = id;
            this.title = title;
            this.initPrice = initPrice;
            this.price = price;
            this.qty = qty;
            this.discount = discount;
        }
    };

    static Image = class {
        constructor(url) {
            this.url = url;
        }
    };

    static Review = class {
        constructor(id, userId, userName, rating, content, productDetail) {
            this.id = id;
            this.userId = userId;
            this.userName = userName;
            this.rating = rating;
            this.content = content;
            this.productDetail = productDetail;
        }
    };
}

export default ProductDetailModel;
