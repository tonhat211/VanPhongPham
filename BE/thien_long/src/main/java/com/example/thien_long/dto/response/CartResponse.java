package com.example.thien_long.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartResponse {
    Long cartId;
    List<CartItemResponse> items;
    double totalPrice;

    public CartResponse(List<CartItemResponse> items) {
        this.items = items;
        double totalPrice = 0;
        for(CartItemResponse item : items) {
            totalPrice += item.getPrice();
        }
        this.totalPrice = totalPrice;
    }
}
