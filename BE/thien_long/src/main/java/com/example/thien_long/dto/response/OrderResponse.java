package com.example.thien_long.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    long id;
    List<OrderItemResponse> orderItems = new ArrayList<>();
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    double initMoney;
    double payedMoney;
    int status;

    public OrderResponse(long id, LocalDateTime createdAt, LocalDateTime updatedAt, double initMoney, double payedMoney, int status) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.initMoney = initMoney;
        this.payedMoney = payedMoney;
        this.status = status;
    }
}
