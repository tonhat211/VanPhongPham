package com.example.thien_long.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddressRegisterResponse {
    long id;
    String name;
    String phone;
    String province;
    String ward;
    String detail;
    int isDefault;
    int isDeleted;
}
