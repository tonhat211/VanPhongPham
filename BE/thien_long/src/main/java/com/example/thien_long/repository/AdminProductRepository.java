package com.example.thien_long.repository;

import com.example.thien_long.dto.BasicProductResponse;
import com.example.thien_long.dto.response.BasicAdminProductResponse;
import com.example.thien_long.model.Image;
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

   @Query("""
    SELECT new com.example.thien_long.dto.response.BasicAdminProductResponse(
        p.id, p.name, p.thumbnail, p.category.code, p.category.title,
        p.brand.code, p.brand.name, p.soldQty)
    FROM Product p
    WHERE p.isDeleted = 0 
    AND (:categoryCode IS NULL OR p.category.code = :categoryCode)
    """)
   Page<BasicAdminProductResponse> findByCategory(@Param("categoryCode") String categoryCode,
                                                  Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.id = :id AND p.isDeleted = 0")
    Optional<Product> findById(@Param("id") long id);


 }

//



