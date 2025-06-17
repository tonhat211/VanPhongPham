package com.example.thien_long.repository;

import com.example.thien_long.model.Brand;
import com.example.thien_long.model.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {
    @Query("SELECT b FROM Brand b WHERE b.isDeleted = 0 ORDER BY b.id asc")
    List<Brand> findAll();

    @Query("SELECT c FROM Brand c WHERE c.isDeleted = 0 and c.code=:code")
    Optional<Brand> findByCode(@Param("code") String code);

 }

//



