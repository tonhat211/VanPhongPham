package com.example.thien_long.repository;

import com.example.thien_long.model.Category;
import com.example.thien_long.model.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory, Long> {
    List<SubCategory> findAll();

    @Query("SELECT c FROM SubCategory c WHERE c.isDeleted = 0 and c.code=:code")
    Optional<SubCategory> findByCode(@Param("code") String code);


}

//



