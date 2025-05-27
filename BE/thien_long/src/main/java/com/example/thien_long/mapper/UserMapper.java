package com.example.thien_long.mapper;

import com.example.thien_long.dto.request.AddressRegisterRequest;
import com.example.thien_long.dto.request.UserRegisterRequest;
import com.example.thien_long.dto.response.AddressRegisterResponse;
import com.example.thien_long.dto.response.UserResponse;
import com.example.thien_long.model.User;
import com.example.thien_long.model.Address;
import org.mapstruct.*;

import java.util.List;
@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "pwd", ignore = true)
    @Mapping(target = "isDeleted", constant = "0")
    @Mapping(target = "birthday", source = "birthday")
    @Mapping(target = "addresses", source = "addresses", qualifiedByName = "mapAddresses")
    User toRegisterUser(UserRegisterRequest request);

    @Named("mapAddresses")
    List<Address> mapAddresses(List<AddressRegisterRequest> addressRequests);

    @Named("toAddress")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "isDeleted", constant = "0")
    @Mapping(target = "isDefault", constant = "0")
    AddressRegisterResponse toAddress(AddressRegisterRequest request);

    @Mapping(target = "addresses", source = "addresses")
    UserResponse toUserResponse(User user);
}



