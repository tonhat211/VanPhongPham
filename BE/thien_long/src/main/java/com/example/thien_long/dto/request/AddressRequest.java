package com.example.thien_long.dto.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressRequest {
    private long id;
    private long userId;
    private String name;
    private String phone;
    private String province;
    private String ward;
    private String detail;
    private int isDefault;
}