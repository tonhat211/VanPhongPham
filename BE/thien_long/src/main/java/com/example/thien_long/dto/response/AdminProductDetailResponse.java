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
public class AdminProductDetailResponse {
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
    private List<ProductDetail> productDetails = new ArrayList<>();
    private List<Image> images = new ArrayList<>() ;


    public AdminProductDetailResponse(Product product, List<ProductDetail> productDetails, List<Image> images) {
        this.id = product.getId();
        this.name = product.getName();
        this.label = product.getLabel();
        this.avgRating = product.getAvgRating();
        this.totalReview = product.getTotalReview();
        this.totalRemainQty = product.getSoldQty();
        this.totalSoldQty = product.getSoldQty();
        this.thumbnailId = product.getThumbnail().getId();
        this.thumbnailUrl =  Constant.THUMBNAIL_IMG_DIR+"/" +product.getThumbnail().getName();
        this.description = product.getDescription();
        this.categoryCode = product.getCategory().getCode();
        this.subCategoryCode = product.getSubCategory().getCode();
        this.brandCode = product.getBrand().getCode();
        this.productDetails = productDetails;
        this.images = images.stream()
                .map(img -> {
                    img.setName(Constant.PRODUCT_IMG_DIR+"/"+img.getName());
                    return img;
                })
                .collect(Collectors.toList());


    }

    public void translate(Map<Long, String> translationMap) {
        if (translationMap.containsKey(this.id)) {
        }
        this.name = translationMap.get(this.id);
    }

}