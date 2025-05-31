class OrderModel {
    constructor(id, orderItems, createdAt, updatedAt, initMoney, payedMoney, status) {
      this.id = id;
      this.orderItems = orderItems;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.initMoney = initMoney;
      this.payedMoney = payedMoney;
      this.status = status;
    }
  
  }
  
  export default OrderModel;