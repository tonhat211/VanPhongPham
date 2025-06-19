package com.example.thien_long.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AreaResponse {
    private long id;
    private String name;
    private String code;
    List<AreaResponse> wards = new ArrayList<>();
}
