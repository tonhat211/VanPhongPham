package com.example.thien_long.controller;

import com.example.thien_long.dto.request.OrderRequest;
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
@RequestMapping("api/v1/orders")
public class OrderController {
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

    @PostMapping("/add")
    public ResponseEntity<?> findAll(@RequestBody OrderRequest orderRequest) {
        System.out.println("orders/add");
        User user = userRepository.findById(orderRequest.getUserId()).get();
        System.out.println("user");
        Order order = new Order();
        order.setUser(user);

        List<OrderItem> orderItems = new ArrayList<>();
        List<CartItemResponse> cartItems = cartRepository.findByIds(orderRequest.getCartIds());
        double initMoney = 0;
        for(CartItemResponse cartItem : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            ProductDetail productDetail = productDetailRepository
                    .findById(cartItem.getProductDetailId())
                    .orElseThrow(() -> new RuntimeException("ProductDetail not found with id: " + cartItem.getProductDetailId()));
            orderItem.setProductDetail(productDetail);
            Product product = productDetail.getProduct();
            orderItem.setProductName(product.getName());
            orderItem.setClassificationName(productDetail.getTitle());
            orderItem.setPriceUnit(productDetail.getPrice());
            orderItem.setQty(cartItem.getQuantity());
            orderItems.add(orderItem);

            initMoney += orderItem.getPriceUnit() * orderItem.getQty();
        }
        if(orderRequest.getShippingFee()!=0) {
            initMoney += orderRequest.getShippingFee();
        }

        if(orderRequest.getVoucherCode() != null && !orderRequest.getVoucherCode().isEmpty()) {
            Voucher voucher = voucherRepository.findByCode(orderRequest.getVoucherCode()).orElseThrow(() -> new RuntimeException("error voucher"));
            order.setVoucher(voucher);
            // totalPrice code giam gia
        }
        order.setNote(orderRequest.getNote());
        order.setReceiverInfo(orderRequest.getReceiverInfo());
        order.setOrderItems(orderItems);
        order.setPayedMoney(initMoney);
        order.setInitMoney(initMoney);

        Order savedOrder = orderRepository.save(order);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("orderId", savedOrder.getId());
        response.put("message", "Order created successfully");

        return ResponseEntity.ok(response);

    }

    @PostMapping("/user")
    public ResponseEntity<List<OrderResponse>> findByUser(@RequestBody OrderRequest orderRequest) {
        System.out.println("orders/user:" + orderRequest.getUserId());
        List<OrderResponse> orders = orderRepository.findByUserId(orderRequest.getUserId());

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


    @PostMapping("/order")
    public ResponseEntity<List<OrderItemResponse>> findOrderItem(@RequestParam long id) {
        System.out.println("orders/order:" + id);
        List<OrderItemResponse> orderItems = orderItemRepository.findByOrderId(id);
        return ResponseEntity.ok(orderItems);

    }

    @PostMapping("/update/status/user")
    public ResponseEntity<?> updateStatus(@RequestBody UpdateOrderStatusRequest request) {
        System.out.println("order/user/update:" + request.getId());
        Map<String, Object> re = orderService.updateStatus(request.getId(), request.getStatus());
        return ResponseEntity.ok(re);

    }



}




