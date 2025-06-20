package com.example.thien_long.repository;

import com.example.thien_long.dto.response.PermissionResponse;
import com.example.thien_long.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findById(long id);


}
