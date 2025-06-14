package com.example.thien_long.repository;

import com.example.thien_long.translation.ProductTranslation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductTranslationRepository extends JpaRepository<ProductTranslation, Long> {
    @Query("""
        SELECT new com.example.thien_long.translation.ProductTranslation (
        t.id, t.productId, t.lang, t.content)
        FROM ProductTranslation t
        WHERE t.productId IN :ids 
        AND t.lang = :lang
        """)
    List<ProductTranslation> findByProductIdList(@Param("ids") List<Long> ids, @Param("lang") String lang);

    @Query("""
        SELECT new com.example.thien_long.translation.ProductTranslation (
        t.content)
        FROM ProductTranslation t
        WHERE t.productId = :id 
        AND t.lang = :lang
        """)
    ProductTranslation findByProductId(@Param("id") long id, @Param("lang") String lang);

}
