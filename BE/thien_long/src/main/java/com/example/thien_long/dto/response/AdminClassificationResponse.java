package com.example.thien_long.dto.response;

import com.example.thien_long.model.Image;
import com.example.thien_long.model.Product;
import com.example.thien_long.model.ProductDetail;
import com.example.thien_long.service.Constant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminClassificationResponse {
    private long id;
    private double initPrice;
    private double price;
    private String title;
    private int qty;

//    public void translate(Map<Long, String> translationMap) {
//        if (translationMap.containsKey(this.id)) {
//        }
//        this.name = translationMap.get(this.id);
//    }

}