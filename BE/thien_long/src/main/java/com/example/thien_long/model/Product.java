package com.example.thien_long.model;

import com.example.thien_long.service.Constant;
import com.example.thien_long.utils.VietnameseUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "sub_category_id", nullable = true)
    private SubCategory subCategory;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "image_id")
    private Image thumbnail;

    @ManyToMany
    @JoinTable(
            name = "image_products",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "image_id")
    )
    private List<Image> images=new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews=new ArrayList<>();

    @Column(name = "description", columnDefinition = "JSON")
    private String description;

    @Column(name = "is_deleted", nullable = false)
    private int isDeleted = Constant.NOT_DELETED;

    @Column(name = "label")
    private String label = null;

    @Column(name = "sold_qty", nullable = false, columnDefinition = "INT DEFAULT 0")
    private int soldQty;  // viet ham tu dong cap nhat moi ngay trong database

    @Column(name = "total_review", nullable = false, columnDefinition = "INT DEFAULT 0")
    private int totalReview;  // viet ham tu dong cap nhat moi ngay trong database

    @Column(name = "avg_rating", nullable = false, columnDefinition = "DOUBLE DEFAULT 0")
    private double avgRating;  // viet ham tu dong cap nhat moi ngay trong database

    @Column(name = "init_price", nullable = false, columnDefinition = "DOUBLE DEFAULT 0")
    private int initPrice;  // viet ham tu dong cap nhat khi detail cap nhat

    @Column(name = "price", nullable = false, columnDefinition = "DOUBLE DEFAULT 0")
    private double price;  //  viet ham tu dong cap nhat khi detail cap nhat

    @Column(name = "created_at", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", nullable = false, updatable = false, insertable = false)
    private LocalDateTime createdAt;

    @Column(name = "status", columnDefinition = "VARCHAR(10) DEFAULT 'ACTIVE'")
    private String status;

    @Column(name = "unsigned_name", nullable = true)
    private String unsignedName;

    @PrePersist
    @PreUpdate
    public void prepare() {
        this.unsignedName = VietnameseUtils.removeVietnameseDiacritics(this.name).toLowerCase();
    }

    public Product(long id) {
        this.id = id;
    }
}
