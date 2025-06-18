package com.example.thien_long.dto.request;

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
public class AdminProductDetailRequest {
    private long id;
    private String name;
    private String label;
    private double avgRating;
    private int totalReview;
    private int totalRemainQty;
    private int totalSoldQty;
    private String thumbnailUrl;
    private long thumbnailId;
    private String description;
    private String categoryCode;
    private String subCategoryCode;
    private String brandCode;
    private String status;
    private double initPrice;
    private double price;
    private String title;
    private int qty;

//    private List<ProductDetail> productDetails = new ArrayList<>();
//    private List<Image> images = new ArrayList<>();
//    private String unsignedNameVi;
//    private String



}