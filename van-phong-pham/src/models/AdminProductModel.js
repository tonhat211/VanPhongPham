class AdminProductModel {
    constructor(id, name, categoryCode, categoryTitle, brandCode, brandName, soldQty, thumbnail) {
        this.id = id;
        this.name = name;
        this.categoryCode = categoryCode;
        this.categoryTitle = categoryTitle;
        this.brandCode = brandCode;
        this.brandName = brandName;
        this.soldQty = soldQty;
        this.thumbnail = thumbnail;
    }

    //   {
    //     "id": 3,
    //     "name": "Fast-drying gel pen - smooth writing Flexgel TL",
    //     "categoryCode": "but-viet",
    //     "categoryTitle": "Bút viết",
    //     "brandCode": "bizner",
    //     "brandName": "Bizner",
    //     "soldQty": 467,
    //     "thumbnail": "images/thumbnails/product-3.webp"
    // },
}

export default AdminProductModel;
