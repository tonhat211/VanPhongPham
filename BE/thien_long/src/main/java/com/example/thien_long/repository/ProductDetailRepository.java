package com.example.thien_long.repository;

import com.example.thien_long.model.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, Long> {
    @Query("""
    SELECT pd from ProductDetail pd where pd.product.id = :id and pd.isDeleted = 0
    """)
    Optional<List<ProductDetail>> findByProductId(@Param("id") long id);

    @Query("""
    SELECT new com.example.thien_long.model.ProductDetail(
        pd.id, pd.title, pd.initPrice, pd.price, pd.qty) from ProductDetail pd where pd.product.id = :id and pd.isDeleted = 0
    """)
    Optional<List<ProductDetail>> findByProductIdForProductDetail(@Param("id") long id);


 }

//



