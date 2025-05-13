package com.example.thien_long.controller;

import com.example.thien_long.dto.BasicProductResponse;
import com.example.thien_long.dto.ProductRequest;
import com.example.thien_long.exception.CategoryNotFoundException;
import com.example.thien_long.model.Product;
import com.example.thien_long.repository.ProductRepository;
import com.example.thien_long.service.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/product")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    //localhost:8080/api/v1/product/but-viet?sub=but-da-quang,but-chi&sortBy=price&direction=asc&page=0&size=10
    @GetMapping("/{categoryCode}")
    public ResponseEntity<Page<BasicProductResponse>> findByCategory(
            @PathVariable String categoryCode,
            @RequestParam(required = false) List<String> sub, // VD: sub=but-chi,but-bi
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "1") int size,
            @RequestParam(defaultValue = "price") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        System.out.println("/product/"+categoryCode+"\tpage: " + page);
        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        if (sub == null || sub.isEmpty()) {
            sub = null;
        }
        Page<BasicProductResponse> result = productRepository.findByCategory(categoryCode, sub, pageable);
        return ResponseEntity.ok(result);
    }


}

