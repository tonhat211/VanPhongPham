package com.example.thien_long.model;

import com.example.thien_long.service.Constant;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "order_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_detail_id")
    private ProductDetail productDetail;

    @Column(name="product_name", nullable = false)
    private String productName;

    @Column(name="classification_name", nullable = false)
    private String classificationName;

    @Column(name="price_unit", nullable = false)
    private double priceUnit;

    @Column(name="qty", nullable = false)
    private int qty;

    @Column(name="is_reviewed", nullable = false, columnDefinition = "INT DEFAULT 0")
    private int isReviewed = Constant.NOT_DELETED;

    @Column(name="is_deleted", nullable = false, columnDefinition = "INT DEFAULT 0")
    private int isDeleted = Constant.NOT_DELETED;

}
