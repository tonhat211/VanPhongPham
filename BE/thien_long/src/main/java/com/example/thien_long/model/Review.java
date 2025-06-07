package com.example.thien_long.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name="rating", nullable = false)
    private int rating;

    @Column(name="content", nullable = false)
    private String content;

    @Column(name="classification_name", nullable = false)
    private String classificationName;

    @Column(name="is_deleted", nullable = false)
    private int isDeleted;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "created_at", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Review(long id, long productId,long userId, String userName, int rating, String content, String classificationName,LocalDateTime createdAt) {
        this.id = id;
        this.user = new User(userId, userName);
        this.rating = rating;
        this.content = content;
        this.classificationName = classificationName;
        this.product = new Product(productId);
        this.createdAt = createdAt;
    }

}
