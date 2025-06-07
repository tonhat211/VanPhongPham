package com.example.thien_long.controller;

import com.example.thien_long.dto.request.OrderRequest;
import com.example.thien_long.dto.request.ReviewItemRequest;
import com.example.thien_long.dto.request.ReviewRequest;
import com.example.thien_long.dto.request.UpdateOrderStatusRequest;
import com.example.thien_long.dto.response.CartItemResponse;
import com.example.thien_long.dto.response.OrderItemResponse;
import com.example.thien_long.dto.response.OrderResponse;
import com.example.thien_long.exception.ValidException;
import com.example.thien_long.model.*;
import com.example.thien_long.repository.*;
import com.example.thien_long.service.Constant;
import com.example.thien_long.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/reviews")
public class ReviewController {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductDetailRepository productDetailRepository;
    @Autowired
    private VoucherRepository voucherRepository;
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private OrderService orderService;

    @PostMapping("/add")
    public ResponseEntity<?> findAll(@RequestBody ReviewRequest request) {
        System.out.println("reviews/add");
        User user = userRepository.findById(request.getUserId()).get();

        List<ReviewItemRequest> reviewItemRequests = request.getReviewItems();
        if(reviewItemRequests != null && !reviewItemRequests.isEmpty()) {
            for(ReviewItemRequest reviewItemRequest : reviewItemRequests) {
                Review review = new Review();
                review.setUser(user);
                Product product = new Product();
                product.setId(reviewItemRequest.getProductId());
                review.setProduct(product);
                review.setClassificationName(reviewItemRequest.getClassificationName());
                review.setRating(reviewItemRequest.getRating());
                review.setContent(reviewItemRequest.getContent());
                reviewRepository.save(review);
            }

        }
        Map<String, Object> re = orderService.updateStatus(request.getOrderId(), Order.REVIEW_STATUS);
        return ResponseEntity.ok(re);

    }

}




