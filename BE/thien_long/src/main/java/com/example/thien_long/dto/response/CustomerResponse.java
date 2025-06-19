package com.example.thien_long.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerResponse {
     Long id;
     String name;
     String email;
     LocalDate birthday;
     String status;
     String phone;
     String fullAddress;
}
