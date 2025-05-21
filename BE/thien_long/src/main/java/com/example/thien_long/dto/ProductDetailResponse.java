package com.example.thien_long.dto;

import com.example.thien_long.model.Image;
import com.example.thien_long.model.Product;
import com.example.thien_long.model.ProductDetail;
import com.example.thien_long.model.Review;
import com.example.thien_long.service.Constant;

import java.util.ArrayList;
import java.util.List;

public class ProductDetailResponse {
    private long id;
    private String name;
    private String label;
    private String brand;
    private double avgRating;
    private int totalReview;
    private int soldQty;
    private String description;
    private List<String> images = new ArrayList<>();

    private List<Review> reviews;
    private List<ProductDetail> productDetails = new ArrayList<>();
    public ProductDetailResponse(Product product, List<ProductDetail> productDetails,List<String> images, List<Review> reviews) {
       this.id = product.getId();
       this.name = product.getName();
       this.label = product.getLabel();
       this.brand = product.getBrand().getName();
       this.avgRating = product.getAvgRating();
       this.totalReview = product.getTotalReview();
       this.soldQty = product.getSoldQty();
       this.description = product.getDescription();
       for(int i=0;i<images.size();i++) {
           String temp = Constant.PRODUCT_IMG_DIR+"/"+images.get(i);
           this.images.add(temp);
       }

       this.reviews = reviews;
       this.productDetails = productDetails;

    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public List<ProductDetail> getProductDetails() {
        return productDetails;
    }

    public void setProductDetails(List<ProductDetail> productDetails) {
        this.productDetails = productDetails;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public double getAvgRating() {
        return avgRating;
    }

    public void setAvgRating(double avgRating) {
        this.avgRating = avgRating;
    }

    public int getTotalReview() {
        return totalReview;
    }

    public void setTotalReview(int totalReview) {
        this.totalReview = totalReview;
    }

    public int getSoldQty() {
        return soldQty;
    }

    public void setSoldQty(int soldQty) {
        this.soldQty = soldQty;
    }

}
