package com.example.thien_long.repository;

import com.example.thien_long.dto.BasicProductResponse;
import com.example.thien_long.dto.response.PermissionResponse;
import com.example.thien_long.model.Employee;
import com.example.thien_long.model.Permission;
import com.example.thien_long.model.Product;
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
public interface PermissionRepository extends JpaRepository<Permission, Long> {
 @Query("""
           SELECT p
           FROM Permission p
           WHERE :emp NOT MEMBER OF p.employees
           """)
 List<Permission> findAllNotAssigned(@Param("emp") Employee emp);
 }

//



