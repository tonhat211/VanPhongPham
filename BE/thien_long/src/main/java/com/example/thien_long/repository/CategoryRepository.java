package com.example.thien_long.repository;

import com.example.thien_long.dto.BasicProductResponse;
import com.example.thien_long.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query("SELECT c FROM Category c WHERE c.isDeleted = 0 and c.level=:level ORDER BY c.id asc")
    List<Category> findAllByLevel(@Param("level") int level);

    @Query("SELECT c FROM Category c WHERE c.isDeleted = 0 and c.code=:code")
    Optional<Category> findByCode(@Param("code") String code);

 }

//



