package com.example.thien_long.repository;

import com.example.thien_long.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query("""
    SELECT new com.example.thien_long.model.Review(
        r.id, r.product.id, r.user.id, r.user.name, r.rating, r.content, r.classificationName,r.createdAt) FROM Review r where r.product.id = :id and r.isDeleted = 0
    """)
    Optional<List<Review>> findByProductId(@Param("id") long id);
}

//



