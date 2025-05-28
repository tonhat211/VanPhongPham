package com.example.thien_long.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "cart_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     Long id;

    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false)
     Cart cart;

    @ManyToOne
    @JoinColumn(name = "product_detail_id", nullable = false)
     ProductDetail productDetail;

    @Column(name = "quantity", nullable = false)
     int quantity;
}
