package com.example.thien_long.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PermissionResponse {
    private long id;
    private String name;
    private String url;
    private String description;
    private List<EmployeePermissionResponse> employees;

}
