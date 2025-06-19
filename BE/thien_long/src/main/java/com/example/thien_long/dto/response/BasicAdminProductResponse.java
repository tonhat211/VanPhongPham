package com.example.thien_long.dto.response;

import com.example.thien_long.model.Image;
import com.example.thien_long.service.Constant;
import lombok.Data;

import java.util.Map;

@Data
public class BasicAdminProductResponse {
    private long id;
    private String name;
    private String thumbnail;
    private String categoryCode;
    private String categoryTitle;
    private String brandCode;
    private String brandName;
    private int soldQty;
    private String status;


    public BasicAdminProductResponse(long id, String name, Image thumbnailImg,String categoryCode,String categoryTitle, String brandCode,String brandName, int soldQty, String status) {
        this.id = id;
        this.name = name;
        this.categoryCode = categoryCode;
        this.categoryTitle = categoryTitle;
        this.brandCode = brandCode;
        this.brandName = brandName;
        this.soldQty = soldQty;
        if(thumbnailImg!=null) this.thumbnail = Constant.THUMBNAIL_IMG_DIR+"/" +thumbnailImg.getName();
        this.status = status;
    }

    public void translate(Map<Long, String> translationMap) {
        if(translationMap.containsKey(this.id)) {}
        this.name = translationMap.get(this.id);
    }

}
