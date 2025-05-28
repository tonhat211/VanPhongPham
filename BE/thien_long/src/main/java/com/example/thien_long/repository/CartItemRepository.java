package com.example.thien_long.repository;

import com.example.thien_long.model.Cart;
import com.example.thien_long.model.CartItem;
import com.example.thien_long.model.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartAndProductDetail(Cart cart, ProductDetail productDetail);
}
