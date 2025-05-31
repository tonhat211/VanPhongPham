package com.example.thien_long.controller;

import com.example.thien_long.dto.request.CartItemRequest;
import com.example.thien_long.dto.response.ApiResponse;
import com.example.thien_long.dto.response.CartItemResponse;
import com.example.thien_long.dto.response.CartResponse;
import com.example.thien_long.repository.CartRepository;
import com.example.thien_long.service.CartService;
import com.example.thien_long.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;
    private final JwtService jwtService;

    @Autowired
    private CartRepository cartRepository;

    @GetMapping("")
    public ApiResponse<CartResponse> getCart(@RequestHeader("Authorization") String authHeader) {
        Long userId = jwtService.extractUserId(authHeader);
        return ApiResponse.success(cartService.getCartByUserId(userId));
    }

    @GetMapping("get")
    public ApiResponse<CartResponse> getCartByIds(@RequestParam(required = false) long userId) {
        return ApiResponse.success(cartService.getCartByUserId(userId));
    }

    @GetMapping("checkout")
    public ApiResponse<List<CartItemResponse>> getCartByUserId(@RequestParam() List<String> ids) {
        System.out.println("checkout: ids: ");
        for (String id : ids) {
            System.out.println(id);
        }
        List<Long> idsNum = new ArrayList<>();
        if (ids == null || ids.isEmpty()) {
            idsNum = null;
        }
        else {
            for (String id : ids) {
                idsNum.add(Long.parseLong(id));
            }
        }
        return ApiResponse.success(cartRepository.findByIds(idsNum));
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
