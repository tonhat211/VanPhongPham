package com.example.thien_long.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmployeeResponse {
     Long id;
     String name;
     String email;
     LocalDate birthday;
     String phone;
     String fullAddress;
     String department;
     String position;
     String status;
}
