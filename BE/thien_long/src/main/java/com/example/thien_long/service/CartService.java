package com.example.thien_long.service;
import com.example.thien_long.dto.request.CartItemRequest;
import com.example.thien_long.dto.response.CartItemResponse;
import com.example.thien_long.dto.response.CartResponse;
import com.example.thien_long.exception.exceptionCatch.AppException;
import com.example.thien_long.exception.exceptionCatch.ErrorCode;
import com.example.thien_long.mapper.CartItemMapper;
import com.example.thien_long.model.Cart;
import com.example.thien_long.model.CartItem;
import com.example.thien_long.model.ProductDetail;
import com.example.thien_long.model.User;
import com.example.thien_long.repository.CartItemRepository;
import com.example.thien_long.repository.CartRepository;
import com.example.thien_long.repository.ProductDetailRepository;
import com.example.thien_long.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartService {
    CartRepository cartRepository;
    CartItemRepository cartItemRepository;
    ProductDetailRepository productDetailRepository;
    UserRepository userRepository;
    CartItemMapper cartItemMapper;

    public CartResponse getCartByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));

//        List<CartItemResponse> items = cart.getCartItems().stream()
//                .map(cartItemMapper::toDto)
//                .collect(Collectors.toList());

        List<CartItemResponse> items = cart.getCartItems().stream()
                .map(cartItem -> {
                    CartItemResponse dto = cartItemMapper.toDto(cartItem);
                    dto.setImageUrl(Constant.PRODUCT_IMG_DIR+"/"+ dto.getImageUrl());
                    dto.setDiscount(100 - (int) (dto.getPrice()/dto.getInitPrice() * 100));
                    return dto;
                })
                .collect(Collectors.toList());
        double totalPrice = items.stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();

        return CartResponse.builder()
                .cartId(cart.getId())
                .items(items)
                .totalPrice(totalPrice)
                .build();
    }

    public CartResponse addProductToCart(Long userId, CartItemRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        ProductDetail productDetail = productDetailRepository.findById(request.getProductDetailId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_DETAIL_NOT_FOUND));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));

        Optional<CartItem> existingItem = cartItemRepository.findByCartAndProductDetail(cart, productDetail);

        CartItem cartItem;
        if (existingItem.isPresent()) {
            cartItem = existingItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + request.getQuantity());
        } else {
            cartItem = CartItem.builder()
                    .cart(cart)
                    .productDetail(productDetail)
                    .quantity(request.getQuantity())
                    .build();
            cart.getCartItems().add(cartItem);
        }

        cartItemRepository.save(cartItem);
        return getCartByUserId(userId);
    }

    public CartResponse updateProductQuantity(Long userId, CartItemRequest request) {
        if (request.getQuantity() <= 0) {
            return removeProductFromCart(userId, request.getProductDetailId());
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        ProductDetail productDetail = productDetailRepository.findById(request.getProductDetailId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_DETAIL_NOT_FOUND));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));

        CartItem cartItem = cartItemRepository.findByCartAndProductDetail(cart, productDetail)
                .orElseThrow(() -> new AppException(ErrorCode.CART_ITEM_NOT_FOUND));

        cartItem.setQuantity(request.getQuantity());
        cartItemRepository.save(cartItem);

        return getCartByUserId(userId);
    }

    public CartResponse removeProductFromCart(Long userId, Long productDetailId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        ProductDetail productDetail = productDetailRepository.findById(productDetailId)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_DETAIL_NOT_FOUND));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));

        CartItem cartItem = cartItemRepository.findByCartAndProductDetail(cart, productDetail)
                .orElseThrow(() -> new AppException(ErrorCode.CART_ITEM_NOT_FOUND));

        cart.getCartItems().remove(cartItem);
        cartItemRepository.delete(cartItem);

        return getCartByUserId(userId);
    }


}
