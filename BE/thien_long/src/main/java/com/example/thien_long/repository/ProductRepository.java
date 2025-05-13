package com.example.thien_long.repository;

import com.example.thien_long.dto.BasicProductResponse;
import com.example.thien_long.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

   @Query("""
    SELECT new com.example.thien_long.dto.BasicProductResponse(
        p.id, p.name, p.label, p.thumbnail, 
        p.price, p.initPrice, p.avgRating, p.totalReview,p.soldQty)
    FROM Product p
    LEFT JOIN p.subCategory sc
    WHERE p.isDeleted = 0 
    AND p.category.code = :categoryCode
    AND (:subCategories IS NULL OR sc.code IN :subCategories)
    """)
   Page<BasicProductResponse> findByCategory(@Param("categoryCode") String categoryCode,
           @Param("subCategories") List<String> subCategories,Pageable pageable);

 }

//



