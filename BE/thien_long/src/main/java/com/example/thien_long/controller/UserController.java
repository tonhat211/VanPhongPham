package com.example.thien_long.controller;

import com.example.thien_long.dto.request.ForgotPasswordRequest;
import com.example.thien_long.dto.request.UserRegisterRequest;
import com.example.thien_long.dto.request.UserUpdateInfoRequest;
import com.example.thien_long.dto.response.ApiResponse;
import com.example.thien_long.dto.response.AuthResponse;
import com.example.thien_long.dto.response.UserResponse;
import com.example.thien_long.model.User;
import com.example.thien_long.service.JwtService;
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
    private final JwtService jwtService;

    @PostMapping("/register")
    ApiResponse<UserResponse> register(@Valid @RequestBody UserRegisterRequest request){
            return ApiResponse.success(userService.register(request));

    }

    @PutMapping("/user/update")
    public ApiResponse<UserResponse> updateUserInfo(@RequestHeader("Authorization") String authHeader, @RequestBody UserUpdateInfoRequest request
    ) {
        Long userId = jwtService.extractUserId(authHeader);
        return  ApiResponse.success(userService.updateUserInfo(userId, request));
    }
    @PostMapping("/forgot-password")
    ApiResponse<Void> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        userService.handleForgotPassword(request);
        return ApiResponse.success(null);
    }
}
