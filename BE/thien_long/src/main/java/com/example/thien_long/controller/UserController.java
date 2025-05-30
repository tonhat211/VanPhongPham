package com.example.thien_long.controller;

import com.example.thien_long.dto.request.UserRegisterRequest;
import com.example.thien_long.dto.response.ApiResponse;
import com.example.thien_long.dto.response.UserResponse;
import com.example.thien_long.model.User;
import com.example.thien_long.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
public class UserController {
    @Autowired
     UserService userService;

    @PostMapping("/register")
    ApiResponse<UserResponse> register(@Valid @RequestBody UserRegisterRequest request){
            return ApiResponse.success(userService.register(request));

    }

//    @GetMapping
//    ApiResponse<List<UserResponse>> getUsers() {
//        return ApiResponse.<List<UserResponse>>builder()
//                .result(userService.getUsers())
//                .build();
//    }
//
//    @GetMapping("/{userId}")
//    ApiResponse<UserResponse> getUser(@PathVariable("userId") String userId) {
//        return ApiResponse.<UserResponse>builder()
//                .result(userService.getUser(userId))
//                .build();
//    }
}
