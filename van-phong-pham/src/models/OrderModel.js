class OrderModel {
    constructor(id, orderItems, createdAt, updatedAt, initMoney, payedMoney, status,receiverInfo) {
      this.id = id;
      this.orderItems = orderItems;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.initMoney = initMoney;
      this.payedMoney = payedMoney;
      this.status = status;
      this.receiverInfo = receiverInfo;
    }
  
  }

  export const WAIT_STATUS = "WAIT";
  export const CONFIRM_STATUS = "CONFIRM";
  export const DELIVERY_STATUS = "DELIVERY";
  export const COMPLETE_STATUS = "COMPLETE";
  export const CONFIRM_COMPLETE_STATUS = "CONFIRM_COMPLETE";
  export const CANCEL_STATUS = "CANCEL";
  export const BACK_STATUS = "BACK";
  export const CONFIRM_BACK_STATUS = "CONFIRM_BACK";
  export const REVIEW_STATUS = "REVIEW";
  export const SUCCESS_STATUS = "SUCCESS";
  export default OrderModel;