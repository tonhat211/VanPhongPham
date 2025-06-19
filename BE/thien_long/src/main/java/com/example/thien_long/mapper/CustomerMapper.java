package com.example.thien_long.mapper;

import com.example.thien_long.dto.response.CustomerResponse;
import com.example.thien_long.model.User;
import com.example.thien_long.model.Address;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CustomerMapper {

    @Mapping(target = "status", expression = "java(mapStatus(user))")
    @Mapping(target = "phone", expression = "java(getDefaultPhone(user))")
    @Mapping(target = "fullAddress", expression = "java(getDefaultAddress(user))")
    CustomerResponse toResponse(User user);

    default String mapStatus(User user) {
        if (user.getIsDeleted() == 1) {
            return "FLAGGED";
        } else if (user.isLocked()) {
            return "LOCKED";
        } else {
            return "ACTIVE";
        }
    }

    default String getDefaultPhone(User user) {
        return user.getAddresses().stream()
                .filter(address -> address.getIsDefault() == 1)
                .findFirst()
                .map(Address::getPhone)
                .orElse(null);
    }

    default String getDefaultAddress(User user) {
        return user.getAddresses().stream()
                .filter(address -> address.getIsDefault() == 1)
                .findFirst()
                .map(address -> {
                    String detail = address.getDetail() != null ? address.getDetail() : "";
                    String ward = address.getWard() != null ? address.getWard() : "";
                    String province = address.getProvince() != null ? address.getProvince() : "";
                    return detail + ", " + ward + ", " + province;
                })
                .orElse(null);
    }
}
