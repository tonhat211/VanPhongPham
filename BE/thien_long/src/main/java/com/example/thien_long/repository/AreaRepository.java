package com.example.thien_long.repository;

import com.example.thien_long.model.Area;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AreaRepository extends JpaRepository<Area, Long> {
    @Query("""
        SELECT new com.example.thien_long.model.Area (
        at.id, at.name, at.code)
        FROM Area at
        WHERE at.parent IS NULL 
       
        """)
    List<Area> findProvinces();

    @Query("""
    SELECT new com.example.thien_long.model.Area (
        at.id, at.name, at.code,at.parent.code)
    FROM Area at
    WHERE (:provinceCode IS NULL OR at.parent.code = :provinceCode)
    """)
    List<Area> findWards(@Param("provinceCode") String provinceCode);


    @Query("""
    SELECT new com.example.thien_long.model.Area (
        at.id, at.name, at.code)
    FROM Area at
    WHERE (at.code IN :codes)
    """)
    List<Area> findByCodes(@Param("codes") List<String> codes);


}
