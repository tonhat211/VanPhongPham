package com.example.thien_long.dto.response;

import com.example.thien_long.service.Constant;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartItemResponse {
     long id;
     Long productDetailId;
     String imageUrl;
     String productName;
     String brandName;
     double initPrice;
     double price;
     int quantity;
     int discount=0;

     public CartItemResponse(long id, Long productDetailId, String imageUrl, String productName, String brandName, double initPrice, double price, int quantity) {
          this.id = id;
          this.productDetailId = productDetailId;
          this.imageUrl = Constant.THUMBNAIL_IMG_DIR+"/"+ imageUrl;
          this.productName = productName;
          this.brandName = brandName;
          this.initPrice = initPrice;
          this.price = price;
          this.quantity = quantity;
          this.discount = 100 - (int) ((price/initPrice) * 100);
     }
}
