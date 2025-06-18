package com.example.thien_long.mapper;

import com.example.thien_long.dto.response.CartItemResponse;
import com.example.thien_long.model.CartItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CartItemMapper {

    @Mapping(source = "productDetail.id", target = "productDetailId")
    @Mapping(source = "productDetail.product.name", target = "productName")
    @Mapping(source = "productDetail.product.brand.name", target = "brandName")
    @Mapping(source = "productDetail.initPrice", target = "initPrice")
    @Mapping(source = "productDetail.price", target = "price")
    @Mapping(expression = "java(getFirstImageUrl(cartItem))", target = "imageUrl")
    CartItemResponse toDto(CartItem cartItem);

    default String getFirstImageUrl(CartItem cartItem) {
        return cartItem.getProductDetail()
                .getProduct()
                .getImages()
                .stream()
                .findFirst()
                .map(image -> image.getName())
                .orElse(null);
    }
}
