package com.example.thien_long.repository;

import com.example.thien_long.translation.ProductDetailTranslation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDetailTranslationRepository extends JpaRepository<ProductDetailTranslation, Long> {
    @Query("""
        SELECT new com.example.thien_long.translation.ProductDetailTranslation (
        t.id, t.productDetailId, t.lang, t.content)
        FROM ProductDetailTranslation t
        WHERE t.productDetailId IN :ids 
        AND t.lang = :lang
        """)
    List<ProductDetailTranslation> findByProductDetailIdList(@Param("ids") List<Long> ids, @Param("lang") String lang);
}
