class OrderItemModel {
    constructor(id, orderId, productId, productName, classificationName, qty, thumbnail, priceUnit) {
      this.id = id;
      this.orderId = orderId;
      this.productId = productId;
      this.productName = productName;
      this.classificationName = classificationName;
      this.qty = qty;
      this.thumbnail = thumbnail;
      this.priceUnit = priceUnit;
    }
  
  }

  
  export default OrderItemModel;