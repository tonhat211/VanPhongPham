package com.example.thien_long.controller;

import com.example.thien_long.dto.request.AuthRequest;
import com.example.thien_long.dto.request.LogoutRequest;
import com.example.thien_long.dto.request.RefreshRequest;
import com.example.thien_long.dto.request.TokenValidityRequest;
import com.example.thien_long.dto.response.ApiResponse;
import com.example.thien_long.dto.response.AuthResponse;
import com.example.thien_long.dto.response.TokenValidityResponse;
import com.example.thien_long.service.AuthService;
import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthController {
    AuthService authService;

    @PostMapping("/login")
    ApiResponse<AuthResponse> authenticate(@RequestBody AuthRequest request) {
        return ApiResponse.success(authService.authenticate(request));
    }

    @PostMapping("/tokenValidity")
    ApiResponse<TokenValidityResponse> authenticate(@RequestBody TokenValidityRequest request)
            throws ParseException, JOSEException {
        return ApiResponse.success(authService.tokenValidity(request));
    }

    @PostMapping("/refresh")
    ApiResponse<AuthResponse> authenticate(@RequestBody RefreshRequest request)
            throws ParseException, JOSEException {
        return ApiResponse.success(authService.refreshToken(request));
    }

    @PostMapping("/logout")
    ApiResponse<Void> logout(@RequestBody LogoutRequest request) throws ParseException, JOSEException {
        authService.logout(request);
        return ApiResponse.success(null);
    }
}
