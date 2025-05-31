class CartItemModel {
    constructor(id, productDetailId, imageUrl,productName, productDetailTitle,initPrice, price, qty, discount) {
      this.id = id;
      this.productDetailId = productDetailId;
      this.imageUrl = imageUrl;
      this.productName = productName;
      this.productDetailTitle = productDetailTitle;
      this.initPrice = initPrice;
      this.price = price;
      this.qty = qty;
      this.discount = discount;

    }

  
  }

  
  export default CartItemModel;