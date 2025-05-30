package com.example.thien_long.controller;

import com.example.thien_long.dto.BasicProductResponse;
import com.example.thien_long.dto.ProductDetailResponse;
import com.example.thien_long.exception.ProductNotFoundException;
import com.example.thien_long.model.Image;
import com.example.thien_long.model.Product;
import com.example.thien_long.model.ProductDetail;
import com.example.thien_long.model.Review;
import com.example.thien_long.repository.ImageRepository;
import com.example.thien_long.repository.ProductDetailRepository;
import com.example.thien_long.repository.ProductRepository;
import com.example.thien_long.repository.ReviewRepository;
import com.example.thien_long.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/products")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductService productService;


    @GetMapping()
    public ResponseEntity<Page<BasicProductResponse>> findAll(
            @RequestParam(required = false) List<String> sub,
            @RequestParam(required = false) List<String> brands,
            @RequestParam(required = false) String priceRange,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(defaultValue = "price") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        System.out.println("/products not categry");
        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        if (sub == null || sub.isEmpty()) {
            sub = null;
        }
        if (brands == null || brands.isEmpty()) {
            brands = null;
        }
        String bfPrice = null, afPrice=null;
        if (priceRange != null) {
            String[] priceTokens = priceRange.split("-");
            bfPrice = priceTokens[0]+"000";
            afPrice = priceTokens[1]+"000";
        }
        Page<BasicProductResponse> result = productRepository.findAll(sub,brands,bfPrice,afPrice, pageable);
        System.out.println("/result: " +result.getSize());

        return ResponseEntity.ok(result);
    }

    //localhost:8080/api/v1/products/but-viet?sub=but-da-quang,but-chi&sortBy=price&direction=asc&page=0&size=10
    @GetMapping("/{categoryCode}")
    public ResponseEntity<Page<BasicProductResponse>> findByCategory(
            @PathVariable String categoryCode,
            @RequestParam(required = false) List<String> sub, // VD: sub=but-chi,but-bi
            @RequestParam(required = false) List<String> brands,
            @RequestParam(required = false) String priceRange,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(defaultValue = "price") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        System.out.println("/products/"+categoryCode+"\tpage: " + page);
        System.out.println("category");
        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        if (sub == null || sub.isEmpty()) {
            sub = null;
        }
        if (brands == null || brands.isEmpty()) {
            brands = null;
        }
        String bfPrice = null, afPrice=null;
        if (priceRange != null) {
            String[] priceTokens = priceRange.split("-");
            bfPrice = priceTokens[0]+"000";
            afPrice = priceTokens[1]+"000";
        }
        Page<BasicProductResponse> result = productRepository.findByCategory(categoryCode, sub,brands,bfPrice,afPrice, pageable);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<ProductDetailResponse> findDetail(
            @PathVariable long id) {
        System.out.println("/products/detail/"+id);
//        ProductResponseHelper product = productRepository.findProductForDetailById(id);
//        List<DetailResponseHelper> productDetails = productDetailRepository.findByProductId(id);
//        List<ReviewResponseHelper> reviews = reviewRepository.findByProductId(id);
        Optional<Product> optionalProduct = productRepository.findById(id);
        Product product = optionalProduct.orElseThrow(() -> new ProductNotFoundException("Không tìm thấy sản phẩm ID: " + id));

        Optional<List<ProductDetail>> optionalProductDetails = productDetailRepository.findByProductIdForProductDetail(id);
        List<ProductDetail> productDetails = optionalProductDetails.orElse(Collections.emptyList());

        List<String> imgUrls = imageRepository.findUrlsByProductId(id);

        Optional<List<Review>> optionalReviews = reviewRepository.findByProductId(id);
        List<Review> reviews = optionalReviews.orElse(Collections.emptyList());
        ProductDetailResponse result = new ProductDetailResponse(product,productDetails,imgUrls,reviews);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<BasicProductResponse>> findByName(
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(required = false) String priceRange,

            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(defaultValue = "price") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        System.out.println("products/search?keyword="+keyword);
        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);

        String[] tokens = keyword.split(" ");

        ArrayList<String> keywords = new ArrayList<>();
        for (String token : tokens) {
            keywords.add(token);
        }
        String bfPrice = null, afPrice=null;
        if (priceRange != null) {
            String[] priceTokens = priceRange.split("-");
            bfPrice = priceTokens[0]+"000";
            afPrice = priceTokens[1]+"000";
        }
        Page<Product> productPage = productService.searchByKeywords(keywords, bfPrice, afPrice, pageable);
        Page<BasicProductResponse> result = productPage.map(product ->
                new BasicProductResponse(
                        product.getId(),
                        product.getName(),
                        product.getLabel(),
                        product.getThumbnail(),
                        product.getPrice(),
                        product.getInitPrice(),
                        product.getAvgRating(),
                        product.getTotalReview(),
                        product.getSoldQty()
                )
        );
        return ResponseEntity.ok(result);
    }


}




