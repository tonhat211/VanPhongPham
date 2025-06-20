package com.example.thien_long.dto.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PermissionRequest {
    private long id;
    private long employeeId;
    private long permissionId;
}