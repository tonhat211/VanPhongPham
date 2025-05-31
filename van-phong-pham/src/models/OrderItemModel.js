class OrderItemModel {
    constructor(id, orderId, productID, productName, classificationName, qty, thumbnail, priceUnit) {
      this.id = id;
      this.orderId = orderId;
      this.productID = productID;
      this.productName = productName;
      this.classificationName = classificationName;
      this.qty = qty;
      this.thumbnail = thumbnail;
      this.priceUnit = priceUnit;
    }
  
  }

  
  export default OrderItemModel;