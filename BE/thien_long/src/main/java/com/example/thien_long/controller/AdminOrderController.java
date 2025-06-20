package com.example.thien_long.controller;

import com.example.thien_long.dto.request.AdminProductDetailRequest;
import com.example.thien_long.dto.request.OrderRequest;
import com.example.thien_long.dto.request.UpdateOrderStatusRequest;
import com.example.thien_long.dto.response.*;
import com.example.thien_long.exception.ProductNotFoundException;
import com.example.thien_long.exception.ValidException;
import com.example.thien_long.model.*;
import com.example.thien_long.repository.*;
import com.example.thien_long.service.*;
import com.example.thien_long.utils.PriceUtils;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/admin/orders")
public class AdminOrderController {
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
    private OrderService orderService;

    @PreAuthorize("hasAuthority('ADMIN_ORDER')")
    @PostMapping("")
    public ResponseEntity<List<OrderResponse>> findByUser(@RequestBody OrderRequest orderRequest) {
        System.out.println("admin/orders/:");
        List<OrderResponse> orders = orderRepository.findAllByAdmin();

        List<Long> ids = new ArrayList<>();
        for (OrderResponse o : orders) {
            ids.add(o.getId());
        }

        List<OrderItemResponse> orderItems = orderItemRepository.findByOrderIds(ids);

        Map<Long, List<OrderItemResponse>> itemsByOrderId = orderItems.stream()
                .peek(item -> item.setThumbnail(Constant.THUMBNAIL_IMG_DIR +"/"+ item.getThumbnail()))

                .collect(Collectors.groupingBy(OrderItemResponse::getOrderId));

        for (OrderResponse order : orders) {
            List<OrderItemResponse> items = itemsByOrderId.getOrDefault(order.getId(), new ArrayList<>());
            order.setOrderItems(items);
        }


        return ResponseEntity.ok(orders);

    }


    @PreAuthorize("hasAuthority('UPDATE_ORDER_STATUS')")
    @PostMapping("/update/status")
    public ResponseEntity<?> updateStatus(@RequestBody UpdateOrderStatusRequest request) {
        System.out.println("order/user/update:" + request.getId());
        String newStatus = request.getStatus();
        Optional<Order> optionalOrder = orderRepository.findById(request.getId());
        Map<String, Object> response = new HashMap<>();
        if(optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setStatus(newStatus);
            order.setUpdatedAt(LocalDateTime.now());
            orderRepository.save(order);
            response.put("success", true);
            response.put("id", request.getId());
            response.put("status", newStatus);
        } else response.put("success", false);
        return ResponseEntity.ok(response);

    }

}




