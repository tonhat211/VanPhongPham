package com.example.thien_long.controller;

import com.example.thien_long.dto.request.CustomerRequest;
import com.example.thien_long.dto.request.EmployeeActionRequest;
import com.example.thien_long.dto.response.ApiResponse;
import com.example.thien_long.dto.response.EmployeeResponse;
import com.example.thien_long.service.EmployeeService;
import com.example.thien_long.service.JwtService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/admin")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
public class EmployeeController {
    final JwtService jwtService;
    final EmployeeService employeeService;

    @PreAuthorize("hasAuthority('ADMIN_EMPLOYEE')")
    @GetMapping("/employee/all")
    public ApiResponse<List<EmployeeResponse>> getAllEmployees(@RequestHeader("Authorization") String authHeader) {
        return ApiResponse.success(employeeService.getAll());
    }

    @PreAuthorize("hasAuthority('UPDATE_EMPLOYEE')")
    @PutMapping("/employee/update-action")
    public ApiResponse<Void> updateEmployeeAction(@RequestHeader("Authorization") String authHeader,  @RequestBody EmployeeActionRequest request) {
        employeeService.updateEmployeeAction(request);
        return ApiResponse.success(null);
    }
}
