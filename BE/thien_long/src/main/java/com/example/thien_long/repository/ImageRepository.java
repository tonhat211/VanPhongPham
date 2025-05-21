package com.example.thien_long.repository;

import com.example.thien_long.model.Image;
import com.example.thien_long.model.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
 @Query("""
        SELECT i.url 
        FROM Image i 
        JOIN i.products p 
        WHERE p.id = :id
    """)
 List<String> findUrlsByProductId(@Param("id") long id);
 }

//



