package com.example.thien_long.controller;

import com.example.thien_long.dto.request.CartItemRequest;
import com.example.thien_long.dto.response.ApiResponse;
import com.example.thien_long.dto.response.CartResponse;
import com.example.thien_long.service.CartService;
import com.example.thien_long.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;
    private final JwtService jwtService;

    @GetMapping("")
    public ApiResponse<CartResponse> getCart(@RequestHeader("Authorization") String authHeader) {
        Long userId = jwtService.extractUserId(authHeader);
        return ApiResponse.success(cartService.getCartByUserId(userId));
    }

    @PostMapping("/add")
    public ApiResponse<CartResponse> addToCart(@RequestHeader("Authorization") String authHeader, @RequestBody CartItemRequest request) {
        Long userId = jwtService.extractUserId(authHeader);
        return ApiResponse.success(cartService.addProductToCart(userId, request));
    }

    @PutMapping("/update")
    public ApiResponse<CartResponse> updateQuantity(@RequestHeader("Authorization") String authHeader, @RequestBody CartItemRequest request) {
        Long userId = jwtService.extractUserId(authHeader);
        return ApiResponse.success(cartService.updateProductQuantity(userId, request));
    }

    @DeleteMapping("/remove/{productDetailId}")
    public ApiResponse<CartResponse> removeFromCart(@RequestHeader("Authorization") String authHeader, @PathVariable Long productDetailId) {
        Long userId = jwtService.extractUserId(authHeader);
        return ApiResponse.success(cartService.removeProductFromCart(userId, productDetailId));
    }
}
