package com.example.thien_long.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateInfoRequest {
    String name;
    String email;
    LocalDate birthday;
    String phone;
    String province;
    String ward;
    String detail;
}
