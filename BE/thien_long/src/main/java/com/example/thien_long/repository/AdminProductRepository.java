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
import java.util.Optional;

@Repository
public interface AdminProductRepository extends JpaRepository<Product, Long> {

//    @Query("""
//    SELECT new com.example.thien_long.dto.BasicAdminProductResponse(
//        p.id, p.name, p.label, p.thumbnail,
//        p.price, p.initPrice, p.avgRating, p.totalReview,p.soldQty)
//    FROM Product p
//    WHERE p.isDeleted = 0
//    AND (:subCategories IS NULL OR p.category.code IN :subCategories)
//    AND (:brands IS NULL OR p.brand.code IN :brands)
//    AND (:bfPrice IS NULL OR p.price >= :bfPrice)
//    AND (:afPrice IS NULL OR p.price < :afPrice)
//    """)
//    Page<BasicProductResponse> findAll(
//            @Param("subCategories") List<String> subCategories,
//            @Param("brands") List<String> brands,
//            @Param("bfPrice") String bfPrice,
//            @Param("afPrice") String afPrice,
//            Pageable pageable);

   @Query("""
    SELECT new com.example.thien_long.dto.BasicProductResponse(
        p.id, p.name, p.label, p.thumbnail, 
        p.price, p.initPrice, p.avgRating, p.totalReview,p.soldQty)
    FROM Product p
    LEFT JOIN p.subCategory sc
    WHERE p.isDeleted = 0 
    AND p.category.code = :categoryCode
    AND (:subCategories IS NULL OR sc.code IN :subCategories)
    AND (:brands IS NULL OR p.brand.code IN :brands)
    AND (:bfPrice IS NULL OR p.price >= :bfPrice)
    AND (:afPrice IS NULL OR p.price < :afPrice)
    """)
   Page<BasicProductResponse> findByCategory(@Param("categoryCode") String categoryCode,
           @Param("subCategories") List<String> subCategories,
             @Param("brands") List<String> brands,
             @Param("bfPrice") String bfPrice,
             @Param("afPrice") String afPrice,
             Pageable pageable);



    @Query("SELECT p FROM Product p WHERE p.id = :id AND p.isDeleted = 0")
    Optional<Product> findById(@Param("id") long id);


 }

//



