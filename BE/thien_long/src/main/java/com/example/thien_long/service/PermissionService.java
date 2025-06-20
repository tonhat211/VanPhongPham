package com.example.thien_long.service;

import com.example.thien_long.model.Employee;
import com.example.thien_long.model.Permission;
import com.example.thien_long.model.Product;
import com.example.thien_long.repository.EmployeeRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PermissionService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public boolean checkPermission(long employeeId, String permissionName) {
        Optional<Employee> employee = employeeRepository.findById(employeeId);
        if (employee.isPresent()) {
            Employee emp = employee.get();
            List<Permission> permissions = emp.getPermissions();
            for(Permission permission : permissions) {
                if(permission.getName().equals(permissionName)) {
                    return true;
                }
            }
        }
        return false;
    }

}
