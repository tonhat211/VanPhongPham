package com.example.thien_long.repository;

import com.example.thien_long.model.Brand;
import com.example.thien_long.model.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {
    @Query("SELECT b FROM Brand b WHERE b.isDeleted = 0 ORDER BY b.id asc")
    List<Brand> findAll();
 }

//



