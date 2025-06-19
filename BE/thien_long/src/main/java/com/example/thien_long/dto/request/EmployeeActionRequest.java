package com.example.thien_long.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmployeeActionRequest {
     Long id;
     String action; // CHUYEN_PHONG, DOI_CHUC_VU, FLAG, RESTORE
     String value;
}
