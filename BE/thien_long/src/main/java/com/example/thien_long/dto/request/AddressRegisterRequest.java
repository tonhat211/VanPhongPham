package com.example.thien_long.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddressRegisterRequest {
    @NotBlank(message = "Tên người nhận không được để trống")
     String name;

    @NotBlank(message = "Số điện thoại không được để trống")
    @Size(min = 9, message = "Số điện thoại không hợp lệ")
     String phone;

    @NotBlank(message = "Tỉnh/Thành phố không được để trống")
     String province;

    @NotBlank(message = "Phường/Xã không được để trống")
     String ward;

    @NotBlank(message = "Chi tiết địa chỉ không được để trống")
     String detail;
}
