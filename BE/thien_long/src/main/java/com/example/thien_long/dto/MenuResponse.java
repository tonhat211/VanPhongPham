package com.example.thien_long.dto;

import com.example.thien_long.model.Brand;
import com.example.thien_long.model.Category;
import com.example.thien_long.model.Image;
import com.example.thien_long.model.SubCategory;
import com.example.thien_long.service.Constant;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class MenuResponse {
    private long id;
    private String title;
    private String link;
    private String icon;
    private int level;
    private List<SubCategory> subs;

    public MenuResponse(Category category, List<SubCategory> subs) {
        this.id = category.getId();
        this.title = category.getTitle();
        this.link = category.getCode();
        this.level = category.getLevel();
        this.icon = Constant.ICON_IMG_DIR+"/"+ category.getIcon().getUrl();
        this.subs = subs;
    }

    public void translate(Map<String, String> translationMap) {
        this.title = translationMap.get(this.link);
        if(this.subs != null) {
            for(SubCategory subCategory : this.subs) {
                if(translationMap.containsKey(subCategory.getCode())) {
                    subCategory.setTitle(translationMap.get(subCategory.getCode()));
                }

            }
        }
    }

    public List<SubCategory> getSubs() {
        return subs;
    }

    public void setSubs(List<SubCategory> subs) {
        this.subs = subs;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
}
