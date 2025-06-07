package com.example.thien_long.repository;

import com.example.thien_long.dto.response.OrderResponse;
import com.example.thien_long.model.Address;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    @Query("""
        SELECT new com.example.thien_long.model.Address (
        a.id, a.name, a.phone, a.province, a.ward, a.detail, a.isDefault)
        FROM Address a
        WHERE a.user.id=:userId 
        AND a.isDeleted=0
        ORDER BY a.isDefault DESC, a.updatedAt DESC
        """)
    List<Address> findByUserId(@Param("userId") long userId);

    @Modifying
    @Transactional
    @Query("UPDATE Address a SET a.isDefault = 0 WHERE a.user.id = :userId")
    int resetDefaultAddresses(@Param("userId") Long userId);

}
