package com.example.thien_long.repository;

import com.example.thien_long.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
 @Query("""
        SELECT i.name 
        FROM Image i 
        JOIN i.products p 
        WHERE p.id = :id
    """)
 List<String> findNameByProductId(@Param("id") long id);

 @Query("""
        SELECT new com.example.thien_long.model.Image(
            i.id, i.name)
        FROM Image i 
        JOIN i.products p 
        WHERE p.id = :id
    """)
 List<Image> findByProductId(@Param("id") long id);

 }

//



