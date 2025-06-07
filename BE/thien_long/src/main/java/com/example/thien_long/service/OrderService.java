package com.example.thien_long.service;
import com.example.thien_long.dto.request.CartItemRequest;
import com.example.thien_long.dto.request.UpdateOrderStatusRequest;
import com.example.thien_long.dto.response.CartItemResponse;
import com.example.thien_long.dto.response.CartResponse;
import com.example.thien_long.dto.response.OrderResponse;
import com.example.thien_long.exception.ValidException;
import com.example.thien_long.exception.exceptionCatch.AppException;
import com.example.thien_long.exception.exceptionCatch.ErrorCode;
import com.example.thien_long.mapper.CartItemMapper;
import com.example.thien_long.model.*;
import com.example.thien_long.repository.*;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public Map<String, Object> updateStatus(long id, String newStatus) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        Order order = optionalOrder.orElseThrow(() -> new ValidException("Không tìm thấy đơn hàng ID: " + id));
        boolean isSuccess = false;

        String currentStatus = order.getStatus() != null ? order.getStatus().toUpperCase() : "";
        String message = "";

        switch (newStatus) {
            case Order.CANCEL_STATUS:
                if (Order.WAIT_STATUS.equalsIgnoreCase(currentStatus)
                        || Order.CONFIRM_STATUS.equalsIgnoreCase(currentStatus)) {
                    isSuccess = true;
                    message = "Huy thanh cong";
                    order.setUpdatedAt(LocalDateTime.now());
                } else {
                    message = "That bai do don hang dang giao hoac da hoan thanh";
                }
                break;
            case Order.CONFIRM_COMPLETE_STATUS:
                if (Order.COMPLETE_STATUS.equalsIgnoreCase(currentStatus)) {
                    isSuccess = true;
                    message = "Xac nhan thanh cong";
                } else {
                    message = "Don hang chua duoc xac nhan boi giao hang";
                }
                break;
            case Order.BACK_STATUS:
                if (Order.CONFIRM_COMPLETE_STATUS.equalsIgnoreCase(currentStatus)) {
                    isSuccess = true;
                    message = "Da xac nhan tra";
                    order.setUpdatedAt(LocalDateTime.now());
                } else {
                    message = "Don hang chua duoc xac nhan hoan thanh";
                }
                break;
            case Order.REVIEW_STATUS:
                if (Order.CONFIRM_COMPLETE_STATUS.equalsIgnoreCase(currentStatus)) {
                    isSuccess = true;
                    message = "Da danh gia thanh cong";
                } else {
                    message = "Don hang chua duoc xac nhan hoan thanh";
                }
                break;
        }
        if(isSuccess) {
            order.setStatus(newStatus);

            orderRepository.save(order);
        }
        OrderResponse orderResponse = orderRepository.findOrderResponseById(id);
        Map<String, Object> response = new HashMap<>();
        response.put("order", orderResponse);
        if (isSuccess) {
            response.put("success", true);
        } else {
            response.put("success", false);
        }
        response.put("message", message);

        return response;

    }
}



