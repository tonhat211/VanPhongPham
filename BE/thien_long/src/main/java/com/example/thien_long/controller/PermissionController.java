package com.example.thien_long.controller;

import com.example.thien_long.dto.request.PermissionRequest;
import com.example.thien_long.dto.response.EmployeePermissionResponse;
import com.example.thien_long.dto.response.PermissionResponse;
import com.example.thien_long.model.*;
import com.example.thien_long.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("api/v1/admin/permissions")
public class PermissionController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    @PreAuthorize("hasAuthority('ADMIN_PERMISSION')")
    @PostMapping("/all")
    public ResponseEntity<?> getAll() {
        System.out.println("admin/permissions/all");
        List<Employee> employees = employeeRepository.findAll();
        List<EmployeePermissionResponse> emResponses = new ArrayList<>();
        for (Employee e : employees) {
            EmployeePermissionResponse epr = new EmployeePermissionResponse();
            epr.setId(e.getId());
            epr.setName(e.getName());
            epr.setEmail(e.getEmail());
            emResponses.add(epr);
        }
        List<Permission> permissions = permissionRepository.findAll();
        List<PermissionResponse> perResponses = new ArrayList<>();
        for (Permission p : permissions) {
            PermissionResponse pr = new PermissionResponse();
            pr.setId(p.getId());
            pr.setName(p.getName());
            pr.setDescription(p.getDescription());
            pr.setUrl(p.getUrl());
            perResponses.add(pr);
        }

        Map<String, Object> re = new HashMap<>();
        re.put("success", true);
        re.put("employees", emResponses);
        re.put("permissions", perResponses);
        return ResponseEntity.ok(re);
    }

    @PreAuthorize("hasAuthority('ADMIN_PERMISSION')")
    @PostMapping("/employees")
    public ResponseEntity<?> getAllEmployee() {
        System.out.println("admin/permissions/employees");
        List<Employee> employees = employeeRepository.findAll();
        List<EmployeePermissionResponse> responses = new ArrayList<>();
        for (Employee e : employees) {
            EmployeePermissionResponse epr = new EmployeePermissionResponse();
            epr.setId(e.getId());
            epr.setName(e.getName());
            epr.setEmail(e.getEmail());
            responses.add(epr);
        }
        Map<String, Object> re = new HashMap<>();
        re.put("success", true);
        re.put("employees", responses);
        return ResponseEntity.ok(re);
    }

    @PreAuthorize("hasAuthority('ADMIN_PERMISSION')")
    @PostMapping("")
    public ResponseEntity<?> getAllPermission() {
        System.out.println("admin/permissions");
        List<Permission> permissions = permissionRepository.findAll();
        List<PermissionResponse> responses = new ArrayList<>();
        for (Permission p : permissions) {
            PermissionResponse pr = new PermissionResponse();
            pr.setId(p.getId());
            pr.setName(p.getName());
            pr.setDescription(p.getDescription());
            pr.setUrl(p.getUrl());
            responses.add(pr);
        }
        Map<String, Object> re = new HashMap<>();
        re.put("success", true);
        re.put("permissions", responses);
        return ResponseEntity.ok(re);
    }


    // lay ra quyen cua employee
    @PreAuthorize("hasAuthority('EM_PERMISSION')")
    @PostMapping("employee/{id}")
    public ResponseEntity<?> getAllPermissionOfEmployee(@PathVariable Long id) {
        System.out.println("admin/permissions/employee/{id}: " + id);
        Optional<Employee> employeeOpt = employeeRepository.findById(id);
        Map<String, Object> re = new HashMap<>();
        if(employeeOpt.isPresent()) {
            Employee employee = employeeOpt.get();
            List<Permission> permissions = employee.getPermissions();
            List<PermissionResponse> responses = new ArrayList<>();

            for (Permission p : permissions) {
                PermissionResponse pr = new PermissionResponse();
                pr.setId(p.getId());
                pr.setName(p.getName());
                pr.setDescription(p.getDescription());
                pr.setUrl(p.getUrl());
                responses.add(pr);
            }

            re.put("success", true);
            re.put("permissions", responses);

        } else {
            re.put("success", false);
        }


        return ResponseEntity.ok(re);
    }


    // lay ra employee cua quyen
    @PreAuthorize("hasAuthority('PERM_EMPLOYEE')")
    @PostMapping("permission/{id}")
    public ResponseEntity<?> getAllEmployeesOfPermission(@PathVariable Long id) {
        System.out.println("admin/permissions/permission/{id}: " + id);
        Optional<Permission> permissionOpt = permissionRepository.findById(id);
        Map<String, Object> re = new HashMap<>();
        if(permissionOpt.isPresent()) {
            Permission permission = permissionOpt.get();
            List<Employee> employees = permission.getEmployees();
            List<EmployeePermissionResponse> responses = new ArrayList<>();

            for (Employee e : employees) {
                EmployeePermissionResponse epr = new EmployeePermissionResponse();
                epr.setId(e.getId());
                epr.setName(e.getName());
                epr.setEmail(e.getEmail());
                responses.add(epr);
            }

            re.put("success", true);
            re.put("employees", responses);

        } else {
            re.put("success", false);
        }
        return ResponseEntity.ok(re);
    }


    // lay ra quyen ma employee chua co
    @PreAuthorize("hasAuthority('ADMIN_PERMISSION')")
    @PostMapping("employee/not/{id}")
    public ResponseEntity<?> getAllPermissionNotOfEmployee(@PathVariable Long id) {
        System.out.println("admin/permissions/employee/not/{id}: " + id);
        Optional<Employee> employeeOpt = employeeRepository.findById(id);
        Map<String, Object> re = new HashMap<>();
        if(employeeOpt.isPresent()) {
            Employee employee = employeeOpt.get();
            List<Permission> permissions = permissionRepository.findAllNotAssigned(employee);
            List<PermissionResponse> responses = new ArrayList<>();
            for (Permission p : permissions) {
                PermissionResponse pr = new PermissionResponse();
                pr.setId(p.getId());
                pr.setName(p.getName());
                pr.setDescription(p.getDescription());
                pr.setUrl(p.getUrl());
                responses.add(pr);
            }
            re.put("success", true);
            re.put("permissions", responses);
        } else {
            re.put("success", false);
        }
        return ResponseEntity.ok(re);
    }

    // gan quyen employee
    @PreAuthorize("hasAuthority('ADD_EM_PERMISSION')")
    @PostMapping("employee/add")
    public ResponseEntity<?> insertPermissionIntoEmployee(@RequestBody PermissionRequest request) {
        System.out.println("admin/permissions/employee/add: ");
        Optional<Employee> employeeOpt = employeeRepository.findById(request.getEmployeeId());
        Optional<Permission> permissionOpt = permissionRepository.findById(request.getPermissionId());
        Map<String, Object> re = new HashMap<>();
        if(employeeOpt.isPresent() && permissionOpt.isPresent()) {
            Employee employee = employeeOpt.get();
            Permission permission = permissionOpt.get();
            long newPerId = permission.getId();

            List<Permission> permissions = employee.getPermissions();
            boolean isExist = false;
            for(Permission p : permissions) {
                if(p.getId() == newPerId) {
                    isExist = true;
                    break;
                }
            }

            if(!isExist) {
                employee.getPermissions().add(permission);
                permission.getEmployees().add(employee);
                Permission saved = permissionRepository.save(permission);

                PermissionResponse response = new PermissionResponse();
                response.setId(saved.getId());
                response.setName(saved.getName());
                response.setDescription(saved.getDescription());
                response.setUrl(saved.getUrl());
                re.put("success", true);
                re.put("permission", response);
            } else {
                re.put("success", false);
            }

        } else {
            re.put("success", false);
        }
        return ResponseEntity.ok(re);
    }

    // xoa quyen employee
    @PreAuthorize("hasAuthority('REMOVE_EM_PERMISSION')")
    @PostMapping("employee/remove")
    public ResponseEntity<?> removePermissionIntoEmployee(@RequestBody PermissionRequest request) {
        System.out.println("admin/permissions/employee/remove: ");
        Optional<Employee> employeeOpt = employeeRepository.findById(request.getEmployeeId());
        Optional<Permission> permissionOpt = permissionRepository.findById(request.getPermissionId());
        Map<String, Object> re = new HashMap<>();
        if(employeeOpt.isPresent() && permissionOpt.isPresent()) {
            Employee employee = employeeOpt.get();
            Permission permission = permissionOpt.get();
            long newPerId = permission.getId();

            List<Permission> permissions = employee.getPermissions();
            boolean isExist = false;
            for(Permission p : permissions) {
                if(p.getId() == newPerId) {
                    isExist = true;
                    break;
                }
            }

            if(isExist) {
                employee.getPermissions().remove(permission);
                permission.getEmployees().remove(employee);
                Permission saved = permissionRepository.save(permission);

                re.put("success", true);
                re.put("permissionId", saved.getId());
            } else {
                re.put("success", false);
            }

        } else {
            re.put("success", false);
        }
        return ResponseEntity.ok(re);
    }







}




