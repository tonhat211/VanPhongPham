package com.example.thien_long.repository;

import com.example.thien_long.translation.ProductDescriptionTranslation;
import com.example.thien_long.translation.ProductTranslation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDescriptionTranslationRepository extends JpaRepository<ProductDescriptionTranslation, Long> {
    @Query("""
        SELECT new com.example.thien_long.translation.ProductDescriptionTranslation (
        t.content)
        FROM ProductDescriptionTranslation t
        WHERE t.productId = :id
        AND t.lang = :lang
        """)
    ProductDescriptionTranslation findByProductId(@Param("id") long id, @Param("lang") String lang);
}
