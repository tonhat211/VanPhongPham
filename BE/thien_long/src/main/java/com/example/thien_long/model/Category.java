package com.example.thien_long.model;

import com.example.thien_long.service.Constant;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name="title", nullable = false)
    private String title;
    @Column(name="code", nullable = false, unique = true)
    private String code;
    @ManyToOne
    @JoinColumn(name = "image_id")
    private Image icon;
    @Column(name="is_deleted", columnDefinition = "INT DEFAULT 0")
    private int isDeleted;
    @Column(name="level", columnDefinition = "INT DEFAULT 1")
    private int level;



    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public Image getIcon() {
        return icon;
    }

    public void setIcon(Image icon) {
        this.icon = icon;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

//    public int getLevel() {
//        return level;
//    }
//
//    public void setLevel(int level) {
//        this.level = level;
//    }

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

    public int getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(int isDeleted) {
        this.isDeleted = isDeleted;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Category category)) return false;
        return id == category.id;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
