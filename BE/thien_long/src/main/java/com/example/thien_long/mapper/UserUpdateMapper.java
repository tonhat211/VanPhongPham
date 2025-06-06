package com.example.thien_long.mapper;

import com.example.thien_long.dto.request.UserUpdateInfoRequest;
import com.example.thien_long.dto.response.UserResponse;
import com.example.thien_long.model.User;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface UserUpdateMapper {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateUserFromRequest(UserUpdateInfoRequest request, @MappingTarget User user);

    UserResponse toUserResponse(User user);
}
