package com.example.thien_long.repository;

import com.example.thien_long.translation.MenuTranslation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuTranslationRepository extends JpaRepository<MenuTranslation, Long> {
    @Query("""
        SELECT new com.example.thien_long.translation.MenuTranslation (
        t.id, t.objectCode, t.lang, t.content)
        FROM MenuTranslation t
        WHERE t.objectCode IN :codes 
        AND t.lang = :lang
        """)
    List<MenuTranslation> findByCodeList(@Param("codes") List<String> codes, @Param("lang") String lang);
}
