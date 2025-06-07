package com.example.thien_long.dto.response;

import com.example.thien_long.model.Address;
import com.example.thien_long.model.Area;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressResponse {
    List<Address> addresses;
    List<Area> areas;

}
