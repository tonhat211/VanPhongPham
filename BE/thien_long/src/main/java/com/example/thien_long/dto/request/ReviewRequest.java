package com.example.thien_long.dto.request;

import com.example.thien_long.model.Review;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRequest {
    private long userId;
    private long orderId;
    private List<ReviewItemRequest> reviewItems;
}
