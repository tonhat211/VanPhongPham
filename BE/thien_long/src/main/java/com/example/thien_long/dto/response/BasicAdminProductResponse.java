package com.example.thien_long.dto.response;

import com.example.thien_long.model.Image;
import com.example.thien_long.service.Constant;

import java.util.Map;

public class BasicAdminProductResponse {
    private long id;
    private String name;
    private String thumbnail;
    private String categoryCode;
    private String categoryTitle;
    private String brandCode;
    private String brandName;
    private int soldQty;


    public BasicAdminProductResponse(long id, String name, Image thumbnailImg,String categoryCode,String categoryTitle, String brandCode,String brandName, int soldQty) {
        this.id = id;
        this.name = name;
        this.categoryCode = categoryCode;
        this.categoryTitle = categoryTitle;
        this.brandCode = brandCode;
        this.brandName = brandName;
        this.soldQty = soldQty;
        if(thumbnailImg!=null) this.thumbnail = Constant.THUMBNAIL_IMG_DIR+"/" +thumbnailImg.getName();

    }

    public void translate(Map<Long, String> translationMap) {
        if(translationMap.containsKey(this.id)) {}
        this.name = translationMap.get(this.id);
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

    public String getCategoryCode() {
        return categoryCode;
    }

    public void setCategoryCode(String categoryCode) {
        this.categoryCode = categoryCode;
    }

    public String getCategoryTitle() {
        return categoryTitle;
    }

    public void setCategoryTitle(String categoryTitle) {
        this.categoryTitle = categoryTitle;
    }

    public String getBrandCode() {
        return brandCode;
    }

    public void setBrandCode(String brandCode) {
        this.brandCode = brandCode;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }
}
