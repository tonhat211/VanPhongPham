class Order {
    constructor(id,cartItems,setDate,completeDate,initPrice,totalPrice,status) {
      this.id = id;
      this.cartItems = cartItems;
      this.setDate = setDate;
      this.completeDate = completeDate;
      this.initPrice = initPrice;
      this.totalPrice = totalPrice;
      this.status = status;
    }
  
  }

  
  export default Order;