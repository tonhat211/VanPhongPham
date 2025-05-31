package com.example.thien_long.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemResponse {
       long id;
       long orderId;
       long productId;
       String productName;
       String classificationName;
       int qty;
       String thumbnail;
       double priceUnit;

}
