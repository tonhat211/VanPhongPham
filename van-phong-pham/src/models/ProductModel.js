class ProductModel {
    constructor(id, name,label, thumbnail,price, initPrice, avgRating, totalReview, discount,soldQty) {
      this.id = id;
      this.name = name;
      this.label = label;
      this.thumbnail = thumbnail;
      this.price = price;
      this.initPrice = initPrice;
      this.avgRating = avgRating;
      this.totalReview = totalReview;
      this.discount = discount;
      this.soldQty =soldQty;
    }
  
  }

  
  export default ProductModel;