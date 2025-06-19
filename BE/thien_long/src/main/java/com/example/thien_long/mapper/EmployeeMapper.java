package com.example.thien_long.mapper;

import com.example.thien_long.dto.response.EmployeeResponse;
import com.example.thien_long.model.Employee;
import com.example.thien_long.model.Address;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {
    @Mapping(target = "status", expression = "java(mapStatus(employee))")
    @Mapping(target = "phone", expression = "java(getDefaultPhone(employee))")
    @Mapping(target = "fullAddress", expression = "java(getDefaultAddress(employee))")
    EmployeeResponse toResponse(Employee employee);

    default String mapStatus(Employee employee) {
        if (employee.getIsDeleted() == 1) {
            return "FLAGGED";
        } else if (employee.isLocked()) {
            return "FLAGGED";
        } else {
            return "ACTIVE";
        }
    }

    default String getDefaultPhone(Employee employee) {
        return employee.getAddresses().stream()
                .filter(addr -> addr.getIsDefault() == 1)
                .findFirst()
                .map(Address::getPhone)
                .orElse(null);
    }

    default String getDefaultAddress(Employee employee) {
        return employee.getAddresses().stream()
                .filter(addr -> addr.getIsDefault() == 1)
                .findFirst()
                .map(addr -> {
                    String detail = addr.getDetail() != null ? addr.getDetail() : "";
                    String ward = addr.getWard() != null ? addr.getWard() : "";
                    String province = addr.getProvince() != null ? addr.getProvince() : "";
                    return String.join(", ", detail, ward, province);
                })
                .orElse(null);
    }
}
