package com.example.thien_long.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewItemRequest {
    private long productId;
    private String classificationName;
    private int rating;
    private String content;

}
