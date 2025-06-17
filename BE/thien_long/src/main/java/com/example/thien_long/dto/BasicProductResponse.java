package com.example.thien_long.dto;

import com.example.thien_long.model.Image;
import com.example.thien_long.service.Constant;

import java.util.Map;

public class BasicProductResponse {
    private long id;
    private String name;
    private double initPrice;
    private double price;
    private String label;
    private int discount;
    private double avgRating;
    private int totalReview;
    private String thumbnail;
    private int soldQty;


    public BasicProductResponse(long id, String name, String label, Image thumbnailImg, double price, double initPrice,double avgRating, int totalReview, int soldQty) {
        this.id = id;
        this.name = name;
        this.label = label;
        this.price = price;
        this.initPrice = initPrice;
        this.avgRating = avgRating;
        this.totalReview = totalReview;
        this.soldQty = soldQty;
        if(thumbnailImg!=null) this.thumbnail = Constant.THUMBNAIL_IMG_DIR+"/" +thumbnailImg.getName();
        this.discount = 100 - (int) ((price/initPrice) * 100);
    }

    public void translate(Map<Long, String> translationMap) {
       if(translationMap.containsKey(this.id)) {}
            this.name = translationMap.get(this.id);
    }

    public void convertCurrency(double rate) {
        price      = Math.round(price      * rate * 100) / 100.0;
        initPrice  = Math.round(initPrice  * rate * 100) / 100.0;
    }

    public int getSoldQty() {
        return soldQty;
    }

    public void setSoldQty(int soldQty) {
        this.soldQty = soldQty;
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

    public double getInitPrice() {
        return initPrice;
    }

    public void setInitPrice(double initPrice) {
        this.initPrice = initPrice;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
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

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }
}
